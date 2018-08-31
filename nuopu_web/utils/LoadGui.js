/**
 * Created by ZhengLi on 2017/11/14.
 */
var daoju = null;
var m_Search = {};
var m_searchArray = {};
var m_OnSearch = {};
var srcdiv = null;
var wenJianDaoPianObj = [];
var zhuangPeiDaoPianObj = [];
var wenJianDaoBingObj = [];
var zhuangPeiDaoBingObj = [];
var wenJianMoKuaiHuaTangDaoObj = [];
var zhuangPeiMoKuaiHuaTangDaoObj = [];
var g_paramMap = {};
var g_paramArray = new Array();
var baoJiaXinXi = {};
var qieXiaoCanShu = {};
var m_BaoJiaSearchGui = null;
var m_BaoJiaSearchJsonObj = null;
var g_daoJuIniString = null;
var m_searchinilist;
var searchName;
var Name;
var ListName;
var zhuangPeiArray = [];
var g_comboBoxObjArray = new Array();
var g_resultJsonObj = {};
function GenerateUUID()
{
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}
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

                        if(typeof(paramObj.Choise) == "string")
                        {
                            var strArray = paramObj.Choise.split(",");
                            if (paramObj.String == "ZiFu") {
                                result += (paramObj.iniName + "=\"" + strArray[paramObj.Value] + "\"\r\n");
                            } else
                            {
                                result += (paramObj.iniName + "=" + strArray[paramObj.Value] + "\r\n");
                            }
                        }
                        else
                        {
                            if (paramObj.String == "ZiFu") {
                                result += paramObj.iniName + "=\"" + paramObj.Choise[paramObj.Value].Name + "\"\r\n";
                            } else
                            {
                                result += paramObj.iniName + "=" + paramObj.Choise[paramObj.Value].Name + "\r\n";
                            }

                            var choiseArray = new Array();
                            choiseArray.push(paramObj.Choise[paramObj.Value]);
                            result += GetIniStringByJsonObj(choiseArray);

                             //result += GetIniStringByJsonObj(paramObj.Choise);
                           // result += (paramObj.iniName + "=" + paramObj.Choise[paramObj.Value].Name + "\r\n");
                        }

                       // result += GetIniStringByJsonObj(choiseArray);
                    }
                    continue;
                }

                if(paramObj.iniName != null && paramObj.iniName != undefined && paramObj.iniName != "")
                {
                    if(paramObj.iniType == "string" || paramObj.iniType == "String" || paramObj.iniType == "Float")
                    {
                        paramObj.Value = paramObj[paramObj.Name];
                        result += (paramObj.iniName + "=" + paramObj.Value + "\r\n");
                    }
                    else
                    {
                        paramObj.Value = parseFloat(paramObj[paramObj.Name]);
                        result += (paramObj.iniName + "=" + paramObj.Value + "\r\n");
                    }
                }
            }
        }
    }

    return result;
}
function GetIniStringByJsonObjs(jsonObj)
{
    var result = "";
    result += "tech_txt1=技术要求:"+"\r\n";
    var i;
    for(i = 0; i < jsonObj.length; i++)
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

                        if(typeof(paramObj.Choise) == "string")
                        {
                            var strArray = paramObj.Choise.split(",");
                            result += (paramObj.iniName + "=" + strArray[paramObj.Value] + "\r\n");
                        }
                        else
                        {
                            result += (paramObj.iniName + "=" + paramObj.Choise[paramObj.Value].Name + "\r\n");
                        }

                        result += GetIniStringByJsonObj(choiseArray);
                    }
                    continue;
                }

                if(paramObj.iniName != null && paramObj.iniName != undefined && paramObj.iniName != "")
                {
                    if(paramObj.iniType == "string")
                    {
                        paramObj.Value = paramObj[paramObj.Name];
                        result += ("tech_txt" + (j+2) + "=" + (j+1) + "、" + paramObj.iniName + ":" + paramObj.Value + "\r\n");
                    }
                    else
                    {
                        paramObj.Value = parseFloat(paramObj[paramObj.Name]);
                        result += (paramObj.iniName + "=" + paramObj.Value + "\r\n");
                    }
                }
            }
        }
    }

    return result;
}
function GetIniStringByJsonObjes(jsonObj)
{
    var result = "";

        var singleJsonObj = jsonObj;


        if(singleJsonObj != null && singleJsonObj != undefined)
        {
            for(var i = 0; i < singleJsonObj.length; i++)
            {
                var paramObj = singleJsonObj[i];
                if(paramObj == null || paramObj == undefined)
                {
                    continue;
                }

                if(paramObj.Name != null && paramObj.Name != undefined && paramObj.Name != "")
                {
                    result += (paramObj.Name + "=" + paramObj.Value + "\r\n");
                }
            }
        }


    return result;
}
function IniToJsonObj(strIni)
{
    var jsonObj = {};

    var paramArray = strIni.split("\r\n");
    for(var i = 0; i < paramArray.length; i++)
    {
        var iniParamArray = paramArray[i].split("=");
        if(iniParamArray.length == 2)
        {
            jsonObj[iniParamArray[0]] = iniParamArray[1];
        }
    }

    return jsonObj;
}
function JsonToIni(obj)
{
    var result;

    result = "[file]" + "\r\n";

    result += GetIniStringByJsonObj(obj.Tab);

    return result;
}
function JsonToIni2(obj)
{
    var result;

    result = "[tech_txt]" + "\r\n";

    result += GetIniStringByJsonObjs(obj.Tab);

    return result;
}
function JsonToIni3(obj,daoSearch)
{
    var result;

    result = "[" + daoSearch + "]" + "\r\n";

    result += GetIniStringByJsonObjes(obj);

    return result;
}
function JsonToIni4(obj,daoju)
{
    var result;

    result = "[" + daoju + "]" + "\r\n";

    result += GetIniStringByJsonObj(obj.Tab);

    return result;
}
function JsonToIni5(obj)
    {
        var result;

        result = "";

        result += GetIniStringByJsonObjes(obj);

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
        var serverGenerateID = param.ServerGenerateID;

        if(param[paramName] != null && param[paramName] != undefined)
        {
            defaultValue = param[paramName];
        }

        if(serverGenerateID == 1)
        {
            defaultValue = g_serverGenerateID;
        }

        if (paramType == "EditBox") {
            param[paramName] = defaultValue;
            
            var bFind = false;
            var index = 0;
            for(var k = 0; k < guiRoot.__controllers.length; k++)
            {
                if(guiRoot.__controllers[k].property == paramName)
                {
                    bFind = true;
                    index = k;
                    break;
                }
            }

            if(bFind == false)
            {
                var ctrl = guiRoot.add(param, paramName).listen();

                if(param.OnChange)
                {
                    ctrl.OnChange = param.OnChange;
                    ctrl.ParamObj = param;
                    var uuid = GenerateUUID();
                    ;
                   // g_paramMap[uuid] = param;
                    //var nameUuid = GenerateUUID();
                    //g_paramMap[nameUuid] = paramName;
                    ctrl.onChange(function(value){
                        eval(this.OnChange + "(" + value + ")");
                    });
                }

                g_paramArray.push(param)

               // if(param.OnChange)
              //  {
                   // ctrl.onChange(function(value){

               //     });
            //    }
            }
            else
            {
            }

            //sectionMenuObj[paramName] = defaultValue;
            //guiSection.add(sectionMenuObj, paramName);
        }
        else if (paramType == "ComboBox")
        {
            param[paramName] = parseInt(defaultValue);
            var str = param.Choise;

            if(typeof(str) == "string") {
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
                var k = 0;
                for(k = 0; k < guiRoot.__controllers.length; k++)
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

                for(k = k + 1; k < guiRoot.__controllers.length; k++)
                {
                    guiRoot.remove(guiRoot.__controllers[k]);
                    k--;
                }
                UpdateGUIByJsonObj(guiRoot,choiseObj,onComboBoxChangedCallBack);
            }
        }
        else if (paramType == "CheckBox")
        {
            /*
            parameters = {
                a: false,
                b: false,
                c: false
            }

            var first = gui.addFolder("Plastic");
            var pos1 = first.add(parameters, 'a').name('Possitive Charge').listen().onChange(function(){setChecked("a")});
            var neg1 = first.add(parameters, 'b').name('Negative Charge').listen().onChange(function(){setChecked("b")});
            var neu1 = first.add(parameters, 'c').name('Neutral').listen().onChange(function(){setChecked("c")});

            function setChecked( prop ){
                for (let param in parameters){
                    parameters[param] = false;
                }
                parameters[prop] = true;
            }
            */
            var str = param.Choise;
            if(typeof(str) == "string")
            {
                var selections = {} //定义一数组
                var strArray = str.split(","); //字符分割

                for(var k = 0; k < strArray.length; k++)
                {
                    selections[strArray[k]] = false;
                }
            }

            function SetCheck(strIndex)
            {
              //  var bCheck = selections[strIndex];
              //  var bCheck2 = !bCheck;
                //selections[strIndex] = bCheck2;
            }

            if(strArray.length >= 1)
            {
                guiRoot.add(selections, strArray[0]).name(strArray[0]).listen().onChange(function(aaa,bbb) {
                    SetCheck(strArray[0]);
                });
            }
            if(strArray.length >= 2)
            {
                guiRoot.add(selections, strArray[1]).name(strArray[1]).listen().onChange(function(aaa,bbb) {
                    SetCheck(strArray[1]);
                });
            }
            if(strArray.length >= 3)
            {
                guiRoot.add(selections, strArray[2]).name(strArray[2]).listen().onChange(function(aaa,bbb) {
                    SetCheck(strArray[2]);
                });
            }
        }
        else if(paramType == "GenerateServerID")
        {
            var bFind = false;
            var k = 0;
            for(k = 0; k < guiRoot.__controllers.length; k++)
            {
                if(guiRoot.__controllers[k].property == paramName)
                {
                    bFind = true;
                    break;
                }
            }

            if(bFind == false)
            {
                param[paramName] = RequestServerGenerateID;
                guiRoot.add(param, paramName);
            }

            if(g_isCreatingNewModel)
            {
                //
            }
            if(g_isModifyingModel)
            {

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

    var strVisibility = gui.domElement.style.visibility;

    gui.domElement.style = 'position:absolute;left:235px;top:200px;background-color:#ffffff;width:245px;';
    gui.domElement.id = 'MenuParamDesign';
    gui.OnClickClosePanel = GlobalOnClickClosePanel;
    gui.domElement.style.visibility = strVisibility;

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
function LoadLeftPanelUIConfigs(configFileURL,OnDesign)
{
    var scope = this;

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var obj = JSON.parse(text);
        UpdateLeftPanelByJson(obj);
        daoju = obj.Title3;
        OnDesign();
    });
}
function OnDesign() {
    var design = document.getElementById("design");
    var zhuangpei = document.getElementById("ZhuangPei");
    design.style.backgroundColor = "gray";
    zhuangpei.style.backgroundColor = "gray";
    design.onclick = zhuangpei.onclick = function () {alert("请填写技术条件");};
}
function LoadLeftPanelUIConfig(configFileURL,Table)
{
    var scope = this;

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var obj = JSON.parse(text);
        UpdateLeftPanelByJson(obj);
        daoju = obj.Title3;
    });
}
function LoadLeftPanelUIConfiges(configFileURL)
{
    var scope = this;

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var obj = JSON.parse(text);
        UpdateLeftPanelByJson(obj);
        daoju = obj.Title3;
    });
}
function Table(daoju,jsonObj) {
    var sanWeiTu = document.getElementById("SanWeiComboBox");
    var erWeiTu = document.getElementById("ErComboBox");
    if (g_comboBoxObjArray.length == 0)
    {
        sanWeiTu.innerHTML = "";
        erWeiTu.innerHTML = "";
    }

    var sanWeiLength = sanWeiTu.children.length;
    var erWeiLength = erWeiTu.children.length;

    var bFound = false;

    for(var i = 0;i < g_comboBoxObjArray.length && jsonObj != undefined && jsonObj != null; i++)
    {
        if(g_comboBoxObjArray[i].ModelFileList == jsonObj.ModelFileList)
        {
            bFound = true;
            break;
        }
    }

    if(bFound == false)
    {

            sanWeiTu.innerHTML += "<option value=\"'" + (sanWeiLength) + "'\">" + daoju + "</option>";
            erWeiTu.innerHTML += "<option value=\"'" + (erWeiLength) + "'\">" + daoju + "</option>";
        if (jsonObj.ModelFileAdditionList != undefined && jsonObj.PdfAdditionList != undefined) {
            if (jsonObj.ModelFileAdditionList.length > 0 && jsonObj.PdfAdditionList.length > 0) {
                sanWeiTu.innerHTML += "<option value=\"'" + (sanWeiLength) + "'\">" + daoju + 1 + "</option>";
                erWeiTu.innerHTML += "<option value=\"'" + (erWeiLength) + "'\">" + daoju + 1 + "</option>";
            }
        }

        if(jsonObj != null && jsonObj != undefined)
        {
            if (jsonObj.ModelFileAdditionList != undefined && jsonObj.PdfAdditionList != undefined)
            {
                if (jsonObj.ModelFileAdditionList.length > 0)
                {
                    g_comboBoxObjArray.push(jsonObj);
                }
            }
            else
            {
                g_comboBoxObjArray.push(jsonObj);
            }


        }
    }



}
function Tables() {
    var tables = [];
    var daoBing = wenJianDaoBingObj;
    var daoPian = wenJianDaoPianObj;
    var moKuaiHuaTangDao = wenJianMoKuaiHuaTangDaoObj;
    var selectArray = [];
    if(daoBing.length > 0)
    {
        for (var i = 0; i < daoBing.length; i++) {
            selectArray.push(daoBing[i]);
        }
    }
    if(daoPian.length > 0)
    {
        for (var i = 0; i < daoPian.length; i++) {
            selectArray.push(daoPian[i]);
        }
    }
    if(moKuaiHuaTangDao.length > 0)
    {
        for (var i = 0; i < moKuaiHuaTangDao.length; i++) {
            selectArray.push(moKuaiHuaTangDao[i]);
        }
    }
    var sheJiList = document.getElementById("LingJianDesign").children;

    for (var i = 1; i < sheJiList.length; i++) {
        for (var j = 0; j < selectArray.length; j++) {
            if (selectArray[j].ID == sheJiList[i].id) {
                var tool_type = null;
                var fn = null;
                for (var k = 0; k < selectArray[j].List.length; k++) {

                    if (selectArray[j].List[k].Name == "tool_type") {
                        tool_type = selectArray[j].List[k].Value;
                    }
                    if (selectArray[j].List[k].Name == "FN") {
                        fn = selectArray[j].List[k].Value;
                    }
                }
                tables.push({"Name":tool_type,"FN":fn});
            }
        }
    }
    var sanWeiTu = document.getElementById("SanWeiComboBox");
    var erWeiTu = document.getElementById("ErComboBox");

    if (g_daoJuIniString == "" || g_daoJuIniString == null || g_daoJuIniString == undefined)
    {}
    else
    {
        if (tables.length > 0)
        {
            var sanWeiTuHtml = "<option value=\"'" + g_daoJuIniString.Tab[0].ParamList[3].Value + "'\">" + g_daoJuIniString.Tab[0].ParamList[0].Choise + "</option>";
            var erWeiTuHtml = "<option value=\"'" + g_daoJuIniString.Tab[0].ParamList[3].Value + "'\">" + g_daoJuIniString.Tab[0].ParamList[0].Choise + "</option>";
        } else
        {
            var sanWeiTuHtml = "<option value=\"'0'\">无</option>";
            var erWeiTuHtml = "<option value=\"'0'\">无</option>";
        }
        g_comboBoxObjArray.push({"ModelFileList":g_daoJuIniString.Tab[0].ParamList[3].Value + ".stl","PdfList":g_daoJuIniString.Tab[0].ParamList[3].Value + ".pdf"});

    }

    for (var k = 0; k < tables.length; k++)
    {
        sanWeiTuHtml += "<option value=\"'" + tables[k].FN + "'\">" + tables[k].Name + "</option>";
        erWeiTuHtml += "<option value=\"'" + tables[k].FN + "'\">" + tables[k].Name + "</option>";

        var stlUrl = tables[k].FN + ".stl";
        var pdfUrl = tables[k].FN + ".pdf";

        var jsonObj = {};
        jsonObj.ModelFileList = stlUrl;
        jsonObj.PdfList = pdfUrl;

        g_comboBoxObjArray.push(jsonObj);

    }
    if (g_comboBoxObjArray.length == 0)
    {
        sanWeiTuHtml += "<option value=\"wu\">无</option>";
        erWeiTuHtml += "<option value=\"wu\">无</option>";
    }
    sanWeiTu.innerHTML = sanWeiTuHtml;

    erWeiTu.innerHTML = erWeiTuHtml;

}
function LoadZuanTouSearchGUI(configFileURL,menuObj,onSearchZuanTouCallBacks)
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
            guiTable.closed = false;
            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;



            var tiaoJianList = [];
            var tiaoJianSearch = [];
            var sql = "";
            var ulList = document.getElementById("MenuParamDesign_zuanTouSearch");
            var selectArray = $(ulList).find("select");
            if (selectArray.length > 0)
            {
                for (var i = 0; i < selectArray.length; i++)
                {
                    var optionsName = selectArray[i].id;
                    var optionsValue = selectArray[i].options[selectArray[i].selectedIndex].text;
                    if (optionsValue != "所有" && optionsName != "tool_type" && optionsName != "" && optionsName != null && optionsName != undefined && optionsName != "QianDuan")
                    {
                        tiaoJianList.push({"ini":optionsName,"value":"'" + optionsValue + "'"});
                    }
                }
            }
            var inputArray = $(ulList).find("input");
            if (inputArray.length > 0)
            {
                for (var i = 0; i < inputArray.length; i++)
                {
                    var inputName = inputArray[i].id;
                    var inputValue = inputArray[i].value;
                    inputValue = inputValue.trim();
                    if (inputValue != null && inputValue != undefined && inputValue != "")
                    {
                        tiaoJianList.push({"ini":inputName,"value":inputValue});
                    }

                }
            }
            for (var j = 0; j < tiaoJianList.length; j++)
            {
                var ini = tiaoJianList[j].ini;
                if (ini.slice(-4) == "_min")
                {
                    sql += "AND " + ini.substring(0,ini.length-4) + " > " + tiaoJianList[j].value + " ";
                } else if (ini.slice(-4) == "_max")
                {
                    sql += "AND " + ini.substring(0,ini.length-4) + " < " + tiaoJianList[j].value + " ";
                } else
                {
                    sql += "AND " + ini + " = " + tiaoJianList[j].value + " ";
                }

            }
            sql = "AND No = 0 AND Dc > 0 AND Dc < 9999 AND l4 > 0 AND l4 < 9999 AND dm > 0 AND dm < 9999 AND l2 > 0 AND l2 < 9999";
            tiaoJianSearch.push({"TableName":daoju,"sql":sql});

            var strJson = JSON.stringify(tiaoJianSearch);

            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?querySearch=1",
                data: strJson,
                success: function (response) {
                    onSearchZuanTouCallBacks(response);
                },
                error: function (errs) {

                    alert(errs.responseText);

                }
            });
        }

        gui.add(menuObj, '搜索');

        gui.domElement.style = 'position:absolute;top:200px;left:235px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_zuanTouSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        var m_globalHandleSearchGui = gui;
        var m_globalHandleSearchJsonObj = obj;
    });
}

