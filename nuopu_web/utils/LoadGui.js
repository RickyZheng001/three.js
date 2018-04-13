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
function GetIniStringByJsonObj(jsonObj)
{
    var result = "";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var singleJsonObj = jsonObj[i];
        var paramList = singleJsonObj.ParamList;

        if(paramList != null && paramList != undefined)
        {
            for(var j = 0; j < paramList.length; j++)
            {
                var paramObj = paramList[j];
                if(paramObj == null || paramObj == undefined)
                {
                    continue;
                }

                if(paramObj.Choise != null && paramObj.Choise != undefined)
                {
                    if(paramObj.Name == "内冷孔和冷却槽")
                    {
                        paramObj.Value = parseInt(paramObj[paramObj.Name]);
                        if(paramObj.Value == 0 || paramObj.Value == 1)
                        {
                            result += ("fluted_type" + "=" + "0" + "\r\n");
                        }
                        else
                        {
                            result += ("fluted_type" + "=" + "1" + "\r\n");
                        }

                        if(paramObj.Value == 0 || paramObj.Value == 2)
                        {
                            result += ("cool_type" + "=" + "0" + "\r\n");
                        }
                        else if(paramObj.Value == 1)
                        {
                            result += ("cool_type" + "=" + "1" + "\r\n");
                        }
                        else
                        {
                            result += ("cool_type" + "=" + "2" + "\r\n");
                        }

                        var choiseArray = new Array();
                        choiseArray.push(paramObj.Choise[paramObj.Value]);
                        result += GetIniStringByJsonObj(choiseArray);
                    }
                    else
                    {
                        paramObj.Value = parseInt(paramObj[paramObj.Name]);
                        var choiseArray = new Array();
                        choiseArray.push(paramObj.Choise[paramObj.Value]);
                        result += (paramObj.iniName + "=" + paramObj.Value + "\r\n");
                        result += GetIniStringByJsonObj(choiseArray);
                    }
                    continue;
                }

                if(paramObj.iniName != null && paramObj.iniName != undefined && paramObj.iniName != "")
                {
                    paramObj.Value = parseFloat(paramObj[paramObj.Name]);
                    result += (paramObj.iniName + "=" + paramObj.Value + "\r\n");
                }
            }
        }
    }

    return result;
}
function JsonToIni(obj)
{
    var result;

    result = "[file]" + "\r\n";

    result += GetIniStringByJsonObj(obj.Tab);

    return result;
}
function UpdateGUIByJsonObj(guiRoot,jsonObj,onComboBoxChangedCallBack)
{
    var paramList = jsonObj.ParamList;

    for (var j = 0; j < paramList.length; j++) {
        var param = paramList[j];
        var paramName = param.Name;
        var paramType = param.Type;
        var defaultValue = param.DefaultValue;

        if(param[paramName] != null && param[paramName] != undefined)
        {
            defaultValue = param[paramName];
        }

        if (paramType == "EditBox") {
            param[paramName] = defaultValue;

            var bFind = false;
            for(var k = 0; k < guiRoot.__controllers.length; k++)
            {
                if(guiRoot.__controllers[k].property == paramName)
                {
                    bFind = true;
                    break;
                }
            }

            if(bFind == false)
            {
                guiRoot.add(param, paramName).onFinishChange(onComboBoxChangedCallBack);
            }

            //sectionMenuObj[paramName] = defaultValue;
            //guiSection.add(sectionMenuObj, paramName);
        }
        else if (paramType == "ComboBox")
        {
            param[paramName] = parseInt(defaultValue);
            var str = param.Choise;

            if (typeof(str) == "string") {
                var selections = {} //定义一数组
                var strArray = str.split(","); //字符分割

                for(var k = 0; k < strArray.length; k++)
                {
                    selections[strArray[k]] = k;
                }

                var defaultIndex = parseInt(defaultValue);
                param[paramName] = defaultIndex;

                var bFind = false;
                for(var k = 0; k < guiRoot.__controllers.length; k++)
                {
                    if(guiRoot.__controllers[k].property == paramName)
                    {
                        bFind = true;
                        break;
                    }
                }

                if(bFind == false)
                {
                    guiRoot.add(param, paramName, selections).onFinishChange(onComboBoxChangedCallBack);
                }

            }
            else
            {
                //是一个数组，直接关系后后面菜单结构
                var choiseArray = param.Choise;
                var selections = {};

                for (var k = 0; k < choiseArray.length; k++)
                {
                    selections[choiseArray[k].Name] = k;
                }

                var defaultIndex = parseInt(defaultValue);
                param[paramName] = defaultIndex;

                var bFind = false;
                for(var k = 0; k < guiRoot.__controllers.length; k++)
                {
                    if(guiRoot.__controllers[k].property == paramName)
                    {
                        bFind = true;
                        break;
                    }
                }

                if(bFind == false)
                {
                    guiRoot.add(param, paramName, selections).onFinishChange(onComboBoxChangedCallBack);
                }

                //把 choise 选项加进去
                var choiseObj = choiseArray[defaultIndex];

                for(var k = 1; k < guiRoot.__controllers.length; k++)
                {
                    guiRoot.remove(guiRoot.__controllers[k]);
                    k--;
                }
                UpdateGUIByJsonObj(guiRoot,choiseObj);
            }
        }
    }
}
function ReloadDesignGUI(jsonObj,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack)
{
    //m_globalGui
    var scope = this;
    var gui = null;
    var handleLength = 237;

    var menuObj = {};

    gui = m_globalGui;
    gui.remember(menuObj);
    for (var i = 0; i < jsonObj.Tab.length; i++) {
        var tabObj = jsonObj.Tab[i];
        var tabName = tabObj.Name;

        var guiTable = null;
        //gui.__forder
        if(gui.__folders[tabName] == null || gui.__folders[tabName] == undefined)
        {
            guiTable = gui.addFolder(tabName);
        }
        else
        {
            guiTable = gui.__folders[tabName];
        }

        menuObj[tabName] = {};
        UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
    }

    gui.domElement.style = 'position:absolute;top:300px;background-color:#ffffff;';
    gui.domElement.id = 'MenuParamDesign';
    gui.OnClickClosePanel = GlobalOnClickClosePanel;

    m_globalGui = gui;
    m_globalGuiJsonObj = jsonObj;
    m_globalFuncUpdateModel = menuObj["更新模型"];
}
function LoadZuanTouSearchGUIMockData(configFileURL,menuObj,callback)
{
    var scope = this;
    var gui = null;

    menuObj = {};

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var strJson = JSON.stringify(jsonObj);
            //var result = JsonToIni(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);

            var mockDataLoader = new THREE.FileLoader( scope.manager );
            //loader.setResponseType( 'arraybuffer' );
            mockDataLoader.load( "./mockData/zuanTouSearchResult.json", function ( text ) {
                callback(text, handleLength);
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_zuanTouSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        var m_globalHandleSearchGui = gui;
        var m_globalHandleSearchJsonObj = obj;
    });
}
function LoadZuanTouSearchGUIMockData_ZZGC(configFileURL,menuObj,callback)
{
    var scope = this;
    var gui = null;

    menuObj = {};

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var strJson = JSON.stringify(jsonObj);
            //var result = JsonToIni(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);

            var mockDataLoader = new THREE.FileLoader( scope.manager );
            //loader.setResponseType( 'arraybuffer' );
            mockDataLoader.load( "./mockData/zuanTouSearchResult_zzgc.json", function ( text ) {
                callback(text, handleLength);
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_zuanTouSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        // = gui;
        //m_globalHandleSearchJsonObj = obj;
    });
}
function LoadZuanTouSearchGUI(configFileURL,menuObj,callback)
{
    var scope = this;
    var gui = null;

    menuObj = {};

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var strJson = JSON.stringify(jsonObj);
            //var result = JsonToIni(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?queryZuanTou=1",
                data: strJson,
                success: function (response) {
                    callback(response,handleLength);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;top:330px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_zuanTouSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        var m_globalHandleSearchGui = gui;
        var m_globalHandleSearchJsonObj = obj;
    });
}
function LoadHandleSearchGUIMockData(configFileURL,menuObj,callback)
{
    var scope = this;
    var gui = null;

    menuObj = {};

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var strJson = JSON.stringify(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            var mockDataLoader = new THREE.FileLoader( scope.manager );
            mockDataLoader.load( "./mockData/daoBingSearchResult.json", function ( text ) {
                callback(text, handleLength);
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_handleSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        var m_globalHandleSearchGui = gui;
        var m_globalHandleSearchJsonObj = obj;
    });
}
function LoadHandleSearchGUI(configFileURL,menuObj,callback)
{
    var scope = this;
    var gui = null;

    menuObj = {};

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var strJson = JSON.stringify(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?queryDaoBing=1",
                data: strJson,
                success: function (response) {
                    callback(response,handleLength);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;top:390px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_handleSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        var m_globalHandleSearchGui = gui;
        var m_globalHandleSearchJsonObj = obj;
    });
}
function LoadTuZhiMuBanGUI(tuZhiMoBanPath,menuObj,onClickQueDing)
{
    var scope = this;
    var gui = null;

    menuObj = {};

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( tuZhiMoBanPath, function ( text ) {
        var obj = eval('(' + text + ')');

        //var menuObj = {};
        gui = new dat.gui.GUI();
        gui.remember(menuObj);

        for (var i = 0; i < obj.Tab.length; i++) {
            var tabObj = obj.Tab[i];
            var tabName = tabObj.Name;

            var guiTable = gui.addFolder(tabName);

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["确定"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickQueDing();
        }

        gui.add(menuObj, '确定');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_tuZhiMuBan';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalTuZhiSearchGui = gui;
        m_globalTuZhiSearchJsonObj = obj;
    });
}
function UpdateTechRequest()
{
    var tableHtmlElement = document.getElementById("techRequest");

    if(tableHtmlElement == null || tableHtmlElement == undefined)
    {
        return;
    }

    //m_globalJiShuYaoQiuJsonObj;
    var paramList = m_globalJiShuYaoQiuJsonObj.Tab[0].ParamList;
    var strMaterial = paramList[0]["加工材料"];
    var strJiChuang = paramList[1]["机床"];
    var strDaoJuJieGou = paramList[2]["刀具结构"];
    var strTuCengYaoQiu = paramList[3]["涂层要求"];
    var strNeiLengYaoQiu = paramList[4]["内冷要求"];
    var strJiaGongNeiRong = paramList[5]["加工内容"];
    var strJiaGongJingDu = paramList[6]["加工精度"];
    var strQiTa = paramList[7]["其他"];
    /*
    <div style="width:80%">
        序号
    </div>
    * */
    var strHtml = "<div style=\"width:80%\">" + "技术条件:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.被加工材料: " + strMaterial + "</div>";
    strHtml += "<div style=\"width:80%\">" + "2.使用机床: " + strJiChuang +  "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.刀具结构: " + strDaoJuJieGou + "</div>";
    strHtml += "<div style=\"width:80%\">" + "4.涂层要求: " + strTuCengYaoQiu + "</div>";
    strHtml += "<div style=\"width:80%\">" + "5.刀具是否内冷: " + strJiaGongNeiRong + "</div>";
    strHtml += "<div style=\"width:80%\">" + "6.加工内容: " + strJiaGongNeiRong + "</div>";
    strHtml += "<div style=\"width:80%\">" + "7.加工精度: " + strJiaGongJingDu + "</div>";
    strHtml += "<div style=\"width:80%\">" + "7.其他: " + strQiTa + "</div>";

    paramList = m_globalTuZhiSearchJsonObj.Tab[0].ParamList;
    var strTuFuDaXiao = paramList[0]["图幅大小"];
    strTuFuDaXiao = paramList[0].Choise.split(",")[strTuFuDaXiao];
    var strGongSiMingCheng = paramList[1]["公司名称"];
    var strBiaoTiLan = paramList[2]["标题栏"];
    strBiaoTiLan = paramList[2].Choise.split(",")[strBiaoTiLan];

    strHtml += "<br>"
    strHtml += "<div style=\"width:80%\">" + "图纸模板:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.图幅大小: " + strTuFuDaXiao + "</div>";//图幅大小,公司名称，标题栏
    strHtml += "<div style=\"width:80%\">" + "2.公司名称: " + strGongSiMingCheng + "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.标题栏: " + strBiaoTiLan + "</div>";

    tableHtmlElement.innerHTML = strHtml;

    tableHtmlElement.style.visibility = "visible";
    g_bDisplayTechRequest = true;
}
function DisplayTechRequest()
{
    var tableHtmlElement = document.getElementById("techRequest");

    if(tableHtmlElement == null || tableHtmlElement == undefined)
    {
        return;
    }
    /*
    <div style="width:80%">
        序号
    </div>
    * */
    var strHtml = "<div style=\"width:80%\">" + "技术要求:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.被加工材料: K4169" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "2.使用机床: 加工中心" +  "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.刀具结构: 整体合金埋钻" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "4.涂层要求: 涂层" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "5.刀具是否内冷: 内冷" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "6.加工内容: 加工Φ10.9 (+0.0180) 孔, 孔深3mm" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "  加工至Φ10.7mm 再用铰刀加工至尺寸" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "7.加工精度: 孔表面粗糙度3.2, 位置度 ±0.1" + "</div>";
    tableHtmlElement.innerHTML = strHtml;

    tableHtmlElement.style.visibility = "visible";
    g_bDisplayTechRequest = true;
}
function LoadJiShuYaoQiuGUI(tuZhiMoBanPath,menuObj,onClickQueDing)
{
    var scope = this;
    var gui = null;

    menuObj = {};

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( tuZhiMoBanPath, function ( text ) {
        var obj = eval('(' + text + ')');

        //var menuObj = {};
        gui = new dat.gui.GUI();
        gui.remember(menuObj);

        for (var i = 0; i < obj.Tab.length; i++) {
            var tabObj = obj.Tab[i];
            var tabName = tabObj.Name;

            var guiTable = gui.addFolder(tabName);

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["确定"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickQueDing();
        }

        gui.add(menuObj, '确定');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_jiShuYaoQiu';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalJiShuYaoQiuGui = gui;
        m_globalJiShuYaoQiuJsonObj = obj;
    });
}
function LoadYanChangGanSearchGUIMockData(configFileURL,menuObj,callback)
{
    var scope = this;
    var gui = null;

    menuObj = {};

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var strJson = JSON.stringify(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            var mockDataLoader = new THREE.FileLoader( scope.manager );
            mockDataLoader.load( "./mockData/yanChangGanSearchResult.json", function ( text ) {
                callback(text, handleLength);
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_YanChangGanSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalYanChangGanSearchGui = gui;
        m_globalYanChangGanSearchJsonObj = gui;
    });
}
function LoadDaoBingDesignGUIMockData(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
        }

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            //onClickUpdateCallBack();

            var pdfCtrl = document.getElementById( 'pdfCtrl' );
            pdfCtrl.src = "./obj/test/E930456031695.pdf";

            var loader = new THREE.STLLoader();
            loader.load("./obj/test/E930456031695.stl", function ( geometry ){
                onClickUpdateCallBack();
                var elem = document.getElementById('myCanvas');
                elem.style.visibility = "hidden";
                clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
            },null,null);
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_DaoBing';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}
function LoadYanChangGanSearchGUI(configFileURL,menuObj,callback)
{
    var scope = this;
    var gui = null;

    menuObj = {};

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var strJson = JSON.stringify(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?queryYanChangGan=1",
                data: strJson,
                success: function (response) {
                    callback(response,handleLength);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;top:420px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_YanChangGanSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalYanChangGanSearchGui = gui;
        m_globalYanChangGanSearchJsonObj = gui;
    });
}
function LoadDetailDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
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
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?generateDetailModel=1",
                data: result,
                success: function (response) {
                    callback(response,handleLength);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        menuObj["保存模型到数据库"] = function () {

            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            //var result = JsonToIni(jsonObj);

            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?savemodel=1",
                data: jsonObj,
                success: function (response) {
                    callback(response);
                },
                error: function (errs) {
                    alert(errs.responseText);
                }
            });
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;top:430px;left:0px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}
function LoadLingJianUIByJson(configFileURL,onFinishLoadUI)
{
    var scope = this;
    var gui = null;

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var jsonObj = eval('(' + text + ')');
        m_globalTreeUIJsonObj = jsonObj;
        LoadUIConfigByJsonObj(jsonObj);
        onFinishLoadUI();
    });
}
function LoadYanChangGanDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
        }

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var result = JsonToIni(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getmodel=1",
                data: result,
                success: function (response) {
                    callback(response,handleLength);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_YanChangGan';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}
function LoadDetailDesignGUIMockData(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
        }

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            //onClickUpdateCallBack();
            var pdfCtrl = document.getElementById( 'pdfCtrl' );
            pdfCtrl.src = "./obj/test/zuantou655.pdf";

            var loader = new THREE.STLLoader();
            loader.load("./obj/test/zuantou655.stl", function ( geometry ){
                onClickUpdateCallBack();
                var elem = document.getElementById('myCanvas');
                elem.style.visibility = "hidden";
                clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
            },null,null);
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}
function LoadYanChangGanDesignGUIMockData(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
        }

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            //onClickUpdateCallBack();
            var pdfCtrl = document.getElementById( 'pdfCtrl' );
            pdfCtrl.src = "./obj/test/BD01658010652.pdf";

            var loader = new THREE.STLLoader();
            loader.load("./obj/test/BD01658010652.stl", function ( geometry ){
                onClickUpdateCallBack();
                var elem = document.getElementById('myCanvas');
                elem.style.visibility = "hidden";
                clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
            },null,null);
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_YanChangGan';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}
function LoadDaoBingDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
        }

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            var result = JsonToIni(jsonObj);
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getmodel=1",
                data: result,
                success: function (response) {
                    callback(response,handleLength);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_DaoBing';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}
function LoadDesignGUIMockData(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
        }

        menuObj["显示坐标轴"] = true;
        menuObj["显示xz平面"] = false;
        menuObj["显示xy平面"] = false;
        menuObj["显示yz平面"] = false;

        menuObj["更新模型"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            //onClickUpdateCallBack();
            var pdfCtrl = document.getElementById( 'pdfCtrl' );
            pdfCtrl.src = "./obj/test/SD1103-0600-020-06R1.pdf";

            var loader = new THREE.STLLoader();
            loader.load("./obj/test/SD1103-0600-020-06R1.stl", function ( geometry ){
                onClickUpdateCallBack();
                var elem = document.getElementById('myCanvas');
                elem.style.visibility = "hidden";
                clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
            },null,null);
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}
function LoadDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

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

            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onComboBoxChangedCallBack);
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
            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getmodel=1",
                data: result,
                success: function (response) {
                    callback(response,handleLength);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        menuObj["保存模型到数据库"] = function () {

            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;

            onClickUpdateCallBack();

            //var result = JsonToIni(jsonObj);

            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?savemodel=1",
                data: jsonObj,
                success: function (response) {
                    callback(response);
                },
                error: function (errs) {
                    alert(errs.responseText);
                }
            });
        }

        gui.add(menuObj, '更新模型');

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
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
function onTuZhiMuBanClickQueDing()
{
    UpdateTechRequest();
}
function onJiShuYaoQiuClickQueDing()
{
    UpdateTechRequest();
}
function UpdateParamList()
{
    var tableHtmlElement = document.getElementById("divParamList");

    if(tableHtmlElement == null || tableHtmlElement == undefined)
    {
        return;
    }
    /*
    <div style="width:80%">
        序号
    </div>
    * */
    var strHtml = "<div style=\"width:80%\">" + "参数列表:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "刀具:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.总长L1: " + 10 + "</div>";
    strHtml += "<div style=\"width:80%\">" + "2.工作长度L2: " + 10 + "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.工作直径D1: " + 10 + "</div>";

    strHtml += "<div style=\"width:80%\">" + "刀柄:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.前段类型: " + 10 + "</div>";
    strHtml += "<div style=\"width:80%\">" + "2.尾端类型: " + 10 + "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.夹持直径: " + 10 + "</div>";
    strHtml += "<div style=\"width:80%\">" + "4.有效长度: " + 10 + "</div>";

    strHtml += "<div style=\"width:80%\">" + "延长杆:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.夹持类型: " + 10 + "</div>";
    strHtml += "<div style=\"width:80%\">" + "2.总长: " + 10 + "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.柄部直径: " + 10 + "</div>";

    tableHtmlElement.innerHTML = strHtml;

    tableHtmlElement.style.visibility = "visible";
    g_bDisplayParamList = true;
}
function GenerateYanChangGanByIndexMockData(index,callback)
{
    if(m_globalYanChangGanSearchJsonResult == null || m_globalYanChangGanSearchJsonResult == undefined)
    {
        return;
    }

    var jsonObj = m_globalYanChangGanSearchJsonResult[index];
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var paramList = jsonObj.ParamList;
    var zuanTouID = paramList[0].Value;
    m_globalSelectedYanChangGanId = zuanTouID;
    var handleLength = jsonObj.ParamList[2].Value;
    //m_globalSelectedZuanTouHandleLength = handleLength;

    //handleLength = 0;
    onClickUpdateCallBack();
    var elem = document.getElementById('myCanvas');
    elem.style.visibility = "hidden";
    clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "./obj/test/" + m_globalSelectedYanChangGanId + ".stl";
    var pdfFile = m_globalSelectedYanChangGanId + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = "./obj/test/" + pdfFile;

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);

}
function GenerateDaoBingByIndexMockData(index,callback)
{
    if(m_globalDaoBinSearchJsonResult == null || m_globalDaoBinSearchJsonResult == undefined)
    {
        return;
    }

    var jsonObj = m_globalDaoBinSearchJsonResult[index];
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var paramList = jsonObj.ParamList;
    var zuanTouID = paramList[0].Value;
    m_globalSelectedDaoBingId = zuanTouID;
    var handleLength = jsonObj.ParamList[2].Value;
    m_globalSelectedZuanTouHandleLength = handleLength;

    //handleLength = 0;
    onClickUpdateCallBack();
    var elem = document.getElementById('myCanvas');
    elem.style.visibility = "hidden";
    clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "./obj/test/" + m_globalSelectedDaoBingId + ".stl";
    var pdfFile = m_globalSelectedDaoBingId + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = "./obj/test/" + pdfFile;

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);
}
function GenerateZuanTouById(id)
{
    var elem = document.getElementById('myCanvas');
    elem.style.visibility = "hidden";
    clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "DailyCheckDir/" + m_globalSelectDate + "/" + id + "/" + id + ".stl";
    var pdfFile = "DailyCheckDir/" + m_globalSelectDate + "/" + id + "/" + id + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = globalServerAddr + pdfFile;

    var i = 0;
    var requestURL = globalServerAddr + modelFileList;

    var loader = new THREE.STLLoader();
    loader.load(requestURL, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);

    //onClickUpdateCallBack();

}
function GenerateZuanTouByIdMockData(id,callBack)
{
    //handleLength = 0;
    onClickUpdateCallBack();
    var elem = document.getElementById('myCanvas');
    elem.style.visibility = "hidden";
    clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "./obj/test/" + id + ".stl";
    var pdfFile = id + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = "./obj/test/" + pdfFile;

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);
}
function GenerateZuanTouByIndexMockData(index,callback)
{
    if(m_globalZuanTouSearchJsonResult == null || m_globalZuanTouSearchJsonResult == undefined)
    {
        return;
    }

    var jsonObj = m_globalZuanTouSearchJsonResult[index];
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var paramList = jsonObj.ParamList;
    var zuanTouID = paramList[0].Value;
    m_globalSelectedZuanTouId = zuanTouID;
    var handleLength = jsonObj.ParamList[2].Value;
    m_globalSelectedZuanTouHandleLength = handleLength;

    //handleLength = 0;
    onClickUpdateCallBack();
    var elem = document.getElementById('myCanvas');
    elem.style.visibility = "hidden";
    clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "./obj/test/" + m_globalSelectedZuanTouId + ".stl";
    var pdfFile = m_globalSelectedZuanTouId + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = "./obj/test/" + pdfFile;

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);

}
function GenerateZuanTouByIndex(index,callback)
{
    if(m_globalZuanTouSearchJsonResult == null || m_globalZuanTouSearchJsonResult == undefined)
    {
        return;
    }

    var jsonObj = m_globalZuanTouSearchJsonResult[index];
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var paramList = jsonObj.ParamList;
    var zuanTouID = paramList[0].Value;
    m_globalSelectedZuanTouId = zuanTouID;
    var handleLength = jsonObj.ParamList[2].Value;
    m_globalSelectedZuanTouHandleLength = handleLength;

    //handleLength = 0;
    onClickUpdateCallBack();
    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?generateZuanTouBySearch=1&zuanTouId=" + zuanTouID,
        //data: zuanTouID,
        success: function (response) {
            callback(response,handleLength);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function onSearchYanChangGanCallBack(strJson)
{
    var jsonObj = eval('(' + strJson + ')');
    m_globalYanChangGanSearchJsonObj = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 300px;top: 200px;overflow:scroll;width: 800px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 60px;\">序号</th>";
    strTableHtml += "<th style=\"width: 60px;\">ID</th>";
    strTableHtml += "<th style=\"width: 60px;\">夹持类型</th>";
    strTableHtml += "<th style=\"width: 60px;\">总长</th>";
    strTableHtml += "<th style=\"width: 60px;\">夹持直径</th>";
    strTableHtml += "<th style=\"width: 60px;\">";
    strTableHtml += "<div class=\"closebutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"HideSearchResultPanel()\">关闭</div>";
    strTableHtml += "</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + (i + 1) + "</td>";
        strTableHtml += "<td>" + paramList[0].Value + "</td>";
        strTableHtml += "<td>" + paramList[1].Value + "</td>";
        strTableHtml += "<td>" + paramList[2].Value + "</td>";
        strTableHtml += "<td>" + paramList[3].Value + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"OnZuZhuangByZuanTouId(" + i + ",onCallBack)\">更新</div>" + "</td>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}
function onSearchDaoBingCallBack(strJson)
{
    var jsonObj = eval('(' + strJson + ')');
    m_globalDaoBinSearchJsonResult = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 300px;top: 200px;overflow:scroll;width: 800px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 60px;\">序号</th>";
    strTableHtml += "<th style=\"width: 60px;\">ID</th>";
    strTableHtml += "<th style=\"width: 60px;\">尾端类型</th>";
    strTableHtml += "<th style=\"width: 60px;\">前段类型</th>";
    strTableHtml += "<th style=\"width: 60px;\">夹持直径</th>";
    strTableHtml += "<th style=\"width: 60px;\">有效长度</th>";
    strTableHtml += "<th style=\"width: 60px;\">";
    strTableHtml += "<div class=\"closebutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"HideSearchResultPanel()\">关闭</div>";
    strTableHtml += "</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + (i + 1) + "</td>";
        strTableHtml += "<td>" + paramList[0].Value + "</td>";
        strTableHtml += "<td>" + paramList[1].Value + "</td>";
        strTableHtml += "<td>" + paramList[2].Value + "</td>";
        strTableHtml += "<td>" + paramList[3].Value + "</td>";
        strTableHtml += "<td>" + paramList[4].Value + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"OnZuZhuangByZuanTouId(" + i + ",onCallBack)\">更新</div>" + "</td>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}
function onSearchZuanTouCallBack(strJson)
{

    var jsonObj = eval('(' + strJson + ')');
    m_globalZuanTouSearchJsonResult = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 300px;top: 200px;overflow:scroll;width: 800px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 60px;\">序号</th>";
    strTableHtml += "<th style=\"width: 60px;\">名称</th>";
    strTableHtml += "<th style=\"width: 60px;\">总长</th>";
    strTableHtml += "<th style=\"width: 60px;\">工作长度</th>";
    strTableHtml += "<th style=\"width: 60px;\">直径</th>";
    strTableHtml += "<th style=\"width: 60px;\">";
    strTableHtml += "<div class=\"closebutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"HideSearchResultPanel()\">关闭</div>";
    strTableHtml += "</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + (i + 1) + "</td>";
        strTableHtml += "<td>" + paramList[1].Value + "</td>";
        strTableHtml += "<td>" + paramList[2].Value + "</td>";
        strTableHtml += "<td>" + paramList[3].Value + "</td>";
        strTableHtml += "<td>" + paramList[4].Value + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateZuanTouByIndex(" + i + ",onCallBack)\">更新</div>" + "</td>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}


function onSearchYanChangGanCallBackMockData(strJson)
{
    var jsonObj = eval('(' + strJson + ')');
    m_globalYanChangGanSearchJsonResult = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 300px;top: 200px;overflow:scroll;width: 800px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 60px;\">序号</th>";
    strTableHtml += "<th style=\"width: 60px;\">ID</th>";
    strTableHtml += "<th style=\"width: 60px;\">夹持类型</th>";
    strTableHtml += "<th style=\"width: 60px;\">总长</th>";
    strTableHtml += "<th style=\"width: 60px;\">夹持直径</th>";
    strTableHtml += "<th style=\"width: 60px;\">";
    strTableHtml += "<div class=\"closebutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"HideSearchResultPanel()\">关闭</div>";
    strTableHtml += "</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + (i + 1) + "</td>";
        strTableHtml += "<td>" + paramList[0].Value + "</td>";
        strTableHtml += "<td>" + paramList[1].Value + "</td>";
        strTableHtml += "<td>" + paramList[2].Value + "</td>";
        strTableHtml += "<td>" + paramList[3].Value + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateYanChangGanByIndexMockData(" + i + ")\">更新</div>" + "</td>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}
function onSearchDaoBingCallBackMockData(strJson)
{
    var jsonObj = eval('(' + strJson + ')');
    m_globalDaoBinSearchJsonResult = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 300px;top: 200px;overflow:scroll;width: 800px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 60px;\">序号</th>";
    strTableHtml += "<th style=\"width: 60px;\">ID</th>";
    strTableHtml += "<th style=\"width: 60px;\">尾端类型</th>";
    strTableHtml += "<th style=\"width: 60px;\">前段类型</th>";
    strTableHtml += "<th style=\"width: 60px;\">夹持直径</th>";
    strTableHtml += "<th style=\"width: 60px;\">有效长度</th>";
    strTableHtml += "<th style=\"width: 60px;\">";
    strTableHtml += "<div class=\"closebutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"HideSearchResultPanel()\">关闭</div>";
    strTableHtml += "</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + (i + 1) + "</td>";
        strTableHtml += "<td>" + paramList[0].Value + "</td>";
        strTableHtml += "<td>" + paramList[1].Value + "</td>";
        strTableHtml += "<td>" + paramList[2].Value + "</td>";
        strTableHtml += "<td>" + paramList[3].Value + "</td>";
        strTableHtml += "<td>" + paramList[4].Value + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateDaoBingByIndexMockData(" + i + ")\">更新</div>" + "</td>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}
function onSearchZuanTouCallBackMockData(strJson)
{
    var jsonObj = eval('(' + strJson + ')');
    m_globalZuanTouSearchJsonResult = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 300px;top: 200px;overflow:scroll;width: 800px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 60px;\">序号</th>";
    strTableHtml += "<th style=\"width: 60px;\">名称</th>";
    strTableHtml += "<th style=\"width: 60px;\">总长</th>";
    strTableHtml += "<th style=\"width: 60px;\">工作长度</th>";
    strTableHtml += "<th style=\"width: 60px;\">直径</th>";
    strTableHtml += "<th style=\"width: 60px;\">";
    strTableHtml += "<div class=\"closebutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"HideSearchResultPanel()\">关闭</div>";
    strTableHtml += "</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + (i + 1) + "</td>";
        strTableHtml += "<td>" + paramList[1].Value + "</td>";
        strTableHtml += "<td>" + paramList[2].Value + "</td>";
        strTableHtml += "<td>" + paramList[3].Value + "</td>";
        strTableHtml += "<td>" + paramList[4].Value + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 14px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateZuanTouByIndexMockData(" + i + ")\">更新</div>" + "</td>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}
function DisplayTuZhi()
{
    var htmlElement = null;

    htmlElement = document.getElementById("gameCanvas");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "hidden";
    }

    htmlElement = document.getElementById("divPdfView");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }

    htmlElement = document.getElementById("toolBox3D");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }
/*
    htmlElement = document.getElementById("toolBoxTuZhi");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }
    */

    htmlElement = document.getElementById("divParamList");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "hidden";
    }

    htmlElement = document.getElementById("techRequest");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "hidden";
    }
}
function UpdateTuZhiByComboBox()
{
    var htmlElement = null;

    htmlElement = document.getElementById("ErWeiComboBox");
    if(htmlElement == null)
    {
        return;
    }

    //刀具，刀柄，延长杆，装配
    if(htmlElement.value == "0")
    {
        GenerateZuanTouByIndexMockData(0);
    }
    else if(htmlElement.value == "1")
    {
        GenerateDaoBingByIndexMockData(0);
    }
    else if(htmlElement.value == "2")
    {
        GenerateYanChangGanByIndexMockData(0);
    }
    else if(htmlElement.value == "3")
    {
        GenerateZuanTouByIdMockData("TESTZP001");
    }

    DisplayTuZhi();
}
function Update3DModelByComboBox()
{
    var htmlElement = null;

    htmlElement = document.getElementById("SanWeiComboBox");
    if(htmlElement == null)
    {
        return;
    }

    //刀具，刀柄，延长杆，装配
    if(htmlElement.value == "0")
    {
        GenerateZuanTouByIndexMockData(0);
    }
    else if(htmlElement.value == "1")
    {
        GenerateDaoBingByIndexMockData(0);
    }
    else if(htmlElement.value == "2")
    {
        GenerateYanChangGanByIndexMockData(0);
    }
    else if(htmlElement.value == "3")
    {
        GenerateZuanTouByIdMockData("TESTZP001");
    }

    Update3DModelUI();
}

function Update3DModelUI()
{
    var htmlElement = null;

    htmlElement = document.getElementById("gameCanvas");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }

    htmlElement = document.getElementById("divPdfView");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "hidden";
    }

    htmlElement = document.getElementById("toolBox3D");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }

    htmlElement = document.getElementById("toolBoxTuZhi");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "hidden";
    }

    htmlElement = document.getElementById("divParamList");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }

    htmlElement = document.getElementById("techRequest");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }
}
function Display3DModel()
{
    var htmlElement = null;

    htmlElement = document.getElementById("gameCanvas");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }

    htmlElement = document.getElementById("divPdfView");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "hidden";
    }

    htmlElement = document.getElementById("toolBox3D");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }

    htmlElement = document.getElementById("toolBoxTuZhi");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "hidden";
    }

    htmlElement = document.getElementById("divParamList");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }

    htmlElement = document.getElementById("techRequest");
    if(htmlElement != null && htmlElement != undefined)
    {
        htmlElement.style.visibility = "visible";
    }
}
function RecoverAllCheckDailyRowBackGroundColor()
{
    if(m_globalDailyCheckAllFiles == null || m_globalDailyCheckAllFiles == undefined)
    {
        return;
    }

    for(var i = 0; i < m_globalDailyCheckAllFiles.length; i++)
    {
        var trHtml = document.getElementById(m_globalDailyCheckAllFiles[i] + "_tr");
        if(trHtml == null || trHtml == undefined)
        {
            continue;
        }

        trHtml.style.backgroundColor = "#66CCFF";
    }
}
function HideSearchTable()
{
    var searchTableHtml = document.getElementById("SearchTable");

    if(searchTableHtml == null || searchTableHtml == undefined)
    {
        return;
    }

    searchTableHtml.style.visibility = "hidden";
}
function DisplayDailyCheck3DModel(strFileName)
{
    GenerateZuanTouById(strFileName);

    Display3DModel();

    RecoverAllCheckDailyRowBackGroundColor();

    var trHtml = document.getElementById(strFileName + "_tr");
    if(trHtml == null || trHtml == undefined)
    {
        return;
    }

    trHtml.style.backgroundColor = "#aaaaff"
}
function DisplayDailyCheckTuZhi(strFileName)
{
    GenerateZuanTouById(strFileName);

    DisplayTuZhi();

    RecoverAllCheckDailyRowBackGroundColor();

    var trHtml = document.getElementById(strFileName + "_tr");
    if(trHtml == null || trHtml == undefined)
    {
        return;
    }

    trHtml.style.backgroundColor = "#aaaaff"
}
function DeleteDailyCheckFile(strFileName)
{
    /*
    {
        "Date":"2018315",
        "DirName":"123"
    }
     */
    var jsonObj = {};
    jsonObj.Date = m_globalLastSelectDailyCheckDate;
    jsonObj.DirName = strFileName;

    m_globalLastSelectDailyCheckID = strFileName;

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?deleteDailyCheckModel=1",
        data: JSON.stringify(jsonObj),
        success: function (response) {
            DeleteDailyCheckFileCallBack(response);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function DeleteDailyCheckFileCallBack(response)
{
    var jsonObj = JSON.parse(response);
    if(jsonObj.Result == 1)
    {
        //成功
        if(m_globalLastSelectDailyCheckID == null || m_globalLastSelectDailyCheckID == undefined)
        {
            return;
        }

        var btnModel = document.getElementById(m_globalLastSelectDailyCheckID + "_model");
        if(btnModel != null && btnModel != undefined)
        {
            btnModel.style.backgroundColor = "#ee0000";
        }

        var btnPdf = document.getElementById(m_globalLastSelectDailyCheckID + "_pdf");
        if(btnPdf != null && btnPdf != undefined)
        {
            btnPdf.style.backgroundColor = "#ee0000";
        }

        var btnDelete = document.getElementById(m_globalLastSelectDailyCheckID + "_delete");
        if(btnDelete != null && btnDelete != undefined)
        {
            btnDelete.style.backgroundColor = "#ee0000";
        }
    }
    else
    {
        //失败
    }
}
function OnClickDisplayZuoBiaoZhou()
{
    menuObj["显示坐标轴"] = !menuObj["显示坐标轴"];
}
function OnClickDisplayXYPlane()
{
    menuObj["显示xy平面"] = !menuObj["显示xy平面"];
}
function OnClickDisplayYZPlane()
{
    menuObj["显示yz平面"] = !menuObj["显示yz平面"];
}
function OnClickDisplayXZPlane()
{
    menuObj["显示xz平面"] = !menuObj["显示xz平面"];
}
function onClickUpdateModel(geometry,handleLength,yRotate)
{
    var material = null;
    if (geometry.hasColors)
    {
        material = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
    }
    else
    {
        material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specular: 0x111111, shininess: 0 } );
    }

    var mesh = new THREE.Mesh( geometry, material );

    mesh.position.set(handleLength, 0, 0);

    if(yRotate != undefined)
    {
        mesh.rotation.set( 0, yRotate, 0 );
    }
    else
    {
        mesh.rotation.set( 0, Math.PI * 0.5, 0 );
    }

    mesh.scale.set( 1,1,1 );

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    //object.position.y = - 95;
    scene.add( mesh );
    modelArray.push(mesh);

    modelNode = mesh;
}

