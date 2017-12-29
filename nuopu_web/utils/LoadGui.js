/**
 * Created by ZhengLi on 2017/11/14.
 */
function JsonToIni2(obj)
{
    var result;

    result = "[file]" + "\r\n";

    for(var i = 0; i < obj.Tab.length; i++) {
        var sectionList = obj.Tab[i];

        for (var j = 0; j < sectionList.length; j++) {
            var section = sectionList[j];
            var sectionName = section.Name;
            var paramList = section.ParamList;
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
                    if(iniType.toLowerCase() == "int")
                    {
                        param.Value = parseInt(param[paramName]);
                    }
                    else if(iniType.toLowerCase() == "float")
                    {
                        param.Value = parseFloat(param[paramName]);
                    }

                    result += (iniName + "=" + param.Value + "\r\n");
                }
            }
        }
    }

    result += "work_D_1=7\r\n";
    result += "work_L_1=20\r\n";
    result += "work_angle_1=118\r\n";

    result += "work_D_2=8\r\n";
    result += "work_L_2=20\r\n";
    result += "work_angle_2=45\r\n";

    result += "work_D_3=0\r\n";
    result += "work_L_3=0\r\n";
    result += "work_angle_3=0\r\n";

    result += "work_D_4=0\r\n";
    result += "work_L_4=0\r\n";
    result += "work_angle_4=0\r\n";

    result += "Csys_dispaly=0\r\n";
    result += "xy_dispaly=0\r\n";
    result += "xz_dispaly=0\r\n";
    result += "yz_dispaly=0\r\n";

    result += "cool_hole_type=2\r\n";
    result += "cool_hole_d=1.4\r\n";
    result += "spiral_D=3\r\n";
    result += "thread_pitch=0\r\n";
    result += "groove_w=1.68\r\n";
    result += "groove_h=1.68\r\n";

    return result;
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
    /*
    work_D_1=7
work_L_1=20
work_angle_1=118
work_D_2=8
work_L_2=20
work_angle_2=45
work_D_3=0
work_L_3=0
work_angle_3=0
work_D_4=0
work_L_4=0
work_angle_4=0
Csys_dispaly=0
xy_dispaly=0
xz_dispaly=0
yz_dispaly=0
cool_hole_type=2
cool_hole_d=1.4
spiral_D=3
thread_pitch=0
groove_w=1.68
groove_h=1.68
    * */
    result += "work_D_1=7\r\n";
    result += "work_L_1=20\r\n";
    result += "work_angle_1=118\r\n";

    result += "work_D_2=8\r\n";
    result += "work_L_2=20\r\n";
    result += "work_angle_2=45\r\n";

    result += "work_D_3=0\r\n";
    result += "work_L_3=0\r\n";
    result += "work_angle_3=0\r\n";

    result += "work_D_4=0\r\n";
    result += "work_L_4=0\r\n";
    result += "work_angle_4=0\r\n";

    result += "Csys_dispaly=0\r\n";
    result += "xy_dispaly=0\r\n";
    result += "xz_dispaly=0\r\n";
    result += "yz_dispaly=0\r\n";

    result += "cool_hole_type=2\r\n";
    result += "cool_hole_d=1.4\r\n";
    result += "spiral_D=3\r\n";
    result += "thread_pitch=0\r\n";
    result += "groove_w=1.68\r\n";
    result += "groove_h=1.68\r\n";

    return result;
}
function LoadGUIByConfig(configFileURL,callback,menuObj,display3DModelCallback,displayPdfCallback)
{
    var scope = this;

    var test = window.location.pathname;
    var loader = new THREE.FileLoader( scope.manager );
    //loader.setResponseType( 'arraybuffer' );
    loader.load( configFileURL, function ( text )
    {
        var obj = eval('(' + text + ')');

        //var menuObj = {};
        var gui = new dat.gui.GUI();
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

        /*
        menuObj["模型颜色1"] = "#ffae23";
        gui.addColor(menuObj, '模型颜色1');

        menuObj["模型颜色2"] = "#23aeff";
        gui.addColor(menuObj, '模型颜色2');

        menuObj["模型颜色3"] = "#aeff23";
        gui.addColor(menuObj, '模型颜色3');
        */

        /*
        menuObj["显示坐标轴"] = true;
        gui.add(menuObj, '显示坐标轴');

        menuObj["显示xz平面"] = false;
        gui.add(menuObj, '显示xz平面');

        menuObj["显示xy平面"] = false;
        gui.add(menuObj, '显示xy平面');

        menuObj["显示yz平面"] = false;
        gui.add(menuObj, '显示yz平面');
        */

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
                url: 'http://localhost:1337/api?getmodel=1',
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

        gui.domElement.style = 'position:absolute;top:200px;left:0px;background-color:#ffffff';
    });
}
/*
var obj = {
    message: 'Hello World',
    displayOutline: false,

    maxSize: 1.0,
    speed: 5,

    height: 10,
    noiseStrength: 10.2,
    growthSpeed: 0.2,

    type: 'three',

    explode: function () {
        alert('Bang!');
    },

    color0: "#ffae23", // CSS string
    color1: [ 0, 128, 255 ], // RGB array
    color2: [ 0, 128, 255, 0.3 ], // RGB with alpha
    color3: { h: 350, s: 0.9, v: 0.3 } // Hue, saturation, value
};

var gui = new dat.gui.GUI();

gui.remember(obj);

gui.add(obj, 'message');
gui.add(obj, 'displayOutline');
gui.add(obj, 'explode');

gui.add(obj, 'maxSize').min(0).max(5).step(0.25);
gui.add(obj, 'height').step(5); // Increment amount

// Choose from accepted values
gui.add(obj, 'type', [ 'one', 'two', 'three' ] );

// Choose from named values
gui.add(obj, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );

var f1 = gui.addFolder('Colors');
f1.addColor(obj, 'color0');
f1.addColor(obj, 'color1');
f1.addColor(obj, 'color2');
f1.addColor(obj, 'color3');

var f2 = gui.addFolder('Another Folder');
f2.add(obj, 'noiseStrength');

var f3 = f2.addFolder('Nested Folder');
f3.add(obj, 'growthSpeed');
*/