function LoadBaoJiaGUI(configFileURL,menuObj)
{
    var scope = this;
    var gui = null;

    menuObj = {};

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var obj = JSON.parse(text);

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




        }

        gui.add(menuObj, '确定');


        gui.domElement.style = 'position:absolute;top:192px;left:1465px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_BaoJia';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_BaoJiaSearchGui = gui;
        m_BaoJiaSearchJsonObj = obj;
    });
}
function LoadQieXiaoGUI(configFileURL,menuObj)
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

        menuObj["确定"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;




        }

        gui.add(menuObj, '确定');


        gui.domElement.style = 'position:absolute;top:192px;left:1465px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_QieXiao';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_BaoJiaSearchGui = gui;
        m_BaoJiaSearchJsonObj = obj;
    });
}
function LoadJiaTaoSearchGUI(configFileURL,menuObj,callback)
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
            guiTable.closed = false;
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
                url: globalServerAddr + "api?queryJiaTao=1",
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

        gui.domElement.style = 'position:absolute;top:200px;left:235px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_JiaTaoSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        var m_globalJiaTaoSearchGui = gui;
        var m_globalJiaTaoSearchGui = obj;
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
function LoadHandleSearchGUI(configFileURL,menuObj,callback,onUpdateHandleMenu)
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
            guiTable.closed = false;
            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onUpdateHandleMenu);
        }

        menuObj["搜索"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;



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

        gui.domElement.style = 'position:absolute;top:200px;left:235px;background-color:#ffffff;visibility:hidden;';
        gui.domElement.id = 'MenuParamDesign_handleSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalHandleSearchGui = gui;
        m_globalHandleSearchJsonObj = obj;
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
    var strgongsiming = paramList[7]["公司名称"];
    var strQiTa = paramList[8]["其他"];


    //m_globalJiShuYaoQiuJsonObj = paramList;
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
    strHtml += "<div style=\"width:80%\">" + "8.公司名称: " + strgongsiming + "</div>";


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
    strHtml += "<div style=\"width:80%\">" + "1.被加工材料:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "2.使用机床: " +  "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.刀具结构: " + "</div>";
    strHtml += "<div style=\"width:80%\">" + "4.涂层要求: " + "</div>";
    strHtml += "<div style=\"width:80%\">" + "5.刀具是否内冷: " + "</div>";
    strHtml += "<div style=\"width:80%\">" + "6.加工内容: " + "</div>";
    strHtml += "<div style=\"width:80%\">" + "7.加工精度:" + "</div>";
    tableHtmlElement.innerHTML = strHtml;

    tableHtmlElement.style.visibility = "hidden";
    g_bDisplayTechRequest = true;
}
function LoadJiShuYaoQiuGUI(tuZhiMoBanPath,menuObj,onClickQueDing,onLoadAsmModel)
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
            guiTable.closed = false;
            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,null);
        }

        menuObj["确定"] = function () {
            var jsonObj = obj;
            var jsonMenuObj = menuObj;
            var bServerCallBack = false;
            var design = document.getElementById("design");
            var zhuangpei = document.getElementById("ZhuangPei");

            design.style.backgroundColor = "#009fd7";
            design.onclick = function () {OnClickParamDesign()};
            zhuangpei.style.backgroundColor = "#009fd7";
            zhuangpei.onclick = function () {OnClickZhuangPei()};
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
function LoadYanChangGanSearchGUIMockData(configFileURL,menuObj,callback,onUpdateYanChangGanMenu)
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
            guiTable.closed = false;
            menuObj[tabName] = {};
            UpdateGUIByJsonObj(guiTable,tabObj,onUpdateYanChangGanMenu);
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
        gui.domElement.id = 'MenuParamDesign_YanChangGanSearch2';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalYanChangGanSearchGui = gui;
        m_globalYanChangGanSearchJsonObj = obj;
    });
}
function LoadYanJiaSearchGUI(configFileURL,menuObj,callback)
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
            guiTable.closed = false;
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
        gui.domElement.id = 'MenuParamDesign_YanJiaSearch';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        ///m_globalYanChangGanSearchGui = gui;
        //m_globalYanChangGanSearchJsonObj = gui;
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
                // var elem = document.getElementById('myCanvas');
                // elem.style.visibility = "hidden";
                // clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
            },null,null);

            var scope = this;
            var mockDataLoader = new THREE.FileLoader( scope.manager );
            //loader.setResponseType( 'arraybuffer' );

            mockDataLoader.load( "./mockData/daoBingSearchResult.json", function ( text ) {
                m_globalDaoBinSearchJsonResult = JSON.parse(text);
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
function RemoveZiJiDeleteBtnInLingJianContainer_NobelTech()
{
    var htmlCtrl = document.getElementById("LingJianSlotContainer");
    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    $(htmlCtrl).find('.smallbutton').css('visibility','hidden');
}
function UpdateLingJianContainerByLingJianTree_NobelTech()
{
    if(g_lingJianTree == null || g_lingJianTree == undefined)
    {
        return;
    }

    g_lingJianParamMap = {};

    var htmlCtrl = document.getElementById("LingJianSlotContainer");
    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var strHtml = "";

    var paramList = g_lingJianTree.ParamList;

    /*
    <ul id="LingJianDesign" class="slot-list">
									<li class='slot-item'><div class='slot-handler'><div class='slot-handler clearfix'></div></div></li>
								</ul>
    * */

    var strHtml = "<ul id='LingJianDesign' class='slot-list'>";
    strHtml += "<li class='slot-item'><div class='slot-handler'><div class='slot-handler clearfix'></div></div></li>";

    strHtml += UpdateLingJianHtmlCtrlByJson_NobelTech(paramList,strHtml,0);

    strHtml += "</ul>";

    htmlCtrl.innerHTML = strHtml;
}
function UpdateLingJianHtmlCtrlByJson_NobelTech(jsonObj,strHtml,curDeep)
{
    var result = "";//strHtml;

    if(jsonObj == null || jsonObj == undefined)
    {
        return result;
    }

    /*
    result += "<li id=\"" + strId + "\" class=\"slot-item\"><div class=\"slot-handler\">";
            result += "<div class=\"slot-handler clearfix\">";
            result += "<div class=\"avator\">";
            result += "<img src=\"img/" + mInstance.m_imagePath + "\"/>";
            result += "</div>";
            result += "<div class=\"content\">";
            result += "<div class=\"item-title\">" + mInstance.m_name +"</div>";
            result += "<div class=\"smallbutton\" style=\"visibility:hidden;width:30px;margin-left: 160px;margin-top: -25px;\" onclick=\"OnClickZiJi_NobelTech(this)\">子级</div>";
            result += "<div class=\"smallbutton\" style=\"visibility:hidden;width:30px;margin-left: 200px;margin-top: -25px;background-color: red\" onclick=\"OnClickRemove_NobelTech(this)\">删除</div>";
            //result += "<div class=\"smallbutton\" style=\"width:30px;margin-left: 200px;margin-top: -25px;z-index:10;background-color: red\" onclick=\"\">删除</div>";
            result += "</div>";
            result += "</div>";
            result += "</div>";
            result += "</li>";
    * */

    for(var i = 0; i < jsonObj.length; i++)
    {
        if(jsonObj[i].id == null || jsonObj[i].id == undefined)
        {
            jsonObj[i].id = GenerateUUID();
        }
        result += "<li id='" + jsonObj[i].id + "' style='margin-left:" + (45 * curDeep) +"px;' class='slot-item'><div class='slot-handler'>";
        result += "<div class='slot-handler clearfix'>";
        result += "<div class='avator'>";
        result += "<img src='img/" + jsonObj[i].m_imagePath + "'/>";
        result += "</div>";
        result += "<div class='content'>";
        result += "<div class='item-title'>" + jsonObj[i].Name + "</div>";
        result += "<div class='smallbutton' style='visibility:inherit;width:30px;margin-left: 160px;margin-top: -25px;' onclick='OnClickZiJi_NobelTech(this)'>子级</div>";
        result += "<div class='smallbutton' style='visibility:inherit;width:30px;margin-left: 200px;margin-top: -25px;background-color: red' onclick='OnClickRemove_NobelTech(this)'>删除</div>";
        result += "</div>";
        result += "</div>";
        result += "</div>";
        result += "</li>";

        g_lingJianParamMap[jsonObj[i].id] = jsonObj[i];

        var paramList = jsonObj[i].ParamList;
        result += UpdateLingJianHtmlCtrlByJson_NobelTech(paramList,result,curDeep + 1);
    }

    return result;
}

function GenerateLingJianJsonObjByLingJianContainer_NobelTech(bUseJsonTree)
{
    var htmlContainer = document.getElementById("LingJianDesign");
    var strInnerHtml = htmlContainer.innerHTML;

    var jsonObj = {};
    jsonObj.Name = "标准元素";
    jsonObj.ModifyParam = 0;
    jsonObj.MenuId = "myMenu_root";
    jsonObj.ParamList = new Array();

    var lingJianTree = {};
    lingJianTree.Name = "外型";
    lingJianTree.ModifyParam = 0;
    lingJianTree.MenuId = "myMenu_lingJian";
    lingJianTree.ParamList = new Array();
    //jsonObj.ParamList.push(lingJianTree);

    if(htmlContainer == null || htmlContainer == undefined || bUseJsonTree == true)
    {
        jsonObj.ParamList.push(g_lingJianTree);
        //return;
    }
    else
    {
        var items = new Array();
        for(var i = 0; i < htmlContainer.childNodes.length; i++)
        {
            if(htmlContainer.childNodes[i].style == null || htmlContainer.childNodes[i].style == undefined)
            {
                continue;
            }

            if(htmlContainer.childNodes[i].style.marginLeft == "")
            {
                htmlContainer.childNodes[i].style.marginLeft = "0px";
            }

            items.push(htmlContainer.childNodes[i]);
        }

        var curParent = jsonObj;
        for(var i = 0; i < items.length; i++)
        {
            var paramJson = g_lingJianParamMap[items[i].id];
            if(paramJson == null || paramJson == undefined)
            {
                continue;
            }

            var childJsonObj = {};
            childJsonObj.Name = paramJson.Name;
            childJsonObj.ModifyParam = 0;
            childJsonObj.ParamList = new Array();
            childJsonObj.ParamsArray = paramJson.ParamsArray;
            GenerateLingJianChildJsonObjByLingJianContainer_NobelTech(childJsonObj,items,i);

            if(items[i].style.marginLeft == "0px")
            {
                lingJianTree.ParamList.push(childJsonObj);
            }
        }

        if(g_lingJianTree != null && g_lingJianTree != undefined)
        {
            lingJianTree.Name = g_lingJianTree.Name;
        }

        g_lingJianTree = lingJianTree;

        jsonObj.ParamList.push(lingJianTree);
    }

    var gongYiTree = {};
    gongYiTree.Name = "工艺原则";
    gongYiTree.ModifyParam = 0;
    gongYiTree.MenuId = "myMenu_gongYi";
    gongYiTree.ParamList = new Array();
    jsonObj.ParamList.push(gongYiTree);

    var daoJuTree = {};
    daoJuTree.Name = "整套刀具";
    daoJuTree.ModifyParam = 0;
    daoJuTree.MenuId = "myMenu_daoJu";
    daoJuTree.ParamList = new Array();
    jsonObj.ParamList.push(daoJuTree);

    if(g_searchGongYiResult != null && g_searchGongYiResult != undefined)
    {
        for(var i = 0; i < g_searchGongYiResult.length; i++)
        {
            var gongYiObj = {};
            gongYiObj.Name = g_searchGongYiResult[i].Name;
            gongYiObj.ModifyParam = 0;
            gongYiObj.MenuId = "myMenu_gongYi_" + i;
            gongYiObj.ParamList = g_searchGongYiResult[i].ParamList;
            gongYiTree.ParamList.push(gongYiObj);
        }
    }

    if(g_searchedDaoJuResult != null && g_searchedDaoJuResult != undefined)
    {
        for(var i = 0; i < g_searchedDaoJuResult.length; i++)
        {

            var daoJuObj = {};
            daoJuObj.Name = g_searchedDaoJuResult[i].Name2;
            daoJuObj.ModifyParam = 0;
            daoJuObj.MenuId = "myMenu_gongYi_" + i;
            daoJuObj.ParamList = new Array();
            daoJuTree.ParamList.push(daoJuObj);
        }
    }

   // lingJianTree.

    var result = new Array();
    result.push(jsonObj);

    return result;
}
function GenerateLingJianChildJsonObjByLingJianContainer_NobelTech(parentJson,items,index)
{
    var parentCtrl = items[index];

    if(parentCtrl == null || parentCtrl == undefined)
    {
        return;
    }

    for(var i = index + 1; i < items.length; i++)
    {
        if(parseInt(items[i].style.marginLeft) == parseInt(parentCtrl.style.marginLeft) + 45)
        {
            var paramJson = g_lingJianParamMap[items[i].id];
            if(paramJson == null || paramJson == undefined)
            {

            }
            else
            {
                var childJsonObj = {};
                childJsonObj.Name = paramJson.Name;
                childJsonObj.ModifyParam = 0;
                childJsonObj.ParamList = new Array();
                childJsonObj.ParamsArray = paramJson.ParamsArray;

                parentJson.ParamList.push(childJsonObj);

                GenerateLingJianChildJsonObjByLingJianContainer_NobelTech(childJsonObj,items,i);
            }
        }

        if(items[i].style.marginLeft == parentCtrl.style.marginLeft)
        {
            break;
        }
    }
}
function LoadLingJianUIByJsonObj_NobelTech(jsonObj,onFinishLoadUI)
{
    m_globalTreeUIJsonObj = jsonObj;
    LoadUIConfigByJsonObj_NobelTech(jsonObj);

    onFinishLoadUI();
}
function LoadUIConfigByJsonObj_NobelTech(jsonObj)
{
    var strHtml = GetHtmlStrByJsonObj(jsonObj,"_");
    //strHtml += GetGongYiTreeByJsonObj_NobelTech(g_gongYiJsonObj);
    //strHtml += GetDaoJuTreeByJsonObj_NobelTech(g_daoJuJsonObj);

    var doc = document.getElementById("myUI");
    doc.innerHTML = strHtml;

    RebindOnClickEvent();
}
function GetGongYiTreeByJsonObj_NobelTech(jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }



}
function GetDaoJuTreeByJsonObj_NobelTech(jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }


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
                // var elem = document.getElementById('myCanvas');
                // elem.style.visibility = "hidden";
                // clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
                OnUpdateSearchState(1); //0 search, 1design
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
                // var elem = document.getElementById('myCanvas');
                // elem.style.visibility = "hidden";
                // clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
            },null,null);

            var scope = this;
            var mockDataLoader = new THREE.FileLoader( scope.manager );
            //loader.setResponseType( 'arraybuffer' );

            mockDataLoader.load( "./mockData/yanChangGanSearchResult.json", function ( text ) {
                m_globalYanChangGanSearchJsonResult = JSON.parse(text);
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
                url: globalServerAddr + "api?getdaobing=1",
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
                // var elem = document.getElementById('myCanvas');
                // elem.style.visibility = "hidden";
                // clearInterval(progressTimer);

                removeAllSceneModel();

                onClickUpdateModel(geometry,0);
            },null,null);

            var scope = this;
            var mockDataLoader = new THREE.FileLoader( scope.manager );
            //loader.setResponseType( 'arraybuffer' );
            mockDataLoader.load( "./mockData/zuanTouSearchResult.json", function ( text ) {
                m_globalZuanTouSearchJsonResult = JSON.parse(text);
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
function UpdateGenerateServerIDBtnBackGroundColor(guiRoot)
{
    if(guiRoot == null || guiRoot == undefined)
    {
        return;
    }

    if(m_globalGuiJsonObj == null || m_globalGuiJsonObj == undefined)
    {
        return;
    }

    var jsonObj = m_globalGuiJsonObj.Tab[0];

    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var paramList = jsonObj.ParamList;

    for (var j = 0; j < paramList.length; j++)
    {
        var param = paramList[j];
        var paramName = param.Name;
        var paramType = param.Type;
        var defaultValue = param.DefaultValue;
        var serverGenerateID = param.ServerGenerateID;

        if(param[paramName] != null && param[paramName] != undefined)
        {
            defaultValue = param[paramName];
        }

        if(serverGenerateID == 1)
        {
            defaultValue = g_serverGenerateID;
        }

        if(paramType == "GenerateServerID")
        {
            var bFind = false;
            var k = 0;
            var index = 0;
            for(k = 0; guiRoot.__controllers && k < guiRoot.__controllers.length; k++)
            {
                if(guiRoot.__controllers[k].property == paramName)
                {
                    bFind = true;
                    index = k;
                    break;
                }
            }

            if(bFind == true)
            {
                if(g_isCreatingNewModel)
                {
                    guiRoot.__controllers[index];
                }
                else if(g_isModifyingModel)
                {

                }
            }
        }
    }
}
function QueryPriceFromServer(daoJuType,actionArray,callBackFunc)
{
    var jsonObj = {};

    jsonObj.DaoJuType = daoJuType;
    jsonObj.ActionTypeArray = actionArray;

    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryCostByType=1",
        data: strJson,
        success: function (response) {

            var resultJsonObj = JSON.parse(response);
            callBackFunc(resultJsonObj);
            //关闭
        },
        error: function (errs) {
            callBackFunc(errs);
        }
    });
}
function LoadDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
{
    var scope = this;
    var gui = null;

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text ) {
        var obj = JSON.parse(text);

        //var menuObj = {};
        gui = new dat.gui.GUI();
        gui.remember(menuObj);

        for (var i = 0; i < obj.Tab.length; i++) {
            var tabObj = obj.Tab[i];
            var tabName = tabObj.Name;

            var guiTable = gui.addFolder(tabName);
            guiTable.closed = false;
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
            var result = JsonToIni(jsonObj);
            var tempJsonObj = IniToJsonObj(result);

            g_daoJuIniString = jsonObj;

            var tempJsonObj = {};
            tempJsonObj.DaoJuType = 1;
            tempJsonObj.IniString = result;
            tempJsonObj.ActionTypeArray = new Array();
            tempJsonObj.ActionTypeArray.push(7);
            tempJsonObj.ActionTypeArray.push(15);

            var strJson = JSON.stringify(tempJsonObj);

            QueryPriceFromServer(tempJsonObj.DaoJuType,tempJsonObj.ActionTypeArray,function(resultJson)
            {
                var price = resultJson.Price;
                var strTips = "更新该模型需要花费 " + price + " 元，需要购买吗？";
                if(confirm(strTips))
                {
                    onClickUpdateCallBack();
                    var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
                    //update here
                    $.ajax({
                        type: 'POST',
                        url: globalServerAddr + "api?buyModel=1",
                        data: strJson,
                        success: function (response) {


                           // var zi = document.getElementById("zi");
                           // var xx = document.getElementById("xx");
                            // zi.innerText = "模型已生成,5秒后自动关闭本窗口,如没有关闭请手动关闭";
                            // xx.style.visibility = "visible";
                            // var tt = 6;
                            // function timego() {
                            //     var zi = document.getElementById("zi");
                            //     var xx = document.getElementById("xx");
                            //     tt--;
                            //     zi.innerText = "模型已生成," + tt + "秒后自动关闭本窗口,如没有关闭请手动关闭";
                            //     xx.style.visibility = "visible";
                            //     if (tt == 0)
                            //     {
                            //         var progress = document.getElementById("progress");
                            //         progress.style.visibility = "hidden";
                            //     }
                            // }
                            // function divClose() {
                            //     var progress = document.getElementById("progress");
                            //     progress.style.visibility = "hidden";
                            // }
                            //setTimeout("timego()",1000);
                            var resultJsonObj = JSON.parse(response);
                            LoadBaoJiaGUI("config/BaoJia/BaoJiaXinXi.json",zuanTouSearchMenuObj);RequestUserInfo();
                            g_resultJsonObj = resultJsonObj;
                            callback(response,handleLength);
                            //关闭
                            g_isCreatingNewModel = false;
                            g_isModifyingModel = true;
                            Table(daoju,g_resultJsonObj);
                            UpdateGenerateServerIDBtnBackGroundColor(m_globalGuiJsonObj);


                        },
                        error: function (errs) {

                            alert(errs.responseText);
                            HideProgressBar();
                        }
                    });
                }
                else
                {

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

        gui.domElement.style = 'position:absolute;margin-left:235px;top:200px;background-color:#ffffff;visibility:hidden';
        gui.domElement.id = 'MenuParamDesign';
        gui.OnClickClosePanel = GlobalOnClickClosePanel;

        m_globalGui = gui;
        m_globalGuiJsonObj = obj;
        m_globalFuncUpdateModel = menuObj["更新模型"];
    });
}

function LoadDaoTouDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
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
            guiTable.closed = false;
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
            var result = JsonToIni(jsonObj);
            var tempJsonObj = IniToJsonObj(result);


            onClickUpdateCallBack();

            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getdaotou=1",
                data: result,
                success: function (response) {

                    callback(response,handleLength);
                    //关闭

                },
                error: function (errs) {

                    alert(errs.responseText);
                    HideProgressBar();
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

function LoadCuTangTouDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
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
            guiTable.closed = false;
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
            var result = JsonToIni(jsonObj);
            var tempJsonObj = IniToJsonObj(result);


            onClickUpdateCallBack();

            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getcutangtou=1",
                data: result,
                success: function (response) {

                    callback(response,handleLength);
                    //关闭

                },
                error: function (errs) {

                    alert(errs.responseText);
                    HideProgressBar();
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

function LoadJingTangTouDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
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
            guiTable.closed = false;
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
            var result = JsonToIni(jsonObj);
            var tempJsonObj = IniToJsonObj(result);


            onClickUpdateCallBack();

            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getjingtangtou=1",
                data: result,
                success: function (response) {

                    callback(response,handleLength);
                    //关闭

                },
                error: function (errs) {

                    alert(errs.responseText);
                    HideProgressBar();
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

function LoadDaoBingsDesignGUI(configFileURL,callback,menuObj,onClickUpdateCallBack,onComboBoxChangedCallBack,onSearch)
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
            guiTable.closed = false;
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
            var result = JsonToIni(jsonObj);
            var tempJsonObj = IniToJsonObj(result);

            onClickUpdateCallBack();


            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getdaobings=1",
                data: result,
                success: function (response) {

                    callback(response,handleLength);
                    //关闭


                },
                error: function (errs) {

                    alert(errs.responseText);
                    HideProgressBar();
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
            guiTable.closed = false;
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
            var result = JsonToIni(jsonObj);
            var tempJsonObj = IniToJsonObj(result);

            onClickUpdateCallBack();


            var handleLength = parseFloat(jsonObj.Tab[0].ParamList[0]["总长"]);
            //update here
            $.ajax({
                type: 'POST',
                url: globalServerAddr + "api?getdaobing=1",
                data: result,
                success: function (response) {

                    callback(response,handleLength);
                    //关闭


                },
                error: function (errs) {

                    alert(errs.responseText);
                    HideProgressBar();
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


function UpdateProgressBar(percent)
{

}
function onTuZhiMuBanClickQueDing()
{
    UpdateTechRequest();
    //UpdateParamList();
}
function onJiShuYaoQiuClickQueDing()
{
    UpdateTechRequest();
    //UpdateParamList();
}
function UpdateParamList()
{
    var tableHtmlElement = document.getElementById("divParamList");

    if(tableHtmlElement == null || tableHtmlElement == undefined)
    {
        return;
    }

    //m_globalJiShuYaoQiuJsonObj;
    var paramList = null;
    if(m_globalGuiJsonObj && m_globalGuiJsonObj.Tab)
    {
        var paramList = m_globalGuiJsonObj.Tab[0].ParamList;
    }

    if(paramList == null)
    {
        return;
    }

    var strzuantou = paramList[0]["钻头"];
    var strzuantoupinpai = paramList[1]["刀具品牌"];
    var strzuantouxinghao = paramList[2]["订货型号"];
    var strwenjianming = paramList[3]["文件名"];
    var strgongzuozhijing = paramList[4]["工作直径"];
    var strshangpiancha = paramList[5]["上偏差"];
    var strxiapiancha = paramList[6]["下偏差"];
    var strgongzuochangdu = paramList[7]["工作长度"];
    var strzongcaochang = paramList[8]["总槽长"];
    var strzongchang = paramList[9]["总长"];
    var strzuantoudingjiao = paramList[10]["钻头顶角"];



    var strHtml = "<div style=\"width:80%\">" + "钻头:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.钻头: " + (strzuantou ==0?"螺旋槽钻头":"螺旋槽钻头") + "</div>";
    strHtml += "<div style=\"width:80%\">" + "2.刀具品牌: " + (strzuantoupinpai ==0?"Seco":"Prawet") +  "</div>";
    strHtml += "<div style=\"width:80%\">" + "3.订货型号: " + strzuantouxinghao + "</div>";
    strHtml += "<div style=\"width:80%\">" + "4.文件名: " + strwenjianming + "</div>";
    strHtml += "<div style=\"width:80%\">" + "5.工作直径: " + strgongzuozhijing + "</div>";
    strHtml += "<div style=\"width:80%\">" + "6.上偏差: " + strshangpiancha + "</div>";
    strHtml += "<div style=\"width:80%\">" + "7.下偏差: " + strxiapiancha + "</div>";
    strHtml += "<div style=\"width:80%\">" + "8.工作长度: " + strgongzuochangdu + "</div>";
    strHtml += "<div style=\"width:80%\">" + "9.总槽长: " + strzongcaochang + "</div>";
    strHtml += "<div style=\"width:80%\">" + "10.总长: " + strzongchang + "</div>";
    strHtml += "<div style=\"width:80%\">" + "11.工作长度: " + strzuantoudingjiao + "</div>";

    paramList = m_globalGuiJsonObj.Tab[1].ParamList;

    var strbingbuleixing = paramList[0]["柄部类型"];

    strHtml += "<br>";
    strHtml += "<div style=\"width:80%\">" + "柄部:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.柄部类型: " + (strbingbuleixing==0?"圆柱":"侧固") + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "2.其他: " + strQiTa + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "9.其他: " + strQiTa + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "9.其他: " + strQiTa + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "9.其他: " + strQiTa + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "9.其他: " + strQiTa + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "9.其他: " + strQiTa + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "9.其他: " + strQiTa + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "9.其他: " + strQiTa + "</div>";

    paramList = m_globalGuiJsonObj.Tab[2].ParamList;

    var strlengquefangshi = paramList[0]["冷却方式"];

    strHtml += "<br>";
    strHtml += "<div style=\"width:80%\">" + "冷却:" + "</div>";
    strHtml += "<div style=\"width:80%\">" + "1.冷却方式: " + (strbingbuleixing ==0?"内冷":"外冷") + "</div>";
    // paramList = m_globalTuZhiSearchJsonObj.Tab[0].ParamList;
    // var strTuFuDaXiao = paramList[0]["图幅大小"];
    // strTuFuDaXiao = paramList[0].Choise.split(",")[strTuFuDaXiao];
    // var strGongSiMingCheng = paramList[1]["公司名称"];
    // var strBiaoTiLan = paramList[2]["标题栏"];
    // strBiaoTiLan = paramList[2].Choise.split(",")[strBiaoTiLan];
    //
    // strHtml += "<br>"
    // strHtml += "<div style=\"width:80%\">" + "图纸模板:" + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "1.图幅大小: " + strTuFuDaXiao + "</div>";//图幅大小,公司名称，标题栏
    // strHtml += "<div style=\"width:80%\">" + "2.公司名称: " + strGongSiMingCheng + "</div>";
    // strHtml += "<div style=\"width:80%\">" + "3.标题栏: " + strBiaoTiLan + "</div>";

    tableHtmlElement.innerHTML = strHtml;

    tableHtmlElement.style.visibility = "visible";
    g_bDisplayParamList = true;
}


function DisplayParamList()
{
    var tableHtmlElement = document.getElementById("divParamList");

    if(tableHtmlElement == null || tableHtmlElement == undefined)
    {
        return;
    }

    //g_bDisplayTechRequest = true;
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

    tableHtmlElement.style.visibility = "hidden";
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
    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    //clearInterval(progressTimer);

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
    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    //clearInterval(progressTimer);

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
    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    //clearInterval(progressTimer);

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
    if(m_globalZuanTouSearchJsonResult == null)
    {
        return;
    }

    //handleLength = 0;
    onClickUpdateCallBack();
    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    //clearInterval(progressTimer);

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
    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    //clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "./obj/test/" + m_globalSelectedZuanTouId + ".stl";
    var pdfFile = m_globalSelectedZuanTouId + ".pdf";
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = "./obj/test/" + pdfFile;

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
        OnUpdateSearchState(0); //0 search, 1design
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

    //UpdateTuZhiByComboBox();
}
function DisplayTuZhiByComboBox()
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

    var htmlCtrl = document.getElementById("ErComboBox");
    var selectedIndex = htmlCtrl.selectedIndex;

    var pdfCtrl = document.getElementById("pdfCtrl");
    if(pdfCtrl)
    {
        if (g_comboBoxObjArray[selectedIndex].PdfList2 == undefined || g_comboBoxObjArray[selectedIndex].PdfList2 == null || g_comboBoxObjArray[selectedIndex].PdfList2 == "")
        {
            pdfCtrl.src = globalServerAddr + g_comboBoxObjArray[selectedIndex].PdfList;
        }else
        {
            pdfCtrl.src = globalServerAddr + g_comboBoxObjArray[selectedIndex].PdfList2;
        }

    }

    //UpdateTuZhiByComboBox();
}
function DisplaySanWeiByComboBox()
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

    var htmlCtrl = document.getElementById("SanWeiComboBox");
    var selectedIndex = htmlCtrl.selectedIndex;

    var jsonObj = {};
   //{"ModelFileAdditionList":[],"PdfAdditionList":[],"ModelFileList":"NT000006934_asm\\NT000006934_asm\\NT000006934_asm.stl","PdfList":"NT000006934_asm\\NT000006934_asm\\NT000006934_asm.pdf"}
    if (g_comboBoxObjArray[selectedIndex].ModelFileList2 == undefined || g_comboBoxObjArray[selectedIndex].ModelFileList2 == null || g_comboBoxObjArray[selectedIndex].ModelFileList2 == "")
    {
        jsonObj.ModelFileList = g_comboBoxObjArray[selectedIndex].ModelFileList;
    } else
    {
       // jsonObj.ModelFileList = g_comboBoxObjArray[selectedIndex].ModelFileList2;
    }

    jsonObj = g_comboBoxObjArray[selectedIndex];

    //jsonObj.PdfList = globalServerAddr + g_comboBoxObjArray[selectedIndex].PdfList;

    onCallBack(JSON.stringify(jsonObj),0);
}
function onCallBack(response,handleLength)
{
    var onProgress = function ( xhr ) {

    };

    var onError = function ( xhr ) {
    };

    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    //clearInterval(progressTimer);

    removeAllSceneModel();

    var jsonObj = eval('(' + response + ')');
    var modelFileList = jsonObj.ModelFileList;
    var pdfFile = jsonObj.PdfList;
    var pdfCtrl = document.getElementById( 'pdfCtrl' );
    pdfCtrl.src = globalServerAddr + pdfFile;

    var i = 0;
    var requestURL = globalServerAddr + modelFileList;

    var loader = new THREE.STLLoader();
    loader.load(requestURL, function ( geometry ){
        onClickUpdateModel(geometry,0,GetReflectMaterialByType(ReflectMaterialType.ReflectMaterialType_General));
    },onProgress,onError);

    if(jsonObj.ModelFileAdditionList)
    {
        var index = 1;
        for(var i = 0; i < jsonObj.ModelFileAdditionList.length; i++)
        {
            requestURL = globalServerAddr + jsonObj.ModelFileAdditionList[i];
            var loader = new THREE.STLLoader();
            loader.load(requestURL, function ( geometry ){
                onClickUpdateModel(geometry,0,GetReflectMaterialByType(index % 4 + 1));
                index++;
            },onProgress,onError);
        }
    }
}
function onCallBacks(response,handleLength)
{
    var onProgress = function ( xhr ) {

    };

    var onError = function ( xhr ) {
    };

    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    //clearInterval(progressTimer);

    removeAllSceneModel();

    var jsonObj = eval('(' + response + ')');
    var modelFileList = jsonObj.ModelFileList;

    var i = 0;
    var requestURL = globalServerAddr + modelFileList;

    var loader = new THREE.STLLoader();
    loader.load(requestURL, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },onProgress,onError);
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
    var jsonObj = new Array();

    if(strJson == null || strJson == "")
    {

    }
    else {
        var jsonObj = JSON.parse(strJson);
    }

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

    if(g_searchGongYiResult == null || g_searchGongYiResult == undefined)
    {
        var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
        var strFangAnConfig = "./mockData/jiaGongJiePaiSearchResult_" + (fangAnIndex + 1) + ".json";

        var scope = this;
        var mockDataLoader = new THREE.FileLoader( scope.manager );
        mockDataLoader.load( strFangAnConfig, function ( text ) {
            OnLoadJiaGongJiePaiMockData("");
        });
    }
    else
    {
        var strJiaGongJiePai = ConvertGongYiResultToJiaGongJiePai_NobelTech(g_searchGongYiResult);
        OnLoadJiaGongJiePaiMockData(strJiaGongJiePai);
       // for(var i = 0; i < )
    }
}
function ConvertDaoJuResultToDaoJuQingDan_NobelTech()
{
    var strResult = "";
    var jsonRootObj = new Array();

    if(g_searchedDaoJuResult == null || g_searchedDaoJuResult == undefined)
    {
        return "";
    }

    for(var i = 0; i < g_searchedDaoJuResult.length; i++)
    {
        var jsonObj = {};
        jsonObj.Name = g_searchedDaoJuResult[i].Name;0
        jsonObj.ModelFullPath = g_searchedDaoJuResult[i].ModelUrl;
        jsonObj.PdfFullPath = g_searchedDaoJuResult[i].PdfUrl;

        jsonRootObj.push(jsonObj);
    }

    return JSON.stringify(jsonRootObj);
}
function ConvertGongYiResultToJiaGongJiePai_NobelTech()
{
    var strResult = "";
    var jsonRootObj = new Array();

    if(g_searchGongYiResult == null || g_searchGongYiResult == undefined)
    {
        return "";
    }

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        var jsonObj = {};
        jsonObj.Name = g_searchGongYiResult[i].Name;
        jsonObj.ModelFullPath = g_searchGongYiResult[i].ModelUrl;
        jsonObj.PdfFullPath = g_searchGongYiResult[i].PdfUrl;

        jsonRootObj.push(jsonObj);
    }

    return JSON.stringify(jsonRootObj);
}
function OnClickDaoJuQingDan_NobelTech()
{
    var fangAnComboBoxHtml = document.getElementById("FangAnComboBox");
    if(fangAnComboBoxHtml == null || fangAnComboBoxHtml == undefined)
    {
        return;
    }

    if(g_searchedDaoJuResult == null || g_searchedDaoJuResult == undefined)
    {
        var fangAnIndex = parseInt(fangAnComboBoxHtml.value);
        var strFangAnConfig = "./mockData/daoJuQingDanSearchResult_" + (fangAnIndex + 1) + ".json";

        var scope = this;
        var mockDataLoader = new THREE.FileLoader( scope.manager );
        mockDataLoader.load( strFangAnConfig, function ( text ) {
            OnLoadDaoJuQingDanMockData("");
        });
    }
    else
    {
        var strDaoJu = ConvertDaoJuResultToDaoJuQingDan_NobelTech();
        OnLoadDaoJuQingDanMockData(strDaoJu);
    }


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
        LoadLingJianModel_NobelTech();
        //LoadLingJianByNameMockData("prt");
    }
    else if(modelComboBoxHtml.value == "1")
    {
        //显示工步
        LoadGongBuModel_NobelTech();
        //var fullPath = "./obj/nobeltech-tiyan/" + strFangAn + "/step/prt_tec.stl";
       // Load3dModelByFullPathMockData(fullPath);
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

    var htmlPdfView = document.getElementById("divPdfView");

    var strHtml = "";

    strHtml += "<embed id='pdfCtrl" + 0 + "' src='" + (strPdfPath) + "' type='application/pdf' style='width:1440px;height:610px;'></embed>";

    if(htmlPdfView)
    {
        htmlPdfView.innerHTML = strHtml;
    }

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


    //var pdfCtrl = document.getElementById( 'pdfCtrl' );
    //pdfCtrl.src = strPdf;

    Display3DModel();
}
function GenerateDaoJuQingDanTuZhiByIndexMockData(index)
{
    GenerateDaoJuQingDan3dModelByIndexMockData(index);

    DisplayTuZhi();
}
function OnLoadJiaGongJiePaiMockData(strJson)
{
    var jsonObj = null;

    if(strJson == null || strJson == "")
    {
        jsonObj = new Array();
    }
    else
    {
        jsonObj = JSON.parse(strJson);
    }

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
        //LoadLingJianByNameMockData("prt");
        LoadLingJianPdf_NobelTech();
    }
    else if(modelComboBoxHtml.value == "1")
    {
        //显示工步
        //var fullPath = "./obj/nobeltech-tiyan/" + strFangAn + "/step/prt_tec.stl";
        //Load3dModelByFullPathMockData(fullPath);
        LoadGongBuPdf_NobelTech();
    }

    DisplayTuZhi();

}
function Load3dModelByFullPathMockData(fullPath,callBack)
{
    //handleLength = 0;
    onClickUpdateCallBack();
    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    // clearInterval(progressTimer);

    removeAllSceneModel();

    var modelFileList = "" + fullPath;
    var pdfFile = "." + fullPath.split(".")[1] + ".pdf";

    var htmlPdfView = document.getElementById("divPdfView");

    var strHtml = "";

    strHtml += "<embed id='pdfCtrl" + 0 + "' src='" + pdfFile + "' type='application/pdf' style='width:1440px;height:610px;'></embed>";

    if(htmlPdfView)
    {
        htmlPdfView.innerHTML = strHtml;
    }

    var loader = new THREE.STLLoader();
    loader.load(modelFileList, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);
}
function LoadGongBuPdf_NobelTech()
{
    if(g_searchGongYiResult == null || g_searchGongYiResult == undefined || g_searchGongYiResult.length == 0)
    {
        return;
    }

    var htmlPdfView = document.getElementById("divPdfView");

    var strHtml = "";

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        var modelUrl = g_searchGongYiResult[i].ModelUrl;
        var pdfUrl = g_searchGongYiResult[i].PdfUrl;

        strHtml += "<embed id='pdfCtrl" + 0 + "' src='" + (globalServerAddr + pdfUrl) + "' type='application/pdf' style='width:1440px;height:610px;'></embed>";
    }

    if(htmlPdfView)
    {
        htmlPdfView.innerHTML = strHtml;
    }
}
function LoadGongBuModel_NobelTech()
{
    if(g_searchGongYiResult == null || g_searchGongYiResult == undefined || g_searchGongYiResult.length == 0)
    {
        return;
    }

    removeAllSceneModel();
    var curLength = 0;

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        var modelUrl = g_searchGongYiResult[i].ModelUrl;
        var pdfUrl = g_searchGongYiResult[i].PdfUrl;

        modelUrl = globalServerAddr + modelUrl;
        var loader = new THREE.STLLoader();
        loader.load(modelUrl, function ( geometry ){
            onClickUpdateModel(geometry,curLength);
            curLength += 80;
        },null,null);
    }
}
function LoadLingJianModel_NobelTech()
{
    if(g_lingJianTree == null || g_lingJianTree == undefined)
    {
        return;
    }

    var modelUrl = globalServerAddr + g_lingJianTree.ModelUrl;

    removeAllSceneModel();

    var loader = new THREE.STLLoader();
    loader.load(modelUrl, function ( geometry ){
        onClickUpdateModel(geometry,0);
    },null,null);
}
function LoadLingJianPdf_NobelTech()
{
    if(g_lingJianTree == null || g_lingJianTree == undefined)
    {
        return;
    }

    var pdfUrl = globalServerAddr + g_lingJianTree.PdfUrl;

    var htmlPdfView = document.getElementById("divPdfView");
    var strHtml ="<embed id='pdfCtrl" + 0 + "' src='" + pdfUrl + "' type='application/pdf' style='width:1440px;height:610px;'></embed>";

    if(htmlPdfView)
    {
        htmlPdfView.innerHTML = strHtml;
    }
}
function LoadLingJianByNameMockData(name,callBack)
{
    //handleLength = 0;
    onClickUpdateCallBack();
    // var elem = document.getElementById('myCanvas');
    // elem.style.visibility = "hidden";
    // clearInterval(progressTimer);

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
function GenerateLingJianIniByJsonObj_NobelTech(jsonObj,curPreDeepString,curDeep,curIndex)
{
    /**
     feat1=圆柱,2.1,20,30
     feat2=定位面,2.1-3.1
     feat3=零件夹具干涉,2.1-3.2,5,8,10,7
     feat4=入口面,2.1-3.3
     ;feat5=通孔,2.1-3.5,Y,0,0,10,H6,30,H6,6,0,0,0,0,0,0
     ;feat6=倒角,2.1-3.5-4.1,Y,0,0,1,H6,45,H6,下,6,0,0,0,0,0,0
     ;feat7=倒角,2.1-3.5-4.2,Y,0,0,1,H6,45,H6,上,6,0,0,0,0,0,0
     ;feat8=圆槽,2.1-3.5-4.3,Y,内,0,0,2,H6,3,H6,15,6,0,0,0,0,0,0
     feat5=盲孔,2.1-3.4,Y,0,0,10,H6,10,H6,120,H6,6,0,0,0,0,0,0
     feat6=盲孔,2.1-3.5,Y,0,0,9,H6,20,H6,120,H6,6,0,0,0,0,0,0
     feat7=盲孔,2.1-3.6,Y,0,0,6,H6,27,H6,120,H6,6,0,0,0,0,0,0
     feat8=中间孔相贯,2.1-3.7,Y,4,10
     */

    var strResult = "";

    //return strResult;

    strResult = "";

    if(jsonObj == null || jsonObj == undefined)
    {
        return "";
    }

    var strResult = "";

    if(curPreDeepString == "")
    {
        strResult = "feat" + (g_lingJianIniFeatIndex + 1) + "=" + jsonObj.Name + ","
            + (curDeep + 1) + "." + (curIndex + 1);
    }
    else
    {
        strResult = "feat" + (g_lingJianIniFeatIndex + 1) + "=" + jsonObj.Name + ","
        + curPreDeepString + "-" + (curDeep + 1) + "." + (curIndex + 1);
    }

    jsonObj.IniFeatIndex = g_lingJianIniFeatIndex;

    if(jsonObj.ParamsArray)
    {
        for(var i = 0; i < jsonObj.ParamsArray.length; i++)
        {
            strResult += ",";
            strResult += jsonObj.ParamsArray[i].Value;
        }
    }

    strResult += "\r\n";
    g_lingJianIniFeatIndex++;

    if(jsonObj.ParamList)
    {
        for(var i = 0; i < jsonObj.ParamList.length; i++)
        {
            var curDeepString = "";

            if(curPreDeepString == "")
            {
                curDeepString = "" + (curDeep + 1) + "." + (curIndex + 1);
            }
            else
            {
                curDeepString = curPreDeepString + "-" + (curDeep + 1) + "." + (curIndex + 1);
            }

            strResult += GenerateLingJianIniByJsonObj_NobelTech(jsonObj.ParamList[i],curDeepString,curDeep + 1,i);
        }
    }


    return strResult;
}
function OnClickSave_NobelTech()
{
    if(g_isInLingJianEditMode)
    {
        OnClickSaveCurLingJian_NobelTech();
    }
    else if(g_isInGongYiEditMode)
    {
        if(g_isInGongYiParamEdit)
        {
            OnClickSaveCurGongYi_NobelTech();
        }
        else if(g_isInGongYiHeBingEdit)
        {
            OnClickGongYiHeBingFinished_NobelTech();
        }

    }
}
function GenerateGongYiIniByLingJianGongYiTree_NobelTech()
{
    /*
    [feat5]
num=2
param1=1,钻,6,H6,10,H6
param2=2,铰,10,H6,10,H6
[feat6]
num=2
param1=1,钻,1,H6
param2=2,铰,1,H6
[feat7]
num=2
param1=1,钻,5,H6,27,H6
param2=2,铰,6,H6,27,H6
[feat8]
num=1
param1=1,钻,4,10
    */

    //g_lingJianTree
    var strResult = "";

    var lingJianTree = g_lingJianTree;

    if(lingJianTree == null || lingJianTree == undefined)
    {
        strResult = "";
        return;
    }

    var strFangAn = "A";

    var htmlCtrl = document.getElementById("FangAnComboBox");
    if(htmlCtrl)
    {
        strFangAn = htmlCtrl.options[htmlCtrl.selectedIndex].text;
    }

    strResult = "[plan]\r\n";
    strResult += "plan=" + strFangAn + "\r\n";

    strResult += CombineGongYiParamToLingJianTree_NobelTech(lingJianTree,0);
    //m_lingJianGongYiMap

    return strResult;
}
function CombineGongYiParamToLingJianTree_NobelTech(jsonObj,curIndex)
{
    var strResult = "";

    if(jsonObj == null || jsonObj == undefined)
    {
        return "";
    }

    var id = jsonObj.id;

    jsonObj.GongYiParamsArray = g_lingJianGongYiParamMap[id];

    if(jsonObj.GongYiParamsArray && jsonObj.GongYiParamsArray.length > 0)
    {
        strResult += "[feat" + (jsonObj.IniFeatIndex + 1) + "]\r\n";
        strResult += "num=" + jsonObj.GongYiParamsArray.length + "\r\n";

        for(var i = 0; i < jsonObj.GongYiParamsArray.length; i++)
        {
            var gongYiObj = jsonObj.GongYiParamsArray[i];
            strResult += "param" + (i + 1) + "=" + (i + 1)
                + "," + gongYiObj.GongYiTypeText
                + "," + gongYiObj.JiaGongZhiJing
                + "," + gongYiObj.JiaGongZhiJingJingDu
                + "," + gongYiObj.JiaGongShenDu
                + "," + gongYiObj.JiaGongShenDuJingDu
                + "\r\n";
        }
    }

    var paramList = jsonObj.ParamList;
    if(paramList == null || paramList == undefined)
    {
        return;
    }

    for(var i = 0; i <  paramList.length; i++)
    {
        strResult += CombineGongYiParamToLingJianTree_NobelTech(paramList[i]);
    }

    return strResult;
}
function GenerateGongYiHeBingIni_NobelTech()
{
    var strResult = "";
    var strLingJianName = g_lingJianTree.FileName;

    strResult += "[FILE]\r\n";
    strResult += "name=" + strLingJianName + "\r\n";

    if(g_searchGongYiResult == null || g_searchGongYiResult == undefined)
    {
        return;
    }

    var featIndex = 1;
    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        if(g_searchGongYiResult[i].ParamList == null || g_searchGongYiResult[i].ParamList == undefined || g_searchGongYiResult[i].ParamList.length == 0)
        {
            //是单独工艺
            var strGongYiName = g_searchGongYiResult[i].Name;
            var gongYiArray = strGongYiName.split("=");
            var gongYiArray2 = gongYiArray[0].split("node");

            strResult += "feat" + featIndex + "=" + "SP" + gongYiArray2[1] + "\r\n";
            featIndex++;
        }
        else
        {
            //是组合工艺
            strResult += "feat" + featIndex + "=";
            var count = 0;
            var strTemp = "";

            for(var j = 0; j < g_searchGongYiResult[i].ParamList.length; j++)
            {
                var strGongYiName = g_searchGongYiResult[i].ParamList[j].Name;
                var gongYiArray = strGongYiName.split("=");
                var gongYiArray2 = gongYiArray[0].split("node");

                if(count != 0)
                {
                    strTemp += ",";
                }

                strTemp += "SP" + gongYiArray2[1];
                count++;
            }

            strResult += strTemp + "\r\n";
            featIndex++;
        }
    }

    return strResult;
}
function OnClickGongYiHeBingFinished_NobelTech()
{
    var strIni = GenerateGongYiHeBingIni_NobelTech();
    var strGongYiFangAnName = "A";

    var htmlCtrl = document.getElementById("FangAnComboBox");
    if(htmlCtrl)
    {
        strGongYiFangAnName = htmlCtrl.options[htmlCtrl.selectedIndex].text;
    }

    var jsonObj = {};

    jsonObj.LingJianName = g_lingJianTree.FileName;
    jsonObj.IniString = strIni;
    jsonObj.GongYiFangAn = strGongYiFangAnName;
    if(g_searchGongYiResult)
    {
        jsonObj.StepCount = g_searchGongYiResult.length;
    }
    else
    {
        jsonObj.StepCount = 0;
    }

    var strString = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?onCombineGongYi=1",
        data: strString,
        success: function (response) {
            var jsonObj = JSON.parse(response);
            g_searchGongYiResult = jsonObj;
            UpdateGongYiTeZhengUIByJson_NobelTech(g_searchGongYiResult);

            setTimeout("UpdateTree_NobelTech(true)",50);

        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function OnClickSaveCurGongYi_NobelTech()
{
    SaveCurGongYiParam_NobelTech();

    if(g_lingJianTree && g_lingJianTree.ParamList)
    {
        g_lingJianIniFeatIndex = 0;
        GenerateLingJianIniByJsonObj_NobelTech(g_lingJianTree.ParamList[0],"",1,0);
    }

    var strIni = GenerateGongYiIniByLingJianGongYiTree_NobelTech();

    var lingJianName = g_lingJianTree;

    var strFangAn = "A";

    var htmlCtrl = document.getElementById("FangAnComboBox");
    if(htmlCtrl)
    {
        strFangAn = htmlCtrl.options[htmlCtrl.selectedIndex].text;
    }

    var jsonObj = {};
    jsonObj.LingJianName = g_lingJianTree.FileName;
    jsonObj.IniString = strIni;
    jsonObj.GongYiFangAn = strFangAn;

    var strString = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?saveGongYi=1",
        data: strString,
        success: function (response) {
            var jsonObj = JSON.parse(response);
            g_searchGongYiResult = jsonObj;
            g_isInGongYiParamEdit = false;
            g_isInGongYiHeBingEdit = true;
            UpdateGongYiTeZhengUIByJson_NobelTech(g_searchGongYiResult);

            setTimeout("UpdateTree_NobelTech(true)",50);

        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function SaveCurGongYiParam_NobelTech()
{
    //zhengli
    if(g_lastSelectedLingJianId == null || g_lastSelectedLingJianId == undefined)
    {
        return;
    }

    var gongYiCountCtrl = document.getElementById("SelectGongYiCount");
    if(gongYiCountCtrl == null || gongYiCountCtrl == undefined)
    {
        return;
    }

    var gongYiCount = parseInt(gongYiCountCtrl.value);

    var gongYiParamsArray = new Array();

    for(var i = 0; i < gongYiCount; i++)
    {
        var ctrlId = "SelectGongYiCount_" + i;
        var htmlCtrl = document.getElementById(ctrlId);

        var gongYiType = 0;
        var jiaGongZhiJing = 1;
        var jiaGongZhiJingJingDu = "H6";
        var jiaGongShenDu = 1;
        var jiaGongShenDuJingDu = "H6";
        var gongYiTypeText = "";

        //加工类型
        if(htmlCtrl)
        {
            //0,1,2 钻，铣，铰
            gongYiType = parseInt(htmlCtrl.value);
            gongYiTypeText = htmlCtrl.options[htmlCtrl.selectedIndex].text;
        }

        //加工直径
        ctrlId = "JiaGongZhiJing_" + i;
        htmlCtrl = document.getElementById(ctrlId);
        if(htmlCtrl)
        {
            jiaGongZhiJing = htmlCtrl.value;
        }

        //加工直径精度
        ctrlId = "JiaGongZhiJingJingDu_" + i;
        htmlCtrl = document.getElementById(ctrlId);
        if(htmlCtrl)
        {
            jiaGongZhiJingJingDu = htmlCtrl.value;
        }

        //加工深度
        ctrlId = "JiaGongShenDu_" + i;
        htmlCtrl = document.getElementById(ctrlId);
        if(htmlCtrl)
        {
            jiaGongShenDu = htmlCtrl.value;
        }

        //加工深度精度
        ctrlId = "JiaGongShenDuJingDu_" + i;
        htmlCtrl = document.getElementById(ctrlId);
        if(htmlCtrl)
        {
            jiaGongShenDuJingDu = htmlCtrl.value;
        }

        var jsonObj = {};
        jsonObj.GongYiType = gongYiType;
        jsonObj.GongYiTypeText = gongYiTypeText;
        jsonObj.JiaGongZhiJing = jiaGongZhiJing;
        jsonObj.JiaGongZhiJingJingDu = jiaGongZhiJingJingDu;
        jsonObj.JiaGongShenDu = jiaGongShenDu;
        jsonObj.JiaGongShenDuJingDu = jiaGongShenDuJingDu;

        gongYiParamsArray.push(jsonObj);
    }

    g_lingJianGongYiParamMap[g_lastSelectedLingJianId] = gongYiParamsArray;
}
function OnGenerateLingJianCallBack_NobelTech(jsonCallBack)
{
    var jsonObj = JSON.parse(jsonCallBack);

    if(g_lingJianTree)
    {
        g_lingJianTree.FileName = jsonObj.FileName;
        g_lingJianTree.ModelUrl = jsonObj.ModelFileList;
        g_lingJianTree.PdfUrl = jsonObj.PdfList;
    }

}
function OnClickSaveCurLingJian_NobelTech()
{
    //g_lingJianTree
    OnClickSaveParam_NobelTech();

    GenerateLingJianJsonObjByLingJianContainer_NobelTech(false);
    if(g_lingJianTree == null || g_lingJianTree == undefined)
    {
        return;
    }

    g_lingJianIniFeatIndex = 0;

    var strIni = "[file]\r\n" + GenerateLingJianIniByJsonObj_NobelTech(g_lingJianTree.ParamList[0],"",1,0);

    var strLingJianTree = JSON.stringify(g_lingJianTree);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?generateLingJian=1",
        data: strIni,
        success: function (response) {
            OnGenerateLingJianCallBack_NobelTech(response);
            onCallBack(response,0);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });

    if(g_isInLingJianEditMode)
    {
        alert("保存成功，等待生成模型");
    }
    else if(g_isInGongYiEditMode)
    {
        alert("保存成功");
    }
    else if(g_isInDaoJuEditMode)
    {
        alert("保存成功");
    }
    else
    {
        alert("保存成功");
    }
}
function DoCreateAndSaveCurLingJian_NobelTech()
{
    if(g_lingJianTree == null || g_lingJianTree == undefined)
    {
        return;
    }

    g_lingJianTree.Name = GenerateUUID();

    var strLingJianTree = JSON.stringify(g_lingJianTree);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?createLingJian=1",
        data: strLingJianTree,
        success: function (response) {
            onCallBack(response,0);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function OnClickCreateAndSaveCurLingJian_NobelTech()
{
    var g_isInLingJianEditMode = false;
    var g_isInGongYiEditMode = false;
    var g_isInDaoJuEditMode = false;

    if(g_isInLingJianEditMode)
    {
        DoCreateAndSaveCurLingJian_NobelTech();
    }
    else if(g_isInGongYiEditMode)
    {
        DoCreateAndSaveCurGongYi_NobelTech();
    }
    else if(g_isInDaoJuEditMode)
    {
        DoCreateAndSaveCurDaoJu_NobelTech();
    }
    else
    {
        alert("保存成功");
    }
}
function OnClickLingJianSearchCancel_NobelTech()
{
    //回到最初页面
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        return;
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
            strHtml += m_globalKuContainer[i].GenerateHtmlStr(i);
        }
    }

    htmlObj.innerHTML = strHtml;

    for(var i = 0; i < 5; i++)
    {
        var strHtmlId = "KuFilterBtn" + (i + 1);
        var htmlObj = document.getElementById(strHtmlId);

        if(htmlObj == null || htmlObj == undefined)
        {
            continue;
        }

        if(i == index)
        {
            htmlObj.style.backgroundColor = "#cccccc";
        }
        else
        {
            htmlObj.style.backgroundColor = "mediumpurple";
        }

    }

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
function OnClickCloseSlotPanel_NobelTech()
{
    var htmlObj = document.getElementById("EditSlot");

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    htmlObj.style.visibility = "hidden";

    HideAllFunctionBtns_NobelTech();

    var btnCombine = document.getElementById("ParamDesignBtn_4");
    if(btnCombine)
    {
        btnCombine.style.visibility = "hidden";
    }

    var cancelCombine = document.getElementById("ParamDesignBtn_5");
    if(cancelCombine)
    {
        cancelCombine.style.visibility = "hidden";
    }
}
function LoadLingJianSearchUI2_NobelTech()
{
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        //return;
    }

    var saveLingJianBtn = document.getElementById("SaveCurLingJianBtn");
    if(saveLingJianBtn == null || saveLingJianBtn == undefined)
    {
        //return;
    }

    var createAndSaveLingJianBtn = document.getElementById("CreateAndSaveCurLingJianBtn");
    if(createAndSaveLingJianBtn == null || createAndSaveLingJianBtn == undefined)
    {
        //return;
    }

    var cancelSearchLingJianBtn = document.getElementById("CancelSearchLingJianBtn");
    if(cancelSearchLingJianBtn == null || cancelSearchLingJianBtn == undefined)
    {
        return;
    }

    var searchLingJianBtn = document.getElementById("SearchLingJianBtn");
    if(searchLingJianBtn == null || searchLingJianBtn == undefined)
    {
        return;
    }

    if(cancelSearchLingJianBtn)
    {
        cancelSearchLingJianBtn.style.visibility = "inherit";
    }

    if(searchLingJianBtn)
    {
        searchLingJianBtn.style.visibility = "inherit";
    }

    if(saveLingJianBtn)
    {
        saveLingJianBtn.style.visibility = "hidden";
    }

    if(createAndSaveLingJianBtn)
    {
        createAndSaveLingJianBtn.style.visibility = "hidden";
    }

    var combineBtn = document.getElementById("ParamDesignBtn_4");
    if(combineBtn)
    {
        combineBtn.style.visibility = "hidden";
    }

    var cancelCombineBtn = document.getElementById("ParamDesignBtn_5");
    if(cancelCombineBtn)
    {
        cancelCombineBtn.style.visibility = "hidden";
    }

    var queRenBtn = document.getElementById("ParamDesignBtn3");
    if(queRenBtn)
    {
        queRenBtn.style.visibility = "hidden";
    }

    kuSlotTitle.style.visibility = "inherit";
    kuSlotTitle.style.position = "absolute";
    kuSlotTitle.style.marginLeft = "0px";
    kuSlotTitle.innerText = "零件特征库";

    kuSlotContainer.style.visibility = "inherit";
    kuSlotContainer.style.position = "absolute";
    kuSlotContainer.style.marginLeft = "0px";
    kuSlotContainer.style.marginTop = "50px";
    kuSlotContainer.innerHTML = "<ul id='KuContainer' class='slot-list'></ul>";

    lingJianSlotTitle.style.visibility = "inherit";
    lingJianSlotTitle.style.position = "absolute";
    lingJianSlotTitle.style.marginLeft = "500px";
    lingJianSlotTitle.innerText = "零件设计";

    var strLingJianInnerHtml = "";
    strLingJianInnerHtml += "<ul id='LingJianDesign' class='slot-list'>";
    strLingJianInnerHtml += "<li class='slot-item'>";
    strLingJianInnerHtml += "<div class='slot-handler'>";
    strLingJianInnerHtml += "<div class='slot-handler clearfix'></div></div></li></ul>";

    lingJianSlotContainer.style.visibility = "inherit";
    lingJianSlotContainer.style.position = "absolute";
    lingJianSlotContainer.style.marginLeft = "500px";
    lingJianSlotContainer.style.marginTop = "50px";
    lingJianSlotContainer.innerHTML = strLingJianInnerHtml;

    paramDesignSlotTitle.style.visibility = "inherit";
    paramDesignSlotTitle.style.position = "absolute";
    paramDesignSlotTitle.style.marginLeft = "1000px";
    paramDesignSlotTitle.style.width = "30%";
    paramDesignSlotTitle.innerText = "搜索条件";

    var strParamDesignInnerHtml = "";
    strParamDesignInnerHtml += "<embed id='pdfCtrl2' src='./pdf/test1.pdf' style='position:absolute;visibility:hidden;' type='application/pdf' width='100%' height='100%'></embed>";
    strParamDesignInnerHtml += "<ul id='ParamDesign' class='slot-list-nopointer'></ul>";

    paramDesignSlotContainer.style.visibility = "inherit";
    paramDesignSlotContainer.style.position = "absolute";
    paramDesignSlotContainer.style.marginLeft = "1000px";
    paramDesignSlotContainer.style.marginTop = "50px";
    paramDesignSlotContainer.style.width = "30%";
    paramDesignSlotContainer.innerHTML = strParamDesignInnerHtml;

    if(paramDesignPdfCtrl)
    {
        paramDesignPdfCtrl.style.visibility = "inherit";
    }

    m_globalKuContainer = new Array();
    m_globalZuHeContainer = new Array();
    m_globalParamDesign = new Array();

    LoadKuUIConfig("./config/LingJian/Ku.json",function(){
        var htmlObj = document.getElementById("KuContainer");
        if(htmlObj == null || htmlObj == undefined)
        {
            return;//；
        }

        var strHtml = "";
        for(var i = 0; i < m_globalKuContainer.length; i++)
        {
            strHtml += m_globalKuContainer[i].GenerateHtmlStr(i);
        }

        htmlObj.innerHTML = strHtml;
        htmlObj.m_jsonConfigObj = m_globalKuContainer[i];

        OnClickLingJianCharacteristic_NobelTech(0);

    });

    var strConfigFilePath = null;
    if(g_isInLingJianSearchMode == true)
    {
        var scope = this;
        var loader = new THREE.FileLoader( scope.manager );
        strConfigFilePath = "./config/LingJian/CommonSearch.json";
        loader.load( strConfigFilePath, function ( text ) {
            var jsonObj = JSON.parse(text);
            UpdateParamDesignByJson_NobelTech(jsonObj);
        });
    }

    HideAllFunctionBtns_NobelTech(false);
}
function OnClickLastSearchResult_NobelTech()
{
    if(m_bLastSearchBtnAvailable == false)
    {
        return;
    }
    if(g_searchedLingJianResult == null || g_searchedLingJianResult == undefined)
    {
        g_searchedLingJianResult = new Array();
    }

    g_isInLingJianSearchMode = true;
    var g_isInLingJianEditMode = false;
    var g_isInGongYiEditMode = false;
    var g_isInDaoJuEditMode = false;
    //g_searchedLingJianResult = JSON.parse(response);
    ChangeToLingJianSearchResultUI_NobelTech();
    UpdateLingJianSearchResult_NobelTech(g_searchedLingJianResult);

    NormalLight3EditBtns();

    OpenSlotPanel_NobelTech();
}
function OnClickLingJianSearch_NobelTech()
{
    if(m_bLingJianSearchBtnAvailable == false)
    {
        return;
    }

    HideGongYiYuanZeUI_ZuHeNobelTech();

    g_searchedDaoJuResult = null;
    g_searchGongYiResult = null;

    g_isInLingJianSearchMode = true;
    g_isInGongYiEditMode = false;
    g_isInDaoJuEditMode = false;

    g_lingJianTree = null;

    NormalLight3EditBtns();

    OnClickLingJianCharacteristic_NobelTech(0);
    LoadLingJianSearchUI2_NobelTech();

    OpenSlotPanel_NobelTech();

    setTimeout("UpdateTree_NobelTech()",50);
}
function OpenSlotPanel_NobelTech()
{
    var htmlObj = document.getElementById("EditSlot");

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    htmlObj.style.visibility = "visible";
}
function OnUpdateSearchState(state) //0 search, 1design
{
    g_bHasSearchOrDesigned = true;

    var daoJuStateHtml = document.getElementById("DaoJuStateLabel");

    if(daoJuStateHtml == null || daoJuStateHtml == undefined)
    {
        return;
    }

    if(state == 0)
    {
        daoJuStateHtml.innerText = "Search";
    }
    else
    {
        daoJuStateHtml.innerText = "Design";
    }
}
function UpdateMaterialComboBox(index)
{
    var htmlObj1 = document.getElementById("MaterialTypeComboBox");

    if(htmlObj1 == null || htmlObj1 == undefined)
    {
        return;
    }

    var htmlObj2 = document.getElementById("MaterialSubTypeComboBox");

    if(htmlObj2 == null || htmlObj2 == undefined)
    {
        return;
    }

    var htmlObj3 = document.getElementById("MaterialIdComboBox");

    if(htmlObj3 == null || htmlObj3 == undefined)
    {
        return;
    }

    htmlObj1.value = "" + index;
    htmlObj2.value = "" + index;
    htmlObj3.value = "" + index;
}
function OnMaterialTypeComboBoxChanged()
{
    var htmlObj = document.getElementById("MaterialTypeComboBox");

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    var index = parseInt(htmlObj.value);

    UpdateMaterialComboBox(index);
    UpdateMaterialNameLabel(index);
}
function OnMaterialSubTypeComboBoxChanged()
{
    var htmlObj = document.getElementById("MaterialSubTypeComboBox");

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    var index = parseInt(htmlObj.value);

    UpdateMaterialComboBox(index);
    UpdateMaterialNameLabel(index);
}
function OnMaterialIdComboBoxChanged()
{
    var htmlObj = document.getElementById("MaterialIdComboBox");

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    var index = parseInt(htmlObj.value);

    UpdateMaterialComboBox(index);
    UpdateMaterialNameLabel(index);
}
function UpdateMaterialNameLabel(index)
{
    var htmlObj = document.getElementById("MaterialName");

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    var strMaterialName = "";

    switch (index)
    {
        case 0:
            strMaterialName = "低合金普通结构钢，0.25%<C<0.67%wt 低合金调质钢";
            break;
        case 1:
            strMaterialName = "中等合金奥氏体不锈钢";
            break;
        case 2:
            strMaterialName = "奥贝球铁(ADI)";
            break;
        case 3:
            strMaterialName = "铁基高温合金";
        break;
    }

    htmlObj.innerText = strMaterialName;
}
function DisplayTuZhiForTest_ZZGC()
{
    var htmlObj = document.getElementById("DisplayTuZhiComboBox");

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    var tuZhiHtmlObj = document.getElementById("pdfCtrl");
    if(tuZhiHtmlObj == null)
    {
        return;
    }

    if(g_bHasSearchOrDesigned == false)
    {
        DisplayTuZhi();
        return;
    }

    var index = parseInt(htmlObj.value);

    if(index == 0)
    {
        tuZhiHtmlObj.src = "./obj/test/zuantou655.pdf";
    }
    else if(index == 1)
    {
        tuZhiHtmlObj.src = "./pdf/caoxing.pdf";
    }
    else if(index == 2)
    {
        tuZhiHtmlObj.src = "./pdf/table.pdf";
    }

    DisplayTuZhi();
}
function Display3DModelForTest_ZZGC()
{
    Display3DModel();
}
function CanBeZiJi_NobelTech(e)
{
    var bResult = true;
    var slotContainer = e.parentNode.parentNode.parentNode.parentNode.parentNode;

    var children = slotContainer.childNodes;
    var htmlElementChildren = new Array();
    for(var i = 0; i < children.length; i++)
    {
        if(children[i].style != null && children[i].style != undefined)
        {
            htmlElementChildren.push(children[i]);
        }
    }

    for(var i = 0; i + 1 < htmlElementChildren.length; i++)
    {
        if(htmlElementChildren[i + 1] == e.parentNode.parentNode.parentNode.parentNode)
        {
            if (i + 1 == 1)
            {
                bResult = false;
                break;
            }

            var parentMarginLeft = 0;
            if(htmlElementChildren[i].style.marginLeft != "")
            {
                parentMarginLeft = parseInt(htmlElementChildren[i].style.marginLeft);
            }

            var childMarginLeft = 0;
            if(htmlElementChildren[i + 1].style.marginLeft != "")
            {
                childMarginLeft = parseInt(htmlElementChildren[i + 1].style.marginLeft);
            }
            if(parentMarginLeft <= childMarginLeft - 45)
            {
                bResult = false;
            }

            break;
        }
    }

    return bResult;
}
function OnClickZiJi_NobelTech(e)
{

    //var htmlObj = document.getElementById(strItemId);
    //var htmlObj = this;

    var htmlObj = e.parentNode.parentNode.parentNode.parentNode;

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    if(CanBeZiJi_NobelTech(e) == false)
    {
        return;
    }

    var marginLeft = 0;

    var strMarginLeft = htmlObj.style.marginLeft;
    if(strMarginLeft == "" || strMarginLeft == undefined || strMarginLeft == null)
    {
        marginLeft = 45;
    }
    else
    {
        marginLeft = parseInt(strMarginLeft);
        marginLeft += 45;
    }
    strMarginLeft = "" + parseInt(marginLeft) + "px";

    htmlObj.style.marginLeft = strMarginLeft;

    setTimeout("UpdateTree_NobelTech()",10);
}
function OnClickRemove_NobelTech(e)
{
    var htmlObj = e.parentNode.parentNode.parentNode.parentNode;

    if(htmlObj == null || htmlObj == undefined)
    {
        return;
    }

    htmlObj.parentNode.removeChild(htmlObj);

    setTimeout("UpdateTree_NobelTech()",10);
}
function OnClickClearTree_NobelTech()
{
    var html = document.getElementById("LingJianDesign");

    if(html == null || html == undefined)
    {
        return;
    }

    /*
    <li class="slot-item"><div class="slot-handler">
										<div class="slot-handler clearfix">
											<div class="avator">
												<img src="img/avatar5.jpg"/>
											</div>
											<div class="content">
												<div class="item-title">倒角(铣)</div>

												<p>design the area filter ui</p>
											</div>

										</div>
									</div></li>
    * */
    html.innerHTML = "<li class='slot-item'><div class='slot-handler'><div class='slot-handler clearfix'></div></div></li>";

    UpdateTree_NobelTech();
    return;

    var children = html.children();
    for(var i = 0; i < children.length; i++)
    {
        children[i].parentNode.removeChild(children[i]);
    }

    UpdateTree_NobelTech();
}
function OnClickDisplayTree_NobelTech()
{
    UpdateTree_NobelTech();
}
function UpdateLingJianContainerByJson_NobelTech(jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var root = jsonObj[0];
    if(root == null || root == undefined)
    {
        return;
    }

    var paramList = root.ParamList;
    if(paramList == null || paramList == undefined)
    {
        return;
    }

    for(var i = 0; i < paramList.length; i++)
    {

    }
    //for()

}
function UpdateTree_NobelTech(bUseJsonTree)
{
    var jsonObj = GenerateLingJianJsonObjByLingJianContainer_NobelTech(bUseJsonTree);

    LoadLingJianUIByJsonObj_NobelTech(jsonObj,OnFinishLoadUI);
}
function OnClickDisplay3dModelInPanel_NobelTech()
{
    var strIni = GenerateIniByConfig_NobelTech();

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?generateLingJian=1",
        data: strIni,
        success: function (response) {
            onCallBack(response,0);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });

    Display3DModel();
}
function GetTypeByLingJianJson_NobelTech(jsonObj)
{
    var paramList = jsonObj.ParamList;

    for(var i = 0; i < paramList.length; i++)
    {
        if(paramList[i].Name == "类型")
        {
            var strChoise = paramList[i].Choise;
            var choiseArray = strChoise.split(",");
            var iChoise = parseInt(choiseArray[0]);
            return iChoise;
        }
    }

    return 1;
}
function GetLingJianParamValue_NobelTech(jsonObj,paramName)
{
    var result = null;
    var paramList = jsonObj.ParamList;

    for(var i = 0; i < paramList.length; i++)
    {
        if(paramList[i].Name == paramName)
        {
            if(paramList[i].Type == "EditBox")
            {
                if(paramList[i].Value != null && paramList[i].Value != undefined)
                {
                    result = paramList[i].Value;
                }
                else
                {
                    result = paramList[i].DefaultValue;
                }
            }
            else if(paramList[i].Type == "ComboBox")
            {
                if(paramList[i].Value != null && paramList[i].Value != undefined)
                {
                    result = paramList[i].Value;
                }
                else
                {
                    result = paramList[i].DefaultValue;
                }

                var choiseArray = paramList[i].Choise.split(',');
                result = choiseArray[parseInt(result)];
            }
            break;
        }
    }

    return result;

}
function GetIniStringByJson_NobelTech(jsonObj,index)
{
    var gongYiType = GetTypeByLingJianJson_NobelTech(jsonObj);
    var strResult = "";

    switch(gongYiType)
    {
        case 1:
            strResult += "feat" + index + "=" + gongYiType + ","
                + "2." + index + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"子特征数据") + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"直径") + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"深度") + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"是否通孔") + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"顶角") + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"X") + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"Y") + "";
            break;
        case 4:
            strResult += "feat" + index + "=" + gongYiType + ","
                + "2." + index + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"子特征数据") + ","
                + GetLingJianParamValue_NobelTech(jsonObj,"位置深度");
            break;
        default:
            break;
    }

    return strResult;
}
function GenerateIniRootString_NobelTech()
{
    var result = "[file]\r\n";

    var htmlContainer = document.getElementById("LingJianDesign");

    if(htmlContainer == null || htmlContainer == undefined)
    {
        return;
    }

    var items = new Array();
    for(var i = 0; i < htmlContainer.childNodes.length; i++)
    {
        if(htmlContainer.childNodes[i].style == null || htmlContainer.childNodes[i].style == undefined)
        {
            continue;
        }

        items.push(htmlContainer.childNodes[i]);
    }

    for(var i = 0; i < items.length; i++)
    {
        if(parseInt(items[i].style.marginLeft) == 0)
        {
            //是 root 结点
            //根据形状返回ini字符串
            var jsonObj = g_lingJianParamMap[items[i].id];

            if(jsonObj == null || jsonObj == undefined)
            {
                continue;
            }

            result += GenerateXingZhuangIniByJson_NobelTech(jsonObj);

            break;
        }
    }

    return result;
}
function GenerateXingZhuangIniByJson_NobelTech(jsonObj)
{
    var strResult = "";
    var paramList = jsonObj.ParamList;

    for(var i = 0; i < paramList.length; i++)
    {
        if(paramList[i].IniName != null && paramList[i].IniName != undefined)
        {
            strResult += paramList[i].IniName + "=" + paramList[i].Value + "\r\n";
        }
    }

    return strResult;
}
function GenerateIniByConfig_NobelTech()
{

    var strIni = "";
    /*
    strIni += "[file]\r\n";
    strIni += "part_type=1\r\n";
    strIni += "H=150\r\n";
    strIni += "L=30\r\n";
    strIni += "W=30\r\n";
    strIni += "R=30\r\n";
    strIni += "start_feat_D=65\r\n";
    */
    strIni += GenerateIniRootString_NobelTech();
    strIni += "start_feat_D=65\r\n";

    var htmlContainer = document.getElementById("LingJianDesign");

    if(htmlContainer == null || htmlContainer == undefined)
    {
        return;
    }

    var items = new Array();
    for(var i = 0; i < htmlContainer.childNodes.length; i++)
    {
        if(htmlContainer.childNodes[i].style == null || htmlContainer.childNodes[i].style == undefined)
        {
            continue;
        }

        items.push(htmlContainer.childNodes[i]);
    }

    var strResult = "";

    var featIndex = 1;
    for(var i = 0; i < items.length; i++) {
        var jsonObj = g_lingJianParamMap[items[i].id];
        if(jsonObj == null || jsonObj == undefined)
        {

        }
        else
        {
            strIni += GetIniStringByJson_NobelTech(jsonObj,i);
        }

        strIni += "\r\n";
    }

    /*
    strResult += "[file]\r\n";
    strResult += "part_type=1\r\n";
    strResult += "H=150\r\n";
    strResult += "L=30\r\n";
    strResult += "W=30\r\n";
    strResult += "R=30\r\n";
    strResult += "start_feat_D=65\r\n";

    strResult += "feat1=4,2.1,1,0\r\n";
    strResult += "feat2=1,2.2,1,8,20,1,118,0,0\r\n";
    strResult += "feat3=1,2.3,1,7.5,20,1,118,0,0\r\n";
    strResult += "feat4=1,2.4,1,7,20,1,118,0,0\r\n";
    strResult += "feat5=1,2.5,1,6.5,50,1,118,0,0\r\n";
    strResult += "feat6=1,2.6,1,6,20,1,118,0,0\r\n";
    */

    return strIni;

}
function OnClickDisplayTuZhiModelInPanel_NobelTech()
{
    OnClickDisplay3dModelInPanel_NobelTech();

    DisplayTuZhi();
}
function OnClickSaveParam_NobelTech()
{
    SaveCurParamDesign_NobelTech();
}
function UpdateHtmlCtrlByJson_NobelTech(jsonObj)
{
    var paramList = jsonObj.ParamsArray;

    for(var i = 0; i < paramList.length; i++)
    {
        var htmlId = paramList[i].HtmlCtrlId;

        if(htmlId == null || htmlId == undefined)
        {
            continue;
        }

        var htmlCtrl = document.getElementById(htmlId);
        if(htmlCtrl == null || htmlCtrl == undefined)
        {
            continue;
        }

        if(paramList[i].Value != null && paramList[i].Value != undefined)
        {
            htmlCtrl.value = paramList[i].Value;
        }
        else
        {
            htmlCtrl.value = "" + paramList[i].DefaultValue;
        }

    }
}
function UpdateCommonParamDesignByJson_NobelTech(jsonObj)
{
    var slotContainer = document.getElementById("ParamDesign");

    if(slotContainer == null || slotContainer == undefined)
    {
        return;
    }

    var strHtml = "";

    for(var i = 0; i < jsonObj.length; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='avator'>";
        //strHtml += "<img src='img/avatar4.jpg'/>";
        strHtml += "</div>";
        strHtml += "<div class='content'>";
        strHtml += "<div class='item-title'>" + jsonObj[i].Name + "</div>";
        strHtml += "</div>";

        var uuid = GenerateUUID();
        jsonObj[i].HtmlCtrlId = uuid;

        if(jsonObj[i].Type == "ComboBox")
        {
            strHtml += "<select id='" + uuid + "' style='margin-left: -120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";

            var strChoise = jsonObj[i].Choise;
            var choiseArray = strChoise.split(",");
            for(var j = 0; j < choiseArray.length;j++)
            {
                strHtml += "<option value ='" + j + "'>" + choiseArray[j] + "</option>";
            }

            strHtml += "</select>";

        }
        else if(jsonObj[i].Type == "EditBox")
        {
            /*
            <input style="position: absolute;margin-left: -120px;margin-top: 10px;width:30px;" type="text" name="jiaChiLength" />
											<div style="position: absolute;margin-left: 330px;margin-top: 10px;width:40px;">mm</div>
            * */
            if(jsonObj[i].HtmlCtrlId != null && jsonObj[i].HtmlCtrlId != undefined)
            {
                uuid = jsonObj[i].HtmlCtrlId;
            }

            strHtml += "<input id='" + uuid + "' style='margin-left: -140px;margin-top: 10px;width:100px;text-align:right;' type='text' name='jiaChiLength' />";

            if(jsonObj[i].DanWeiString)
            {
                strHtml += "<div style='margin-left: 330px;margin-top: -75px;width:40px;'>" + paramListArray[i].DanWeiString + "</div>";
            }
        }
        else if(jsonObj[i].Type == "EditBox2")
        {
            /*
           <input style="position: absolute;margin-left: -120px;margin-top: 10px;width:30px;" type="text" name="jiaChiLength" />
                                           <div style="position: absolute;margin-left: 330px;margin-top: 10px;width:40px;">mm</div>
           * */
            if(jsonObj[i].HtmlCtrlId != null && jsonObj[i].HtmlCtrlId != undefined)
            {
                uuid = jsonObj[i].HtmlCtrlId;
            }

            //strHtml += "<input id='" + uuid + "' style='margin-left: -180px;margin-top: 10px;width:60px;text-align:right;' type='text' name='jiaChiLength' />";

            if(jsonObj[i].Text1)
            {
                strHtml += "<span style='margin-left: -120px;margin-top: 10px;width:40px;'>" + jsonObj[i].Text1 + "</span>";
            }

            var uuid2 = GenerateUUID();

            strHtml += "<input id='" + uuid2 + "' style='margin-left: 40px;margin-top: 10px;width:60px;text-align:right;' type='text' name='jiaChiLength' />";

            jsonObj[i].HtmlCtrlId2 = uuid2;
        }
        else if(jsonObj[i].Type == "EditBox3")
        {
            /*
           <input style="position: absolute;margin-left: -120px;margin-top: 10px;width:30px;" type="text" name="jiaChiLength" />
                                           <div style="position: absolute;margin-left: 330px;margin-top: 10px;width:40px;">mm</div>
           * */
            if(jsonObj[i].HtmlCtrlId != null && jsonObj[i].HtmlCtrlId != undefined)
            {
                uuid = jsonObj[i].HtmlCtrlId;
            }

            strHtml += "<input id='" + uuid + "' style='margin-left: -180px;margin-top: 10px;width:60px;text-align:right;' type='text' name='jiaChiLength' />";

            if(jsonObj[i].Text1)
            {
                strHtml += "<span style='margin-left: 30px;margin-top: 6px;padding-top:6px;width:40px;'>" + jsonObj[i].Text1 + "</span>";
            }

            var uuid2 = GenerateUUID();

            strHtml += "<input id='" + uuid2 + "' style='margin-left: 40px;margin-top: 10px;width:60px;text-align:right;' type='text' name='jiaChiLength' />";

            jsonObj[i].HtmlCtrlId2 = uuid2;
        }

        strHtml += "</div></div></li>";
    }

    slotContainer.innerHTML = strHtml;

    //UpdateHtmlCtrlByJson_NobelTech(jsonObj);
}
function UpdateParamDesignByJson_NobelTech(jsonObj)
{
    var slotContainer = document.getElementById("ParamDesign");

    if(slotContainer == null || slotContainer == undefined)
    {
        return;
    }

    var paramListArray = jsonObj.ParamsArray;
    if(paramListArray == null || paramListArray == undefined)
    {
        return;
    }

    var strHtml = "";

    for(var i = 0; i < paramListArray.length; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='avator'>";
        //strHtml += "<img src='img/avatar4.jpg'/>";
        strHtml += "</div>";
        strHtml += "<div class='content'>";
        strHtml += "<div class='item-title'>" + paramListArray[i].Name + "</div>";
        strHtml += "</div>";

        var uuid = GenerateUUID();

        if(paramListArray[i].Type == "ComboBox")
        {
            strHtml += "<select id='" + uuid + "' style='margin-left: -120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";

            var strChoise = paramListArray[i].Choise;
            var choiseArray = strChoise.split(",");
            for(var j = 0; j < choiseArray.length;j++)
            {
                strHtml += "<option value ='" + j + "'>" + choiseArray[j] + "</option>";
            }

            strHtml += "</select>";

        }
        else if(paramListArray[i].Type == "EditBox")
        {
            /*
            <input style="position: absolute;margin-left: -120px;margin-top: 10px;width:30px;" type="text" name="jiaChiLength" />
											<div style="position: absolute;margin-left: 330px;margin-top: 10px;width:40px;">mm</div>
            * */
            if(paramListArray[i].HtmlCtrlId != null && paramListArray[i].HtmlCtrlId != undefined)
            {
                uuid = paramListArray[i].HtmlCtrlId;
            }

            strHtml += "<input id='" + uuid + "' style='margin-left: -120px;margin-top: 10px;width:100px;text-align:right;' type='text' name='jiaChiLength' />";

            if(paramListArray[i].DanWeiString)
            {
                strHtml += "<div style='margin-left: 330px;margin-top: -75px;width:40px;'>" + paramListArray[i].DanWeiString + "</div>";
            }

            if(paramListArray[i].ID == "InputLingJianHaoSearch")
            {

                //paramListArray[i]
            }

        }

        paramListArray[i].htmlCtrlId = uuid;

        strHtml += "</div></div></li>";
    }

    slotContainer.innerHTML = strHtml;

    UpdateHtmlCtrlByJson_NobelTech(jsonObj);
}
function GenerateParamDesignStrHtmlByJson_NobelTechs(jsonObj,bSubMenu)
{
    var strHtml = "";
    var paramListArray = jsonObj.ParamsArray;
    if(paramListArray == null || paramListArray == undefined)
    {
        return strHtml;
    }

    for(var i = 0; i < paramListArray.length; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='avator'>";
            //strHtml += "<img src='img/avatar4.jpg'/>";
        strHtml += "</div>";

        strHtml += "<div class='content'>";
        strHtml += "<div class='item-title'>" + paramListArray[i].Name + "</div>";
        strHtml += "</div>";

        var uuid = GenerateUUID();

        if(paramListArray[i].Type == "ComboBox")
        {
            if(paramListArray[i].HtmlCtrlId != null && paramListArray[i].HtmlCtrlId != undefined)
            {
                uuid = paramListArray[i].HtmlCtrlId;
            }

            var choiseIndex = parseInt(paramListArray[i].DefaultValue);

            strHtml += "<select id='" + uuid + "' style='margin-left: -75px;margin-top: 7px;width:116px;height:22px;font-size: 10px;' onchange='OnParamDesignComboBoxChanged(this.id)' value='" + choiseIndex + "'>";

            var strChoise = paramListArray[i].Choise;
            var bSubMenu = false;
            if(typeof(strChoise) == "string")
            {
                var choiseArray = strChoise.split(",");
                for(var j = 0; j < choiseArray.length;j++)
                {
                    var strSelected = "";
                    if(choiseIndex == j)
                    {
                        strSelected = "selected='selected'";
                    }
                    strHtml += "<option value ='" + j + "' " + strSelected + ">" + choiseArray[j] + "</option>";
                }
            }
            else
            {
                var choiseArray = strChoise;
                for(var j = 0; j < choiseArray.length;j++)
                {
                    var strSelected = "";
                    if(choiseIndex == j)
                    {
                        strSelected = "selected='selected'";
                    }
                    strHtml += "<option value ='" + j + "' " + strSelected + ">" + choiseArray[j].Name + "</option>";
                }

                bSubMenu = true;
            }
            strHtml += "</select>";

            if(bSubMenu)
            {
                var tempStr = GenerateParamDesignStrHtmlByJson_NobelTechs(choiseArray[choiseIndex],true);
                strHtml += tempStr;
            }
        }
        else if(paramListArray[i].Type == "EditBox")
        {
            /*
            <input style="position: absolute;margin-left: -120px;margin-top: 10px;width:30px;" type="text" name="jiaChiLength" />
											<div style="position: absolute;margin-left: 330px;margin-top: 10px;width:40px;">mm</div>
            * */
            if(paramListArray[i].HtmlCtrlId != null && paramListArray[i].HtmlCtrlId != undefined)
            {
                uuid = paramListArray[i].HtmlCtrlId;
            }

            strHtml += "<input id='" + uuid + "' style='margin-left: -75px;margin-top: 7px;width:112px;height: 16px;text-align:right;' type='text' name='jiaChiLength' onchange='OnParamDesignEditBoxChanged(this.id)' value='" + paramListArray[i].DefaultValue + "'/>";

            if(paramListArray[i].DanWeiString)
            {
                strHtml += "<div style='margin-left: 357px;margin-top: -26px;width:40px;'>" + paramListArray[i].DanWeiString + "</div>";
            }

            if(paramListArray[i].ID == "InputLingJianHaoSearch")
            {

                //paramListArray[i]
            }

        }

        paramListArray[i].HtmlCtrlId = uuid;

        strHtml += "</div></div></li>";

    }

    return strHtml;
}
function UpdateParamDesignByJson_NobelTechs(jsonObj,bSubMenu)
{
    var slotContainer = document.getElementById("ParamDesign");

    if(slotContainer == null || slotContainer == undefined)
    {
        return;
    }

    var strHtml = GenerateParamDesignStrHtmlByJson_NobelTechs(jsonObj,true);

    slotContainer.innerHTML = strHtml;

    UpdateHtmlCtrlByJson_NobelTech(jsonObj);
}
function OnParamDesignEditBoxChanged(htmlId)
{
    DoOnParamDesignEditBoxChanged(htmlId,m_Search);
}
function OnParamDesignComboBoxChanged(htmlId)
{
    DoOnParamDesignComboBoxChanged(htmlId,m_Search);
    UpdateParamDesignByJson_NobelTechs(m_Search);
}
function DoOnParamDesignEditBoxChanged(htmlId,jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    if(jsonObj.HtmlCtrlId == htmlId)
    {
        var htmlCtrl = document.getElementById(htmlId);
        if(htmlCtrl == null)
        {
            return;
        }

        jsonObj.DefaultValue = "" + htmlCtrl.value;
        return;
    }

    if(jsonObj.ParamsArray)
    {
        for(var i = 0; i < jsonObj.ParamsArray.length; i++)
        {
            DoOnParamDesignEditBoxChanged(htmlId,jsonObj.ParamsArray[i]);
        }
    }

    if(jsonObj.Choise && typeof(jsonObj.Choise) != "string")
    {
        for(var i = 0; i < jsonObj.Choise.length; i++)
        {
            DoOnParamDesignEditBoxChanged(htmlId,jsonObj.Choise[i]);
        }
    }
}
function DoOnParamDesignComboBoxChanged(htmlId,jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    if(jsonObj.HtmlCtrlId == htmlId)
    {
        var htmlCtrl = document.getElementById(htmlId);
        if(htmlCtrl == null)
        {
            return;
        }

        jsonObj.DefaultValue = "" + htmlCtrl.selectedIndex;
        return;
    }

    if(jsonObj.ParamsArray)
    {
        for(var i = 0; i < jsonObj.ParamsArray.length; i++)
        {
            DoOnParamDesignComboBoxChanged(htmlId,jsonObj.ParamsArray[i]);
        }
    }

    if(jsonObj.Choise && typeof(jsonObj.Choise) != "string")
    {
        for(var i = 0; i < jsonObj.Choise.length; i++)
        {
            DoOnParamDesignComboBoxChanged(htmlId,jsonObj.Choise[i]);
        }
    }
}
function OnSelectLingJianInSearchMode_NobelTech(htmlCtrl)
{
    if(g_isInLingJianSearchMode == true)
    {
        //return;
    }

    SaveCurParamDesign_NobelTech();

    g_curSelectedHtmlCtrlId = htmlCtrl;

    var id = htmlCtrl.id;
    var jsonObj = null;

    SaveCurParamDesign_NobelTech();
    var strIdArray = id.split("_");

    var strType = strIdArray[2];

    var strConfigFilePath = "";

    var strConfigFilePath = "./config/LingJian/CommonSearch.json";

    var jsonObj = g_lingJianParamMap[htmlCtrl.id];
    if(jsonObj != null && jsonObj != undefined)
    {
        UpdateParamDesignByJson_NobelTech(jsonObj);
    }
    else
    {
        var scope = this;
        var loader = new THREE.FileLoader( scope.manager );
        //loader.setResponseType( 'arraybuffer' );
        loader.load( strConfigFilePath, function ( text ) {

            var jsonObj = JSON.parse(text);

            var htmlCtrl = document.getElementById(id);
            if(htmlCtrl == null || htmlCtrl == undefined)
            {

            }
            else
            {
                var uuid = GenerateUUID();
                g_lingJianParamMap[id] = jsonObj;
                // htmlCtrl.id = uuid;
                jsonObj.htmlCtrlId = id;
                UpdateParamDesignByJson_NobelTech(jsonObj);
            }
        });
    }
}
function UpdateLingJianTreeByLingJianContainer()
{

}
function OnChangeGongYiCount_NobelTech(htmlCtrlId)
{
    var htmlCtrl = document.getElementById("KuSlotContainer");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var gongYiCoutCtrl = document.getElementById("SelectGongYiCount");
    if(gongYiCoutCtrl == null || gongYiCoutCtrl == undefined)
    {
        return;
    }

    var gongYiCount = parseInt(gongYiCoutCtrl.value);
    var strHtml = "";

    var strHtml = "";

    //先产生一个工艺数量 combobox 框
    /*
    strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='avator'>";
        strHtml += "<img src='img/avatar4.jpg'/>";
        strHtml += "</div>";
        strHtml += "<div class='content'>";
        strHtml += "<div class='item-title'>" + paramList[i].Name + "</div>";
        strHtml += "</div>";
    */

    strHtml += "<li class='slot-item'><div class='slot-handler'>";
    strHtml += "<div class='slot-handler clearfix'>";
    strHtml += "<div class='content'>";

    strHtml += "<div style='position: absolute;margin-left:20px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>工艺数量</div>";
    strHtml += "<select id='SelectGongYiCount' style='margin-left: 100px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' value='" + gongYiCount + "' onchange='OnChangeGongYiCount_NobelTech()'>";

    for(var j = 0; j < 5; j++)
    {
        strHtml += "<option value ='" + j + "'>" + j + "</option>";
    }

    strHtml += "</select>";
    strHtml += "</div>";

    for(var i = 0; i < gongYiCount; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='content' style='width:100%;height:200px;'>";

        var comboBoxId = "SelectGongYiCount_" + i;

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>加工类型</div>";

        strHtml += "<select id='" + comboBoxId + "' style='position: absolute;margin-left: 120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";
        strHtml += "<option value='0'>钻</option>";
        strHtml += "<option value='1'>铣</option>";
        strHtml += "<option value='2'>铰</option>";
        strHtml += "</select>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 40px;width:110px;height:22px;font-size: 12px;'>加工直径</div>";

        var strInput = "JiaGongZhiJing_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 40px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 70px;width:110px;height:22px;font-size: 12px;'>加工直径精度</div>";

        strInput = "JiaGongZhiJingJingDu_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 70px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 100px;width:110px;height:22px;font-size: 12px;'>加工深度</div>";

        strInput = "JiaGongShenDu_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 100px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 130px;width:110px;height:22px;font-size: 12px;'>加工深度精度</div>";

        strInput = "JiaGongShenDuJingDu_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 130px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "</div>";
    }

    htmlCtrl.innerHTML = strHtml;

    var selectHtmlCtrl = document.getElementById("SelectGongYiCount");

    if(selectHtmlCtrl)
    {
        selectHtmlCtrl.value = "" + gongYiCount;
    }
}
function SaveCurGongYiParams_NobelTeh()
{
    if(g_lastSelectedLingJianId == null || g_lastSelectedLingJianId == undefined)
    {
        return;
    }

    var lingJianJsonObj = g_lingJianParamMap[g_lastSelectedLingJianId];
    if(lingJianJsonObj == null || lingJianJsonObj == undefined)
    {
        return;
    }

    var jsonObj = g_lingJianGongYiParamMap[g_lastSelectedLingJianId];

    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    lingJianJsonObj.GongYiParamArray = jsonObj;

}

