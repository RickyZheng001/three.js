/**
 * Created by ZhengLi on 2017/11/14.
 */
function GlobalOnClickClosePanel()
{
    if(m_globalGui != null && m_globalGui != undefined)
    {
        m_globalGui.domElement.style.visibility = 'hidden';
    }
}
function JsonToIni(obj)
{
    var result;

    result = "[file]" + "\r\n";

    for(var i = 0; i < obj.Tab.length; i++) {
        var tabName = obj.Tab[i].Name;

        var paramList = obj.Tab[i].ParamList;
        for (var k = 0; k < paramList.length; k++) {
            var param = paramList[k];
            var paramName = param.Name;
            var paramType = param.Type;
            var defaultValue = param.DefaultValue;
            var iniName = param.iniName;
            var iniType = param.iniType;
            //var value = param.Value;

            if(iniName != null && iniName != undefined && iniName !="")
            {
                if(paramType.toLowerCase() == "combobox")
                {
                    var choise = param.Choise;
                    var selections= new Array(); //定义一数组
                    selections = choise.split(","); //字符分割
                    param.Value = 0;
                    for(var j = 0; j < selections.length; j++)
                    {
                        if(selections[j] == param[paramName])
                        {
                            param.Value = j;
                            break;
                        }
                    }
                }
                else
                {
                    if(iniType.toLowerCase() == "int")
                    {
                        param.Value = parseInt(param[paramName]);
                    }
                    else if(iniType.toLowerCase() == "float")
                    {
                        param.Value = parseFloat(param[paramName]);
                    }
                    else if(iniType.toLowerCase() == "string")
                    {
                        param.Value = param[paramName];
                    }
                }

                result += (iniName + "=" + param.Value + "\r\n");
            }
        }
    }

    return result;
}
function LoadDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack)
{
    var scope = this;
    var gui = null;

    var test = window.location.pathname;
    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var obj = eval('(' + text + ')');

        //var menuObj = {};
        gui = new dat.gui.GUI();
        gui.remember(menuObj);

        for (var i = 0; i < obj.Tab.length; i++) {
            var tabObj = obj.Tab[i];
            var tabName = tabObj.Name;

            var guiTable = gui.addFolder(tabName);

            var paramList = tabObj.ParamList;

            menuObj[tabName] = {};

            for (var j = 0; j < paramList.length; j++) {
                var param = paramList[j];
                var paramName = param.Name;
                var paramType = param.Type;
                var defaultValue = param.DefaultValue;

                if (paramType == "EditBox") {
                    param[paramName] = defaultValue;
                    guiTable.add(param, paramName);
                    //sectionMenuObj[paramName] = defaultValue;
                    //guiSection.add(sectionMenuObj, paramName);
                }
                else if (paramType == "ComboBox") {
                    param[paramName] = defaultValue;
                    var str = param.Choise;
                    if (typeof(str) == "string") {
                        var selections = new Array(); //定义一数组
                        selections = str.split(","); //字符分割
                        guiTable.add(param, paramName, selections);
                    }
                    else {
                        //是一个数组，直接关系后后面菜单结构
                        selections = new Array();
                        for (var l = 0; l < str.length; l++) {
                            var choiseParam = str[l];
                        }
                    }
                }
            }
        }

        menuObj["显示坐标轴"] = true;
        menuObj["显示xz平面"] = false;
        menuObj["显示xy平面"] = false;
        menuObj["显示yz平面"] = false;

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var result = JsonToIni(jsonObj);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getmodel=1",
                data: result,
                success: function (response) {
                    callback(response);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;top:300px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
    });
}
function LoadHeadSearchGUI(configFileURL,callback,menuObj,display3DModelCallback,displayPdfCallback)
{
    var scope = this;
    var gui = null;

    var test = window.location.pathname;
    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var obj = eval('(' + text + ')');

        //var menuObj = {};
        gui = new dat.gui.GUI();
        gui.remember(menuObj);

        for (var i = 0; i < obj.Tab.length; i++) {
            var tabObj = obj.Tab[i];
            var tabName = tabObj.Name;

            var guiTable = gui.addFolder(tabName);

            var paramList = tabObj.ParamList;

            menuObj[tabName] = {};

            for (var j = 0; j < paramList.length; j++) {
                var param = paramList[j];
                var paramName = param.Name;
                var paramType = param.Type;
                var defaultValue = param.DefaultValue;

                if (paramType == "EditBox") {
                    param[paramName] = defaultValue;
                    guiTable.add(param, paramName);
                    //sectionMenuObj[paramName] = defaultValue;
                    //guiSection.add(sectionMenuObj, paramName);
                }
                else if (paramType == "ComboBox") {
                    param[paramName] = defaultValue;
                    var str = param.Choise;
                    if (typeof(str) == "string") {
                        var selections = new Array(); //定义一数组
                        selections = str.split(","); //字符分割
                        guiTable.add(param, paramName, selections);
                    }
                    else {
                        //是一个数组，直接关系后后面菜单结构
                        selections = new Array();
                        for (var l = 0; l < str.length; l++) {
                            var choiseParam = str[l];
                        }
                    }
                }
            }
        }

        menuObj["显示坐标轴"] = true;
        menuObj["显示xz平面"] = false;
        menuObj["显示xy平面"] = false;
        menuObj["显示yz平面"] = false;

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            var result = JsonToIni(jsonObj);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getmodel=1",
                data: result,
                success: function (response) {
                    callback(response);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }
        menuObj["显示三维模型"] = display3DModelCallback;
        menuObj["显示二维图纸"] = displayPdfCallback;

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;top:300px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
    });
}
function LoadGUIByConfig(configFileURL,callback,menuObj,display3DModelCallback,displayPdfCallback)
{
    var scope = this;
    var gui = null;

    var test = window.location.pathname;
    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text )
    {
        var obj = eval('(' + text + ')');

        //var menuObj = {};
        gui = new dat.gui.GUI();
        gui.remember(menuObj);

        for(var i = 0; i < obj.Tab.length; i++)
        {
            var tabObj = obj.Tab[i];
            var tabName = tabObj.Name;

            var guiTable = gui.addFolder(tabName);

            var paramList = tabObj.ParamList;

            menuObj[tabName] = {};

            for(var j = 0; j < paramList.length; j++)
            {
                var param = paramList[j];
                var paramName = param.Name;
                var paramType = param.Type;
                var defaultValue = param.DefaultValue;

                if(paramType == "EditBox")
                {
                    param[paramName] = defaultValue;
                    guiTable.add(param, paramName);
                    //sectionMenuObj[paramName] = defaultValue;
                    //guiSection.add(sectionMenuObj, paramName);
                }
                else if(paramType == "ComboBox")
                {
                    param[paramName] = defaultValue;
                    var str = param.Choise;
                    if(typeof(str) == "string")
                    {
                        var selections= new Array(); //定义一数组
                        selections = str.split(","); //字符分割
                        guiTable.add(param,paramName,selections);
                    }
                    else
                    {
                        //是一个数组，直接关系后后面菜单结构
                        selections = new Array();
                        for(var l = 0; l < str.length; l++)
                        {
                            var choiseParam = str[l];
                        }
                    }
                }
            }
        }

        menuObj["显示坐标轴"] = true;
        menuObj["显示xz平面"] = false;
        menuObj["显示xy平面"] = false;
        menuObj["显示yz平面"] = false;

        menuObj["更新模型"] = function()
        {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            var result = JsonToIni(jsonObj);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getmodel=1",
                data: result,
                success: function(response){
                    callback(response);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }
        menuObj["显示三维模型"] = display3DModelCallback;
        menuObj["显示二维图纸"] = displayPdfCallback;

        gui.add(menuObj, '更新模型');
        gui.add(menuObj, '显示三维模型');
        gui.add(menuObj, '显示二维图纸');

        gui.domElement.style = 'position:absolute;top:300px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
    });
}
function DisplayProgressBar()
{

}
function HideProgressBar()
{

}
function UpdateProgressBar(percent)
{

}