function OnLoadDaoJuQingDanMockData(strJson)
{
    var jsonObj = JSON.parse(strJson);

    m_globalDaoJuQingDanSearchJsonResult = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<div class=\"closebutton\" style=\"position:absolute;left:6px;top:2px;z-index: 50;width:30px;\"onclick=\"HideSearchTable()\">关闭</div>";
    strTableHtml += "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 0px;top: 0px;margin:0px;padding:0px;overflow-y:auto;width: 400px;max-height:600px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 160px;\">清单列表</th>";
    strTableHtml += "<th style=\"width: 100px;\">显示三维</th>";
    strTableHtml += "<th style=\"width: 100px;\">显示图纸</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + jsonObj[i].Name + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 24px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateDaoJuQingDan3dModelByIndexMockData(" + i + ")\">更新</div>" + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 24px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateDaoJuQingDanTuZhiByIndexMockData(" + i + ")\">更新</div>" + "</td>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}
function OnClickJiaGongJiePai_NobelTech()
{
    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
    var strFangAnConfig = "./mockData/jiaGongJiePaiSearchResult_" + (fangAnIndex + 1) + ".json";

    var scope = this;
    var mockDataLoader = new THREE.FileLoader( scope.manager );
    mockDataLoader.load( strFangAnConfig, function ( text ) {
        OnLoadJiaGongJiePaiMockData(text);
    });
}
function OnClickDaoJuQingDan_NobelTech()
{
    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
    var strFangAnConfig = "./mockData/daoJuQingDanSearchResult_" + (fangAnIndex + 1) + ".json";

    var scope = this;
    var mockDataLoader = new THREE.FileLoader( scope.manager );
    mockDataLoader.load( strFangAnConfig, function ( text ) {
        OnLoadDaoJuQingDanMockData(text);
    });
}
function DisplayDaoJuQingDan3dModel()
{
    var modelComboBoxHtml = document.getElementById("");
    if(modelComboBoxHtml == null || modelComboBoxHtml == undefined)
    {
        return;
    }


}
function DisplayDaoJuQingDanTuZhi()
{

}
function OnClickUpdate3dModel_NobelTech()
{
    var modelComboBoxHtml = document.getElementById("Update3dModelComboBox");
    if(modelComboBoxHtml == null || modelComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
    var strFangAn = String.fromCharCode("A".charCodeAt() + fangAnIndex);

    if(modelComboBoxHtml.value == "0")
    {
        //零件
        LoadLingJianByNameMockData("prt");
    }
    else if(modelComboBoxHtml.value == "1")
    {
        //显示工步
        var fullPath = "./obj/nobeltech-tiyan/" + strFangAn + "/step/prt_tec.stl";
        Load3dModelByFullPathMockData(fullPath);
    }

    Display3DModel();
}
function OnClickUpdate3dModelByComboBoxValue_NobelTech(comboBoxValue)
{
    var modelComboBoxHtml = document.getElementById("Update3dModelComboBox");
    if(modelComboBoxHtml == null || modelComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
    var strFangAn = String.fromCharCode("A".charCodeAt() + fangAnIndex);

    if(comboBoxValue == 0)
    {
        //零件
        LoadLingJianByNameMockData("prt");
    }
    else if(comboBoxValue == 1)
    {
        //显示工步
        var fullPath = "./obj/nobeltech-tiyan/" + strFangAn + "/step/prt_tec.stl";
        Load3dModelByFullPathMockData(fullPath);
    }

    Display3DModel();
}
function GenerateJiaGongJiePaiTuZhiByIndexMockData(index)
{
    GenerateJiaGongJiePai3dModelByIndexMockData(index);

    DisplayTuZhi();
}
function GenerateJiaGongJiePai3dModelByIndexMockData(index)
{
    if(m_globalJiaGongJiePaiSearchJsonResult == null || m_globalJiaGongJiePaiSearchJsonResult == undefined)
    {
        return;
    }

    var jsonObj = m_globalJiaGongJiePaiSearchJsonResult[index];

    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
    var strFangAn = String.fromCharCode("A".charCodeAt() + fangAnIndex);

    var fullPath = "./obj/nobeltech-tiyan/" + strFangAn + "/jiagongshiyi/step_asm_" + (index + 1) + "/step_asm_" + (index + 1) + ".stl";
    Load3dModelByFullPathMockData(fullPath);

    //obj\nobeltech-tiyan\A\jiagongshiyi\step_asm_1
    var strPdfPath = "./obj/nobeltech-tiyan/" + strFangAn + "/jiagongshiyi/step_asm_" + (index + 1) + "/step_asm_" + (index + 1) + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = strPdfPath;

    Display3DModel();
    //DisplayTuZhi();
}
function GenerateDaoJuQingDan3dModelByIndexMockData(index)
{
    if(m_globalDaoJuQingDanSearchJsonResult == null || m_globalDaoJuQingDanSearchJsonResult == undefined)
    {
        return;
    }

    var jsonObj = m_globalDaoJuQingDanSearchJsonResult[index];

    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
    var strFangAn = String.fromCharCode("A".charCodeAt() + fangAnIndex);

    //obj\nobeltech-tiyan\A\jiagongshiyi\step_asm_1
    var strModelPath = "./obj/nobeltech-tiyan/" + strFangAn + "/tool/tool_" + (index + 1) + "/tool_" + (index + 1) + ".stl";
    var strPdf = "./obj/nobeltech-tiyan/" + strFangAn + "/tool/tool_" + (index + 1) + "/tool_" + (index + 1) + ".pdf";

    Load3dModelByFullPathMockData(strModelPath);


    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = strPdf;

    Display3DModel();
}
function GenerateDaoJuQingDanTuZhiByIndexMockData(index)
{
    GenerateDaoJuQingDan3dModelByIndexMockData(index);

    DisplayTuZhi();
}
function OnLoadJiaGongJiePaiMockData(strJson)
{
    var jsonObj = JSON.parse(strJson);

    m_globalJiaGongJiePaiSearchJsonResult = jsonObj;
    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<div class=\"closebutton\" style=\"position:absolute;left:6px;top:2px;z-index: 50;width:30px;\"onclick=\"HideSearchTable()\">关闭</div>";
    strTableHtml += "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 0px;top: 0px;margin:0px;padding:0px;overflow-y:auto;width: 400px;max-height:600px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 160px;\">清单列表</th>";
    strTableHtml += "<th style=\"width: 100px;\">显示三维</th>";
    strTableHtml += "<th style=\"width: 100px;\">显示图纸</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + jsonObj[i].Name + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 24px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateJiaGongJiePai3dModelByIndexMockData(" + i + ")\">更新</div>" + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 24px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateJiaGongJiePaiTuZhiByIndexMockData(" + i + ")\">更新</div>" + "</td>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";

}
function OnClickUpdateTuZhi_NobelTech(name,callBack)
{

    var modelComboBoxHtml = document.getElementById("UpdateTuZhiComboBox");
    if(modelComboBoxHtml == null || modelComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
    var strFangAn = String.fromCharCode("A".charCodeAt() + fangAnIndex);

    if(modelComboBoxHtml.value == "0")
    {
        //零件
        LoadLingJianByNameMockData("prt");
    }
    else if(modelComboBoxHtml.value == "1")
    {
        //显示工步
        var fullPath = "./obj/nobeltech-tiyan/" + strFangAn + "/step/prt_tec.stl";
        Load3dModelByFullPathMockData(fullPath);
    }

    DisplayTuZhi();

}
function Load3dModelByFullPathMockData(fullPath,callBack)
{
    //handleLength = 0;
    onClickUpdateCallBack();
    var elem = document.getElementById('myCanvas');
    elem.style.visibility = "hidden";
    clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "" + fullPath;
    var pdfFile = "." + fullPath.split(".")[1] + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = pdfFile;

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);
}
function LoadLingJianByNameMockData(name,callBack)
{
    //handleLength = 0;
    onClickUpdateCallBack();
    var elem = document.getElementById('myCanvas');
    elem.style.visibility = "hidden";
    clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "./obj/nobeltech-tiyan/prt/" + name + ".stl";
    var pdfFile = "" + name + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = "./obj/nobeltech-tiyan/prt/" + pdfFile;

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);
}
function AddDragEventToSearchTable()
{
    var searchListHtml = document.getElementById("SearchTable");
    if(searchListHtml == null || searchListHtml == undefined)
    {
        return;
    }

    var offsetX = 0;
    var offsetY = 0;

    searchListHtml.ondragstart=function(e){
        var dt = e.dataTransfer;
        dt.effectAllowed = 'none';

        console.log('事件源p3开始拖动');
        //记录刚一拖动时，鼠标在飞机上的偏移量
        offsetX= e.offsetX;
        offsetY= e.offsetY;
    }
    searchListHtml.ondrag=function(e){
        e.preventDefault();

        //return;
        console.log('事件源p3拖动中');
        var x= e.pageX;
        var y= e.pageY;
        console.log(x + '-' + y);
        //drag事件最后一刻，无法读取鼠标的坐标，pageX和pageY都变为0
        if(x == 0 && y == 0){
            return; //不处理拖动最后一刻X和Y都为0的情形
        }
        x -= offsetX;
        y -= offsetY + 82;

        searchListHtml.style.left = x + 'px';
        searchListHtml.style.top = y + 'px';
    }
    searchListHtml.ondragend = function(){
        //e.preventDefault();
        console.log('源对象p3拖动结束');
    }
}
function OnClickLingJianCharacteristic_NobelTech(index)
{
    var htmlObj = document.getElementById("KuContainer");
    if(htmlObj == null || htmlObj == undefined)
    {
        return;//；
    }

    var strHtml = "";
    for(var i = 0; i < m_globalKuContainer.length; i++)
    {
        if(m_globalKuContainer[i].m_type == index)
        {
            strHtml += m_globalKuContainer[i].GenerateHtmlStr();
        }
    }

    htmlObj.innerHTML = strHtml;

}
function OnClickParamList()
{
    var htmlElement = document.getElementById("divParamList");
    if(htmlElement == null || htmlElement == undefined)
    {
        return;
    }

    g_bDisplayParamList = !g_bDisplayParamList;

    if(g_bDisplayParamList == true)
    {
        htmlElement.style.visibility = "visible";
    }
    else
    {
        htmlElement.style.visibility = "hidden";
    }
}
function OnClickTechRequest()
{
    var htmlElement = document.getElementById("techRequest");
    if(htmlElement == null || htmlElement == undefined)
    {
        return;
    }

    g_bDisplayTechRequest = !g_bDisplayTechRequest;

    if(g_bDisplayTechRequest == true)
    {
        htmlElement.style.visibility = "visible";
    }
    else
    {
        htmlElement.style.visibility = "hidden";
    }
}
function OnClickTreeDir_NobelTech()
{

}
function OnClickPurgeTreeDir_NobelTech()
{

}
//function