function OnSelectLingJianInGongYiEditMode_NobelTech(htmlCtrl)
{
    if(g_isInGongYiEditMode == false)
    {
        return;
    }

    SaveCurGongYiParam_NobelTech();

    g_lastSelectedLingJianId = htmlCtrl.id;

    var jsonObj = g_lingJianGongYiParamMap[htmlCtrl.id];

    if(jsonObj == null || jsonObj == undefined)
    {
        LoadGongYiParamBasicUI_NobelTech(jsonObj);
        return;
    }
    else
    {
        UpdateGongYiParamByJsonObj_NobelTech(jsonObj);
        return;
    }

    var htmlCtrl = document.getElementById("SelectGongYiCount");

    if(htmlCtrl)
    {
        htmlCtrl.value = "" + jsonObj.length;
    }

    var gongYiType = 0;
    var jiaGongZhiJing = 0;
    var jiaGongZhiJingJingDu = "H6";
    var jiaGongShenDu = 0;
    var jiaGongShenDuJingDu = "H6";

    for(var i = 0; i < jsonObj.length; i++)
    {
        htmlCtrl = document.getElementById("SelectGongYiCount_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongLeiXing;
        }

        htmlCtrl = document.getElementById("JiaGongZhiJing_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongZhiJing;
        }

        htmlCtrl = document.getElementById("JiaGongZhiJingJingDu_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongZhiJingJingDu;
        }

        htmlCtrl = document.getElementById("JiaGongShenDu_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongShenDu;
        }

        htmlCtrl = document.getElementById("JiaGongShenDuJingDu_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongShenDuJingDu;
        }
    }

    //strHtml +
/*
    var jsonObj = g_lingJianGongYiParamMap[htmlCtrl.id];
    if(jsonObj != null && jsonObj != undefined)
    {
        //读取 CommonGongYi
        UpdateGongYiParamByJsonObj_NobelTech(jsonObj);
    }
    else
    {
        //直接使用里面的变量
        //先加一个ComboBox
        LoadGongYiParamBasicUI_NobelTech(htmlCtrl.id);
    }
    */

}
function UpdateGongYiParamByJsonObj_NobelTech(jsonObj)
{
    var htmlCtrl = document.getElementById("KuSlotContainer");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var strHtml = "";

    strHtml += "<li class='slot-item'><div class='slot-handler'>";
    strHtml += "<div class='slot-handler clearfix'>";
    strHtml += "<div class='content'>";

    strHtml += "<div style='position: absolute;margin-left:20px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>工艺数量</div>";
    strHtml += "<select id='SelectGongYiCount' style='margin-left: 100px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' value='" + jsonObj.length + "' onchange='OnChangeGongYiCount_NobelTech()'>";

    for(var j = 0; j < 5; j++)
    {
        strHtml += "<option value ='" + j + "'>" + j + "</option>";
    }

    strHtml += "</select>";
    strHtml += "</div>";

    if(jsonObj == null || jsonObj == undefined)
    {
        htmlCtrl.innerHTML = strHtml;
        return;
    }

    for(var i = 0; i < jsonObj.length; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='content' style='width:100%;height:200px;'>";

        var comboBoxId = "SelectGongYiCount_" + i;

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>加工类型</div>";

        strHtml += "<select id='" + comboBoxId + "' style='position: absolute;margin-left: 120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";
        strHtml += "<option value='0'>钻</option>";
        strHtml += "<option value='1'>铣</option>";
        strHtml += "<option value='2'>铰</option>";
        strHtml += "</select>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 40px;width:110px;height:22px;font-size: 12px;'>加工直径</div>";

        var strInput = "JiaGongZhiJing_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 40px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 70px;width:110px;height:22px;font-size: 12px;'>加工直径精度</div>";

        strInput = "JiaGongZhiJingJingDu_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 70px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 100px;width:110px;height:22px;font-size: 12px;'>加工深度</div>";

        strInput = "JiaGongShenDu_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 100px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 130px;width:110px;height:22px;font-size: 12px;'>加工深度精度</div>";

        strInput = "JiaGongShenDuJingDu_" + i;
        strHtml += "<input id='" + strInput + "' style='position: absolute;margin-left:120px;margin-top: 130px;width:110px;height:22px;font-size: 12px;'></input>";

        strHtml += "</div>";
    }

    htmlCtrl.innerHTML = strHtml;

    var htmlCtrl = document.getElementById("SelectGongYiCount");
    if(htmlCtrl)
    {
        htmlCtrl.value = "" + jsonObj.length;
    }

    //OnChangeGongYiCount_NobelTech();

    for(var i = 0; i < jsonObj.length; i++)
    {
        htmlCtrl = document.getElementById("SelectGongYiCount_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = "" + jsonObj[i].GongYiType;
        }

        htmlCtrl = document.getElementById("JiaGongZhiJing_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongZhiJing;
        }

        htmlCtrl = document.getElementById("JiaGongZhiJingJingDu_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongZhiJingJingDu;
        }

        htmlCtrl = document.getElementById("JiaGongShenDu_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongShenDu;
        }

        htmlCtrl = document.getElementById("JiaGongShenDuJingDu_" + i);
        if(htmlCtrl)
        {
            htmlCtrl.value = jsonObj[i].JiaGongShenDuJingDu;
        }
    }
}

function LoadGongYiParamBasicUI_NobelTech(htmlCtrlId)
{
    var htmlCtrl = document.getElementById("KuSlotContainer");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var strHtml = "";

    strHtml += "<div style='position: absolute;margin-left:20px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>工艺数量</div>";
    strHtml += "<select id='SelectGongYiCount' style='margin-left: 100px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange='OnChangeGongYiCount_NobelTech('" + htmlCtrlId + "')'>";

    for(var j = 0; j < 5; j++)
    {
        strHtml += "<option value ='" + j + "'>" + j + "</option>";
    }

    htmlCtrl.innerHTML = strHtml;

    OnChangeGongYiCount_NobelTech();
}
function OnSelectLingJianInEditMode_NobelTech(htmlCtrl)
{
    if(g_isInLingJianSearchMode == true)
    {
        //return;
    }

    SaveCurParamDesign_NobelTech();

    g_curSelectedHtmlCtrlId = htmlCtrl;

    var id = htmlCtrl.id;
    var jsonObj = null;

    SaveCurParamDesign_NobelTech();
    var strIdArray = id.split("_");

    var strType = strIdArray[2];

    var strJsonName = "";
    for(var i = 2; i < strIdArray.length; i++)
    {
        strJsonName += strIdArray[i];
        if(i != strIdArray.length - 1)
        {
            strJsonName += "_";
        }
    }

    var strConfigFilePath = "./config/LingJian/" + strJsonName;

    /*
    if(strType == "YuanZhu")
    {
        strConfigFilePath = "./config/LingJian/YuanZhu_ParamDesign_Panel.json";
    }
    else if(strType == "ChangFangTi")
    {
        strConfigFilePath = "./config/LingJian/ChangFangTi_ParamDesign_Panel.json";
    }
    else if(strType == "TongKong")
    {
        strConfigFilePath = "./config/LingJian/TongKong_ParamDesign_Panel.json";
    }
    else if(strType == "DingWeiMian")
    {
        strConfigFilePath = "./config/LingJian/DingWeiMian_ParamDesign_Panel.json";
    }
    else if(strType == "JiaJuLingJianGanSheChiCun")
    {
        strConfigFilePath = "./config/LingJian/JiaJuLingJianGanSheChiCun_ParamDesign_Panel.json";
    }
    else if(strType == "RuKouMian")
    {
        strConfigFilePath = "./config/LingJian/RuKouMian_ParamDesign_Panel.json";
    }
    else if(strType == "DingWeiMian")
    {
        strConfigFilePath = "./config/LingJian/DingWeiMian_ParamDesign_Panel.json"
    }
    else if(strType == "MangKong")
    {
        strConfigFilePath = "./config/LingJian/MangKong_ParamDesign_Panel.json";
    }
    else if(strType = "ZhongJianKongXiangGuan")
    {
        strConfigFilePath = "./config/LingJian/ZhongJianKongXiangGuan_ParamDesign_Panel.json";
    }
    else if(strType == "NeiDaoJiao")
    {

    }
    else
    {

    */

    var jsonObj = g_lingJianParamMap[htmlCtrl.id];
    if(jsonObj != null && jsonObj != undefined)
    {
        //UpdateParamDesignByJson_NobelTech(jsonObj);
    }
    else
    {
        var scope = this;
        var loader = new THREE.FileLoader( scope.manager );
        //loader.setResponseType( 'arraybuffer' );
        loader.load( strConfigFilePath, function ( text ) {

            var jsonObj = JSON.parse(text);

            var htmlCtrl = document.getElementById(id);
            if(htmlCtrl == null || htmlCtrl == undefined)
            {

            }
            else
            {
                //var uuid = GenerateUUID();
                g_lingJianParamMap[id] = jsonObj;
                htmlCtrl.id = id;
                jsonObj.htmlCtrlId = id;

                UpdateParamDesignByJson_NobelTech(jsonObj);
            }

            setTimeout("UpdateTree_NobelTech()",50);
        });
    }
}
function OnSelectLingJian_NobelTech(htmlCtrl)
{
    if(g_isInGongYiEditMode)
    {
        OnSelectLingJianInGongYiEditMode_NobelTech(htmlCtrl);
        return;
    }
    if(g_isInLingJianSearchMode == true)
    {
        //return;
    }

    SaveCurParamDesign_NobelTech();

    g_curSelectedHtmlCtrlId = htmlCtrl;

    var id = htmlCtrl.id;
    var jsonObj = null;

    SaveCurParamDesign_NobelTech();
    var strIdArray = id.split("_");

    var strType = strIdArray[2];

    var strConfigFilePath = "./config/LingJian/" + strType;

    /*
    if(strType == "YuanZhu")
    {
        strConfigFilePath = "./config/LingJian/YuanZhu_ParamDesign_Panel.json";
    }
    else if(strType == "ChangFangTi")
    {
        strConfigFilePath = "./config/LingJian/ChangFangTi_ParamDesign_Panel.json";
    }
    else if(strType == "TongKong")
    {
        strConfigFilePath = "./config/LingJian/TongKong_ParamDesign_Panel.json";
    }
    else if(strType == "DingWeiMian")
    {
        strConfigFilePath = "./config/LingJian/Mian_ParamDesign_Panel.json";
    }
    else if(strType == "JiaJuLingJianGanSheChiCun")
    {
        strConfigFilePath = "./config/LingJian/JiaJuLingJianGanSheChiCun_ParamDesign_Panel.json";
    }
    else
    {

    }
    */

    var jsonObj = g_lingJianParamMap[htmlCtrl.id];
    if(jsonObj != null && jsonObj != undefined && g_isInLingJianSearchMode == false)
    {
        UpdateParamDesignByJson_NobelTech(jsonObj);
    }
    else
    {
        var scope = this;
        var loader = new THREE.FileLoader( scope.manager );
        //loader.setResponseType( 'arraybuffer' );
        loader.load( strConfigFilePath, function ( text ) {

            var jsonObj = JSON.parse(text);

            var htmlCtrl = document.getElementById(id);
            if(htmlCtrl == null || htmlCtrl == undefined)
            {

            }
            else
            {
                var uuid = GenerateUUID();
                g_lingJianParamMap[id] = jsonObj;
               // htmlCtrl.id = uuid;
                jsonObj.htmlCtrlId = id;

                //UpdateParamDesignByJson_NobelTech(jsonObj);
            }
        });
    }

    if(g_isInLingJianSearchMode == true)
    {
        var scope = this;
        var loader = new THREE.FileLoader( scope.manager );
        strConfigFilePath = "./config/LingJian/CommonSearch.json";
        loader.load( strConfigFilePath, function ( text ) {

            var jsonObj = JSON.parse(text);

            var htmlCtrl = document.getElementById(id);
            if (htmlCtrl == null || htmlCtrl == undefined)
            {
                //fanzheng
            }
            else
            {
                UpdateParamDesignByJson_NobelTech(jsonObj);
            }
        });
    }
    else
    {

    }
}
function UpdateInputValueToJson_NobelTech()
{

}
function SaveCurParamDesign_NobelTech()
{
    if(g_curSelectedHtmlCtrlId == null || g_curSelectedHtmlCtrlId == undefined)
    {
        return;
    }

    var paramContainer = document.getElementById("ParamDesign");

    if(paramContainer == null || paramContainer == undefined)
    {
        return;
    }

    var items = new Array();
    for(var i = 0; i < paramContainer.childNodes.length; i++)
    {
        if(paramContainer.childNodes[i].style == null || paramContainer.childNodes[i].style == undefined)
        {
            continue;
        }

        items.push(paramContainer.childNodes[i]);
    }

    var jsonObj = g_lingJianParamMap[g_curSelectedHtmlCtrlId.id];
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var paramList = jsonObj.ParamsArray;
    if(paramList == null || paramList == undefined)
    {
        return;
    }

    for(var i = 0;i < paramList.length; i++)
    {
        var inputHtmlCtrl = document.getElementById(paramList[i].htmlCtrlId);
        if(inputHtmlCtrl == null || inputHtmlCtrl == undefined)
        {
            continue;
        }

        paramList[i].Value = inputHtmlCtrl.value;
    }
}
function ProcessChildNode_NobelTech(index,node)
{
    if(node == null || node == undefined)
    {
        return;
    }

    var htmlRootElement = document.getElementById("LingJianDesign");

    if(htmlRootElement == null || htmlRootElement == undefined)
    {
        return;
    }

    if(g_lingJianParamMap == null || g_lingJianParamMap == undefined)
    {
        return;
    }

    var children = htmlRootElement.children();

    for(var i = index + 1 ;i < children.length; i++)
    {
        if(children[i].style == null || children[i].style == undefined)
        {
            continue;
        }

        if(children[i].marginLeft <= children[index].marginLeft)
        {
            break;
        }

        if(children[i].marginLeft == children[index].marginLeft + 45)
        {
            //是儿子
            var parentJsonObj = g_lingJianParamMap[children[index].id];
            if(parentJsonObj == null || parentJsonObj == undefined)
            {
                continue;
            }
        }

    }
}
function GenerateJsonObjByHtmlElement_NobelTech()
{
    var htmlRootElement = document.getElementById("LingJianDesign");

    if(htmlRootElement == null || htmlRootElement == undefined)
    {
        return;
    }

    if(g_lingJianParamMap == null || g_lingJianParamMap == undefined)
    {
        return;
    }

    var children = htmlRootElement.children();

    var rootJsonObj = {};
    rootJsonObj.Children = new Array();
    rootJsonObj.HtmlElementId = "";

    for(var i = 0; i < children.length; i++)
    {
        var htmlElement = children[i];

        if(htmlElement == null ||  htmlElement == undefined || htmlElement.style == null || htmlElement.style == undefined)
        {
            continue;
        }

        ProcessChildNode_NobelTech(i);

        var jsonObj = g_lingJianParamMap[htmlElement.id];
        if(jsonObj == null || jsonObj == undefined)
        {
            continue;
        }
    }
}
function GetQueryLingJianID_NobelTech()
{
    //var htmlContrl
    var htmlCtrl = document.getElementById("InputLingJianID");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return null;
    }
    else
    {
        return htmlCtrl.value;
    }
}
function GetLingJianTreeJsonObjByRootTree_NobelTech()
{
    var result = {};

    if(m_globalTreeUIJsonObj == null || m_globalTreeUIJsonObj == undefined)
    {
        return result;
    }

    var rootTree = m_globalTreeUIJsonObj[0];

    if(rootTree == null || rootTree == undefined)
    {
        return result;
    }

    var paramList = rootTree.ParamList;

    if(paramList == null || paramList == undefined)
    {
        return;
    }

    var lingJianTree = paramList[0];

    if(lingJianTree == null || lingJianTree == undefined)
    {
        return result;
    }

    return lingJianTree;
}
function GenerateLingJianQueryString_NobelTech(lingJianJsonObj,curIndex)
{
    var result = "";
    if(lingJianJsonObj == null || lingJianJsonObj == undefined)
    {
        return result;
    }

    var paramList = lingJianJsonObj.ParamList;
    if(paramList == null || paramList == undefined)
    {
        return result;
    }

    for(var i = 0; i < paramList.length; i++)
    {
        result += "" + curIndex + "." + (i + 1) + "=" + paramList[i].Name + ",";

        result += GenerateLingJianQueryString_NobelTech(paramList[i],curIndex + 1);
    }

    return result;
}
function OnClickSearchLingJian_NobelTech()
{
    var a = m_globalTreeUIJsonObj;

    var queryLingJianID = GetQueryLingJianID_NobelTech();
    var lingJianTreeJson = GetLingJianTreeJsonObjByRootTree_NobelTech(m_globalTreeUIJsonObj);
    var strLingJianQuery = GenerateLingJianQueryString_NobelTech(lingJianTreeJson,1);

    var jsonObj = {};
    var queryArray = strLingJianQuery.split(",");
    for(var i = 0; i < queryArray.length - 1; i++)
    {
        var paramObjArray = queryArray[i].split("=");
        jsonObj[paramObjArray[0]] = paramObjArray[1];
    }

    var queryUrl = "";

    if(queryLingJianID != null && queryLingJianID != undefined && queryLingJianID != "")
    {
        queryUrl = "api?queryLingJianByID=1";
        jsonObj = {};
        jsonObj.LingJianID = queryLingJianID;
    }
    else
    {
        queryUrl = "api?queryLingJianByJson=1";
    }

    $.ajax({
        type: 'POST',
        url: globalServerAddr + queryUrl,
        data: JSON.stringify(jsonObj),
        success: function (response) {
            g_searchedLingJianResult = JSON.parse(response);
            ChangeToLingJianSearchResultUI_NobelTech();
            UpdateLingJianSearchResult_NobelTech(g_searchedLingJianResult);

            //callback(response,0);
        },
        error: function (errs)
        {
            alert(errs.responseText);
        }
    });

    ChangeToLingJianSearchResultUI_NobelTech();

   // UpdateLingJianSearchResult_NobelTech();

    g_isInLingJianSearchMode = true;
}

function ProcessChildNode_NobelTech(index,node)
{
    if(node == null || node == undefined)
    {
        return;
    }

    var htmlRootElement = document.getElementById("LingJianDesign");

    if(htmlRootElement == null || htmlRootElement == undefined)
    {
        return;
    }

    if(g_lingJianParamMap == null || g_lingJianParamMap == undefined)
    {
        return;
    }

    var children = htmlRootElement.children();

    for(var i = index + 1; i < children.length; i++)
    {
        if(children[i].style == null || children[i].style == undefined)
        {
            continue;
        }

        if(children[i].marginLeft <= children[index].marginLeft)
        {
            break;
        }

        if(children[i].marginLeft == children[index].marginLeft + 45)
        {
            //是儿子
            var parentJsonObj = g_lingJianParamMap[children[index].id];
            if(parentJsonObj == null || parentJsonObj == undefined)
            {
                continue;
            }
        }

    }
}
function ChangeToGongYiDesignUI_NobelTech()
{

}
function ChangeToLingJianSearchResultUI_NobelTech()
{
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        //return;
    }

    var cancelSearchLingJianBtn = document.getElementById("CancelSearchLingJianBtn");
    if(cancelSearchLingJianBtn == null || cancelSearchLingJianBtn == undefined)
    {
        return;
    }

    var searchLingJianBtn = document.getElementById("SearchLingJianBtn");
    if(searchLingJianBtn == null || searchLingJianBtn == undefined)
    {
        return;
    }

    cancelSearchLingJianBtn.style.visibility = "hidden";
    searchLingJianBtn.style.visibility = "hidden";

    kuSlotTitle.style.visibility = "hidden";
    kuSlotContainer.style.visibility = "hidden";

    lingJianSlotTitle.style.visibility = "inherit";
    lingJianSlotTitle.style.position = "absolute";
    lingJianSlotTitle.style.marginLeft = "0px";
    lingJianSlotTitle.innerText = "搜索结果";

    lingJianSlotContainer.style.visibility = "inherit";
    lingJianSlotContainer.style.position = "absolute";
    lingJianSlotContainer.style.marginLeft = "0px";
    lingJianSlotContainer.style.marginTop = "50px";
    lingJianSlotContainer.innerHTML = "<ul id='LingJianDesign' class='slot-list'> </ul>";

    paramDesignSlotTitle.style.visibility = "inherit";
    paramDesignSlotTitle.style.position = "absolute";
    paramDesignSlotTitle.style.marginLeft = "500px";
    paramDesignSlotTitle.style.width = "952px";
    paramDesignSlotTitle.innerText = "零件图纸";

    paramDesignSlotContainer.style.visibility = "inherit";
    paramDesignSlotContainer.style.position = "absolute";
    paramDesignSlotContainer.style.marginLeft = "500px";
    paramDesignSlotContainer.style.marginTop = "50px";
    paramDesignSlotContainer.style.width = "952px";
    paramDesignSlotContainer.innerHTML = "<embed id='pdfCtrl2' src='./pdf/test1.pdf' style='position:absolute;visibility:hidden;' type='application/pdf' width='100%' height='100%'></embed>"
        + "<ul id='ParamDesig' class='slot-list-nopointer'></ul>";

    paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl)
    {
        paramDesignPdfCtrl.style.visibility = "inherit";
    }

    var htmlCtrl = document.getElementById("ParamDesign");
    if(htmlCtrl)
    {
        htmlCtrl.style.visibility = "hidden";
    }

    HideAllFunctionBtns_NobelTech(true);
}
function HideAllFunctionBtns_NobelTech(bHidden)
{
    var strHide = "hidden";

    if(bHidden == true || bHidden == undefined)
    {
        strHide = "hidden";
    }
    else
    {
        strHide = "inherit";
    }

    var strHtmlId = "KuFilterBtn";

    for(var i = 1; i <= 5; i++)
    {
        var tempHtmlId = strHtmlId + i;

        var htmlCtrl = document.getElementById(tempHtmlId);
        if(htmlCtrl != null && htmlCtrl != undefined)
        {
            htmlCtrl.style.visibility = strHide;
        }
    }

    strHtmlId = "LingJianBtn";

    for(var i = 1; i <= 4; i++)
    {
        var tempHtmlId = strHtmlId + i;

        var htmlCtrl = document.getElementById(tempHtmlId);
        if(htmlCtrl != null && htmlCtrl != undefined)
        {
            htmlCtrl.style.visibility = strHide;
        }
    }

    strHtmlId = "ParamDesignBtn";

    for(var i = 1; i <= 4; i++)
    {
        var tempHtmlId = strHtmlId + i;

        var htmlCtrl = document.getElementById(tempHtmlId);
        if(htmlCtrl != null && htmlCtrl != undefined)
        {
            htmlCtrl.style.visibility = strHide;
        }
    }
}
function UpdateLingJianSearchResultByJson_NobelTech(jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var lingJianHtmlContainer = document.getElementById("LingJianDesign");
    if(lingJianHtmlContainer == null || lingJianHtmlContainer == undefined)
    {
        return;
    }

    var strHtml = "";
    strHtml += "<table id='LingJianSearchResultTable' class='editableTable' border='0' style='left: 0px;top: 0px;overflow:scroll;width: 100%;'>";
    strHtml += "<tr class='editable simpleInput'>";
    strHtml += "<th style='width: 60px;'>序号</th>";
    strHtml += "<th style='width: 60px;'>零件ID</th>";
    strHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        strHtml += "<tr class='editable simpleInput' onclick='OnClickSearchedLingJian(" + i + ")'>";
        strHtml += "<td>" + (i + 1) + "</td>";
        strHtml += "<td>" + jsonObj[i].Name + "</td>";
        strHtml += "</tr>";
    }

    strHtml += "</table>";

    lingJianHtmlContainer.innerHTML = strHtml;
}
function UpdateLingJianSearchResult_NobelTech(jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        var strConfigFilePath = "./mockData/lingJianSearchResult.json";
        var scope = this;
        var loader = new THREE.FileLoader( scope.manager );
        //loader.setResponseType( 'arraybuffer' );
        loader.load( strConfigFilePath, function ( text ) {
            var jsonObj = JSON.parse(text);
            g_searchedLingJianResult = jsonObj;
            UpdateLingJianSearchResultByJson_NobelTech(jsonObj);

        });
    }
    else
    {
        g_searchedLingJianResult = jsonObj;
        UpdateLingJianSearchResultByJson_NobelTech(g_searchedLingJianResult);
    }
}
function LoadLingJianSearchUI_NobelTech()
{
    var strConfigFilePath = "./config/LingJian/LingJianSearch_Panel.json";
    var scope = this;
    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( strConfigFilePath, function ( text ) {
        var jsonObj = JSON.parse(text);
        UpdateParamDesignByJson_NobelTech(jsonObj);
    });
}
function LoadGongYiEditUI_NobelTech()
{
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var saveLingJianBtn = document.getElementById("SaveCurLingJianBtn");
    if(saveLingJianBtn == null || saveLingJianBtn == undefined)
    {
        return;
    }

    var createAndSaveLingJianBtn = document.getElementById("CreateAndSaveCurLingJianBtn");
    if(createAndSaveLingJianBtn == null || createAndSaveLingJianBtn == undefined)
    {
        return;
    }

    $('#LingJianDesign .smallbutton').css('visibility','hidden');

    //var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
   // if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
  //  {
  //      return;
        //paramDesignPdfCtrl.style.visibility = "hidden";
 //   }

    kuSlotTitle.style.visibility = "inherit";
    kuSlotTitle.style.position = "absolute";
    kuSlotTitle.style.marginLeft = "500px";
    kuSlotTitle.innerText = "参数设计";

    kuSlotContainer.style.visibility = "inherit";
    kuSlotContainer.style.position = "absolute";
    kuSlotContainer.style.marginLeft = "500px";
    kuSlotContainer.style.marginTop = "50px";
    kuSlotContainer.style.overflow = "scroll";

    lingJianSlotTitle.style.visibility = "inherit";
    lingJianSlotTitle.style.position = "absolute";
    lingJianSlotTitle.style.marginLeft = "0px";
    lingJianSlotTitle.innerText = "零件设计";

    lingJianSlotContainer.style.visibility = "inherit";
    lingJianSlotContainer.style.position = "absolute";
    lingJianSlotContainer.style.marginLeft = "0px";
    lingJianSlotContainer.style.marginTop = "50px";
    lingJianSlotContainer.innerHTML = "";
    lingJianSlotContainer.style.overflow = "scroll";

    paramDesignSlotTitle.style.visibility = "inherit";
    paramDesignSlotTitle.style.position = "absolute";
    paramDesignSlotTitle.style.marginLeft = "1000px";
    paramDesignSlotTitle.style.width = "30%";
    paramDesignSlotTitle.innerText = "更新工艺特征";

    var strParamDesignInnerHtml = "";
    strParamDesignInnerHtml += "<embed id='pdfCtrl2' src='./pdf/test1.pdf' style='position:absolute;visibility:hidden;' type='application/pdf' width='100%' height='100%'></embed>";
    strParamDesignInnerHtml += "<ul id='ParamDesign' class='slot-list-nopointer'></ul>";

    paramDesignSlotContainer.style.visibility = "inherit";
    paramDesignSlotContainer.style.position = "absolute";
    paramDesignSlotContainer.style.marginLeft = "1000px";
    paramDesignSlotContainer.style.marginTop = "50px";
    paramDesignSlotContainer.style.width = "30%";
    paramDesignSlotContainer.style.overflow = "scroll";
    paramDesignSlotContainer.innerHTML = strParamDesignInnerHtml;

    if(saveLingJianBtn)
    {
        saveLingJianBtn.style.visibility = "inherit";
    }

    if(createAndSaveLingJianBtn)
    {
        createAndSaveLingJianBtn.style.visibility = "inherit";
    }

    //UpdateGongYiLeftPanel()

    HideAllFunctionBtns_NobelTech(true);

    var strConfigFilePath = "./config/GongYi/gongYi_config_1.json";
    var scope = this;
    var loader = new THREE.FileLoader( scope.manager );
    loader.load( strConfigFilePath, function ( text ) {
        var jsonObj = JSON.parse(text);

        UpdateGongYiPanelByJson_NobelTech(jsonObj);
    });

    var combineBtn = document.getElementById("ParamDesignBtn_4");
    if(combineBtn)
    {
        combineBtn.style.visibility = "visible";
    }

    var cancelCombineBtn = document.getElementById("ParamDesignBtn_5");
    if(cancelCombineBtn)
    {
        cancelCombineBtn.style.visibility = "visible";
    }
}

function UpdateGongYiPanelByJson_NobelTech(jsonObj)
{
    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var htmlCtrl = document.getElementById("KuSlotContainer");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var strHtml = "";

    var paramList = jsonObj.ParamList;
    for(var i = 0; i < paramList.length; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='avator'>";
        strHtml += "<img src='img/avatar4.jpg'/>";
        strHtml += "</div>";
        strHtml += "<div class='content'>";
        strHtml += "<div class='item-title'>" + paramList[i].Name + "</div>";
        strHtml += "</div>";

        var uuid = GenerateUUID();

        if(paramList[i].Type == "ComboBox")
        {
            strHtml += "<select id='" + uuid + "' style='margin-left: -120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";

            var strChoise = paramList[i].Choise;
            var choiseArray = strChoise.split(",");
            for(var j = 0; j < choiseArray.length;j++)
            {
                strHtml += "<option value ='" + j + "'>" + choiseArray[j] + "</option>";
            }

            strHtml += "</select>";

        }
        else if(paramList[i].Type == "EditBox")
        {
            /*
            <input style="position: absolute;margin-left: -120px;margin-top: 10px;width:30px;" type="text" name="jiaChiLength" />
											<div style="position: absolute;margin-left: 330px;margin-top: 10px;width:40px;">mm</div>
            * */
            strHtml += "<input id='" + uuid + "' style=\"margin-left: -140px;margin-top: 10px;width:30px;\" type=\"text\" name=\"jiaChiLength\" />";
            strHtml += "<div style=\"margin-left: 330px;margin-top: -50px;width:40px;\">mm</div>";
        }

        paramList[i].htmlCtrlId = uuid;

        strHtml += "</div></div></li>";
    }

    htmlCtrl.innerHTML = strHtml;

}
function LoadLingJianEditUI_NobelTech()
{
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        return;
    }

    var saveLingJianBtn = document.getElementById("SaveCurLingJianBtn");
    if(saveLingJianBtn == null || saveLingJianBtn == undefined)
    {
        return;
    }

    var createAndSaveLingJianBtn = document.getElementById("CreateAndSaveCurLingJianBtn");
    if(createAndSaveLingJianBtn == null || createAndSaveLingJianBtn == undefined)
    {
        return;
    }

    saveLingJianBtn.style.visibility = "inherit";
    createAndSaveLingJianBtn.style.visibility = "inherit";

    kuSlotTitle.style.visibility = "inherit";
    kuSlotTitle.style.position = "absolute";
    kuSlotTitle.style.marginLeft = "0px";
    kuSlotTitle.innerText = "工艺特征";

    kuSlotContainer.style.visibility = "inherit";
    kuSlotContainer.style.position = "absolute";
    kuSlotContainer.style.marginLeft = "0px";
    kuSlotContainer.style.marginTop = "50px";

    lingJianSlotTitle.style.visibility = "inherit";
    lingJianSlotTitle.style.position = "absolute";
    lingJianSlotTitle.style.marginLeft = "500px";
    lingJianSlotTitle.innerText = "零件设计";

    var strLingJianInnerHtml = "";
    strLingJianInnerHtml += "<ul id='LingJianDesign' class='slot-list'>";
    strLingJianInnerHtml += "<li class='slot-item'>";
    strLingJianInnerHtml += "<div class='slot-handler'>";
    strLingJianInnerHtml += "<div class='slot-handler clearfix'></div></div></li></ul>";

    lingJianSlotContainer.style.visibility = "inherit";
    lingJianSlotContainer.style.position = "absolute";
    lingJianSlotContainer.style.marginLeft = "500px";
    lingJianSlotContainer.style.marginTop = "50px";
    lingJianSlotContainer.innerHTML = strLingJianInnerHtml;

    paramDesignSlotTitle.style.visibility = "inherit";
    paramDesignSlotTitle.style.position = "absolute";
    paramDesignSlotTitle.style.marginLeft = "1000px";
    paramDesignSlotTitle.style.width = "30%";
    paramDesignSlotTitle.innerText = "参数设计";

    var strParamDesignInnerHtml = "";
    strParamDesignInnerHtml += "<embed id='pdfCtrl2' src='./pdf/test1.pdf' style='position:absolute;visibility:hidden;' type='application/pdf' width='100%' height='100%'></embed>";
    strParamDesignInnerHtml += "<ul id='ParamDesign' class='slot-list-nopointer'></ul>";

    paramDesignSlotContainer.style.visibility = "inherit";
    paramDesignSlotContainer.style.position = "absolute";
    paramDesignSlotContainer.style.marginLeft = "1000px";
    paramDesignSlotContainer.style.marginTop = "50px";
    paramDesignSlotContainer.style.width = "30%";
    paramDesignSlotContainer.innerHTML = strParamDesignInnerHtml;

    paramDesignPdfCtrl.style.visibility = "inherit";

    HideAllFunctionBtns_NobelTech(false);
}
function HideLingJianSearchBtn_NobelTech()
{
    var searchBtn = document.getElementById("SearchLingJianBtn");

    if(searchBtn)
    {
        searchBtn.style.visibility = "hidden";
    }

    var cancelBtn = document.getElementById("CancelSearchLingJianBtn");

    if(cancelBtn)
    {
        cancelBtn.style.visibility = "hidden";
    }
}
function OnClickEditSpecLingJian_NobelTech()
{
    if(g_isInGongYiEditMode == true || g_isInDaoJuEditMode == true)
    {
        return;
    }

    HideGongYiYuanZeUI_ZuHeNobelTech();

    LoadLingJianEditUI_NobelTech();

    NormalLight3EditBtns();

    var lingJianEditBtn = document.getElementById("LingJianEditBtn");
    if(lingJianEditBtn)
    {
        lingJianEditBtn.style.backgroundColor = "#bb96ff";
    }

    ResetEditModeTag_NobelTech();
    g_isInLingJianSearchMode = false;
    g_isInLingJianEditMode = true;

    UpdateLingJianContainerByLingJianTree_NobelTech();

    OpenSlotPanel_NobelTech();

    HideLingJianSearchBtn_NobelTech();

    setTimeout("UpdateTree_NobelTech(true)",50);
}
function OnClickEditGongYi_NobelTech()
{
    HideGongYiYuanZeUI_ZuHeNobelTech();
    ResetEditModeTag_NobelTech();
    g_isInGongYiEditMode = true;
    g_isInGongYiParamEdit = true;
    g_isInGongYiHeBingEdit = false;

    LoadGongYiEditUI_NobelTech();

    UpdateCurrentLingJianInGongYiUI_NobelTech();

    if(g_searchGongYiResult == null || g_searchGongYiResult == undefined)
    {
        OnGongYiFangAnChanged_NobelTech();

        UpdateTree_NobelTech(true);
    }
    else
    {
        UpdateGongYiTeZhengUIByJson_NobelTech(g_searchGongYiResult);

        UpdateTree_NobelTech(true);
    }

    UpdateLingJianContainerByLingJianTree_NobelTech();
    RemoveZiJiDeleteBtnInLingJianContainer_NobelTech();

    NormalLight3EditBtns();

    var lingJianEditBtn = document.getElementById("GongYiEditBtn");
    if(lingJianEditBtn)
    {
        lingJianEditBtn.style.backgroundColor = "#bb96ff";
    }

    HideLingJianSearchBtn_NobelTech();

    OpenSlotPanel_NobelTech();
}
function UpdateCurrentLingJianInGongYiUI_NobelTech()
{

}
function LoadDaoJuEditUI_NobelTech()
{
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        //return;
    }

    kuSlotTitle.style.visibility = "inherit";
    kuSlotTitle.style.position = "absolute";
    kuSlotTitle.style.marginLeft = "0px";
    kuSlotTitle.innerText = "工艺特征";

    kuSlotContainer.style.visibility = "inherit";
    kuSlotContainer.style.position = "absolute";
    kuSlotContainer.style.marginLeft = "0px";
    kuSlotContainer.style.marginTop = "50px";

    lingJianSlotTitle.style.visibility = "inherit";
    lingJianSlotTitle.style.position = "absolute";
    lingJianSlotTitle.style.marginLeft = "500px";
    lingJianSlotTitle.innerText = "更新刀具特征";

    lingJianSlotContainer.style.visibility = "inherit";
    lingJianSlotContainer.style.position = "absolute";
    lingJianSlotContainer.style.marginLeft = "500px";
    lingJianSlotContainer.style.marginTop = "50px";

    paramDesignSlotTitle.style.visibility = "inherit";
    paramDesignSlotTitle.style.position = "absolute";
    paramDesignSlotTitle.style.marginLeft = "1000px";
    paramDesignSlotTitle.style.width = "30%";
    paramDesignSlotTitle.innerText = "参数设计";

    var strParamDesignInnerHtml = "";
    strParamDesignInnerHtml += "<embed id='pdfCtrl2' src='./pdf/test1.pdf' style='position:absolute;visibility:hidden;' type='application/pdf' width='100%' height='100%'></embed>";
    strParamDesignInnerHtml += "<ul id='ParamDesign' class='slot-list-nopointer'></ul>";

    paramDesignSlotContainer.style.visibility = "inherit";
    paramDesignSlotContainer.style.position = "absolute";
    paramDesignSlotContainer.style.marginLeft = "1000px";
    paramDesignSlotContainer.style.marginTop = "50px";
    paramDesignSlotContainer.style.width = "30%";
    paramDesignSlotContainer.innerHTML = strParamDesignInnerHtml;

    if(paramDesignPdfCtrl)
    {
        paramDesignPdfCtrl.style.visibility = "inherit";
    }


    HideAllFunctionBtns_NobelTech(true);
}
function OnClickZhengTiDaoJuTongYongXinXi_NobelTech()
{
    var scope = this;
    var loader = new THREE.FileLoader( scope.manager );
    var strConfigFilePath = "./config/LingJian/DaoJuCommonParam.json";
    loader.load( strConfigFilePath, function ( text ) {
        var jsonObj = JSON.parse(text);
        UpdateCommonParamDesignByJson_NobelTech(jsonObj);
    });
}
function OnClickDaoJuTeZhengByIndex_NobelTech(index)
{
    if(g_searchedDaoJuResult == null || g_searchedDaoJuResult == undefined)
    {
        return;
    }

    var daoJuObj = g_searchedDaoJuResult[index];
    if(daoJuObj == null || daoJuObj == undefined)
    {
        return;
    }

    //UpdateDaoJuCanShuSheJiUIByJsonObj_NobelTech(daoJuObj);
    UpdateDaoJuCanShuSheJiUIByJsonObj_NobelTech2(daoJuObj);
    var scope = this;
    var loader = new THREE.FileLoader( scope.manager );
    var strConfigFilePath = "./config/LingJian/DaoJuSpecParam1.json";
    loader.load( strConfigFilePath, function ( text ) {
        var jsonObj = JSON.parse(text);
        UpdateDaoJuCanShuSheJiUIByJsonObj_NobelTech2(jsonObj);
    });
}
function UpdateDaoJuCanShuSheJiUIByJsonObj_NobelTech2(jsonObj)
{
    var slotContainer = document.getElementById("ParamDesign");

    if(slotContainer == null || slotContainer == undefined)
    {
        return;
    }

    var strHtml = "";

    for(var i = 0; i < jsonObj.length; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='avator'>";
        //strHtml += "<img src='img/avatar4.jpg'/>";
        strHtml += "</div>";
        strHtml += "<div class='content'>";
        strHtml += "<div class='item-title'>" + jsonObj[i].Name + "</div>";
        strHtml += "</div>";

        var uuid = GenerateUUID();
        jsonObj[i].HtmlCtrlId = uuid;

        if(jsonObj[i].Type == "ComboBox")
        {
            strHtml += "<select id='" + uuid + "' style='margin-left: -120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";

            var strChoise = jsonObj[i].Choise;
            var choiseArray = strChoise.split(",");
            for(var j = 0; j < choiseArray.length;j++)
            {
                strHtml += "<option value ='" + j + "'>" + choiseArray[j] + "</option>";
            }

            strHtml += "</select>";

        }
        else if(jsonObj[i].Type == "EditBox")
        {
            /*
            <input style="position: absolute;margin-left: -120px;margin-top: 10px;width:30px;" type="text" name="jiaChiLength" />
											<div style="position: absolute;margin-left: 330px;margin-top: 10px;width:40px;">mm</div>
            * */
            if(jsonObj[i].HtmlCtrlId != null && jsonObj[i].HtmlCtrlId != undefined)
            {
                uuid = jsonObj[i].HtmlCtrlId;
            }

            strHtml += "<input id='" + uuid + "' style='margin-left: -140px;margin-top: 10px;width:100px;text-align:right;' type='text' name='jiaChiLength' />";

            if(jsonObj[i].DanWeiString)
            {
                strHtml += "<div style='margin-left: 330px;margin-top: -75px;width:40px;'>" + jsonObj[i].DanWeiString + "</div>";
            }
        }
        else if(jsonObj[i].Type == "GongYiChiCun")
        {
            strHtml += "<span style='margin-left: 140px;margin-top: 0px;width:40px;'>" + "Lmin" + "</span>";
            strHtml += "<span style='margin-left: 160px;margin-top: 0px;width:40px;'>" + "Dmin" + "</span>";
        }
        else if(jsonObj[i].Type == "TwoEditBox")
        {
            strHtml += "<input id='" + uuid + "' style='position:relative;left:110px;top: -38px;width:100px;text-align:right;' type='text' name='jiaChiLength' />";
            strHtml += "<input id='" + uuid + "' style='position:relative;left:170px;top: -38px;width:100px;text-align:right;' type='text' name='jiaChiLength' />";
        }
        else if(jsonObj[i].Type == "LeftEditBox")
        {
            strHtml += "<input id='" + uuid + "' style='position:relative;left:110px;top: -38px;width:100px;text-align:right;' type='text' name='jiaChiLength' />";
        }

        strHtml += "</div></div></li>";
    }

    slotContainer.innerHTML = strHtml;
}
function UpdateDaoJuCanShuSheJiUIByJsonObj_NobelTech(jsonObj)
{
    var paramHtmlCtrl = document.getElementById("ParamSlotContainer");
    if(paramHtmlCtrl == null || paramHtmlCtrl == undefined)
    {
        return;
    }

    if(m_globalGui)
    {
        m_globalGui.domElement.style = 'position:absolute;top:200px;left:235px;background-color:#ffffff;visibility:hidden;';
        m_globalGui.domElement.id = 'MenuParamDesign_zuanTouSearch';

        m_globalGui.domElement.parentNode.removeChild(m_globalGui.domElement);
        paramHtmlCtrl.appendChild(m_globalGui.domElement);
    }
}
function OnClickEditDaoJu_NobelTech()
{
    HideGongYiYuanZeUI_ZuHeNobelTech();
    ResetEditModeTag_NobelTech();
    g_isInDaoJuEditMode = true;

    LoadDaoJuEditUI_NobelTech();

    if(g_searchedDaoJuResult == null || g_searchedDaoJuResult == undefined)
    {
        OnDaoJuFangAnChanged_NoBelTech();
    }
    else
    {
        LoadDaoJuInfoByJson_NobelTech(g_searchedDaoJuResult);
    }

    if(g_searchGongYiResult == null || g_searchGongYiResult == undefined)
    {
        OnGongYiFangAnChanged_NobelTech();
    }
    else
    {
        UpdateGongYiTeZhengUIByJsonInDaoJuUI_NobelTech(g_searchGongYiResult);
    }


    var strConfigFilePath = "./mockData/lingJianZuanTouSearchResult.json";
    var scope = this;
    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( strConfigFilePath, function ( text ) {
        var jsonObj = JSON.parse(text);
        g_searchedDaoJuResult = jsonObj;
        //UpdateLingJianSearchResultByJson_NobelTech(jsonObj);
        LoadDaoJuInfoByJson_NobelTech(jsonObj);

        setTimeout("UpdateTree_NobelTech()",10);
    });


    setTimeout("UpdateTree_NobelTech(true)",10);
    NormalLight3EditBtns();

    var lingJianEditBtn = document.getElementById("DaoJuEditBtn");
    if(lingJianEditBtn)
    {
        lingJianEditBtn.style.backgroundColor = "#bb96ff";
    }

    OpenSlotPanel_NobelTech();

    if(m_globalGui == null || m_globalGui == undefined)
    {
        return;
    }

    //m_globalGui.documentElement.
}
function LoadDaoJuInfoByJson_NobelTech(jsonObj)
{
    if(g_isInGongYiEditMode == true || g_isInLingJianEditMode == true || g_isInLingJianSearchMode == true)
    {
        return;
    }

    if(jsonObj == null || jsonObj == undefined)
    {
        return;
    }

    var htmlDaoJuCtrl1 = document.getElementById("KuSlotContainer");

    if(htmlDaoJuCtrl1 == null || htmlDaoJuCtrl1 == undefined)
    {
        return;
    }

    var htmlDaoJuCtrl2 = document.getElementById("LingJianSlotContainer");

    if(htmlDaoJuCtrl2 == null || htmlDaoJuCtrl2 == undefined)
    {
        return;
    }

    var strHtml1 = "";

    strHtml1 += "<li class='slot-item' onclick='OnClickZhengTiDaoJuTongYongXinXi_NobelTech()'><div class='slot-handler'>";
    strHtml1 += "<div class='slot-handler clearfix'>";
    strHtml1 += "<div class='content'>";
    strHtml1 += "<div class='item-title'>" + "整体刀具通用信息" + "</div>";
    strHtml1 += "</div>";
    strHtml1 += "</div></div></li>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        strHtml1 += "<li class='slot-item' onclick='OnClickDaoJuTeZhengByIndex_NobelTech(" + i + ")'><div class='slot-handler'>";
        strHtml1 += "<div class='slot-handler clearfix'>";
        strHtml1 += "<div class='content'>";
        strHtml1 += "<div class='item-title'>" + jsonObj[i].Name2 + "</div>";
        strHtml1 += "</div>";
        strHtml1 += "</div></div></li>";
    }

    htmlDaoJuCtrl2.innerHTML = strHtml1;
}
function ResetEditModeTag_NobelTech()
{
    g_isInLingJianEditMode = false;
    g_isInGongYiEditMode = false;
    g_isInDaoJuEditMode = false;
    g_isInLingJianSearchMode = false;
}
function NormalLight3EditBtns()
{
    var lingJianEditBtn = document.getElementById("LingJianEditBtn");
    if(lingJianEditBtn)
    {
        lingJianEditBtn.style.backgroundColor = "#009fd7";
    }

    var gongYiEditBtn = document.getElementById("GongYiEditBtn");
    if(gongYiEditBtn)
    {
        gongYiEditBtn.style.backgroundColor = "#009fd7";
    }

    var daoJuEditBtn = document.getElementById("DaoJuEditBtn");
    if(daoJuEditBtn)
    {
        daoJuEditBtn.style.backgroundColor = "#009fd7";
    }
}
function ResetLingJianSearchTableColor_NobelTech()
{
    var htmlCtrl = document.getElementById("LingJianSearchResultTable");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    $(htmlCtrl).find('tr').css('background-color','#66CCFF');
    //$(htmlCtrl).find('tr').css('background-color','#AAAAFF');
}
function HightLightLingJianSearchTableColor_NobelTech(index)
{
    var htmlCtrl = document.getElementById("LingJianSearchResultTable");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    $(htmlCtrl).find('tr')[index + 1].style.backgroundColor = "#AAAAFF";
}
function OnClickSearchedLingJian(index)
{
    if(g_searchedLingJianResult == null || g_searchedLingJianResult == undefined)
    {
        return;
    }

    ResetLingJianSearchTableColor_NobelTech();
    HightLightLingJianSearchTableColor_NobelTech(index);

    var lingJianObj = g_searchedLingJianResult[index];
    g_lingJianTree = lingJianObj;

    if(lingJianObj == null || lingJianObj == undefined)
    {
        return;
    }

    var pdfUrl = lingJianObj.PdfUrl;

    if(pdfUrl == null || pdfUrl == undefined)
    {
        return;
        //xiaohao
    }

    //更新图纸
    var lingJianPdfCtrl = document.getElementById("pdfCtrl2");
    if(lingJianPdfCtrl == null || lingJianPdfCtrl == undefined)
    {
        return;
    }

    //lingJianPdfCtrl.src = "./pdf/" + pdfUrl;
    lingJianPdfCtrl.src = globalServerAddr + pdfUrl;

    //更新图纸2
    var lingJianPdfCtrl2 = document.getElementById("pdfCtrl");
    if(lingJianPdfCtrl2)
    {
        lingJianPdfCtrl2.src = globalServerAddr + pdfUrl;
    }

    //更新模型
    var modelUrl = globalServerAddr + lingJianObj.ModelUrl;

    removeAllSceneModel();
    var loader = new THREE.STLLoader();
    loader.load(modelUrl, function ( geometry ){
        onClickUpdateModel(geometry,0);

        OnGongYiFangAnChanged_NobelTech();
    },null,null);

    //OnGongYiFangAnChanged_NobelTech();
}
function UpdateGongYiTeZhengUIByJsonInDaoJuUI_NobelTech(jsonRootObj)
{
    if(jsonRootObj == null || jsonRootObj == undefined)
    {
        return;
    }

    var htmlCtrl = document.getElementById("KuSlotContainer");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var strHtml = "";

    var index = 0;
    for(var i = 0; i < jsonRootObj.length; i++)
    {
        var jsonObj = jsonRootObj[i];
        if(jsonObj.Type == 1)
        {
            //是普通工艺
            strHtml += "<li class='slot-item' onclick='OnClickDaoJuInGongYiTeZheng_NobelTech(" + index + ")'><div class='slot-handler'>";
            strHtml += "<div class='slot-handler clearfix'>";
            strHtml += "<div class='avator'>";
            strHtml += "<img src='img/avatar4.jpg'/>";
            strHtml += "</div>";
            strHtml += "<div class='content'>";
            strHtml += "<div class='item-title'>" + jsonObj.Name + "</div>";
            strHtml += "</div></div></li>";

            index++;
        }
        else if(jsonObj.Type == 2 && jsonObj.ParamList != null && jsonObj.ParamList != undefined)
        {
            //是组合工艺
            strHtml += "<li class='slot-item' onclick=''><div class='slot-handler'>";
            strHtml += "<div class='slot-handler clearfix'>";
            strHtml += "<div class='avator'>";
            strHtml += "<img src='img/avatar4.jpg'/>";
            strHtml += "</div>";
            strHtml += "<div class='content'>";
            strHtml += "<div class='item-title'>" + jsonObj.Name + "</div>";
            strHtml += "</div></div></li>";

            for(var j = 0; j < jsonObj.ParamList.length; j++)
            {
                strHtml += "<li class='slot-item' style='margin-left:45px;' onclick='OnClickDaoJuInGongYiTeZheng_NobelTech(" + index + ")'><div class='slot-handler'>";
                strHtml += "<div class='slot-handler clearfix'>";
                strHtml += "<div class='avator'>";
                strHtml += "<img src='img/avatar4.jpg'/>";
                strHtml += "</div>";
                strHtml += "<div class='content'>";
                strHtml += "<div class='item-title'>" + jsonObj.ParamList[j].Name + "</div>";
                strHtml += "</div></div></li>";

                index++;
            }
        }
    }

    strHtml += "";

    htmlCtrl.innerHTML = strHtml;
}
function UpdateGongYiTeZhengUIByJson_NobelTech(jsonRootObj)
{
    if(g_isInLingJianSearchMode)
    {
        return;
    }

    if(jsonRootObj == null || jsonRootObj == undefined)
    {
        return;
    }

    var htmlCtrl = document.getElementById("ParamSlotContainer");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var strHtml = "";

    var index = 0;
    for(var i = 0; i < jsonRootObj.length; i++)
    {
        var jsonObj = jsonRootObj[i];
        if(jsonObj.Type == 1)
        {
            //是普通工艺
            strHtml += "<li class='slot-item' onclick='OnClickDaoJuInGongYiTeZheng_NobelTech(" + index + ")'><div class='slot-handler'>";
            strHtml += "<div class='slot-handler clearfix'>";
            strHtml += "<div class='avator'>";
            strHtml += "<img src='img/avatar4.jpg'/>";
            strHtml += "</div>";
            strHtml += "<div class='content'>";
            strHtml += "<div class='item-title'>" + jsonObj.Name + "</div>";
            strHtml += "</div></div></li>";

            index++;
        }
        else if(jsonObj.Type == 2 && jsonObj.ParamList != null && jsonObj.ParamList != undefined)
        {
            //是组合工艺
            strHtml += "<li class='slot-item' onclick=''><div class='slot-handler'>";
            strHtml += "<div class='slot-handler clearfix'>";
            strHtml += "<div class='avator'>";
            strHtml += "<img src='img/avatar4.jpg'/>";
            strHtml += "</div>";
            strHtml += "<div class='content'>";
            strHtml += "<div class='item-title'>" + jsonObj.Name + "</div>";
            strHtml += "</div></div></li>";

            for(var j = 0; j < jsonObj.ParamList.length; j++)
            {
                strHtml += "<li class='slot-item' style='margin-left:45px;' onclick='OnClickDaoJuInGongYiTeZheng_NobelTech(" + index + ")'><div class='slot-handler'>";
                strHtml += "<div class='slot-handler clearfix'>";
                strHtml += "<div class='avator'>";
                strHtml += "<img src='img/avatar4.jpg'/>";
                strHtml += "</div>";
                strHtml += "<div class='content'>";
                strHtml += "<div class='item-title'>" + jsonObj.ParamList[j].Name + "</div>";
                strHtml += "</div></div></li>";

                index++;
            }
        }
    }

    strHtml += "";

    htmlCtrl.innerHTML = strHtml;
}
function OnClickDaoJuInGongYiTeZheng_NobelTech(index)
{
    var ctrl = this;
    if(g_ctrlIsDown == false || g_ctrlIsDown == null || g_ctrlIsDown == undefined)
    {
        ResetAllDaoJuInGongYiTeZhengState_NobelTech();
    }

    var htmlContainerCtrl = document.getElementById("ParamSlotContainer");
    if(htmlContainerCtrl == null || htmlContainerCtrl == undefined)
    {
        return;
    }

    var items = new Array();
    for(var i = 0; i < htmlContainerCtrl.childNodes.length; i++)
    {
        if(htmlContainerCtrl.childNodes[i].style == null || htmlContainerCtrl.childNodes[i].style == undefined)
        {
            continue;
        }

        if(i + 1 < htmlContainerCtrl.childNodes.length && htmlContainerCtrl.childNodes[i + 1].style.marginLeft == "45px"
        && (htmlContainerCtrl.childNodes[i].style.marginLeft == "0px" || htmlContainerCtrl.childNodes[i].style.marginLeft == ""))
        {
            continue;
        }

        items.push(htmlContainerCtrl.childNodes[i]);
    }

    var clickedCtrl = items[index];
    //var clickedCtrl = this;

    if(clickedCtrl == null || clickedCtrl == undefined)
    {
        return;
    }

    clickedCtrl.style.backgroundColor = '#ccccff';
    //clickedCtrl.style.visibility = "hidden";

    return;
    
}
function ResetAllDaoJuInGongYiTeZhengState_NobelTech()
{
    $("#ParamSlotContainer .slot-item").css("background-color","#ffffff");

}
function OnKeyDown_NobelTech(e)
{
    var keyCode = e.which;

    if(keyCode == 17)
    {
        //ctrl 被按下
        g_ctrlIsDown = true;
    }
}
function OnKeyUp_NobelTech(e)
{
    var keyCode = e.which;

    if(keyCode == 17)
    {
        //ctrl 被按下
        g_ctrlIsDown = false;
    }
}
function BindKeyEvent_NobelTech()
{
    document.onkeydown = OnKeyDown_NobelTech;
    document.onkeyup = OnKeyUp_NobelTech;
}
function OnClickCancelHeBing_NobelTech()
{
    var htmlContainerCtrl = document.getElementById("ParamSlotContainer");

    if(htmlContainerCtrl == null || htmlContainerCtrl == undefined)
    {
        return;
    }

    var items = new Array();

    for(var i = 0; i < htmlContainerCtrl.childNodes.length; i++)
    {
        if(htmlContainerCtrl.childNodes[i].style == null || htmlContainerCtrl.childNodes[i].style == undefined)
        {
            continue;
        }

        if(i + 1 < htmlContainerCtrl.childNodes.length
            && (htmlContainerCtrl.childNodes[i].style.marginLeft == "" || htmlContainerCtrl.childNodes[i].style.marginLeft == "0px")
            && htmlContainerCtrl.childNodes[i + 1].style.marginLeft == "45px")
        {
            continue;
        }

        items.push(htmlContainerCtrl.childNodes[i]);
    }

    if(items.length == 0)
    {
        return;
    }

    var bCanCombine = true;
    var selectedCtrl = new Array();
    var selectedIndexArray = new Array();
    var strBackGroundColor = "rgb(204, 204, 255)";

    for(var i = 0; i < items.length; i++)
    {
        if(items[i].style.backgroundColor == strBackGroundColor)
        {
            selectedCtrl.push(items[i]);
            selectedIndexArray.push(i);
        }
    }

    var gongYiArray = new Array();

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        if(g_searchGongYiResult[i].Type == 1)
        {
            gongYiArray.push(g_searchGongYiResult[i]);
        }

        var paramList = g_searchGongYiResult[i].ParamList;
        if(paramList == null || paramList == undefined)
        {
            continue;
        }

        for(var j = 0; j < paramList.length; j++)
        {
            if(paramList[j].Type == 1)
            {
                gongYiArray.push(paramList[j]);
            }
        }
    }

    var cancelCombineArray = new Array();

    for(var i = 0; i < gongYiArray.length; i++)
    {
        var bFound = false;

        for(var j = 0; j < selectedIndexArray.length; j++)
        {
            if(selectedIndexArray[j] == i)
            {
                bFound = true;
                break;
            }
        }

        if(bFound)
        {
            cancelCombineArray.push(gongYiArray[i]);
        }
    }

    var removeArray = new Array();

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        if(g_searchGongYiResult[i].Type == 2)
        {
            var paramList = g_searchGongYiResult[i].ParamList;
            for(var j = 0; j < paramList.length; j++)
            {
                var bFound = false;
                for(var k = 0; k < cancelCombineArray.length; k++)
                {
                    if(cancelCombineArray[k] == paramList[j])
                    {
                        removeArray.push(cancelCombineArray[k]);
                        paramList.splice(j,1);
                        j--;
                        bFound = true;
                        if(paramList.length == 1)
                        {
                            removeArray.push(paramList[0]);
                            g_searchGongYiResult[i].ParamList = new Array();
                        }
                        else if(paramList.length == 0)
                        {
                            g_searchGongYiResult[i].ParamList = new Array();
                        }
                        break;
                    }
                }
            }
        }
    }

    for(var i = 0; i < removeArray.length; i++)
    {
        g_searchGongYiResult.push(removeArray[i]);
    }

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        if(g_searchGongYiResult[i].Type == 2
            && (g_searchGongYiResult[i].ParamList == null || g_searchGongYiResult[i].ParamList == undefined || g_searchGongYiResult[i].ParamList.length == 0))
        {
            g_searchGongYiResult.splice(i,1);
            i--;
        }
    }

    UpdateGongYiTeZhengUIByJson_NobelTech(g_searchGongYiResult);
    //UpdateGongYiSearchedResultByCombineDaoJu_NobelTech();
    //UpdateTree_NobelTech();

    setTimeout("UpdateTree_NobelTech(true)",50);

    return;
}
function OnClickHeBing_NobelTech()
{
    var htmlContainerCtrl = document.getElementById("ParamSlotContainer");

    if(htmlContainerCtrl == null || htmlContainerCtrl == undefined)
    {
        return;
    }

    var items = new Array();

    for(var i = 0; i < htmlContainerCtrl.childNodes.length; i++)
    {
        if(htmlContainerCtrl.childNodes[i].style == null || htmlContainerCtrl.childNodes[i].style == undefined)
        {
            continue;
        }

        if(i + 1 < htmlContainerCtrl.childNodes.length
            && (htmlContainerCtrl.childNodes[i].style.marginLeft == "" || htmlContainerCtrl.childNodes[i].style.marginLeft == "0px")
            && htmlContainerCtrl.childNodes[i + 1].style.marginLeft == "45px")
        {
            continue;
        }

        items.push(htmlContainerCtrl.childNodes[i]);
    }

    if(items.length == 0)
    {
        return;
    }

    var bCanCombine = true;
    var selectedCtrl = new Array();
    var selectedIndexArray = new Array();
    var strBackGroundColor = "rgb(204, 204, 255)"

    for(var i = 0; i < items.length; i++)
    {
        if(items[i].style.backgroundColor == strBackGroundColor && items[i].style.marginLeft != "0px" && items[i].style.marginLeft != "")
        {
            //不可以合并，必须所有是根节点
            bCanCombine = false;
            break;
        }

        if(items[i].style.backgroundColor == strBackGroundColor)
        {
            selectedCtrl.push(items[i]);
            selectedIndexArray.push(i);
        }
    }

    if(bCanCombine == false || selectedCtrl.length == 0 || selectedCtrl.length == 1)
    {
        return;
    }

    var combineArray = new Array();
    var noCombineArray = new Array();

    var gongYiArray = new Array();

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        var paramList = g_searchGongYiResult[i].ParamList;

        if(g_searchGongYiResult[i].Type == 1)
        {
            gongYiArray.push(g_searchGongYiResult[i]);
        }
        else if(g_searchGongYiResult[i].Type == 2 && paramList != null && paramList != undefined)
        {
            for(var j = 0; j < paramList.length; j++)
            {
                gongYiArray.push(paramList[j]);
            }
        }
    }

    for(var i = 0; i < gongYiArray.length; i++)
    {
        var bFound = false;

        for(var j = 0; j < selectedIndexArray.length; j++)
        {
            if(selectedIndexArray[j] == i)
            {
                bFound = true;
                break;
            }
        }

        if(bFound)
        {
            combineArray.push(gongYiArray[i]);
        }
        else
        {
            noCombineArray.push(gongYiArray[i]);
        }
    }

    for(var i = 0; i < g_searchGongYiResult.length; i++)
    {
        var bFound = false;
        for(var j = 0; j < combineArray.length; j++)
        {
            if(combineArray[j] == g_searchGongYiResult[i])
            {
                bFound = true;
                break;
            }
        }

        if(bFound)
        {
            g_searchGongYiResult.splice(i,1);
            i--;
        }
    }

    var zuHeObj = {};
    zuHeObj.Name = "组合工艺";
    zuHeObj.ParamList = combineArray;
    zuHeObj.Type = 2;

    g_searchGongYiResult.push(zuHeObj);

    UpdateGongYiTeZhengUIByJson_NobelTech(g_searchGongYiResult);
    //UpdateGongYiSearchedResultByCombineDaoJu_NobelTech();
    //UpdateTree_NobelTech();

    setTimeout("UpdateTree_NobelTech(true)",50);

    return;

    for(var i = 0; i < selectedCtrl.length; i++)
    {
        htmlContainerCtrl.removeChild(selectedCtrl[i]);
    }

    for(var i = 0; i < selectedCtrl.length; i++)
    {
        selectedCtrl[i].style.backgroundColor = "#ffffff";
    }

    selectedCtrl[0].onclick = "";

    htmlContainerCtrl.appendChild(selectedCtrl[0].cloneNode(true));
    for(var i = 0; i < selectedCtrl.length; i++)
    {
        htmlContainerCtrl.appendChild(selectedCtrl[i]);
        selectedCtrl[i].style.marginLeft = "45px";
        selectedCtrl[i].onclick = "";
        //selectedCtrl
    }

    //重新排序 items
    items = new Array();
    for(var i = 0; i < htmlContainerCtrl.childNodes.length; i++)
    {
        if(htmlContainerCtrl.childNodes[i].style == null || htmlContainerCtrl.childNodes[i].style == undefined)
        {
            continue;
        }

        items.push(htmlContainerCtrl.childNodes[i]);
        items[i].onclick = "";
    }

    for(var i = 0; i < items.length; i++)
    {
        if(i + 1 < items.length
        && items[i + 1].style.marginLeft == "45px")
        {
            continue;
        }

        if(items[i].style.marginLeft == "" || items[i].style.marginLeft == "0px")
        {
            //var str = "OnClickDaoJuInGongYiTeZheng_NobelTech(" + i + ")";
            items[i].onclick = "OnClickDaoJuInGongYiTeZheng_NobelTech(0)";

            //items[i].onclic
        }
    }

    UpdateGongYiSearchedResultByCombineDaoJu_NobelTech();
    UpdateTree_NobelTech();
}
function UpdateGongYiSearchedResultByCombineDaoJu_NobelTech() {
    var htmlContainerCtrl = document.getElementById("ParamSlotContainer");

    if (htmlContainerCtrl == null || htmlContainerCtrl == undefined) {
        return;
    }

    var items = new Array();

    for (var i = 0; i < htmlContainerCtrl.childNodes.length; i++)
    {
        if (htmlContainerCtrl.childNodes[i].style == null || htmlContainerCtrl.childNodes[i].style == undefined)
        {
            continue;
        }

        items.push(htmlContainerCtrl.childNodes[i]);
    }

    var count = 0;

    //g_searchedDaoJuResult = new Arra
    var index = 0;
    var rootJson = new Array();

    for (var i = 0; i < items.length; i++)
    {
        var hasChild = false;
        if(i + 1 < items.length
            && items[i + 1].style.marginLeft == "45px"
            && (items[i].style.marginLeft == "" || items[i].style.marginLeft == "0px"))
        {
            hasChild = true;
        }

        if(hasChild)
        {
            //有子节点，直接生成到子节点结束
            var jsonObj = {};
            jsonObj.Name = "组合刀具" + (index + 1);
            jsonObj.Name2 = "组合刀具" + (index + 1);
            jsonObj.ParamList = new Array();
            index++;

            for(var j = i + 1; j < items.length; j++)
            {
                if(items[j].style.marginLeft != "45px")
                {
                    break;
                }

                var childJsonObj = {};
                childJsonObj.Name = items[j].innerText;
                childJsonObj.Name2 = items[j].innerText;
                jsonObj.ParamList.push(childJsonObj);
            }

           // var htmlCtrl = items[i];
            var htmlCtrl  = $(items[i]).find(".item-title")[0];
           //var htmlCtrl = $("#items[i] .item-title")[0];
            htmlCtrl.innerText = jsonObj.Name;

            rootJson.push(jsonObj);
        }
        else
        {
            if(items[i].style.marginLeft == "45px")
            {
                continue;
            }

            var jsonObj = {};
            jsonObj.Name = items[i].innerText;
            jsonObj.Name2 = items[i].innerText;

            rootJson.push(jsonObj);
            //没有子节点
        }
    }

    g_searchGongYiResult = rootJson;
}


//function
function UpdateLeftPanelByJson(jsonObj)
{
    var htmlCtrl = document.getElementById("LeftPanel");
    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    //<div class="appName" style="position: absolute;margin-left: 40px;margin-top: 0px;">钻头</div>
    //<div class="appName2" style="position: absolute;margin-left: 50px;margin-top: 80px;">整体钻头</div>
    var strHtml = "";

    strHtml += "<div class='appName' style='position: absolute;margin-top: 0px;'>" + jsonObj.Title1 + "</div>";
    strHtml += "<div class='appName2' style='position: absolute;'>" + jsonObj.Title2 + "</div>";
    strHtml += "<div class='appName3' style='position: absolute;'>" + jsonObj.Title3 + "</div>";

    var list = jsonObj.List;

    var startLeft = jsonObj.StartLeft;
    var startTop = jsonObj.StartTop;
    var lineWidth = 200;
    var i;
    var marginTop;
    for(i = 0; i < list.length; i++)
    {
        marginTop = startTop + 30 * list[i].Line;
        if(list[i].Type == "Button")
        {
            var strButtonClass = "smallbutton";

            if(list[i].Enable == 0)
            {
                strButtonClass = "graybutton";
            }

            if(list[i].Width == null || list[i].Width == undefined || list[i].Width == "")
            {
                list[i].Width = lineWidth;
            }

            if(list[i].MarginLeft == null || list[i].MarginLeft == undefined || list[i].MarginLeft == "")
            {
                list[i].MarginLeft = 0;
            }

            var id = list[i].ID;
            if(id == undefined)
            {
                id = "";
            }

            strHtml += "<div id='" + id + "' class='" + strButtonClass + "' style='position: absolute;margin-left:"
                + (startLeft + list[i].MarginLeft) + "px;margin-top:" + marginTop + "px;width:" + list[i].Width + "px;' onclick='"
                + list[i].OnClick + "'>" + list[i].Text + "</div>";
        }
        else if(list[i].Type == "ComboBox")
        {
            strHtml += "<select id='" + list[i].ID + "' style='position: absolute;margin-left:" + list[i].MarginLeft + "px;margin-top:" + marginTop + "px;width:" + list[i].Width + "px;'"
                + " onchange='" + list[i].OnChange + "'>";

            var choiseArray = list[i].Choise.split(",");
            for(var j = 0; j < choiseArray.length; j++)
            {
                strHtml += "<option value ='" + j + "'>" + choiseArray[j] + "</option>";
            }

            strHtml += "</select>";
        }
        else if(list[i].Type == "EditBox")
        {
            //<input style="position: absolute;margin-left: 130px;margin-top: 270px;width:50px;" type="text" name="jiaChiLength" />
            var str = "<input style='position: absolute;margin-left:" + list[i].MarginLeft + "px;margin-top:" + marginTop + "px;width:" + list[i].Width + "px;' type='text' "
                + "name='" + list[i].ID + "' id='" +  list[i].ID + "'" + "/>";

            strHtml += str;
        }
        else if(list[i].Type == "Label")
        {
            //<div style="position: absolute;margin-left: 190px;margin-top: 270px;width:40px;">mm</div>
            strHtml += "<div style='font-size:10px;position: absolute;margin-left:" + list[i].MarginLeft + "px;margin-top:" + marginTop + "px;width:" + list[i].Width + "px;'>" + list[i].Text + "</div>";
        }
        else if(list[i].Type == "Line")
        {
           strHtml += "<div style='font-size:1px;position: absolute;margin-left:" + 10 + "px;margin-top:" + (marginTop +5) + "px;width:205px ;height:2px;border-bottom: 3px solid #BCBDC0;'></div>";
        }
    }

    strHtml += "<div class=\"smallbutton\" style='position: absolute;margin-left:10px;margin-top:" + (marginTop + 30) + "px;width:200px' onclick=OnClickClearAll()>清空数据</div>";


    htmlCtrl.innerHTML = strHtml;


}
function UpdateDaoJuFangAnList_NobelTech()
{
    var gongYiHtmlCtrl = document.getElementById("FangAnComboBox");
    var daoJuHtmlCtrl = document.getElementById("FangAnComboBox2");

    if(gongYiHtmlCtrl == null || gongYiHtmlCtrl == undefined)
    {
        return;
    }

    if(daoJuHtmlCtrl == null || daoJuHtmlCtrl == undefined)
    {
        return;
    }

    var strFangAn = "A";

    var gongYiHtmlCtrl = document.getElementById("FangAnComboBox");
    if(gongYiHtmlCtrl)
    {
        strFangAn = gongYiHtmlCtrl.options[gongYiHtmlCtrl.selectedIndex].text;
    }

    var strHtml = "";

    for(var i = 0; i < daoJuHtmlCtrl.options.length; i++)
    {
         strHtml += "<option value='" + i + "'>" + strFangAn + (i + 1) + "</option>";
    }

    daoJuHtmlCtrl.innerHTML = strHtml;
}
function OnDaoJuFangAnChanged_NoBelTech()
{

    var gongYiHtmlCtrl = document.getElementById("FangAnComboBox");
    var daoJuHtmlCtrl = document.getElementById("FangAnComboBox2");

    if(gongYiHtmlCtrl == null || gongYiHtmlCtrl == undefined)
    {
        return;
    }

    if(daoJuHtmlCtrl == null || daoJuHtmlCtrl == undefined)
    {
        return;
    }

    if(g_lingJianTree == null || g_lingJianTree == undefined)
    {
        return;
    }

    var gongYiFangAnValue = parseInt(gongYiHtmlCtrl.value);
    var daoJuFangAnValue = parseInt(daoJuHtmlCtrl.value);

    var jsonObj = {};
    jsonObj.LingJianID = g_lingJianTree.Name;
    jsonObj.FangAnIndex = gongYiFangAnValue;
    jsonObj.DaoJuIndex = (daoJuFangAnValue + 1);

    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryLingJianGongYiDaoJu=1",
        data: strJson,
        success: function (response) {
            g_searchedDaoJuResult = JSON.parse(response);
            LoadDaoJuInfoByJson_NobelTech(g_searchedDaoJuResult);
            //UpdateGongYiTeZhengUIByJson_NobelTech(g_searchGongYiResult);

            setTimeout("UpdateTree_NobelTech(true)",50);

        },
        error: function (errs) {

            alert(errs.responseText);

        }
    });
}
function OnGongYiFangAnChanged_NobelTech()
{
    var htmlCtrl = document.getElementById("FangAnComboBox");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    if(g_lingJianTree == null || g_lingJianTree == undefined)
    {
        return;
    }

    var gongYiFangAnValue = parseInt(htmlCtrl.value);

    var jsonObj = {};
    jsonObj.LingJianID = g_lingJianTree.FileName;
    jsonObj.FangAnIndex = gongYiFangAnValue;

    if(jsonObj.LingJianID == "外型")
    {
        jsonObj.LingJianID = "prt1";
        g_lingJianTree.Name = "prt1";
    }

    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryLingJianGongYi=1",
        data: strJson,
        success: function (response) {
            g_searchGongYiResult = JSON.parse(response);
            UpdateGongYiTeZhengUIByJson_NobelTech(g_searchGongYiResult);

            setTimeout("UpdateTree_NobelTech(true)",50);

            UpdateDaoJuFangAnList_NobelTech();
            OnDaoJuFangAnChanged_NoBelTech();

        },
        error: function (errs) {

            alert(errs.responseText);

        }
    });
}
function OnDesignSelectionChanged_NobelTech()
{
    var htmlCtrl = document.getElementById("DesignSelectionComboBox");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var designSelection = parseInt(htmlCtrl.value);

    if(designSelection == 0)
    {
        //新增零件
        //屏蔽掉所有搜索
        var btnLastSearchResult = document.getElementById("BtnLastSearchResult");
        if(btnLastSearchResult)
        {
            btnLastSearchResult.style.backgroundColor = "#aaaaaa";
            m_bLastSearchBtnAvailable = false;
        }

        var btnLingJianSearch = document.getElementById("BtnLingJianSearch");
        if(btnLingJianSearch)
        {
            btnLingJianSearch.style.backgroundColor = "#aaaaaa";
            m_bLingJianSearchBtnAvailable = false;
        }
    }
    else
    {
        //新增零件
        //屏蔽掉所有搜索
        var btnLastSearchResult = document.getElementById("BtnLastSearchResult");
        if(btnLastSearchResult)
        {
            btnLastSearchResult.style.backgroundColor = "#009fd7";
            m_bLastSearchBtnAvailable = true;
        }

        var btnLingJianSearch = document.getElementById("BtnLingJianSearch");
        if(btnLingJianSearch)
        {
            btnLingJianSearch.style.backgroundColor = "#009fd7";
            m_bLingJianSearchBtnAvailable = true;
        }
    }
}
function OnClickWaiXingSearch_NobelTech()
{
    ChangeToWaiXingSearchUI_NobelTech();
    ResetWaiXingSearchPanel_NobelTech();
}
function ChangeToWaiXingSearchUI_NobelTech()
{
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        return;
    }

    var saveLingJianBtn = document.getElementById("SaveCurLingJianBtn");
    if(saveLingJianBtn == null || saveLingJianBtn == undefined)
    {
        return;
    }

    var createAndSaveLingJianBtn = document.getElementById("CreateAndSaveCurLingJianBtn");
    if(createAndSaveLingJianBtn == null || createAndSaveLingJianBtn == undefined)
    {
        return;
    }

    saveLingJianBtn.style.visibility = "inherit";
    createAndSaveLingJianBtn.style.visibility = "inherit";

    kuSlotTitle.style.visibility = "inherit";
    kuSlotTitle.style.position = "absolute";
    kuSlotTitle.style.marginLeft = "0px";
    kuSlotTitle.innerText = "工艺特征";

    kuSlotContainer.style.visibility = "inherit";
    kuSlotContainer.style.position = "absolute";
    kuSlotContainer.style.marginLeft = "0px";
    kuSlotContainer.style.marginTop = "50px";

    lingJianSlotTitle.style.visibility = "inherit";
    lingJianSlotTitle.style.position = "absolute";
    lingJianSlotTitle.style.marginLeft = "500px";
    lingJianSlotTitle.innerText = "零件设计";

    var strLingJianInnerHtml = "";
    strLingJianInnerHtml += "<ul id='LingJianDesign' class='slot-list'>";
    strLingJianInnerHtml += "<li class='slot-item'>";
    strLingJianInnerHtml += "<div class='slot-handler'>";
    strLingJianInnerHtml += "<div class='slot-handler clearfix'></div></div></li></ul>";

    lingJianSlotContainer.style.visibility = "inherit";
    lingJianSlotContainer.style.position = "absolute";
    lingJianSlotContainer.style.marginLeft = "500px";
    lingJianSlotContainer.style.marginTop = "50px";
    lingJianSlotContainer.innerHTML = strLingJianInnerHtml;

    paramDesignSlotTitle.style.visibility = "inherit";
    paramDesignSlotTitle.style.position = "absolute";
    paramDesignSlotTitle.style.marginLeft = "1000px";
    paramDesignSlotTitle.style.width = "30%";
    paramDesignSlotTitle.innerText = "参数设计";

    var strParamDesignInnerHtml = "";
    strParamDesignInnerHtml += "<embed id='pdfCtrl2' src='./pdf/test1.pdf' style='position:absolute;visibility:hidden;' type='application/pdf' width='100%' height='100%'></embed>";
    strParamDesignInnerHtml += "<ul id='ParamDesign' class='slot-list-nopointer'></ul>";

    paramDesignSlotContainer.style.visibility = "inherit";
    paramDesignSlotContainer.style.position = "absolute";
    paramDesignSlotContainer.style.marginLeft = "1000px";
    paramDesignSlotContainer.style.marginTop = "50px";
    paramDesignSlotContainer.style.width = "30%";
    paramDesignSlotContainer.innerHTML = strParamDesignInnerHtml;

    paramDesignPdfCtrl.style.visibility = "inherit";

    HideAllFunctionBtns_NobelTech(false);
}
function ResetWaiXingSearchPanel_NobelTech() {
    var htmlCtrl = document.getElementById("KuSlotContainer");

    if (htmlCtrl == null || htmlCtrl == undefined) {
        return;
    }

    var gongYiCount = 0;
    var strHtml = "";

    //先产生一个工艺数量 combobox 框

    strHtml += "<li class='slot-item'><div class='slot-handler'>";
    strHtml += "<div class='slot-handler clearfix'>";
    strHtml += "<div class='content'>";

    strHtml += "<div style='position: absolute;margin-left:20px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>外形元素数量</div>";
    strHtml += "<select id='SelectWaiXingCount' style='margin-left: 100px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' value='" + gongYiCount + "' onchange='OnChangeWaiXingShuLiangCount_NobelTech()'>";

    for (var j = 0; j < 10; j++) {
        strHtml += "<option value ='" + j + "'>" + j + "</option>";
    }

    strHtml += "</select>";
    strHtml += "</div></div></div></li>";

    for (var i = 0; i < gongYiCount; i++) {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='content' style='width:100%;height:200px;'>";

        var comboBoxId = "SelectWaiXingCount_" + i;

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>外形名称</div>";

        strHtml += "<select id='" + comboBoxId + "' style='position: absolute;margin-left: 120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";
        strHtml += "<option value='0'>圆柱</option>";
        strHtml += "<option value='1'>长方体</option>";
        strHtml += "<option value='2'>圆锥</option>";
        strHtml += "</select>";

        strHtml += "</div></div></div></li>";
    }

    htmlCtrl.innerHTML = strHtml;
}
function OnChangeWaiXingShuLiangCount_NobelTech()
{
    var htmlCtrl = document.getElementById("KuSlotContainer");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var waiXingCoutCtrl = document.getElementById("SelectWaiXingCount");
    if(waiXingCoutCtrl == null || waiXingCoutCtrl == undefined)
    {
        return;
    }

    var waiXingCount = parseInt(waiXingCoutCtrl.value);
    var strHtml = "";

    //先产生一个工艺数量 combobox 框

    strHtml += "<li class='slot-item'><div class='slot-handler'>";
    strHtml += "<div class='slot-handler clearfix'>";
    strHtml += "<div class='content'>";

    strHtml += "<div style='position: absolute;margin-left:20px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>工艺数量</div>";
    strHtml += "<select id='SelectWaiXingCount' style='margin-left: 100px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' value='" + waiXingCount + "' onchange='OnChangeWaiXingShuLiangCount_NobelTech()'>";

    for(var j = 0; j < 10; j++)
    {
        strHtml += "<option value ='" + j + "'>" + j + "</option>";
    }

    strHtml += "</select>";
    strHtml += "</div></div></div></li>";

    for(var i = 0; i < waiXingCount; i++)
    {
        strHtml += "<li class='slot-item'><div class='slot-handler'>";
        strHtml += "<div class='slot-handler clearfix'>";
        strHtml += "<div class='content' style='width:100%;height:40px;'>";

        var comboBoxId = "SelectWaiXingCount_" + i;

        strHtml += "<div style='position: absolute;margin-left:0px;margin-top: 10px;width:110px;height:22px;font-size: 12px;'>外形名称</div>";

        strHtml += "<select id='" + comboBoxId + "' style='position: absolute;margin-left: 120px;margin-top: 10px;width:116px;height:22px;font-size: 10px;' onchange=''>";
        strHtml += "<option value='0'>圆柱</option>";
        strHtml += "<option value='1'>长方体</option>";
        strHtml += "<option value='2'>圆锥</option>";
        strHtml += "</select>";

        strHtml += "</div></div></div></li>";
    }

    htmlCtrl.innerHTML = strHtml;

    var selectHtmlCtrl = document.getElementById("SelectWaiXingCount");

    if(selectHtmlCtrl)
    {
        selectHtmlCtrl.value = "" + waiXingCount;
    }
}
function AddTeZhengToTeZhengList_NobelTech()
{
    if(g_teZhengList == null || g_teZhengList == undefined)
    {
        return;
    }
}
function OnLoadTeZhengList_ZuHeNobelTech(teZhengListJsonObj)
{
    var jsonObj = teZhengListJsonObj;

    var searchDiv = document.getElementById("SearchTable");
    var strTableHtml = "<div class=\"closebutton\" style=\"position:absolute;left:6px;top:2px;z-index: 50;width:30px;\"onclick=\"HideSearchTable()\">关闭</div>";
    strTableHtml += "<table class=\"editableTable\" border=\"0\" style=\"position: absolute;left: 0px;top: 0px;margin:0px;padding:0px;overflow-y:auto;width: 400px;max-height:600px;\">";
    strTableHtml += "<tr class=\"editable simpleInput\">";
    strTableHtml += "<th style=\"width: 160px;\">特征ID</th>";
    strTableHtml += "<th style=\"width: 100px;\">特征名称</th>";
    strTableHtml += "<th style=\"width: 100px;\">特征主要参数</th>";
    strTableHtml += "<th style=\"width: 100px;\">删除</th>";
    strTableHtml += "<th style=\"width: 100px;\">三维</th>";
    strTableHtml += "<th style=\"width: 100px;\">图纸</th>";
    strTableHtml += "<th style=\"width: 100px;\">工艺方案</th>";
    strTableHtml += "<th style=\"width: 100px;\">工艺清单</th>";
    strTableHtml += "<th style=\"width: 100px;\">刀具方案</th>";
    strTableHtml += "<th style=\"width: 100px;\">刀具图</th>";
    strTableHtml += "<th style=\"width: 100px;\">刀具清单</th>";
    strTableHtml += "</tr>";

    for(var i = 0; i < jsonObj.length; i++)
    {
        var paramList = jsonObj[i].ParamList;
        strTableHtml += "<tr class=\"editable simpleInput\">";
        strTableHtml += "<td>" + jsonObj[i].Name + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 24px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateJiaGongJiePai3dModelByIndexMockData(" + i + ")\">更新</div>" + "</td>";
        strTableHtml += "<td>" + "<div class=\"smallbutton\" style=\"position: absolute;width: 30px;margin-left: 24px;margin-top: -9px;padding-left: 0px;padding-top: 0px;\" onclick=\"GenerateJiaGongJiePaiTuZhiByIndexMockData(" + i + ")\">更新</div>" + "</td>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;

    HideProgressBar();
    var divElement = document.getElementById("SearchTable");
    divElement.style.visibility = "visible";
}
function OnClickTeZhengList_NobelTech()
{
    var scope = this
    var teZhengListUrl = "./mockData/teZhengList_1.json";

    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( teZhengListUrl, function ( text )
    {
        var jsonObj = JSON.parse(text);

        OnLoadTeZhengList_ZuHeNobelTech(jsonObj);
    });
}
function OnClickGongYiYuanZe_NobelTech()
{
    ChangeToGongYiYuanZeUI_NobelTech();
}
function ChangeToGongYiYuanZeUI_NobelTech()
{
    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        return;
    }

    var saveLingJianBtn = document.getElementById("SaveCurLingJianBtn");
    if(saveLingJianBtn == null || saveLingJianBtn == undefined)
    {
        return;
    }

    var createAndSaveLingJianBtn = document.getElementById("CreateAndSaveCurLingJianBtn");
    if(createAndSaveLingJianBtn == null || createAndSaveLingJianBtn == undefined)
    {
        return;
    }

    saveLingJianBtn.style.visibility = "inherit";
    createAndSaveLingJianBtn.style.visibility = "inherit";

    kuSlotTitle.style.visibility = "inherit";
    kuSlotTitle.style.position = "absolute";
    kuSlotTitle.style.marginLeft = "0px";
    kuSlotTitle.innerText = "工艺特征";

    kuSlotContainer.style.visibility = "inherit";
    kuSlotContainer.style.position = "absolute";
    kuSlotContainer.style.marginLeft = "0px";
    kuSlotContainer.style.marginTop = "50px";

    lingJianSlotTitle.style.visibility = "inherit";
    lingJianSlotTitle.style.position = "absolute";
    lingJianSlotTitle.style.marginLeft = "500px";
    lingJianSlotTitle.innerText = "零件设计";

    var strLingJianInnerHtml = "";
    strLingJianInnerHtml += "<ul id='LingJianDesign' class='slot-list'>";
    strLingJianInnerHtml += "<li class='slot-item'>";
    strLingJianInnerHtml += "<div class='slot-handler'>";
    strLingJianInnerHtml += "<div class='slot-handler clearfix'></div></div></li></ul>";

    lingJianSlotContainer.style.visibility = "inherit";
    lingJianSlotContainer.style.position = "absolute";
    lingJianSlotContainer.style.marginLeft = "500px";
    lingJianSlotContainer.style.marginTop = "50px";
    lingJianSlotContainer.innerHTML = strLingJianInnerHtml;

    paramDesignSlotTitle.style.visibility = "inherit";
    paramDesignSlotTitle.style.position = "absolute";
    paramDesignSlotTitle.style.marginLeft = "1000px";
    paramDesignSlotTitle.style.width = "30%";
    paramDesignSlotTitle.innerText = "参数设计";

    var strParamDesignInnerHtml = "";
    strParamDesignInnerHtml += "<embed id='pdfCtrl2' src='./pdf/test1.pdf' style='position:absolute;visibility:hidden;' type='application/pdf' width='100%' height='100%'></embed>";
    strParamDesignInnerHtml += "<ul id='ParamDesign' class='slot-list-nopointer'></ul>";

    paramDesignSlotContainer.style.visibility = "inherit";
    paramDesignSlotContainer.style.position = "absolute";
    paramDesignSlotContainer.style.marginLeft = "1000px";
    paramDesignSlotContainer.style.marginTop = "50px";
    paramDesignSlotContainer.style.width = "30%";
    paramDesignSlotContainer.innerHTML = strParamDesignInnerHtml;

    paramDesignPdfCtrl.style.visibility = "inherit";

    HideAllFunctionBtns_NobelTech(false);
}
function AddDragableDivElement(divName)
{
    var dragObj = {};
    dragObj.DivName = divName;
    dragObj.X = 0;
    dragObj.Y = 0;
    dragObj.DragFlag = false;

    g_dragableElementArray.push(dragObj);
}
function InitDragableElementEvent()
{
    return;
}
function ReloadYanChangGanSearchMenu()
{
    //m_globalGui
    var jsonObj = m_globalYanChangGanSearchJsonObj;
    var scope = this;
    var gui = null;
    var handleLength = 237;

    var menuObj = {};

    gui = m_globalYanChangGanSearchGui;
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
        UpdateGUIByJsonObj(guiTable,tabObj,ReloadYanChangGanSearchMenu);
    }

    gui.domElement.style = 'position:absolute;left:235px;top:200px;background-color:#ffffff;width:245px';
    gui.domElement.id = 'MenuParamDesign_YanChangGanSearch2';
    gui.OnClickClosePanel = GlobalOnClickClosePanel;

    m_globalYanChangGanSearchGui = gui;
    m_globalYanChangGanSearchJsonObj = jsonObj;
}

function ReloadHandleSearchMenu()
{
    //m_globalGui
    var jsonObj = m_globalHandleSearchJsonObj;
    var scope = this;
    var gui = null;
    var handleLength = 237;

    var menuObj = {};

    gui = m_globalHandleSearchGui;
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
        UpdateGUIByJsonObj(guiTable,tabObj,ReloadHandleSearchMenu);
    }

    gui.domElement.style = 'position:absolute;left:235px;top:200px;background-color:#ffffff;width:245px';
    gui.domElement.id = 'MenuParamDesign_handleSearch';
    gui.OnClickClosePanel = GlobalOnClickClosePanel;


    m_globalHandleSearchGui = gui;
    m_globalHandleSearchJsonObj = jsonObj;
}
function RequestServerGenerateID()
{
    g_isCreatingNewModel = true;
    g_isModifyingModel = false;

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryGenerateID=1",
        data: "",
        success: function (response) {
            var jsonObj = JSON.parse(response);
            var generateID = jsonObj.GenerateID;

            g_serverGenerateID = generateID;
            if(m_globalGuiJsonObj)
            {
                ReloadDesignGUI(m_globalGuiJsonObj);
            }

            UpdateGenerateServerIDBtnBackGroundColor(m_globalGui);

        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function OnClickDoDownload()
{
    var jsonObj = {};

    jsonObj.FileName = g_serverGenerateID;
    jsonObj.DownloadPdf = 1;
    jsonObj.DownloadStl = 1;

    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?requestDownload=1",
        data: strJson,
        success: function (response) {
            var jsonObj = JSON.parse(response);
            var zipUrl = globalServerAddr + jsonObj.ZipUrl;
            window.open(zipUrl);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function LoadGongYiYuanZe_ZuHeNobelTech()
{
    HideAllSlotContainerUI_ZuHeNobelTech();

    var cuJiaGongSlotContainer = document.getElementById("CuJiaGongSlotContainer");
    if(cuJiaGongSlotContainer == null || cuJiaGongSlotContainer == undefined)
    {
        return;
    }

    var banJingJiaGongSlotContainer = document.getElementById("BanJingJiaGongSlotContainer");
    if(banJingJiaGongSlotContainer == null || banJingJiaGongSlotContainer == undefined)
    {
        return;
    }

    var jingJiaGongSlotContainer = document.getElementById("JingJiaGongSlotContainer");
    if(jingJiaGongSlotContainer == null || jingJiaGongSlotContainer == undefined)
    {
        return;
    }

    var chaoJingJiaGongSlotContainer = document.getElementById("ChaoJingJiaGongSlotContainer");
    if(chaoJingJiaGongSlotContainer == null || chaoJingJiaGongSlotContainer == undefined)
    {
        return;
    }

    var kuSlotTitle = document.getElementById("KuTitle");

    if(kuSlotTitle == null || kuSlotTitle == undefined)
    {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if(kuSlotContainer == null || kuSlotContainer == undefined)
    {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if(lingJianSlotTitle == null || lingJianSlotTitle == undefined)
    {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if(lingJianSlotContainer == null || lingJianSlotContainer == undefined)
    {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if(paramDesignSlotTitle == null || paramDesignSlotTitle == undefined)
    {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if(paramDesignSlotContainer == null || paramDesignSlotContainer == undefined)
    {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if(paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined)
    {
        return;
    }

    var saveLingJianBtn = document.getElementById("SaveCurLingJianBtn");
    if(saveLingJianBtn == null || saveLingJianBtn == undefined)
    {
        return;
    }

    var createAndSaveLingJianBtn = document.getElementById("CreateAndSaveCurLingJianBtn");
    if(createAndSaveLingJianBtn == null || createAndSaveLingJianBtn == undefined)
    {
        return;
    }

    saveLingJianBtn.style.visibility = "inherit";
    createAndSaveLingJianBtn.style.visibility = "inherit";

    kuSlotTitle.style.visibility = "hidden";
    kuSlotContainer.style.visibility = "hidden";

    lingJianSlotTitle.style.visibility = "hidden";
    lingJianSlotContainer.style.visibility = "hidden";

    paramDesignSlotTitle.style.visibility = "hidden";
    paramDesignSlotContainer.style.visibility = "hidden";

    cuJiaGongSlotContainer.style.visibility = "inherit";
    banJingJiaGongSlotContainer.style.visibility = "inherit";
    jingJiaGongSlotContainer.style.visibility = "inherit";
    chaoJingJiaGongSlotContainer.style.visibility = "inherit";

    var cuJiaGongTitleCtrl = document.getElementById("CuJiaGongTitle");
    var banJingJiaGongTitleCtrl = document.getElementById("BanJingJiaGongTitle");
    var jingJiaGongTitle = document.getElementById("JingJiaGongTitle");
    var chaoJingJiaGongTitle = document.getElementById("ChaoJingJiaGongTitle");

    if(cuJiaGongTitleCtrl)
    {
        cuJiaGongTitleCtrl.style.visibility = "inherit";
        cuJiaGongTitleCtrl.style.left = "0px";
        cuJiaGongTitleCtrl.style.top = "26px";
        cuJiaGongTitleCtrl.style.width = "20%";
    }

    if(banJingJiaGongTitleCtrl)
    {
        banJingJiaGongTitleCtrl.style.visibility = "inherit";
        banJingJiaGongTitleCtrl.style.left = "400px";
        banJingJiaGongTitleCtrl.style.top = "26px";
        banJingJiaGongTitleCtrl.style.width = "20%";
    }

    if(jingJiaGongTitle)
    {
        jingJiaGongTitle.style.visibility = "inherit";
        jingJiaGongTitle.style.left = "800px";
        jingJiaGongTitle.style.top = "26px";
        jingJiaGongTitle.style.width = "20%";
    }

    if(chaoJingJiaGongTitle)
    {
        chaoJingJiaGongTitle.style.visibility = "inherit";
        chaoJingJiaGongTitle.style.left = "1200px";
        chaoJingJiaGongTitle.style.top = "26px";
        chaoJingJiaGongTitle.style.width = "20%";
    }

    if(cuJiaGongSlotContainer)
    {
        cuJiaGongSlotContainer.style.visibility = "inherit";
        cuJiaGongSlotContainer.style.left = "0px";
        cuJiaGongSlotContainer.style.top = "78px";
        cuJiaGongSlotContainer.style.width = "20%";
    }

    if(banJingJiaGongSlotContainer)
    {
        banJingJiaGongSlotContainer.style.visibility = "inherit";
        banJingJiaGongSlotContainer.style.left = "400px";
        banJingJiaGongSlotContainer.style.top = "78px";
        banJingJiaGongSlotContainer.style.width = "20%";
    }

    if(jingJiaGongSlotContainer)
    {
        jingJiaGongSlotContainer.style.visibility = "inherit";
        jingJiaGongSlotContainer.style.left = "800px";
        jingJiaGongSlotContainer.style.top = "78px";
        jingJiaGongSlotContainer.style.width = "20%";
    }

    if(chaoJingJiaGongSlotContainer)
    {
        chaoJingJiaGongSlotContainer.style.visibility = "inherit";
        chaoJingJiaGongSlotContainer.style.left = "1200px";
        chaoJingJiaGongSlotContainer.style.top = "78px";
        chaoJingJiaGongSlotContainer.style.width = "20%";
    }

    var addTeZhengBtn = document.getElementById("AddTeZhengBtn");
    if(addTeZhengBtn)
    {
        addTeZhengBtn.style.visibility = "visible";
    }

    HideAllFunctionBtns_NobelTech(true);
}
function HideGongYiYuanZeUI_ZuHeNobelTech()
{
    var cuJiaGongSlotContainer = document.getElementById("CuJiaGongSlotContainer");
    if(cuJiaGongSlotContainer)
    {
        cuJiaGongSlotContainer.style.visibility = "hidden";
    }

    var banJingJiaGongSlotContainer = document.getElementById("BanJingJiaGongSlotContainer");
    if(banJingJiaGongSlotContainer)
    {
        banJingJiaGongSlotContainer.style.visibility = "hidden";
    }

    var jingJiaGongSlotContainer = document.getElementById("JingJiaGongSlotContainer");
    if(jingJiaGongSlotContainer)
    {
        jingJiaGongSlotContainer.style.visibility = "hidden";
    }

    var chaoJingJiaGongSlotContainer = document.getElementById("ChaoJingJiaGongSlotContainer");
    if(chaoJingJiaGongSlotContainer)
    {
        chaoJingJiaGongSlotContainer.style.visibility = "hidden";
    }

    var cuJiaGongTitleCtrl = document.getElementById("CuJiaGongTitle");
    var banJingJiaGongTitleCtrl = document.getElementById("BanJingJiaGongTitle");
    var jingJiaGongTitle = document.getElementById("JingJiaGongTitle");
    var chaoJingJiaGongTitle = document.getElementById("ChaoJingJiaGongTitle");

    if(cuJiaGongTitleCtrl)
    {
        cuJiaGongTitleCtrl.style.visibility = "hidden";
    }

    if(banJingJiaGongTitleCtrl)
    {
        banJingJiaGongTitleCtrl.style.visibility = "hidden";
    }

    if(jingJiaGongTitle)
    {
        jingJiaGongTitle.style.visibility = "hidden";
    }

    if(chaoJingJiaGongTitle)
    {
        chaoJingJiaGongTitle.style.visibility = "hidden";
    }
}
function OnClickAddTeZheng_NobelTech()
{

}
function OnClickGongYiTiaoZheng_ZuHeNobelTech()
{
    HideGongYiYuanZeUI_ZuHeNobelTech();
    ChangeToGongYiTiaoZhengUI_ZuHeNobelTech();
}
function ChangeToGongYiTiaoZhengUI_ZuHeNobelTech()
{
    var gongYiYiDongLeftContainer = document.getElementById("GongYiYiDongLeftSlotContainer");
    if(gongYiYiDongLeftContainer)
    {
        gongYiYiDongLeftContainer.style.visibility = "inherit";
    }

    var gongYiYiDongRightContainer = document.getElementById("GongYiYiDongRightSlotContainer");
    if(gongYiYiDongRightContainer)
    {
        gongYiYiDongRightContainer.style.visibility = "inherit";
    }

    var gongYiYiDongDescLeftContainer = document.getElementById("GongYiYiDongDescLeftSlotContainer");
    if(gongYiYiDongDescLeftContainer)
    {
        gongYiYiDongDescLeftContainer.style.visibility = "inherit";
    }

    var gongYiYiDongDescRightContainer = document.getElementById("GongYiYiDongDescRightSlotContainer");
    if(gongYiYiDongDescRightContainer)
    {
        gongYiYiDongDescRightContainer.style.visibility = "inherit";
    }
}
function ChangeToGongYiLiuLan_ZuHeNobelTech()
{
    var gongYiContainer = document.getElementById("GongYiLiuLanSlotContainer");
    if(gongYiContainer)
    {
        gongYiContainer.style.visibility = "inherit";
    }

    var gongYiParamContainer = document.getElementById("GongYiParamSlotContainer");
    if(gongYiParamContainer)
    {
        gongYiParamContainer.style.visibility = "inherit";
    }

    var gongYiTuZhiContainer = document.getElementById("GongYiTuZhiSlotContainer");
    if(gongYiTuZhiContainer)
    {
        gongYiTuZhiContainer.style.visibility = "inherit";
    }
}
function OnClickGongYiLiuLan_ZuHeNobelTech()
{
    HideAllSlotContainerUI_ZuHeNobelTech();
    ChangeToGongYiLiuLan_ZuHeNobelTech();
}
function HideAllSlotContainerUI_ZuHeNobelTech()
{
    HideGongYiYuanZeUI_ZuHeNobelTech();
    HideLingJianGongYiParamUI_ZuHeNobelTech();
}
function HideLingJianGongYiParamUI_ZuHeNobelTech() {
    var kuSlotTitle = document.getElementById("KuTitle");

    if (kuSlotTitle == null || kuSlotTitle == undefined) {
        return;
    }

    var kuSlotContainer = document.getElementById("KuSlotContainer");

    if (kuSlotContainer == null || kuSlotContainer == undefined) {
        return;
    }

    var lingJianSlotTitle = document.getElementById("LingJianTitle");

    if (lingJianSlotTitle == null || lingJianSlotTitle == undefined) {
        return;
    }

    var lingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    if (lingJianSlotContainer == null || lingJianSlotContainer == undefined) {
        return;
    }

    var paramDesignSlotTitle = document.getElementById("ParamTitle");
    if (paramDesignSlotTitle == null || paramDesignSlotTitle == undefined) {
        return;
    }

    var paramDesignSlotContainer = document.getElementById("ParamSlotContainer");
    if (paramDesignSlotContainer == null || paramDesignSlotContainer == undefined) {
        return;
    }

    var paramDesignPdfCtrl = document.getElementById("pdfCtrl2");
    if (paramDesignPdfCtrl == null || paramDesignPdfCtrl == undefined) {
        return;
    }

    kuSlotTitle.style.visibility = "hidden";
    kuSlotContainer.style.visibility = "hidden";

    lingJianSlotTitle.style.visibility = "hidden";
    lingJianSlotContainer.style.visibility = "hidden";

    paramDesignSlotTitle.style.visibility = "hidden";
    paramDesignSlotContainer.style.visibility = "hidden";

    HideAllFunctionBtns_NobelTech(true);
}
function RequestUserInfo()
{
    var jsonObj = {};

    jsonObj.UserName = "test4";
    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?getUserInfo=1",
        data: strJson,
        success: function (response) {
            var jsonObj = JSON.parse(response);
            var username = document.getElementById("username");
            var jifen = document.getElementById("jifen");
            var company = document.getElementById("company");
            username.innerHTML = jsonObj["UserName"];
            jifen.innerHTML = jsonObj["JiFen"];
            company.innerHTML = jsonObj["Company"];
        },
        error: function (errs) {
            //alert(errs.responseText);
        }
    });
}
function div() {
    //获取元素
    var dv = document.getElementById('progress');
    var x = 0;
    var y = 0;
    var l = 0;
    var t = 0;
    var isDown = false;
//鼠标按下事件
    dv.onmousedown = function(e) {
        //获取x坐标和y坐标
        x = e.clientX;
        y = e.clientY;

        //获取左部和顶部的偏移量
        l = dv.offsetLeft;
        t = dv.offsetTop;
        //开关打开
        isDown = true;
        //设置样式
        dv.style.cursor = 'move';
    }
//鼠标移动
    window.onmousemove = function(e) {
        if (isDown == false) {
            return;
        }
        //获取x和y
        var nx = e.clientX;
        var ny = e.clientY;
        //计算移动后的左偏移量和顶部的偏移量
        var nl = nx - (x - l);
        var nt = ny - (y - t);

        dv.style.left = nl + 'px';
        dv.style.top = nt + 'px';
    }
//鼠标抬起事件
    dv.onmouseup = function() {
        //开关关闭
        isDown = false;
        dv.style.cursor = 'default';
    }
}
function QueryServerState()
{
    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryServerState=1",
        data: "",
        success: function (response) {
            var jsonObj = JSON.parse(response);

            if(jsonObj.State == 0)
            {
                //服务器一切正常
                alert("服务器一切正常");
            }
            else
            {
                //服务器出错，错误号 jsonObj.State
                alert("服务器出错，错误号: " + jsonObj.State);
            }
        },
        error: function (errs) {
            //服务器出错
            alert("服务器返回超时");
        }
    });
}
function Help() {
    var help = document.getElementById("image");
    if (help.style.visibility == "hidden")
    {
        help.style.visibility = "visible";
    } else {
        help.style.visibility = "hidden"
    }
}
function QueryPriceInfo(daoJuType,dongZuoType)
{
    var jsonObj = {};
    jsonObj.DaoJuType = daoJuType;
    jsonObj.dongZuoType = dongZuoType;

    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryCostByType=1",
        data: strJson,
        success: function (response) {
            var jsonObj = JSON.parse(response);
            var price = jsonObj.Price;

        },
        error: function (errs) {
            //服务器出错
            alert("服务器返回超时");
        }
    });
}

function OnClickCheck1() {
    var daojuS = document.getElementById("daojubut");
    daodaojuS.innerHTML = "Search";
    HideSearchResultPanel();
    var radio = document.getElementsByName("ra");
    for (i=0; i<radio.length; i++)
    {
        if (radio[i].checked)
        {
            alert( m_globalZuanTouSearchJsonResult[i].ParamList);


        }
    }
}
function OnClickCheck1() {

    HideSearchResultPanel();
    // var radio = document.getElementsByName("ra");
    // for (i=0; i<radio.length; i++)
    // {
    //     if (radio[i].checked)
    //     {
    //         alert(m_globalDaoBinSearchJsonResult[i].ParamList);
    //
    //
    //     }
    // }
}
function OnClickCheck() {

    HideSearchResultPanel();

    // var radio = document.getElementsByName("ra");
    //
    // for (var i=0; i<radio.length; i++)
    // {
    //     if (radio[i].checked)
    //     {
    //         m_daobing = m_globalDaoBinSearchJsonResult[i].ParamList
    //
    //         break;
    //
    //     }
    // }
}
function OnClickFand()
{
    var looks = document.getElementById("looks");
    if (looks.style.visibility == "hidden")
    {
        looks.style.visibility = "visible";
    } else {
        looks.style.visibility = "hidden";
    }
}
function OnLook() {
    var look = document.getElementById("look");
    if (look.style.visibility == "hidden")
    {
        look.style.visibility = "visible";
    } else {
        look.style.visibility = "hidden";
    }
}
// function OnClickOverlay(onLoadAsmModel){
//     var jiShuObj = m_globalJiShuYaoQiuJsonObj;
//
//     if (jiShuObj == null || jiShuObj == undefined || jiShuObj == "")
//     {
//         alert("请填写技术要求的参数");
//         return;
//     }
//     var result = JsonToIni2(jiShuObj);
//     var jiShuYaoQiu = result;
//
//
//     var daoJuObj = g_daoJuIniString;
//
//     if (daoJuObj == null || daoJuObj == undefined || daoJuObj == "")
//     {
//         alert("请填写Design的参数");
//         return;
//     }
//     var result = JsonToIni4(daoJuObj);
//     var daoJuDesign = result;
//
//
//
//     // var daoBingObj = m_daobing;
//     // var a = jQuery.isEmptyObject(daoBingObj);
//     // if  (a == true || daoBingObj == null || daoBingObj == undefined || daoBingObj == "")
//     // {
//     //     alert("请选择Search的参数");
//     //     return;
//     // }
//     // var result = JsonToIni3(daoBingObj);
//     // var daoBingSearch = result;
//     var searchList = m_searchinilist;
//     if (searchList == null || searchList == undefined || searchList == "")
//     {
//         alert("请填写Search的参数");
//     }
//
//     // var jiaChiValue = document.getElementById("JiaChiChangDuValue").value;
//     // var jiaChiName = document.getElementById("JiaChiChangDuName");
//     // if (jiaChiValue == null || jiaChiValue == undefined || jiaChiValue == "")
//     // {
//     //     alert("请填写夹持长度的值");
//     //     return;
//     // }
//     // var jiaChiChangDu = "L_in=" + jiaChiValue + "\r\n";
//     //var zhuangPei = daoBingSearch + daoJuDesign + jiaChiChangDu + jiShuYaoQiu;
//
//
//
//         var tempJsonObj = IniToJsonObj(zhuangPei);
//
//
//
//         var tempJsonObj = {};
//         tempJsonObj.DaoJuType = 1;
//         tempJsonObj.IniString = zhuangPei;
//         tempJsonObj.ActionTypeArray = new Array();
//         tempJsonObj.ActionTypeArray.push(7);
//         tempJsonObj.ActionTypeArray.push(15);
//
//         var strJson = JSON.stringify(tempJsonObj);
//
//         QueryPriceFromServer(tempJsonObj.DaoJuType,tempJsonObj.ActionTypeArray,function(resultJson)
//         {
//             var price = resultJson.Price;
//             var strTips = "装配该模型需要花费 " + price + " 元，需要购买吗？";
//             if(confirm(strTips))
//             {
//                 onClickUpdateCallBack();
//                 var handleLength = 0;
//                 //update here
//                 $.ajax({
//                     type: 'POST',
//                     url: globalServerAddr + "api?buyAsmModel=1",
//                     data: strJson,
//                     success: function (response) {
//
//                         LoadBaoJiaGUI("config/BaoJia/BaoJiaXinXi.json",zuanTouSearchMenuObj);RequestUserInfo();
//
//                         onLoadAsmModel(response,handleLength);
//                         //关闭
//                         g_isCreatingNewModel = false;
//                         g_isModifyingModel = true;
//
//                         UpdateGenerateServerIDBtnBackGroundColor(m_globalGuiJsonObj);
//
//                     },
//                     error: function (errs) {
//
//                         alert(errs.responseText);
//                         HideProgressBar();
//                     }
//                 });
//             }
//             else
//             {
//
//             }
//         });
//
//
// }
function LoadLingJianTreeByJson_NobelTech(strPath,callBackFunc)
{
    /*
    var scope = this;

    var loader = new THREE.FileLoader( scope.manager );
    loader.load( strPath, function ( text ) {
        //var objArray =i eval('(' + text + ')');
        var objArray = JSON.parse(text);

        for(var i = 0; i < objArray.length; i++)
        {
            var elementKu = CreateElementKu(objArray[i]);
            m_globalKuContainer.push(elementKu);
            //hp generate = kaf
        }
        onFinishedCallBack();
    });
    */
}
function LoadDemoLingJianInnerHTML_NobelTech(path)
{
    var scope = this;

    var loader = new THREE.FileLoader( scope.manager );
    loader.load( path, function ( text ) {
        var htmlCtrl = document.getElementById("LingJianDesign");
        if(htmlCtrl)
        {
            htmlCtrl.innerHTML = text;
            LoadDemoLingJianMapJson_NobelTech("./config/LingJian/DemoDesignLingJianMap.json");
        }
    });

}
function LoadDemoLingJianMapJson_NobelTech(path)
{
    var scope = this;

    var loader = new THREE.FileLoader( scope.manager );
    loader.load( path, function ( text ) {
        g_lingJianParamMap = JSON.parse(text);
        UpdateTree_NobelTech();
    });
}
function buttonnone(a) {
    var KuFilterBtn2 = document.getElementById("KuFilterBtn2");
    var yesone = document.getElementById("yesone");
    var LingJianBtn2 = document.getElementById("LingJianBtn2");
    var yestwo = document.getElementById("yestwo");
    var ParamDesignBtn1 = document.getElementById("ParamDesignBtn1");
    var ParamDesignBtn2 = document.getElementById("ParamDesignBtn2");
    if (a == 1)
    {
        yesone.style.visibility = "hidden";
        LingJianBtn2.style.visibility = "hidden";
        yestwo.style.visibility = "hidden";
        ParamDesignBtn1.style.visibility = "hidden";
        ParamDesignBtn2.style.visibility = "hidden";
        KuFilterBtn2.style.visibility = "visible";
        KuFilterBtn2.innerHTML = "确定";
        KuFilterBtn2.onclick = function () {lastZhuangPei(onCallBack)};
    }
    if (a == 2) {
        yesone.style.visibility = "visible";
        LingJianBtn2.style.visibility = "visible";
        yestwo.style.visibility = "visible";
        ParamDesignBtn1.style.visibility = "visible";
        ParamDesignBtn2.style.visibility = "visible";
        KuFilterBtn2.style.visibility = "visible";
        KuFilterBtn2.innerHTML = "查看";
    }
    if (a == 3)
    {
        yesone.style.visibility = "hidden";
        LingJianBtn2.style.visibility = "hidden";
        yestwo.style.visibility = "hidden";
        ParamDesignBtn1.style.visibility = "hidden";
        ParamDesignBtn2.style.visibility = "hidden";
        KuFilterBtn2.style.visibility = "hidden";
    }
}

function inits(index) {
    var ParamDesign = document.getElementById("ParamDesign");
    var KuContainer = document.getElementById("KuContainer");
    var LingJianDesign = document.getElementById("LingJianDesign");
    var ParamTitle = document.getElementById("ParamTitle");
    var KuTitle = document.getElementById("KuTitle");
    var LingJianTitle = document.getElementById("LingJianTitle");
    var LingJianSlotContainers = document.getElementById("LingJianSlotContainers");
    var LingJianDesigns = document.getElementById("LingJianDesigns");
    var LingJianSlotContainer = document.getElementById("LingJianSlotContainer");

    if (index == 0)
    {
        ParamDesign.innerHTML = "";
        KuContainer.innerHTML = "";
        LingJianSlotContainers.style.visibility = "hidden";
        LingJianDesigns.style.visibility = "hidden";
        LingJianSlotContainer.style.visibility = "visible";
        LingJianDesign.style.visibility = "visible";
        ParamTitle.innerHTML = "搜索条件";
        KuTitle.innerHTML = "搜索列表";
        LingJianTitle.innerHTML = "装配数量编辑";
        var biaotou = document.getElementById("biaotou");

        var nums = $(LingJianDesign).children().length;
        if (nums > 1)
        {
            biaotou.style.visibility = "visible";
        }
    }
    if (index == 1)
    {
        ParamDesign.innerHTML = "";
        KuContainer.innerHTML = "";
        LingJianSlotContainers.style.visibility = "hidden";
        LingJianDesigns.style.visibility = "hidden";
        LingJianSlotContainer.style.visibility = "visible";
        LingJianDesign.style.visibility = "visible";
        ParamTitle.innerHTML = "搜索条件";
        KuTitle.innerHTML = "搜索列表";
        LingJianTitle.innerHTML = "装配数量编辑";
        var biaotou = document.getElementById("biaotou");

        var nums = $(LingJianDesign).children().length;
        if (nums > 1)
        {
            biaotou.style.visibility = "visible";
        }

    }
    if (index == 2)
    {
        LingJianSlotContainer.style.visibility = "hidden";
        LingJianDesign.style.visibility = "hidden";
        LingJianSlotContainers.style.visibility = "visible";
        LingJianDesigns.style.visibility = "visible";
        var biaotou = document.getElementById("biaotou");
        var EditSlot_a = document.getElementById("EditSlot_a");
        EditSlot_a.innerHTML = "<div class=\"smallbutton search\" id=\"GuanBi\" onclick=\"OnClose()\">关闭</div>";
        biaotou.style.visibility = "hidden";
        ParamTitle.innerHTML = "装配品种清单";
        KuTitle.innerHTML = "装配品种清单";
        LingJianTitle.innerHTML = "帮助";
    }
}

function OnClickZhuangPei()
{
    var ParamDesign = document.getElementById("ParamDesign");
    var KuContainer = document.getElementById("KuContainer");
    ParamDesign.innerHTML = "";
    KuContainer.innerHTML = "";
    OnClickSearch("ZhuangPei","ParamDesign",1);
    OnClickSearch("ZhuangPei","KuContainer",2)
}
function OnClickClearAll() {
    OnClear("LingJianBtn2");
    m_searchinilist = "";
    zhuangPeiDaoBingObj = [];
    zhuangPeiMoKuaiHuaTangDaoObj = [];
    zhuangPeiDaoPianObj = [];
    g_comboBoxObjArray = [];
    buttonnone(3);
    OnClose();
    Table(daoju,g_resultJsonObj);
}
function ChangeJieGou() {
    var select = document.getElementById("selectSearch");
    var con = confirm("更换结构将会清空上组所有数据！");
    if (con) {
        OnClear("LingJianBtn2");
    } else {
        var lastIndex = 0;
        var strArray = select.options;
        for(var i = 0;i < strArray.length; i++)
        {
            if(strArray[i].text == ListName)
            {
                lastIndex = i;
                break;
            }
        }
        select.selectedIndex = lastIndex;
        return;
    }
}
function Change() {
    var select = document.getElementById("selectSearch");
    var selectValue = select.options[select.selectedIndex].text;
    var DaoPianSearchHtml = document.getElementById("EditSlot_a");
    if (wenJianDaoBingObj.length > 0 || wenJianDaoPianObj.length > 0 || wenJianMoKuaiHuaTangDaoObj.length > 0 || zhuangPeiDaoBingObj.length > 0 || zhuangPeiDaoPianObj.length > 0 || zhuangPeiMoKuaiHuaTangDaoObj.length > 0)
    {
        if (ListName != selectValue) {
            if (searchName == "刀片" && wenJianDaoPianObj.length > 0)
            {
                ChangeJieGou();
            }
            if (searchName == "刀柄" && wenJianDaoBingObj.length > 0)
            {
                ChangeJieGou();
            }
            if (searchName == "模块化镗刀" && wenJianMoKuaiHuaTangDaoObj.length > 0)
            {
                ChangeJieGou();
            }
        }
    }

    if (selectValue == "整体刀柄")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"ZhengTiDaoBing\" onclick=\"OnSearch(this.id)\">整体刀柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"YanChangGan\"  onclick=\"OnSearch(this.id)\">延长杆</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaTao\"  onclick=\"OnSearch(this.id)\">夹套</div>";

    } else if(selectValue == "模块化刀柄")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiChuBing\" onclick=\"OnSearch(this.id)\">基础柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"BianJingYanChang\"  onclick=\"OnSearch(this.id)\">变径延长</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"GongNengTou\"  onclick=\"OnSearch(this.id)\">功能头</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaTao\"  onclick=\"OnSearch(this.id)\">夹套</div>";

    } else if (selectValue == "可调刀柄")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"KeTiaoDaoBingHouDuan\"  onclick=\"OnSearch(this.id)\">可调刀柄后端</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"KeTiaoDaoBingQianDuan\" onclick=\"OnSearch(this.id)\">可调刀柄前端</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaTao\"  onclick=\"OnSearch(this.id)\">夹套</div>";
    } else if (selectValue == "车刀刀座")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"CheDaoDaoZuo\"  onclick=\"OnSearch(this.id)\">车刀刀座</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaTao\"  onclick=\"OnSearch(this.id)\">夹套</div>";
    } else if (selectValue == "18-205粗镗刀")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiChuBing\" onclick=\"OnSearch(this.id)\">基础柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"BianJingYanChang\"  onclick=\"OnSearch(this.id)\">变径延长</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CuTangDaoTou\" onclick=\"OnSearch(this.id)\">粗镗刀头</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CuTangDaoJia\"  onclick=\"OnSearch(this.id)\">粗镗刀夹</div>";
    } else if (selectValue == "0.3-6.2精镗刀")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiChuBing\" onclick=\"OnSearch(this.id)\">基础柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"BianJingYanChang\"  onclick=\"OnSearch(this.id)\">变径延长</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JingTangDaoTou\"  onclick=\"OnSearch(this.id)\">精镗刀头</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaTao\"  onclick=\"OnSearch(this.id)\">夹套</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"ZhengTiTangDaoGan\"  onclick=\"OnSearch(this.id)\">整体镗刀杆</div>";
    } else if (selectValue == "6-13精镗刀")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiChuBing\" onclick=\"OnSearch(this.id)\">基础柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"BianJingYanChang\"  onclick=\"OnSearch(this.id)\">变径延长</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JingTangDaoTou\"  onclick=\"OnSearch(this.id)\">精镗刀头</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"KeZhuanWeiTangDaoGan\"  onclick=\"OnSearch(this.id)\">可转位镗刀杆</div>";
    } else if (selectValue == "13-63精镗刀")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiChuBing\" onclick=\"OnSearch(this.id)\">基础柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"BianJingYanChang\"  onclick=\"OnSearch(this.id)\">变径延长</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JingTangDaoTou\"  onclick=\"OnSearch(this.id)\">精镗刀头</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"KeZhuanWeiTangDaoGan\"  onclick=\"OnSearch(this.id)\">可转位镗刀杆</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JingTangDaoJia\"  onclick=\"OnSearch(this.id)\">精镗刀夹</div>";
    } else if (selectValue == "所有")
    {
        ListName = selectValue;
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"XiDaopian\" onclick=\"OnSearch(this.id)\">铣刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CheDaopian\" onclick=\"OnSearch(this.id)\">车刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"ZuanDaopian\"  onclick=\"OnSearch(this.id)\">钻刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaoDaopian\"  onclick=\"OnSearch(this.id)\">铰刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CaoDaopian\"  onclick=\"OnSearch(this.id)\">槽刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"KeHuanDaoTou\"  onclick=\"OnSearch(this.id)\">可换刀头</div>";
    }

    ButtonHtml += "<div class=\"smallbutton search\" id=\"GuanBi\" onclick=\"OnClose()\">关闭</div>";
    DaoPianSearchHtml.innerHTML = ButtonHtml;

}

function JsonSort(json,key) {
    for (var j = 1, j1 = json.length; j < j1; j++)
    {
        var temp = json[j], val = temp[key], i = j-1;
        while (i >= 0 && json[i][key] > val)
        {
            json[i+1] = json[i];
            i = i-1;
        }
        json[i+1] = temp;
    }
    return json;
}

function OnClickSearch(id,htmlId,mode) {
    var gameCanvass = document.getElementById("gameCanvass");

    gameCanvass.style.visibility = "visible";
    searchName = null;
    if (id == "DaoPianSearchButton")
    {
        searchName = "刀片"
        inits(0);
        buttonnone(2);
        var DaoPianSearchHtml = document.getElementById("EditSlot_a");
        var DaoPianSelectHtml = document.getElementById("EditSlot_b");
        var SelectHtml = "<div class=\"jiegoubut\"><a id=\"a\" style=\"text-decoration: none\">刀片结构:</a><select id=\"selectSearch\" onchange=\"Change()\"><option value=\"0\">所有</option></select></div>";
        ListName = "所有";
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"XiDaopian\" onclick=\"OnSearch(this.id)\">铣刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CheDaopian\" onclick=\"OnSearch(this.id)\">车刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"ZuanDaopian\"  onclick=\"OnSearch(this.id)\">钻刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaoDaopian\"  onclick=\"OnSearch(this.id)\">铰刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CaoDaopian\"  onclick=\"OnSearch(this.id)\">槽刀片</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"KeHuanDaoTou\"  onclick=\"OnSearch(this.id)\">可换刀头</div>";

        ButtonHtml += "<div class=\"smallbutton\" id=\"GuanBi\" onclick=\"OnClose()\">关闭</div>";

        DaoPianSelectHtml.innerHTML = SelectHtml;
        DaoPianSearchHtml.innerHTML = ButtonHtml;

    }
    if (id == "DaoBingSearchButton")
    {
        searchName = "刀柄";
        inits(1);
        buttonnone(2);
        var DaoPianSearchHtml = document.getElementById("EditSlot_a");
        var DaoPianSelectHtml = document.getElementById("EditSlot_b");
        var SelectHtml = "<div class=\"jiegoubut\"><a id=\"a\" style=\"text-decoration: none\">刀柄结构:</a><select id=\"selectSearch\" onchange=\"Change()\"><option value=\"0\">整体刀柄</option><option value=\"1\">模块化刀柄</option><option value=\"2\">可调刀柄</option><option value=\"3\">车刀刀座</option></select></div>";
        ListName = "整体刀柄";
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"ZhengTiDaoBing\" onclick=\"OnSearch(this.id)\">整体刀柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"YanChangGan\"  onclick=\"OnSearch(this.id)\">延长杆</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiaTao\"  onclick=\"OnSearch(this.id)\">夹套</div>";

        ButtonHtml += "<div class=\"smallbutton search\" id=\"GuanBi\" onclick=\"OnClose()\">关闭</div>";

        DaoPianSelectHtml.innerHTML = SelectHtml;
        DaoPianSearchHtml.innerHTML = ButtonHtml;
    }
    if (id == "TangDaoSearchButton")
    {
        searchName = "模块化镗刀";
        inits(1);
        buttonnone(2);
        var DaoPianSearchHtml = document.getElementById("EditSlot_a");
        var DaoPianSelectHtml = document.getElementById("EditSlot_b");
        var SelectHtml = "<div class=\"jiegoubut\"><a id=\"a\" style=\"text-decoration: none\">镗刀结构:</a><select id=\"selectSearch\" onchange=\"Change()\"><option value=\"0\">18-205粗镗刀</option><option value=\"1\">0.3-6.2精镗刀</option><option value=\"2\">6-13精镗刀</option><option value=\"3\">13-63精镗刀</option></select></div>";
        ListName = "18-205粗镗刀";
        var ButtonHtml = "<div class=\"smallbutton search\" id=\"LaDing\" onclick=\"OnSearch(this.id)\">拉钉</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"JiChuBing\" onclick=\"OnSearch(this.id)\">基础柄</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"BianJingYanChang\"  onclick=\"OnSearch(this.id)\">变径延长</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CuTangDaoTou\" onclick=\"OnSearch(this.id)\">粗镗刀头</div>";
        ButtonHtml += "<div class=\"smallbutton search\" id=\"CuTangDaoJia\"  onclick=\"OnSearch(this.id)\">粗镗刀夹</div>";


        ButtonHtml += "<div class=\"smallbutton search\" id=\"GuanBi\" onclick=\"OnClose()\">关闭</div>";

        DaoPianSelectHtml.innerHTML = SelectHtml;
        DaoPianSearchHtml.innerHTML = ButtonHtml;
    }
    if (id == "ZhuangPei")
    {
        var DaoPianSelectHtml = document.getElementById("EditSlot_b");
        DaoPianSelectHtml.innerHTML = "";
        inits(2);
        buttonnone(1);
        var ParamDesign = document.getElementById(htmlId);
        zhuangPeiArray  = [];
        var daoju = null;
        if (zhuangPeiMoKuaiHuaTangDaoObj.length > 0 && zhuangPeiDaoPianObj.length < 1)
        {}
        else
        {
            daoju  = g_daoJuIniString.Tab[0].ParamList[0].Choise;

            var result = JsonToIni4(g_daoJuIniString,daoju);
            var tempJsonObj = IniToJsonObj(result);

            zhuangPeiArray.push({"Name":daoju,"Ini":tempJsonObj});
        }
        var s = 0;
        if (zhuangPeiDaoPianObj.length > 0 || zhuangPeiDaoBingObj.length > 0 || zhuangPeiMoKuaiHuaTangDaoObj.length > 0) {
            if (mode == 1)
            {
                var menuLeftHtml = "<div class=\"qingdans\"><div class=\"caozuo\">序号</div><div class=\"tool_type\">名称</div><div class=\"no\">订货型号</div><div class=\"num\">数量</div></div>";

            }

            if (mode == 2)
            {
                if (zhuangPeiMoKuaiHuaTangDaoObj.length > 0)
                {
                    var menuLeftHtml = "<div class=\"qingdans\"><div class=\"tangdao\">名称</div><div class=\"tangdao\">直径(mm)</div></div>";
                    menuLeftHtml += "<div  class=\"qingdan\"><div class=\"tangdao\">镗刀</div><div class=\"tangdao\"><input id=\"td_dm\" style=\"width: 20%;height: 12px;\"/></div></div>";
                    menuLeftHtml += "<div class=\"qingdans\"><div class=\"xuhao\">序号</div><div class=\"names\">名称</div><div class=\"xinghao\">订货型号</div><div class=\"ceng\">层</div><div class=\"cao\">位置</div><div class=\"jiachi\">夹持长度</div></div>";
                } else
                {
                    var menuLeftHtml = "<div class=\"qingdans\"><div class=\"xuhao\">序号</div><div class=\"names\">名称</div><div class=\"xinghao\">订货型号</div><div class=\"ceng\">层</div><div class=\"cao\">位置</div><div class=\"jiachi\">夹持长度</div></div>";
                }
            }

            if (zhuangPeiDaoPianObj.length > 0 && wenJianDaoPianObj.length > 0)
            {
                    if (mode == 1) {
                        for (var i = 0; i < wenJianDaoPianObj.length; i++) {
                            s++;
                            var No = null;
                            var num = null;
                            for (var j = 0; j < wenJianDaoPianObj[i].List.length; j++) {
                                if (wenJianDaoPianObj[i].List[j].Name == "No") {
                                    No = wenJianDaoPianObj[i].List[j].Value;
                                }
                                if (wenJianDaoPianObj[i].List[j].Name == "num") {
                                    num = wenJianDaoPianObj[i].List[j].Value;
                                }
                            }
                            menuLeftHtml += "<div class=\"qingdan\"><div class=\"caozuo\">" + s + "</div><div class=\"tool_type\">" + wenJianDaoPianObj[i].Name + "</div><div class=\"no\">" + No + "</div><div class=\"num\">" + num + "</div></div>";

                        }
                    }

                    if(mode == 2)
                    {
                        var json = JsonSort(zhuangPeiDaoPianObj,'NUM');
                        var FN = json[json.length-1].FN;
                        for (var i = 0; i < zhuangPeiDaoPianObj.length; i++)
                        {
                            s++

                            var Nos = null;
                            for (var j = 0; j < zhuangPeiDaoPianObj[i].List.length; j++) {
                                if (zhuangPeiDaoPianObj[i].List[j].Name == "No") {
                                    Nos = zhuangPeiDaoPianObj[i].List[j].Value;
                                }
                            }
                            if (zhuangPeiDaoPianObj[i].FN == FN)
                            {
                                menuLeftHtml += "<div id=\'" + zhuangPeiDaoPianObj[i].ID + "\' class=\"qingdan\"><div class=\"xuhao\">" + s + "</div><div class=\"names\">" + zhuangPeiDaoPianObj[i].Name + "</div><div class=\"xinghao\">" + Nos + "</div><div class=\"ceng\">无</div><div class=\"cao\">无</div><div class=\"jiachi\">无</div></div>";

                            } else
                            {
                                menuLeftHtml += "<div id=\'" + zhuangPeiDaoPianObj[i].ID + "\' class=\"qingdan\"><div class=\"xuhao\">" + s + "</div><div class=\"names\">" + zhuangPeiDaoPianObj[i].Name + "</div><div class=\"xinghao\">" + Nos + "</div><div class=\"ceng\"><input id=\"ceng\" maxlength=\"2\" style=\"width: 75%\"/></div><div class=\"cao\"><input id=\"cao\" style=\"width: 75%\"/></div><div class=\"jiachi\">无</div></div>";
                            }
                        }
                    }


            }
            if (zhuangPeiDaoBingObj.length > 0)
            {
                for (var i = 0; i < zhuangPeiDaoBingObj.length; i++) {
                    s++;
                    var No = null;
                    var num = null;
                    for (var j = 0; j < zhuangPeiDaoBingObj[i].List.length; j++) {
                        if (zhuangPeiDaoBingObj[i].List[j].Name == "No") {
                            No = zhuangPeiDaoBingObj[i].List[j].Value;
                        }
                        if (zhuangPeiDaoBingObj[i].List[j].Name == "num") {
                            num = zhuangPeiDaoBingObj[i].List[j].Value;
                        }
                    }

                    if (mode == 1)
                    {
                        menuLeftHtml += "<div class=\"qingdan\"><div class=\"caozuo\">" + s + "</div><div class=\"tool_type\">" + zhuangPeiDaoBingObj[i].Name + "</div><div class=\"no\">" + No + "</div><div class=\"num\">" + num + "</div></div>";

                    }
                    if (mode == 2)
                    {
                        if (zhuangPeiDaoBingObj[i].Name == "延长杆" || zhuangPeiDaoBingObj[i].Name == "变径延长")
                        {
                            menuLeftHtml += "<div id=\'" + zhuangPeiDaoBingObj[i].ID + "\' class=\"qingdan\"><div class=\"xuhao\">" + s + "</div><div class=\"names\">" + zhuangPeiDaoBingObj[i].Name + "</div><div class=\"xinghao\">" + No + "</div><div class=\"ceng\">无</div><div class=\"cao\">无</div><div class=\"jiachi\"><input id=\"jiachi\" style=\"width: 50%\"/></div></div>";
                        } else
                        {
                            menuLeftHtml += "<div id=\'" + zhuangPeiDaoBingObj[i].ID + "\' class=\"qingdan\"><div class=\"xuhao\">" + s + "</div><div class=\"names\">" + zhuangPeiDaoBingObj[i].Name + "</div><div class=\"xinghao\">" + No + "</div><div class=\"ceng\">无</div><div class=\"cao\">无</div><div class=\"jiachi\">无</div></div>";
                        }

                    }
                }
            }
            if (zhuangPeiMoKuaiHuaTangDaoObj.length > 0)
            {
                for (var i = 0; i < zhuangPeiMoKuaiHuaTangDaoObj.length; i++) {
                    s++;
                    var No = null;
                    var num = null;
                    for (var j = 0; j < zhuangPeiMoKuaiHuaTangDaoObj[i].List.length; j++) {
                        if (zhuangPeiMoKuaiHuaTangDaoObj[i].List[j].Name == "No") {
                            No = zhuangPeiMoKuaiHuaTangDaoObj[i].List[j].Value;
                        }
                        if (zhuangPeiMoKuaiHuaTangDaoObj[i].List[j].Name == "num") {
                            num = zhuangPeiMoKuaiHuaTangDaoObj[i].List[j].Value;
                        }
                    }


                    if (mode == 1)
                    {
                        menuLeftHtml += "<div  class=\"qingdan\"><div class=\"caozuo\">" + s + "</div><div class=\"tool_type\">" + zhuangPeiMoKuaiHuaTangDaoObj[i].Name + "</div><div class=\"no\">" + No + "</div><div class=\"num\">" + num + "</div></div>";

                    }
                    if (mode == 2)
                    {
                        if (zhuangPeiMoKuaiHuaTangDaoObj[i].Name == "整体镗刀杆" || zhuangPeiMoKuaiHuaTangDaoObj[i].Name == "变径延长" || zhuangPeiMoKuaiHuaTangDaoObj[i].Name == "可转位镗刀杆")
                        {
                            menuLeftHtml += "<div id=\'" + zhuangPeiMoKuaiHuaTangDaoObj[i].ID + "\' class=\"qingdan\"><div class=\"xuhao\">" + s + "</div><div class=\"names\">" + zhuangPeiMoKuaiHuaTangDaoObj[i].Name + "</div><div class=\"xinghao\">" + No + "</div><div class=\"ceng\">无</div><div class=\"cao\">无</div><div class=\"jiachi\"><input  style=\"width: 50%\"/></div></div>";
                        } else
                        {
                            menuLeftHtml += "<div id=\'" + zhuangPeiMoKuaiHuaTangDaoObj[i].ID + "\' class=\"qingdan\"><div class=\"xuhao\">" + s + "</div><div class=\"names\">" + zhuangPeiMoKuaiHuaTangDaoObj[i].Name + "</div><div class=\"xinghao\">" + No + "</div><div class=\"ceng\">无</div><div class=\"cao\">无</div><div class=\"jiachi\">无</div></div>";

                        }
                    }
                }
            }




            if (zhuangPeiMoKuaiHuaTangDaoObj.length > 0 && zhuangPeiDaoPianObj.length < 1)
            {

            } else
            {
                if (mode == 1)
                {
                    s++;
                    menuLeftHtml += "<div class=\"qingdan\"><div class=\"caozuo\">" + s + "</div><div class=\"tool_type\">" + zhuangPeiArray[0].Name + "</div><div class=\"no\">" + zhuangPeiArray[0].Ini.No + "</div><div class=\"num\">1</div></div>";

                }

                if (mode == 2)
                {
                    s++;
                    menuLeftHtml += "<div id=\"daojuin\" class=\"qingdan\"><div class=\"xuhao\">" + s + "</div><div class=\"names\">" + zhuangPeiArray[0].Name + "</div><div class=\"xinghao\">" + zhuangPeiArray[0].Ini.No + "</div><div class=\"ceng\">无</div><div class=\"cao\">无</div><div class=\"jiachi\"><input style=\"width: 50%;\"/></div></div>";

                }
            }

            ParamDesign.innerHTML = menuLeftHtml;
        }


    }
}
function lastZhuangPei(callback) {
    OnClose();
    if (wenJianDaoPianObj.length > 0 || wenJianDaoBingObj.length > 0 || wenJianMoKuaiHuaTangDaoObj.length > 0)
    {
        var daoBing = "";
        var daoPian = "";
        var moKuaiHuaTangDao = "";
        var zhuangPei = "";
        if (zhuangPeiDaoPianObj.length > 0) {
            var KuContainer = document.getElementById("KuContainer");
            var ListHtml =  $(KuContainer).children();
            for (var i = 1; i < ListHtml.length; i++)
            {
                for (var j = 0; j < zhuangPeiDaoPianObj.length; j++)
                {
                    if (ListHtml[i].id == zhuangPeiDaoPianObj[j].ID)
                    {
                        var id = document.getElementById(ListHtml[i].id);
                        var inputs = $(id).find("input");
                        if (inputs.length > 0)
                        {
                            var ceng = inputs[0].value;
                            var cao = inputs[1].value;
                            zhuangPeiDaoPianObj[j].List.push({"Name":"ceng","Value":ceng},{"Name":"cao","Value":cao})
                        }
                    }
                }
            }
            var result = "";
            for (var i = 0; i < zhuangPeiDaoPianObj.length; i++) {
                result += JsonToIni3(zhuangPeiDaoPianObj[i].List,zhuangPeiDaoPianObj[i].Name);
            }
            daoPian = "[刀片]" + "\r\n" + result;
        }

        if (zhuangPeiDaoBingObj.length > 0) {
            var KuContainer = document.getElementById("KuContainer");
            var ListHtml =  $(KuContainer).children();
            for (var i = 1; i < ListHtml.length; i++)
            {
                for (var j = 0; j < zhuangPeiDaoBingObj.length; j++)
                {
                    if (ListHtml[i].id == zhuangPeiDaoBingObj[j].ID)
                    {
                        if (zhuangPeiDaoBingObj[j].Name == "延长杆" || zhuangPeiDaoBingObj[j].Name == "变径延长")
                        {
                            var id = document.getElementById(ListHtml[i].id);
                            var inputs = $(id).find("input");
                            var jiachi = inputs[0].value;
                            zhuangPeiDaoBingObj[j].List.push({"Name":"L_in","Value":jiachi});
                        }
                    }
                }
            }
            var result = "";
            for (var i = 0; i < zhuangPeiDaoBingObj.length; i++) {
                result += JsonToIni3(zhuangPeiDaoBingObj[i].List,zhuangPeiDaoBingObj[i].Name);
            }
            daoBing = "[刀柄]" + "\r\n" + result;
        }

        if(zhuangPeiMoKuaiHuaTangDaoObj.length > 0)
        {
            var KuContainer = document.getElementById("KuContainer");
            var ListHtml =  $(KuContainer).children();
            for (var i = 1; i < ListHtml.length; i++)
            {
                for (var j = 0; j < zhuangPeiMoKuaiHuaTangDaoObj.length; j++)
                {
                    if (ListHtml[i].id == zhuangPeiMoKuaiHuaTangDaoObj[j].ID)
                    {
                        if (zhuangPeiMoKuaiHuaTangDaoObj[j].Name == "变径延长" || zhuangPeiMoKuaiHuaTangDaoObj[j].Name == "可转位镗刀杆" || zhuangPeiMoKuaiHuaTangDaoObj[j].Name == "整体镗刀杆")
                        {
                            var id = document.getElementById(ListHtml[i].id);
                            var inputs = $(id).find("input");
                            var jiachi = inputs[0].value;
                            zhuangPeiMoKuaiHuaTangDaoObj[j].List.push({"Name":"L_in","Value":jiachi});
                        }
                    }
                }
            }
            for (var i = 0; i < zhuangPeiMoKuaiHuaTangDaoObj.length; i++) {
                result += JsonToIni3(zhuangPeiMoKuaiHuaTangDaoObj[i].List,zhuangPeiMoKuaiHuaTangDaoObj[i].Name);
            }
            var tangdao = document.getElementById("td_dm");
            var td_dm = tangdao.value;
            td_dm = "td_dm=" + td_dm + "\r\n";
            moKuaiHuaTangDao = result + td_dm;
        }

        var daoJuInput = document.getElementById("daojuin");
        var daoJu = "";
        var Fn = null;
        if (daoJuInput == null)
        {

        } else
        {
            var inputs = $(daoJuInput).find("input");
            var jiaChi = inputs[0].value;
            daoJu = "[刀具]" + "\r\n" + JsonToIni4(g_daoJuIniString,g_daoJuIniString.Tab[0].ParamList[0].Choise) + "L_in=" + jiaChi + "\r\n";
            Fn = "FN=" + g_daoJuIniString.Tab[0].ParamList[3].Value + "\r\n";
        }
        var jiShuYaoQiu = JsonToIni2(m_globalJiShuYaoQiuJsonObj);



        if (moKuaiHuaTangDao != "")
        {
            if (daoPian != "")
            {
                zhuangPei = "asm_type=" + zhuangPeiMoKuaiHuaTangDaoObj[0].ListName + "\r\n" + moKuaiHuaTangDao + daoPian + jiShuYaoQiu;
            } else
            {
                zhuangPei = "asm_type=" + zhuangPeiMoKuaiHuaTangDaoObj[0].ListName + "\r\n" + moKuaiHuaTangDao + jiShuYaoQiu;
            }
            zhuangPei = "asm_type=" + zhuangPeiMoKuaiHuaTangDaoObj[0].ListName + "\r\n" + moKuaiHuaTangDao +jiShuYaoQiu;
        } else if (daoBing != "")
        {
            if (daoPian != "")
            {
                zhuangPei = "asm_type=" + zhuangPeiDaoBingObj[0].ListName + "\r\n" + daoBing + daoJu + daoPian + jiShuYaoQiu + Fn;
            } else
            {
                zhuangPei = "asm_type=" + zhuangPeiDaoBingObj[0].ListName + "\r\n" + daoBing + daoJu + jiShuYaoQiu + Fn;
            }
        } else if (daoPian != "")
        {
            zhuangPei = daoJu + daoPian + jiShuYaoQiu + Fn ;
        }


            var tempJsonObj = IniToJsonObj(zhuangPei);
            var tempJsonObj = {};
            tempJsonObj.DaoJuType = 1;
            tempJsonObj.IniString = zhuangPei;
            tempJsonObj.ActionTypeArray = new Array();
            tempJsonObj.ActionTypeArray.push(7);
            tempJsonObj.ActionTypeArray.push(15);

            var strJson = JSON.stringify(tempJsonObj);

            QueryPriceFromServer(tempJsonObj.DaoJuType,tempJsonObj.ActionTypeArray,function(resultJson)
            {
                var price = resultJson.Price;
                var strTips = "装配该模型需要花费 " + price + " 元，需要购买吗？";
                if(confirm(strTips))
                {
                    onClickUpdateCallBack();
                    var handleLength = 0;
                    //update here
                    $.ajax({
                        type: 'POST',
                        url: globalServerAddr + "api?buyAsmModel=1",
                        data: strJson,
                        success: function (response) {
                            var resultJsonObj = JSON.parse(response);
                            LoadBaoJiaGUI("config/BaoJia/BaoJiaXinXi.json",zuanTouSearchMenuObj);RequestUserInfo();

                            callback(response,handleLength);
                            //关闭
                            g_isCreatingNewModel = false;
                            g_isModifyingModel = true;
                            //var modelArray = resultJsonObj.ModelFileList.split("\\");
                            ///resultJsonObj.ModelFileList = modelArray[modelArray.length - 1];

                            Table("装配",resultJsonObj);
                            UpdateGenerateServerIDBtnBackGroundColor(m_globalGuiJsonObj);

                        },
                        error: function (errs) {

                            alert(errs.responseText);
                            HideProgressBar();
                        }
                    });
                }
                else
                {

                }
            });

    }
}
function OnSearch(id) {
    Name = null;
    /*刀片*/
    if (id == "XiDaopian")
    {
        Name = "铣刀片";
        strConfigFilePath = "./config/Search/XiDaopian.json";
    } else if (id == "CheDaopian")
    {
        Name = "车刀片";
        strConfigFilePath = "./config/Search/CheDaopian.json";
    } else if (id == "ZuanTangJiaoDaopian")
    {
        Name = "钻镗铰刀片";
        strConfigFilePath = "./config/Search/ZuanTangJiaoDaopian.json";
    } else if (id == "CaoDaopian")
    {
        Name = "槽刀片";
        strConfigFilePath = "./config/Search/CaoDaopian.json";
    } else if (id == "ChaoYingDaopian")
    {
        Name = "超硬刀片";
        strConfigFilePath = "./config/Search/ChaoYingDaopian.json";
    } else if (id == "KeHuanDaoTou")
    {
        Name = "可换刀头";
        strConfigFilePath = "./config/Search/KeHuanDaoTou.json";
    }
    /*刀柄*/
    else if (id == "LaDing")
    {
        Name = "拉钉";
        strConfigFilePath = "./config/Search/LaDing.json";
    } else if (id == "ZhengTiDaoBing")
    {
        Name = "整体刀柄";
        strConfigFilePath = "./config/Search/ZhengTiDaoBing.json";
    } else if (id == "YanChangGan")
    {
        Name = "延长杆";
        strConfigFilePath = "./config/Search/YanChangGan.json";
    } else if (id == "JiaTao")
    {
        Name = "夹套";
        strConfigFilePath = "./config/Search/JiaTao.json";
    } else if (id == "CheDaoDaoZuo")
    {
        strConfigFilePath = "./config/Search/CheDaoDaoZuo.json";
    } else if (id == "JiChuBing")
    {
        Name = "基础柄";
        strConfigFilePath = "./config/Search/JiChuBing.json";
    } else if (id == "BianJingYanChang")
    {
        Name = "变径延长";
        strConfigFilePath = "./config/Search/BianJingYanChang.json";
    } else if (id == "GongNengTou")
    {
        Name = "功能头";
        strConfigFilePath = "./config/Search/GongNengTou.json";
    } else if (id == "KeTiaoDaoBingHouDuan")
    {
        Name = "可调刀柄后端";
        strConfigFilePath = "./config/Search/KeTiaoDaoBingHouDuan.json";
    } else if (id == "KeTiaoDaoBingQianDuan")
    {
        Name = "可调刀柄前端";
        strConfigFilePath = "./config/Search/KeTiaoDaoBingQianDuan.json";
    }
    /*模块化镗刀*/
    else if (id == "CuTangDaoTou")
    {
        Name = "粗镗刀头";
        strConfigFilePath = "./config/Search/CuTangDaoTou.json";
    } else if (id == "CuTangDaoJia")
    {
        Name = "粗镗刀夹";
        strConfigFilePath = "./config/Search/CuTangDaoJia.json";
    } else if (id == "JingTangDaoTou")
    {
        Name = "精镗刀头";
        strConfigFilePath = "./config/Search/JingTangDaoTou.json";
    } else if (id == "ZhengTiTangDaoGan")
    {
        Name = "整体镗刀杆";
        strConfigFilePath = "./config/Search/ZhengTiTangDaoGan.json";
    } else if (id == "KeZhuanWeiTangDaoGan")
    {
        Name = "可转位镗刀杆";
        strConfigFilePath = "./config/Search/KeZhuanWeiTangDaoGan.json";
    } else if (id == "JingTangDaoJia")
    {
        Name = "精镗刀夹";
        strConfigFilePath = "./config/Search/JingTangDaoJia.json";
    } else
    {
        alert("对不起，加载错误，请刷新重试");
        return;
    }
    var scope = this;
    var loader = new THREE.FileLoader( scope.manager );
    loader.load( strConfigFilePath, function ( text ) {
        var jsonObj = JSON.parse(text);
        m_Search = jsonObj;
        UpdateParamDesignByJson_NobelTechs(jsonObj);
    });

}

function Search() {

    var tiaoJianList = [];
    var tiaoJianSearch = [];
    var tableName = null;
    var sql = "";
    var ulList = document.getElementById("ParamDesign");
    var selectArray = $(ulList).find("select");
    if (selectArray.length > 0)
    {
        for (var i = 0; i < selectArray.length; i++)
        {
            var optionsName = selectArray[i].id;
            var optionsValue = selectArray[i].options[selectArray[i].selectedIndex].text;
            if (optionsValue != "所有" && optionsName != "tool_type" && optionsName != "" && optionsName != null && optionsName != undefined && optionsName != "QianDuan")
            {
                tiaoJianList.push({"ini":optionsName,"value":"'" + optionsValue + "'"});
            }
            if (optionsName == "tool_type")
            {
                tableName = optionsValue;
            }
        }
    }
    var inputArray = $(ulList).find("input");
    if (inputArray.length > 0)
    {
        for (var i = 0; i < inputArray.length; i++)
        {
            var inputName = inputArray[i].id;
            var inputValue = inputArray[i].value;
            inputValue = inputValue.trim();
            if (inputValue != null && inputValue != undefined && inputValue != "")
            {
                    tiaoJianList.push({"ini":inputName,"value":inputValue});
            }

        }
    }
    for (var j = 0; j < tiaoJianList.length; j++)
    {
        var ini = tiaoJianList[j].ini;
        if (ini.slice(-4) == "_min")
        {
            sql += "AND " + ini.substring(0,ini.length-4) + " > " + tiaoJianList[j].value + " ";
        } else if (ini.slice(-4) == "_max")
        {
            sql += "AND " + ini.substring(0,ini.length-4) + " < " + tiaoJianList[j].value + " ";
        } else
        {
            sql += "AND " + ini + " = " + tiaoJianList[j].value + " ";
        }

    }
    tiaoJianSearch.push({"TableName":tableName,"sql":sql});

    var strJson = JSON.stringify(tiaoJianSearch);

        $.ajax({
            type: 'POST',
            url: globalServerAddr + "api?querySearch=1",
            data: strJson,
            success: function (response) {
                OnSearchFinished(response);
            },
            error: function (errs) {

                alert(errs.responseText);

            }
         });
}


function OnSearchFinished(strJson)
{
    var jsonObj = eval('(' + strJson + ')');
    m_searchArray = jsonObj;
    var searchDiv = document.getElementById("KuContainer");
    strTableHtml += "</tr>";
    if(jsonObj.length > 0)
    {
        var strTableHtml = "<table id=\"table\"  cellspacing=\"0\" >";
        strTableHtml += "<tr class=\"table_tr\">";
        strTableHtml += "<th class=\"\" style=\"width: 60px;\"></th>";
        for (var i = 0; i < (jsonObj[0].ParamList.length-1); i++)
        {
            strTableHtml += "<th class=\"\" style=\"padding: 0px 3px\">" + jsonObj[0].ParamList[i].Name + "</th>";
        }
        for(var j = 0; j < jsonObj.length; j++)
        {
            var paramList = jsonObj[j].ParamList;
            var string = (j == 0 ? "checked" : "unchecked");
            strTableHtml += "<tr class=\"table_tr\"  onclick=\"xuanzhong(this)\">";
            strTableHtml += "<td style=\"width: 40px;\"><input type=\"radio\" name=\"radio\"  value=\"" + j +"\"" + string +"/></td>";
            for (var k = 0; k < (paramList.length-1); k++ )
            {
                strTableHtml += "<td style=\"padding: 0px 3px\">" + paramList[k].Value + "</td>";
            }

            strTableHtml += "</tr>";

        }

    }
    else
    {
        var strTableHtml = "<table class=\"\" style=\"width: 100%\" border=\"0\" >";
        strTableHtml += "<tr class=\"table_tr\">";
        strTableHtml += "<th style=\"width: 100%\">对不起，没有匹配到你所输入的参数</th>";
        strTableHtml += "</tr>";
    }
    strTableHtml += "</table>";

    searchDiv.innerHTML = strTableHtml;
}
function xuanzhong(obj) {
    var tr = $(obj).children().first();
    var input = $(tr).children().first();
    input[0].checked = true;
}

function OnClickDaoPianSearch() {
    var Search = document.getElementById("gameCanvass");
    Search.style.visibility = "visible";
}
function OnClose() {
    var Search = document.getElementById("gameCanvass");
    var biaoti = document.getElementById("LingJianSlotContainer");
    var LingJianSlotContainers = document.getElementById("LingJianSlotContainers");
    var LingJianDesigns = document.getElementById("LingJianDesigns");
    var LingJianSlotContainer = document.getElementById("LingJianSlotContainer");
    var LingJianDesign = document.getElementById("LingJianDesign");
    var biaotou = document.getElementById("biaotou");
    Search.style.visibility = "hidden";
    biaoti.style.visibility = "hidden";
    LingJianSlotContainers.style.visibility = "hidden";
    LingJianDesigns.style.visibility = "hidden";
    LingJianSlotContainer.style.visibility = "hidden";
    LingJianDesign.style.visibility = "hidden";
    biaotou.style.visibility = "hidden";
    buttonnone(3);
}
function OnClickYes(id)
{
    if (id == "yesone")
    {
        var List = document.getElementById("KuContainer").innerHTML;
        if (List != null && List != undefined && List != "")
        {
            var radio = document.getElementsByName("radio");
            var uuid = GenerateUUID();
            for (i=0; i<radio.length; i++)
            {
                if (radio[i].checked)
                {
                    m_OnSearch = m_searchArray[i].ParamList;
                    if (searchName == "刀柄")
                    {

                        if (jQuery.isEmptyObject(wenJianDaoBingObj))
                        {
                            wenJianDaoBingObj.push({"ID":uuid,"List":m_OnSearch,"SearchName":searchName,"Name":Name,"ListName":ListName});
                        }else
                        {
                            for (var i = 0; i<wenJianDaoBingObj.length;i++)
                            {
                                for (var j = 0; j < m_OnSearch.length; j++)
                                {
                                    if (m_OnSearch[j].Name == "FN")
                                    {
                                        var FN = null;
                                        FN = m_OnSearch[j].Value;
                                        if (wenJianDaoBingObj[i].List[j].Value == FN)
                                        {
                                            alert("不能添加重复的");
                                            return;
                                        }
                                    }
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "拉钉")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "整体刀柄")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "基础柄")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "功能头")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "可调刀柄前端")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "可调刀柄后端")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "夹套" && ListName == "可调刀柄")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianDaoBingObj[i].Name == Name && Name == "夹套" && ListName == "车刀刀座")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                            }
                            wenJianDaoBingObj.push({"ID":uuid,"List":m_OnSearch,"SearchName":searchName,"Name":Name,"ListName":ListName});
                            break;
                        }
                    }
                    if (searchName == "刀片")
                    {
                        //var aaa = JSON.parse(JSON.stringify(wenJianDaoPianObj));
                        if (jQuery.isEmptyObject(wenJianDaoPianObj))
                        {
                            wenJianDaoPianObj.push({"ID":uuid,"List":m_OnSearch,"SearchName":searchName,"Name":Name,"ListName":ListName});
                        }else
                        {
                            for (var i = 0; i<wenJianDaoPianObj.length;i++)
                            {
                                for (var j = 0; j < m_OnSearch.length; j++)
                                {
                                    if (m_OnSearch[j].Name == "FN")
                                    {
                                        var FN = null;
                                        FN = m_OnSearch[j].Value;
                                        if (wenJianDaoPianObj[i].List[j].Value == FN)
                                        {
                                            alert("不能添加重复的");
                                            return;
                                        }
                                    }
                                }
                                if (wenJianDaoPianObj[i].Name == Name && Name == "可换刀头")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                            }
                            wenJianDaoPianObj.push({"ID":uuid,"List":m_OnSearch,"SearchName":searchName,"Name":Name,"ListName":ListName});
                            break;
                        }
                    }
                    if (searchName == "模块化镗刀")
                    {

                        if (jQuery.isEmptyObject(wenJianMoKuaiHuaTangDaoObj))
                        {
                            wenJianMoKuaiHuaTangDaoObj.push({"ID":uuid,"List":m_OnSearch,"SearchName":searchName,"Name":Name,"ListName":ListName});
                        }else
                        {
                            for (var i = 0; i<wenJianMoKuaiHuaTangDaoObj.length;i++)
                            {
                                for (var j = 0; j < m_OnSearch.length; j++)
                                {
                                    if (m_OnSearch[j].Name == "FN")
                                    {
                                        var FN = null;
                                        FN = m_OnSearch[j].Value;
                                        if (wenJianMoKuaiHuaTangDaoObj[i].List[j].Value == FN)
                                        {
                                            alert("不能添加重复的");
                                            return;
                                        }
                                    }
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "拉钉")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "基础柄")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "精镗刀头")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "粗镗刀头")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "夹套")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "整体镗刀杆")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "可转位镗刀杆")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "精镗刀夹")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                                if (wenJianMoKuaiHuaTangDaoObj[i].Name == Name && Name == "粗镗刀夹")
                                {
                                    alert("选取错误，只能选一次");
                                    return;
                                }
                            }
                            wenJianMoKuaiHuaTangDaoObj.push({"ID":uuid,"List":m_OnSearch,"SearchName":searchName,"Name":Name,"ListName":ListName});
                            break;
                        }
                    }
                    break;
                }
            }

            var biaotou = document.getElementById("biaotou");
            biaotou.style.visibility = "visible";
            var sheji = document.getElementById("LingJianDesign");
            m_OnSearch[0].HtmlCtrlId = uuid;
            var tool_type = null;
            var No = null;
            for (var i = 0; i < m_OnSearch.length; i++)
            {
                if (m_OnSearch[i].Name == "tool_type")
                {
                    tool_type = m_OnSearch[i].Value;
                }
                if (m_OnSearch[i].Name == "No")
                {
                    No = m_OnSearch[i].Value;
                }

            }

            if (Name == "整体刀柄" || Name == "基础柄" || Name == "拉钉" || Name == "延长杆" || Name == "变径延长" ||Name == "功能头" || Name == "可调刀柄前端" || Name == "可调刀柄后端" || Name == "车刀刀座" || Name == "粗镗刀头" || Name == "精镗刀头" || Name == "整体镗刀杆" || Name == "可转位镗刀杆" || Name == "精镗刀夹" || Name == "可换刀头" || Name == "夹套")
            {
                var strSheJiHtml = "<div  class=\"biaotou bt\" id=\"" + uuid + "\" style=\"height: 33px;border-bottom: 2px #009fd7 solid;border-left: 2px #009fd7 solid;border-right: 2px #009fd7 solid;\" id=\"" + uuid + "\" ondrop=\"drop(event,this)\" ondragover=\"allowDrop(event)\" draggable=\"true\" ondragstart=\"drag(event, this)\">";
                strSheJiHtml += "<div class=\"tool_type\">" + tool_type + "</div><div  class=\"no\">" + No +"</div><div  class=\"num\"><input id=\"num\"  style=\"width: 60%\" value=\"1\" maxlength=\"2\" readonly=\"readonly\"/></div><div class=\"caozuo\"><button onclick=\"OnDelete('" + uuid + "')\">删除</button></div>";
                strSheJiHtml += "</div>";
            } else if (ListName == "18-205粗镗刀" && Name == "粗镗刀夹")
            {
                var strSheJiHtml = "<div  class=\"biaotou bt\" id=\"" + uuid + "\" style=\"height: 33px;border-bottom: 2px #009fd7 solid;border-left: 2px #009fd7 solid;border-right: 2px #009fd7 solid;\" id=\"" + uuid + "\" ondrop=\"drop(event,this)\" ondragover=\"allowDrop(event)\" draggable=\"true\" ondragstart=\"drag(event, this)\">";
                strSheJiHtml += "<div class=\"tool_type\">" + tool_type + "</div><div  class=\"no\">" + No +"</div><div  class=\"num\"><input id=\"num\"  style=\"width: 60%\" value=\"2\" maxlength=\"2\" readonly=\"readonly\"/></div><div class=\"caozuo\"><button onclick=\"OnDelete('" + uuid + "')\">删除</button></div>";
                strSheJiHtml += "</div>";
            } else
            {
                var strSheJiHtml = "<div  class=\"biaotou bt\" id=\"" + uuid + "\" style=\"height: 33px;border-bottom: 2px #009fd7 solid;border-left: 2px #009fd7 solid;border-right: 2px #009fd7 solid;\" id=\"" + uuid + "\" ondrop=\"drop(event,this)\" ondragover=\"allowDrop(event)\" draggable=\"true\" ondragstart=\"drag(event, this)\">";
                strSheJiHtml += "<div class=\"tool_type\">" + tool_type + "</div><div  class=\"no\">" + No +"</div><div id=\"div" + uuid + "\"  class=\"num\"><input id=\"input"+ uuid +"\" onblur=\"inputOnBlur('" + uuid  + "');\"  style=\"width: 60%\" value=\"1\" maxlength=\"2\"/></div><div class=\"caozuo\"><button onclick=\"OnDelete('" + uuid + "')\">删除</button></div>";
                strSheJiHtml += "</div>";
            }


            sheji.innerHTML += strSheJiHtml;
        }
    }
    if (id == "yestwo")
    {
        m_searchinilist = "";
        zhuangPeiDaoBingObj = [];
        zhuangPeiMoKuaiHuaTangDaoObj = [];
        zhuangPeiDaoPianObj = [];
        g_comboBoxObjArray = [];
        if (searchName == "刀柄") {

            for (var i = 0; i < wenJianDaoBingObj.length; i++) {
                if (wenJianDaoBingObj[i].ListName == "整体刀柄") {
                    if (IsThere(wenJianDaoBingObj, "整体刀柄") == true) {
                    }
                    else {
                        alert("缺少整体刀柄");
                        return;
                    }
                }
                if (wenJianDaoBingObj[i].ListName == "模块化刀柄") {
                    if (IsThere(wenJianDaoBingObj, "基础柄") == true) {
                    } else {
                        alert("缺少基础柄参数");
                        return;
                    }
                    if (IsThere(wenJianDaoBingObj, "功能头") == true) {
                    } else {
                        alert("缺少功能头参数");
                        return;
                    }
                }
                if (wenJianDaoBingObj[i].ListName == "可调刀柄") {
                    if (IsThere(wenJianDaoBingObj, "可调刀柄前端") == true) {
                    } else {
                        alert("缺少可调刀柄前端参数");
                        return;
                    }
                    if (IsThere(wenJianDaoBingObj, "可调刀柄后端") == true) {
                    } else {
                        alert("缺少可调刀柄后端参数");
                        return;
                    }
                }
                if (wenJianDaoBingObj[i].ListName == "车刀刀座") {
                    if (IsThere(wenJianDaoBingObj, "车刀刀座") == true) {
                    } else {
                        alert("缺少车刀刀座参数");
                        return;
                    }
                }
            }
        }
        if (searchName == "模块化镗刀") {
            for (var i = 0; i < wenJianMoKuaiHuaTangDaoObj.length; i++) {
                if (wenJianMoKuaiHuaTangDaoObj[i].ListName == "18-205粗镗刀") {
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "基础柄") == true) {
                    } else {
                        alert("缺少基础柄参数");
                        return;
                    }
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "粗镗刀头") == true) {
                    } else {
                        alert("缺少粗镗刀头参数");
                        return;
                    }
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "粗镗刀夹") == true) {
                    } else {
                        alert("缺少粗镗刀夹参数");
                        return;
                    }
                }
                if (wenJianMoKuaiHuaTangDaoObj[i].ListName == "0.3-6.2精镗刀") {
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "基础柄") == true) {
                    } else {
                        alert("缺少基础柄参数");
                        return;
                    }
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "精镗刀头") == true) {
                    } else {
                        alert("缺少精镗刀头参数");
                        return;
                    }
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "整体镗刀杆") == true) {
                    } else {
                        alert("缺少整体镗刀杆参数");
                        return;
                    }
                }
                if (wenJianMoKuaiHuaTangDaoObj[i].ListName == "6-13精镗刀") {
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "基础柄") == true) {
                    } else {
                        alert("缺少基础柄参数");
                        return;
                    }
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "精镗刀头") == true) {
                    } else {
                        alert("缺少精镗刀头参数");
                        return;
                    }
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "可转位镗刀杆") == true) {
                    } else {
                        alert("缺少可转位镗刀杆参数");
                        return;
                    }
                }
                if (wenJianMoKuaiHuaTangDaoObj[i].ListName == "13-63精镗刀") {
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "基础柄") == true) {
                    } else {
                        alert("缺少基础柄参数");
                        return;
                    }
                    if (IsThere(wenJianMoKuaiHuaTangDaoObj, "精镗刀头") == true) {
                    } else {
                        alert("缺少精镗刀头参数");
                        return;
                    }
                }
            }
        }
        var sheJiList = document.getElementById("LingJianDesign").children;
        var numMax = null;
        var fnMax = null;
        var numList = [];
        var numListMax = [];
        if (wenJianDaoPianObj.length > 0)
        {
            for (var l = 1; l < sheJiList.length; l++)
            {

                for (var j = 0; j < wenJianDaoPianObj.length; j++) {
                    var numValue = null;
                    var FNValue = null;
                    if (wenJianDaoPianObj[j].ID == sheJiList[l].id) {
                        var id = document.getElementById(sheJiList[l].id);
                        var inputs = $(id).find("input");
                        for (var k = 0; wenJianDaoPianObj[j].List.length; k++)
                        {
                            if (wenJianDaoPianObj[j].List[k].Name == "FN")
                            {
                                FNValue = wenJianDaoPianObj[j].List[k].Value;
                                if (inputs.length > 0) {
                                    var num = inputs[0].value;
                                    numValue = parseInt(num);
                                    numList.push({"NUM":numValue,"FN":FNValue});
                                    break;
                                }
                            }
                        }

                    }
                }
                numListMax = JsonSort(numList,'NUM');

            }

            numMax = numListMax[numListMax.length-1].NUM;
            fnMax = numListMax[numListMax.length-1].FN;
        }

        for (var i = 1; i < sheJiList.length; i++) {


            for (var j = 0; j < wenJianDaoBingObj.length; j++) {
                if (wenJianDaoBingObj[j].ID == sheJiList[i].id) {
                    if (ListName == "整体刀柄") {
                        if (wenJianDaoBingObj[j].Name == "拉钉" && i == 1 && ListName == "整体刀柄") {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "整体刀柄") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "整体刀柄" && i == 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else if (wenJianDaoBingObj[k].Name == "延长杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "夹套" && i != 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "延长杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "延长杆" && i != 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else if (wenJianDaoBingObj[k].Name == "延长杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiDaoBingObj = [];
                            return;
                        }
                    }
                    if (ListName == "模块化刀柄") {
                        if (wenJianDaoBingObj[j].Name == "拉钉" && i == 1 && ListName == "模块化刀柄") {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "基础柄") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "基础柄" && i == 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else if (wenJianDaoBingObj[k].Name == "功能头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "变径延长" && i != 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else if (wenJianDaoBingObj[k].Name == "功能头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "功能头" && i != 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiDaoBingObj = [];
                            return;
                        }
                    }
                    if (ListName == "可调刀柄") {
                        if (wenJianDaoBingObj[j].Name == "拉钉" && i == 1 && ListName == "可调刀柄") {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "可调刀柄后端") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "可调刀柄后端" && i == 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "可调刀柄前端") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianDaoBingObj[j].Name == "可调刀柄前端" && i != 1) {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiDaoBingObj = [];
                            return;
                        }
                    }
                    if (ListName == "车刀刀座") {
                        if (wenJianDaoBingObj[j].Name == "车刀刀座" && i == 1 && ListName == "车刀刀座") {
                            zhuangPeiDaoBingObj.push(wenJianDaoBingObj[j]);
                            add(j, i, sheJiList, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianDaoBingObj.length; k++) {
                                    if (wenJianDaoBingObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianDaoBingObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, wenJianDaoBingObj, zhuangPeiDaoBingObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiDaoBingObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiDaoBingObj = [];
                            return;
                        }
                    }
                }
            }
            for (var j = 0; j < wenJianMoKuaiHuaTangDaoObj.length; j++) {
                if (wenJianMoKuaiHuaTangDaoObj[j].ID == sheJiList[i].id) {
                    if (ListName == "18-205粗镗刀") {
                        if (wenJianMoKuaiHuaTangDaoObj[j].Name == "拉钉" && i == 1 && ListName == "18-205粗镗刀") {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "基础柄") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "基础柄" && i == 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "粗镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "变径延长" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "粗镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "粗镗刀头" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "粗镗刀夹") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "粗镗刀夹" && i != 1) {
                            // zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);

                            var numValue = null;
                            if (wenJianMoKuaiHuaTangDaoObj[j].ID == sheJiList[i].id) {
                                var id = document.getElementById(sheJiList[i].id);
                                var inputs = $(id).find("input");
                                if (inputs.length > 0) {
                                    var num = inputs[0].value;
                                    numValue = parseInt(num);
                                    if (numValue > 1) {
                                        var list = wenJianMoKuaiHuaTangDaoObj[j].List;
                                        // var list = wenJianDaoPianObj[j].List;
                                        list.push({"Name": "num", "Value": 1});
                                        for (var g = 0; g < numValue; g++) {
                                            var uuid = GenerateUUID();
                                            var tempList = JSON.parse(JSON.stringify(list));
                                            zhuangPeiMoKuaiHuaTangDaoObj.push({
                                                "ID": uuid,
                                                "List": tempList,
                                                "SearchName": wenJianMoKuaiHuaTangDaoObj[j].SearchName,
                                                "Name": wenJianMoKuaiHuaTangDaoObj[j].Name,
                                                "ListName": wenJianMoKuaiHuaTangDaoObj[j].ListName
                                            });
                                        }

                                        for (var m = 0; m < wenJianMoKuaiHuaTangDaoObj[j].List.length; m++)
                                        {
                                            if (wenJianMoKuaiHuaTangDaoObj[j].List[m].Name == "num")
                                            {
                                                wenJianMoKuaiHuaTangDaoObj[j].List[m].Value = numValue;
                                            }
                                        }
                                    }
                                    else if (numValue == 1)
                                    {

                                        var list = wenJianMoKuaiHuaTangDaoObj[j].List;
                                        list.push({"Name": "num", "Value": 1});
                                        var uuid = GenerateUUID();
                                        zhuangPeiMoKuaiHuaTangDaoObj.push({
                                            "ID": uuid,
                                            "List": list,
                                            "SearchName": wenJianMoKuaiHuaTangDaoObj[j].SearchName,
                                            "Name": wenJianMoKuaiHuaTangDaoObj[j].Name,
                                            "ListName": wenJianMoKuaiHuaTangDaoObj[j].ListName
                                        });
                                    }
                                    else if (numValue < 1)
                                    {
                                        alert("数量不能小于1");
                                        return;
                                    }
                                    else
                                    {
                                        alert("请正确填写数量");
                                        return;
                                    }
                                }

                            }


                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                            return;
                        }
                    }
                    if (ListName == "0.3-6.2精镗刀") {
                        if (wenJianMoKuaiHuaTangDaoObj[j].Name == "拉钉" && i == 1 && ListName == "0.3-6.2精镗刀") {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "基础柄") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "基础柄" && i == 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "变径延长" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "精镗刀头" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "整体镗刀杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "夹套" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "整体镗刀杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        } else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "整体镗刀杆" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        alert("第" + (i + 1) + "行位置错乱");
                                        zhuangPeiMoKuaiHuaTangDaoObj = [];
                                        return;
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                            return;
                        }
                    }
                    if (ListName == "6-13精镗刀") {
                        if (wenJianMoKuaiHuaTangDaoObj[j].Name == "拉钉" && i == 1 && ListName == "6-13精镗刀") {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "基础柄") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "基础柄" && i == 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "变径延长" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "精镗刀头" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "可转位镗刀杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "夹套" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "可转位镗刀杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "可转位镗刀杆" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        alert("第" + (i + 1) + "行位置错乱");
                                        zhuangPeiMoKuaiHuaTangDaoObj = [];
                                        return;
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                            return;
                        }
                    }
                    if (ListName == "13-63精镗刀") {
                        if (wenJianMoKuaiHuaTangDaoObj[j].Name == "拉钉" && i == 1 && ListName == "13-63精镗刀") {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "基础柄") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }

                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "基础柄" && i == 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "变径延长" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "变径延长") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀头") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "精镗刀头" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "夹套") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "可转位镗刀杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀夹") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "夹套" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "可转位镗刀杆") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "可转位镗刀杆" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        if (wenJianMoKuaiHuaTangDaoObj[k].Name == "精镗刀夹") {
                                            // zhuangPeiDaoBingObj.push(wenJianDaoBingObj[k]);
                                            // add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                                        } else {
                                            alert("第" + (i + 1) + "行位置错乱");
                                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                                            return;
                                        }
                                    }
                                }
                            }
                        }
                        else if (wenJianMoKuaiHuaTangDaoObj[j].Name == "精镗刀夹" && i != 1) {
                            zhuangPeiMoKuaiHuaTangDaoObj.push(wenJianMoKuaiHuaTangDaoObj[j]);
                            add(j, i, sheJiList, wenJianMoKuaiHuaTangDaoObj, zhuangPeiMoKuaiHuaTangDaoObj);
                            if (sheJiList[i + 1] != undefined) {
                                for (var k = 0; k < wenJianMoKuaiHuaTangDaoObj.length; k++) {
                                    if (wenJianMoKuaiHuaTangDaoObj[k].ID == sheJiList[i + 1].id && i < (sheJiList.length - 1)) {
                                        alert("第" + (i + 1) + "行位置错乱");
                                        zhuangPeiMoKuaiHuaTangDaoObj = [];
                                        return;
                                    }
                                }
                            }
                        }
                        else {
                            alert("第" + i + "行位置错乱");
                            zhuangPeiMoKuaiHuaTangDaoObj = [];
                            return;
                        }
                    }
                }
            }

            for (var j = 0; j < wenJianDaoPianObj.length; j++) {
                var numValue = null;
                if (wenJianDaoPianObj[j].ID == sheJiList[i].id) {
                    var id = document.getElementById(sheJiList[i].id);
                    var inputs = $(id).find("input");
                    if (inputs.length > 0) {
                        var num = inputs[0].value;
                        numValue = parseInt(num);
                        if (numValue > 1) {
                            var list = wenJianDaoPianObj[j].List;
                            var FN = null;
                            for (var k = 0; k < list.length; k++)
                            {
                                if (list[k].Name == "FN")
                                {
                                    FN = list[k].Value;
                                }
                                if (list[k].Name == "num")
                                {
                                    list.splice(k,1);
                                }
                            }
                            if (numValue == numMax && FN == fnMax)
                            {
                                list.push({"Name": "num", "Value": numValue});

                                    var uuid = GenerateUUID();
                                    var tempList = JSON.parse(JSON.stringify(list));
                                    zhuangPeiDaoPianObj.push({
                                        "ID": uuid,
                                        "List": tempList,
                                        "SearchName": wenJianDaoPianObj[j].SearchName,
                                        "Name": wenJianDaoPianObj[j].Name,
                                        "ListName": wenJianDaoPianObj[j].ListName,
                                        "NUM":numValue,
                                        "FN":FN
                                    });

                            } else
                            {
                                list.push({"Name": "num", "Value": 1});
                                for (var g = 0; g < numValue; g++) {
                                    var uuid = GenerateUUID();
                                    var tempList = JSON.parse(JSON.stringify(list));
                                    zhuangPeiDaoPianObj.push({
                                        "ID": uuid,
                                        "List": tempList,
                                        "SearchName": wenJianDaoPianObj[j].SearchName,
                                        "Name": wenJianDaoPianObj[j].Name,
                                        "ListName": wenJianDaoPianObj[j].ListName,
                                        "NUM":numValue,
                                        "FN":FN
                                    });
                                }
                                for (var m = 0; m < wenJianDaoPianObj[j].List.length; m++)
                                {
                                    if (wenJianDaoPianObj[j].List[m].Name == "num")
                                    {
                                        wenJianDaoPianObj[j].List[m].Value = numValue;
                                    }
                                }

                           // var list = wenJianDaoPianObj[j].List;

                            }


                        }
                        else if (numValue == 1)
                        {

                            var list = wenJianDaoPianObj[j].List;
                            var FN = null;
                            for (var k = 0; k < list.length; k++)
                            {
                                if (list[k].Name == "FN")
                                {
                                    FN = list[k].Value;
                                }
                                if (list[k].Name == "num")
                                {
                                    list.splice(k,1);
                                }
                            }
                            list.push({"Name": "num", "Value": numValue});
                            var uuid = GenerateUUID();
                            zhuangPeiDaoPianObj.push({
                                "ID": uuid,
                                "List": list,
                                "SearchName": wenJianDaoPianObj[j].SearchName,
                                "Name":wenJianDaoPianObj[j]. Name,
                                "ListName": wenJianDaoPianObj[j].ListName,
                                "NUM":numValue,
                                "FN":FN
                            });
                        }
                        else if (numValue < 1)
                        {
                            alert("数量不能小于1");
                            return;
                        }
                        else
                        {
                            alert("请正确填写数量");
                            return;
                        }
                    }

                }
            }

        }
        Tables();
        buttonnone(3);
        OnClose();
    }
}
function IsThere(jsonArray,name)
{
    if(jsonArray == undefined || jsonArray == null)
    {
        return;
    }

    for(var i = 0; i < jsonArray.length; i ++)
    {
        if (jsonArray[i].Name == name) {
            return true;

        }
    }
}
function add(j, i, sheJiList, wenJian, zhuangPei) {
    if (wenJian[j].ID == sheJiList[i].id)
    {
        var id  = document.getElementById(sheJiList[i].id);
        var inputs = $(id).find("input");
        if (inputs.length > 0)
        {
            var num = inputs[0].value;
            num = parseInt(num);
            zhuangPei[i-1].List.push({Name:"num",Value:num});
        }
    }
}
function OnClear(id) {
    if (id == "LingJianBtn2")
    {
        var searchDiv = document.getElementById("LingJianDesign");
        searchDiv.innerHTML  = "<div id=\"biaotou\" class='biaotou' style=\"width: 99%;height: 36px;visibility: hidden\"><div class=\"tool_type\">刀片类型</div><div class=\"no\">订货型号</div><div class=\"num\">数量</div><div class=\"caozuo\">操作</div></div>";

        wenJianDaoBingObj.splice(0,wenJianDaoBingObj.length);
        zhuangPeiDaoBingObj.splice(0,zhuangPeiDaoBingObj.length);
        wenJianDaoPianObj.splice(0,wenJianDaoPianObj.length);
        zhuangPeiDaoPianObj.splice(0,zhuangPeiDaoPianObj.length);
        wenJianMoKuaiHuaTangDaoObj.splice(0,wenJianMoKuaiHuaTangDaoObj.length);
        zhuangPeiMoKuaiHuaTangDaoObj .splice(0,zhuangPeiMoKuaiHuaTangDaoObj.length);
    }
    if (id == "ParamDesignBtn2")
    {
        var searchDiv = document.getElementById("ParamDesign");
        searchDiv.innerHTML = "";
    }

}
function OnDelete(strId) {
    var searchDiv = document.getElementById("LingJianDesign");

    var a = strId;
    var de = document.getElementById(a);
    de.parentNode.removeChild(de);
    for (var i = 0; i<wenJianDaoBingObj.length;i++)
    {
        if (wenJianDaoBingObj[i].ID == a)
        {
            wenJianDaoBingObj.splice(i,1);
        }
    }
    for (var j = 0; j < zhuangPeiDaoBingObj.length; j++)
    {
        if (zhuangPeiDaoBingObj[j].ID == a)
        {
            zhuangPeiDaoBingObj.splice(j,1);
        }
    }
    for (var i = 0; i<wenJianDaoPianObj.length;i++)
    {
        if (wenJianDaoPianObj[i].ID == a)
        {
            wenJianDaoPianObj.splice(i,1);
        }
    }
    for (var j = 0; j < zhuangPeiDaoPianObj.length; j++)
    {
        if (zhuangPeiDaoPianObj[j].ID == a)
        {
            zhuangPeiDaoPianObj.splice(j,1);
        }
    }
    for (var i = 0; i<wenJianMoKuaiHuaTangDaoObj.length;i++)
    {
        if (wenJianMoKuaiHuaTangDaoObj[i].ID == a)
        {
            wenJianMoKuaiHuaTangDaoObj.splice(i,1);
        }
    }
    for (var j = 0; j < zhuangPeiMoKuaiHuaTangDaoObj.length; j++)
    {
        if (zhuangPeiMoKuaiHuaTangDaoObj[j].ID == a)
        {
            zhuangPeiMoKuaiHuaTangDaoObj.splice(j,1);
        }
    }

    if (wenJianDaoBingObj.length == 0 && wenJianDaoPianObj.length == 0 && wenJianMoKuaiHuaTangDaoObj.length == 0 && zhuangPeiDaoBingObj.length == 0 && zhuangPeiDaoPianObj.length == 0 && zhuangPeiMoKuaiHuaTangDaoObj.length == 0)
    {
        var biaotou = document.getElementById("biaotou");
        biaotou.style.visibility = "hidden";
    }
}
function allowDrop(ev)
{
    ev.preventDefault();
}
function inputOnBlur(uuid) {
    var inputId = document.getElementById("input" + uuid);
    var divId = document.getElementById("div" + uuid);
    //idHtml.innerHTML = 12;
    var inputValue = inputId.value;
    divId.innerHTML =  "<input id=\"input" + uuid + "\" onblur=\"inputOnBlur('"+ uuid + "');\"  style=\"width: 60%\" value=\"" + inputValue + "\" maxlength=\"2\"/>";
}
function drag(ev,divdom)
{
    srcdiv=divdom;
    var strHtml = $(divdom).prop("outerHTML");
    ev.dataTransfer.setData("text/html",strHtml);
}
function drop(ev,divdom) {
    ev.preventDefault();
    if (srcdiv != divdom) {
        var strHtml = $(divdom).prop("outerHTML");
        $(srcdiv).prop("outerHTML", strHtml);

        strHtml = ev.dataTransfer.getData("text/html");
        $(divdom).prop("outerHTML", strHtml);
    }
}
function OnClickLuoXuanCaoZuanTouTimeLine_WaiXingSheJi(index)
{
    var htmlCtrl = document.getElementById("TimeLine");

    if(htmlCtrl)
    {
        htmlCtrl.style.visibility = "hidden";
    }

    var strJson = "";

    switch(index)
    {
        case 0:
            strJson = "./config/ztree/WaiXingSheJi.json";
            break;
        case 1:
            strJson = "./config/ztree/ChuBuSouSuo.json";
            break;
        case 2:
            strJson = "./config/ztree/SheJiYuanZe.json";
            break;
        case 3:
            strJson = "./config/ztree/JingQueSouSuo.json";
            break;
        case 4:
            strJson = "./config/ztree/ZhouxiangJieMianSheJi.json";
            break;
        case 5:
            strJson = "./config/ztree/ChiXiSheJi.json";
            break;
        case 6:
            strJson = "./config/ztree/ZuanJianSheJi.json";
            break;
        case 7:
            strJson = "./config/ztree/SheJiCanShuHeTuZhi.json";
            break;
        default:
            strJson = "./config/ztree/SheJiCanShuHeTuZhi.json";
            break;
    }

    var scope = this;

    var loader = new THREE.FileLoader( scope.manager );
    loader.load( strJson, function ( text ) {
        var jsonObj = JSON.parse(text);

        UpdateZTreeByJson_TimeLine(jsonObj);
    });

}
function UpdateZTreeByJson_TimeLine(jsonObj)
{
    var setting = {	};

    $.fn.zTree.init($("#treeDemo"), setting, jsonObj);
}
function OnObserverSelectChanged_UgObserver()
{
    var htmlCtrl = document.getElementById("UgObserverTimeSelect");

    if(htmlCtrl == null || htmlCtrl == undefined)
    {
        return;
    }

    var htmlCtrl2 = document.getElementById("UgObserverTimeSelect2");

    if(htmlCtrl2 == null || htmlCtrl2 == undefined)
    {
        return;
    }

    var selectedIndex = htmlCtrl.selectedIndex;
    var curTime = new Date().getTime();
    var deltaTime = 0;
    switch (selectedIndex)
    {
        case 0:
            deltaTime = 1000 * 60 * 60;
            break;
        case 1:
            deltaTime = 1000 * 60 * 60 * 4;
            break;
        case 2:
            deltaTime = 1000 * 60 * 60 * 8;
            break;
        case 3:
            deltaTime = 1000 * 60 * 60 * 24;
            break;
        case 4:
            deltaTime = 1000 * 60 * 60 * 24 * 7;
            break;
        case 5:
            deltaTime = 1000 * 60 * 60 * 24 * 30;
            break;
        case 6:
            deltaTime = 1000 * 60 * 60 * 24 * 365;
            break;
        default:
            deltaTime = 1000 * 60 * 60 * 24;
            break;
    }

    var startTime = curTime - deltaTime;

    var jsonObj = {};

    jsonObj.StartTime = startTime;
    jsonObj.EndTime = curTime;
    jsonObj.UserName = "";
    jsonObj.CompanyName = "";
    jsonObj.TimeType = selectedIndex;
    jsonObj.QueryType = htmlCtrl2.selectedIndex;

    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryUgProcessStatistic=1",
        data: strJson,
        success: function (response) {

            var jsonObj = JSON.parse(response);
            OnUpdateUgProeessData_UgObserver(jsonObj,deltaTime);

          //  callback(response,handleLength);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function OnUpdateUgProeessData_UgObserver(jsonObj,deltaTime)
{
    var curTime = new Date().getTime();
    var startTime = curTime - deltaTime;


    var ugRunningDataArray = jsonObj.ResultObj.UGRunningDatas;
    var ugBacklogDataArray = jsonObj.ResultObj.UGBacklogDatas;
    var labelArray = jsonObj.ResultObj.Labels;

    var config = {
        type: 'line',
        data: {
            labels: labelArray,
            datasets: [{
                label: 'UG运行进程',
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: ugRunningDataArray,
                fill: false,
                pointRadius:0,
                pointHoverRadius:0,
                pointHitRadius:0
            },
            {
                label: 'UG后备队列',
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: ugBacklogDataArray,
                fill: false,
                pointRadius:0,
                pointHoverRadius:0,
                pointHitRadius:0
            }]
        },
        options: {
            responsive: false,
            title: {
                display: true,
                text: 'UG进程统计'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            /*
            hover: {
                mode: 'nearest',
                intersect: false
            },
            */
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: '时间轴'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'UG进程完成数'
                    },
                    ticks: {
                        min: 0,
                    }
                }]
            }
        }
    };

    if(g_ugLinePic)
    {
        g_ugLinePic.data.datasets[0].data = ugRunningDataArray;
        g_ugLinePic.data.datasets[1].data = ugBacklogDataArray;
        g_ugLinePic.data.labels = labelArray;
        g_ugLinePic.update();
    }
    else
    {
        var ctx = document.getElementById('UGProcess2D').getContext('2d');
        g_ugLinePic = new Chart(ctx, config);
    }
}
var ReflectMaterialType = {
    ReflectMaterialType_General:1,
    ReflectMaterialType_Gold:2,
    ReflectMaterialType_Silver:3,
    ReflectMaterialType_Black:4,
    ReflectMaterialType_Brown:5,
};
function GetReflectMaterialByType(type)
{
    var strDirName = "Normal";

    switch(type)
    {
        case ReflectMaterialType.ReflectMaterialType_General:
            strDirName = "Normal";
            break;
        case ReflectMaterialType.ReflectMaterialType_Gold:
            strDirName = "Gold";
            break;
        case ReflectMaterialType.ReflectMaterialType_Silver:
            strDirName = "Silver";
            break;
        case ReflectMaterialType.ReflectMaterialType_Black:
            strDirName = "Black";
            break;
        case ReflectMaterialType.ReflectMaterialType_Brown:
            strDirName = "Brown";
            break;
        default:
            strDirName = "Normal";
        break;
    }

    var path = "../examples/textures/cube/skybox/";

    path += strDirName + "/"
    var urls = [
        path + "px.jpg", path + "nx.jpg",
        path + "py.jpg", path + "ny.jpg",
        path + "pz.jpg", path + "nz.jpg"
    ];

    var textureCube = new THREE.CubeTextureLoader().load( urls );
    var reflectMaterial = new THREE.MeshPhongMaterial( { color: 0xe4e4e4, envMap: textureCube, side: THREE.DoubleSide } );

    return reflectMaterial;
}

function RequestNodeTimeByStartEndTime()
{
    var htmlStartTimeCtrl = document.getElementById("StartTimeCtrl");
    var htmlEndTimeCtrl = document.getElementById("EndTimeCtrl");

    if(htmlStartTimeCtrl == null || htmlEndTimeCtrl == null)
    {
        return;
    }

    var strStartTime = htmlStartTimeCtrl.value;
    var strEndTime = htmlEndTimeCtrl.value;

    var startDate = new Date(strStartTime).getTime();
    var endDate = new Date(strEndTime).getTime();

    var jsonObj = {};

    jsonObj.StartTime = startDate;
    jsonObj.EndTime = endDate;

    var strJson = JSON.stringify(jsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?queryUgProcessStatistic=1",
        data: strJson,
        success: function (response) {

            var jsonObj = JSON.parse(response);
            OnUpdateUgProeessData_UgObserver(jsonObj,deltaTime);

            //  callback(response,handleLength);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}
function OnClickUpdateUGTime()
{
    RequestNodeTimeByStartEndTime();
}

function XianSuDu(value) {

    for (var i = 0; i < g_paramArray.length; i++) {
        if (g_paramArray[i].Name == "转速 rpm") {
            g_paramArray[i][g_paramArray[i].Name] = value * 1000 / (3.1415926 * 15);
            break;
        }
    }
}

function MeiChiJinJiLiang(value)
{
    for(var i = 0; i < g_paramArray.length; i++)
    {
        if(g_paramArray[i].Name == "每分钟进给量 mm/min")
        {
            g_paramArray[i][g_paramArray[i].Name] = value * 1000 / (3.1415926 * 15);
            break;
        }
    }
}

function startVideo() {
    var video = document.getElementById("video");
    video.play();
}
function stopVideo() {
    var video = document.getElementById("video");
    video.pause();

}
