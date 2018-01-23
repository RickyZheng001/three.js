var rebuildB;
var toolMode = "subdivide";

var hoverColor1 = [0.0,0.0,0.0,0.6];
var hoverColor2 = hoverColor1;

var roundUI_top,roundUI_side;

var wsfp_handling = 2.0;
var wsfp_cm3 = 1.5;
var wsfp_speed = "2 weeks";
var wsfp_max = 2.4;
var wsfp_min = 1.3;//1.14//.9 shapeways official
//add max size, min wire thickness

var priceDiv;
var shipsInDiv;
var sizeName;

var isTabOpen = false;
var changeTypeNow = false;
//only small things in metals?

var units = [
{"name": "mm", "scaler": 1},
{"name": "in", "scaler": 1/25.4}
]

var unitId = 0;

var groupNylon = "nylon";
var groupMetal = "metal";
var metalShiny = 16;
var nylonShiny = 4;
var metalReflect = .8;
var nylonReflect = .1;

var dimensionsDiv;

var nylonInfo = "polished 3d-printed nylon plastic";
var silverInfo = "polished sterling silver cast from a 3d-printed wax";
var goldInfo = "polished 14k gold cast from a 3d-printed wax";
var brassInfo = "polished brass cast from a 3d-printed wax";

var materials = [
{"name": "white", "color":"#f0f1f0","cm3Cost":wsfp_cm3,"srfCost":0,"handlingFee":wsfp_handling,"priceMin":0,"ships":wsfp_speed,"minT":wsfp_min,"maxT":wsfp_max,"group":groupNylon,"reflect":nylonReflect,"shiny":nylonShiny,"info":nylonInfo, "pricing":"volume"},
{"name": "black", "color":"#212121","cm3Cost":wsfp_cm3,"srfCost":0,"handlingFee":wsfp_handling,"priceMin":0,"ships":wsfp_speed,"minT":wsfp_min,"maxT":wsfp_max,"group":groupNylon,"reflect":nylonReflect,"shiny":nylonShiny,"info":nylonInfo, "pricing":"volume"},
{"name": "red", "color":"#f11813","cm3Cost":wsfp_cm3,"srfCost":0,"handlingFee":wsfp_handling,"priceMin":0,"ships":wsfp_speed,"minT":wsfp_min,"maxT":wsfp_max,"group":groupNylon,"reflect":nylonReflect,"shiny":nylonShiny,"info":nylonInfo, "pricing":"volume"},
{"name": "blue", "color":"#212ea1","cm3Cost":wsfp_cm3,"srfCost":0,"handlingFee":wsfp_handling,"priceMin":0,"ships":wsfp_speed,"minT":wsfp_min,"maxT":wsfp_max,"group":groupNylon,"reflect":nylonReflect,"shiny":nylonShiny,"info":nylonInfo, "pricing":"volume"},
{"name": "yellow", "color":"#ffeb00","cm3Cost":wsfp_cm3,"srfCost":0,"handlingFee":wsfp_handling,"priceMin":0,"ships":wsfp_speed,"minT":wsfp_min,"maxT":wsfp_max,"group":groupNylon,"reflect":nylonReflect,"shiny":nylonShiny,"info":nylonInfo, "pricing":"volume"},
{"name": "pink", "color":"#f2165e","cm3Cost":wsfp_cm3,"srfCost":0,"handlingFee":wsfp_handling,"priceMin":0,"ships":wsfp_speed,"minT":wsfp_min,"maxT":wsfp_max,"group":groupNylon,"reflect":nylonReflect,"shiny":nylonShiny,"info":nylonInfo, "pricing":"volume"},
{"name": "silver", "color":"#999","cm3Cost":25,"srfCost":1.5,"handlingFee":0,"priceMin":27.5,"ships":"2 weeks","img":"silver.jpg","minT":.86,"maxT":1.9,"group":groupMetal,"reflect":metalReflect,"shiny":metalShiny,"info":silverInfo, "pricing":"volume"},
{"name": "brass", "color":"#c19244","cm3Cost":14,"srfCost":1,"handlingFee":0,"priceMin":22.5,"ships":"3 weeks","img":"brass.jpg","minT":.86,"maxT":1.9,"group":groupMetal,"reflect":metalReflect,"shiny":metalShiny,"info":brassInfo, "pricing":"volume"},
{"name": "14k gold", "color":"#e5a434","cm3Cost":500,"srfCost":2,"handlingFee":50,"priceMin":75,"ships":"2 weeks", "img":"brass.jpg","minT":.86,"maxT":1.9,"group":groupMetal,"reflect":metalReflect,"shiny":metalShiny,"info":goldInfo, "pricing":"volume"}
];
/*{"name": "steel", "color":"#888","cm3Cost":12.55,"handlingFee":14.18,"ships":"4 weeks", "img":"steel.jpg","minT":.7,"maxT":1.7,"group":groupMetal,"reflect":.3,"shiny":8,"info":"polished 3d-printed stainless steel", "pricing":"bbox"}*/

/*{"name": "platinum", "color":"#888","cm3Cost":1500,"handlingFee":110,"ships":"2 weeks","img":"silver.jpg","minT":.7,"maxT":1.8,"group":groupMetal,"reflect":metalReflect,"shiny":metalShiny}*/
var matId = 0;
var mat = materials[matId];
var matMinT;
var matMaxT;

//information about product types and standard sizes
var ring = {
"sizes": [
{ "name": "US sz 4", "size":46.8 }, 
{ "name": "US sz 4.5", "size":48 }, 
{ "name": "US sz 5", "size":49.3 }, 
{ "name": "US sz 5.5", "size":50.6 }, 
{ "name":"US sz 6" , "size":51.9 }, 
{ "name":"US sz 6.5" , "size":53.1 },
{ "name":"US sz 7" , "size":54.4 }, 
{ "name":"US sz 7.5" , "size":55.7 }, 
{ "name":"US sz 8" , "size":57 },
{ "name":"US sz 8.5" , "size":58.3 },
{ "name":"US sz 9" , "size":59.5 },
{ "name":"custom", "size":54.4}
],
"name": "ring","default":6, "min":36.5, "max":77.4, "sizeBy":"circumference","maxHeight":25,
"baseConfig": {"xdivs":10, "ydivs":4, "ydivs2": 4, "twist":.3,"twist2":0, "round":0, "round2":0,"topH":79,"bottomH":62}
}

var bangle = {
"sizes": [
{ "name": "small", "size":57.9 }, 
{ "name":"medium" , "size":63.7 }, 
{ "name":"large" , "size":68.4 },
{ "name":"custom" , "size":63.7 }
],
"name": "bangle","default":1,"sizeBy":"diameter","min":50,"max":70, "maxHeight":100,
"baseConfig": {"xdivs":16, "ydivs":5, "ydivs2": 7, "twist":0,"twist2":-.7, "round":.375, "round2":.375,"topH":83.5,"bottomH":62}
}

var cuff = {
"sizes": [
{ "name": "small", "size":146.05 }, 
{ "name":"medium" , "size":158.75 }, 
{ "name":"large" , "size": 171.45},
{ "name":"custom" , "size":158.75 }
],
"name": "cuff","default":1,"min":85, "max":203.2,"sizeBy":"circumference","maxHeight":100,
"baseConfig": {"xdivs":12, "ydivs":4, "ydivs2": 4, "twist":0,"twist2":0, "round":0, "round2":0,"topH":80,"bottomH":62}
}

var sculpture = {
"sizes": [{ "name":"custom" , "size":169 }],
"name": "sculpture","default":0,"min":20, "max":300,"sizeBy":"circumference","maxHeight":200,
"baseConfig": {"xdivs":16, "ydivs":7, "ydivs2": 10, "twist":-.4,"twist2":.7, "round":.97, "round2":.58,"topH":113,"bottomH":62}
}

var productTypes = new Array(ring,bangle,cuff,sculpture); 
productId = 0;

function lerp(min,max,ratio) {
	return min+ratio*(max-min);
}

function setThickness() {
	var minC = ring.max;
	var maxC = bangle.min*Math.PI;
	var ratio = (realCircumference - minC)/(maxC - minC);
	
	var minVal = matMinT;
	var maxVal = matMaxT;
	
	var minT = lerp(minVal,maxVal,ratio);
	thickness = Math.min(Math.max(minT,minVal),maxVal);
  if(productType == "ring") {
    rSep = thickness*1.25;
	} else if(productType == "cuff") {
    rSep = thickness*1.5;
  } else {
    rSep = thickness*2;
  }
  minThick = minVal;
}

function setMaterial(id) {
  document.getElementById("swatch"+matId).className = "swatch";
  matId = id;
  mat = materials[matId];
  matCm3Cost = mat.cm3Cost;
  matAreaCost = mat.srfCost;
  matHandlingFee = mat.handlingFee;
  matPriceMin = mat.priceMin;
  matMinT = mat.minT;
  matMaxT = mat.maxT;
  matColor = hexToRgb(mat.color);
  matReflectivity = mat.reflect; //0-1
  matShininess = mat.shiny;//integer 4-16
  materialName = mat.name;
  
  document.getElementById("matName").innerHTML = mat.name;
  document.getElementById("matInfo").innerHTML = mat.info;
  
  shipsInDiv.innerHTML = " ships in<br>" + mat.ships;
  setSize();
  
  //set hover color to complementary color
  var hsv = [0,0,0];
  RGBtoHSV(hsv, matColor);
  if(hsv[1] < .1) {
    hoverColor1 = [1.0,0,0,0.6];
  } else {
    hsv[0] += .5;
    if(hsv[0] > 1.0) hsv[0] -= 1.0;
    HSVtoRGB(hoverColor1, hsv);
  }
  
  hoverColor2 = hoverColor1;
  
  document.getElementById("swatch"+id).className = "swatch swatchSelect";
  computePrice();
}

function setDefaultConfiguration() {
	//setup design defaults
	var prodD = productTypes[productId].baseConfig;
	rScale=prodD.round; //outside 
	rScale2=prodD.round2; //inside 
	x_divs = prodD.xdivs;//22//14 //30 radial divisions on inside and outside
	y_divs = prodD.ydivs; // 6 vertical divisions outside
	y_divs2 = prodD.ydivs2; //vertical divisions inside
	pTwist = cTwist = prodD.twist;
	pTwist2 = cTwist2 = prodD.twist2;
	for(i=0;i<topCurve.length;i++) {
		topCurve[i] = prodD.topH;
		bottomCurve[i] = prodD.bottomH;
	}
}

function setupGui() {
	setParentInfo();
	rebuildB = document.getElementById("rebuildB");
	setupSliders();
	setupMaterials();
	setupProductTypes(productId);

	roundUI_top = new RoundGui(document.getElementById("roundUI"));
	roundUI_side = new RoundSideGui(document.getElementById("roundSideUI"));
	
	//set radio box for number of layers
	if(isOneLayer) document.getElementById("1layer").checked = true;
	else document.getElementById("2layer").checked = true;
	
	setEdges(solidEdge,false);
  
	priceDiv = document.getElementById("price");
	shipsInDiv = document.getElementById("shipsIn");
	dimensionsDiv = document.getElementById("dimensions");
	displaySize();
	
	if(loggedIn) {
    document.getElementById("myAccount").style.display = "inline";
		document.getElementById("loginOrLogout").innerHTML = '<a class="info" onclick="logout()">logout</a>';
  } else {
		document.getElementById("loginOrLogout").innerHTML = '<a class="info" onclick="show(\'login\')">login</a>';
    hide("myAccount");
  }
}

function setupProductTypes(startI) {
	var box = document.getElementById("typesDropDown");
	for(i=0;i<productTypes.length;i++) {
		var option = document.createElement("option");
		var prod = productTypes[i];
		option.text = prod.name;
		box.add(option);
	}
	box.selectedIndex = startI;
	changeType();
}

function updateTypeUI() {
	rebuildB.className = 'button flash';
	changeTypeNow = true;

}

var sliderTooltip = function(event, ui) {
    var curValue = ui.value ;
    var tooltip = '<div class="tooltip"><div class="tooltip-inner">' + curValue + '</div><div class="tooltip-arrow"></div></div>';
    $('.ui-slider-handle',this).html(tooltip);
}

var sliderTooltipHover = function(event) {
		var value = $(this).slider( "option", "value" );
		$('.ui-slider-handle',this).html('<div class="tooltip top slider-tip"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + value.toFixed(1) + '</div></div>');
	};
	
var clearSlider = function() {
		$('.ui-slider-handle',this).html("");
	};
//jquery sliders
function setupSliders() {
	
    $( "#xCells" ).slider({
      value: x_divs,
      orientation: "horizontal",
      range: "min",
      animate: true,
	  max: 26,
	  min: 6,
	  step:2,
	  change: function(e,ui) {
		new_xDivs = ui.value;
		rebuildB.className = "button flash";
	  },
	  slide: sliderTooltip
	 
    }); 
	$( "#xCells" ).mouseleave(clearSlider); 
	$( "#xCells" ).mouseenter(sliderTooltipHover); 
	 
	
	$( "#yCells_inside" ).slider({
      value: y_divs/2-1,
      orientation: "horizontal",
      range: "min",
      animate: true,
	  max: (26-1)/2,
	  min: 1,
	   step: .5,
	  slide: sliderTooltip,
	  change: function(e,ui) {
		new_yDivs = (ui.value+1)*2.0;
		rebuildB.className = "button flash";
	  }
    });
	$( "#yCells_inside" ).mouseleave(clearSlider); 
	$( "#yCells_inside" ).mouseenter(sliderTooltipHover); 
	
	
	 $( "#yCells_outside" ).slider({
      value: y_divs2/2-1,
      orientation: "horizontal",
      range: "min",
      animate: true,
	  max: (26-1)/2.0,
	  min: 1,
	  step: .5,
	  slide: sliderTooltip,
	  change: function(e,ui) {
		new_yDivs2 = (ui.value+1)*2;
		rebuildB.className = "button flash";
	  }
    });
	$( "#yCells_outside" ).mouseleave(clearSlider); 
	$( "#yCells_outside" ).mouseenter(sliderTooltipHover); 
	
	$( "#twist" ).slider({
      value: 0,
      orientation: "horizontal",
      range: "min",
      animate: true,
	  max: maxTwist,
	  min: -maxTwist,
	  step: Math.PI/100,
	  slide: function(e,ui) {
		 var curValue = ui.value.toFixed(2) ;
		var tooltip = '<div class="tooltip"><div class="tooltip-inner">' + curValue + '</div><div class="tooltip-arrow"></div></div>';
		$('.ui-slider-handle',this).html(tooltip);
		cTwist = ui.value;
	}
    });
	$( "#twist" ).mouseleave(clearSlider); 
	$( "#twist" ).mouseenter(sliderTooltipHover); 
	
	$( "#twist2" ).slider({
      value: 0,
      orientation: "horizontal",
      range: "min",
      animate: true,
	  max: maxTwist,
	  min: -maxTwist,
	  step: Math.PI/100,
	  slide: function(e,ui) {
		 var curValue = ui.value.toFixed(2) ;
		var tooltip = '<div class="tooltip"><div class="tooltip-inner">' + curValue + '</div><div class="tooltip-arrow"></div></div>';
		$('.ui-slider-handle',this).html(tooltip);
		cTwist2 = ui.value;
	}
    });
	$( "#twist2" ).mouseleave(clearSlider); 
	$( "#twist2" ).mouseenter(sliderTooltipHover); 
	
	$( "#size" ).slider({
      value: circumference,
      orientation: "horizontal",
      range: "min",
      animate: true,
	  max: 400,
	  min: 15,
	  slide: function(e,ui) {
		if(productType == "bangle")  { realCircumference = ui.value*Math.PI; }
		else if(productType == "cuff") { realCircumference = ui.value+2; }
		else { realCircumference = ui.value; }
		setSize();
		updateSizeUI(ui.value);
	  },
	  create: function(e,ui) {updateSizeUI(circumference);}
    });
	
}



function selectSize() {
	//when someone selects a size from the dropdown menu this is what we do
	
	var sizeI = document.getElementById("sizesDropDown").selectedIndex;
	var prod = productTypes[productId];
	var size = prod.sizes[sizeI];
	sizeName = size.name;
	
	//if it's a bangle, customers enter a diameter not a circumference
	if(prod.sizeBy=="diameter") {
		document.getElementById("size_label").innerHTML = "diameter";
		realCircumference = size.size*Math.PI;
	}
	else if(prod.sizeBy=="circumference") {
		document.getElementById("size_label").innerHTML = "circumference";
		realCircumference = size.size;
	}
	
	setSize();
	
	//if this isn't a custom option then disable the circumference slider
	if(size.name != "custom") {	
		$("#size").slider("disable");
		document.getElementById("sizeSlider").style.display = "none"; //$("#sizeSlider").hide();
	}
	else {	
		$("#size").slider("enable");
		document.getElementById("sizeSlider").style.display = "block";//$("#sizeSlider").show();
	}
	$("#size").slider("value",size.size);

	updateSizeUI(size.size);
}

function updateSizeUI(s) {
	var s = s * units[unitId].scaler;
	document.getElementById("size_val").innerHTML = s.toFixed(1);
}

function changeType() {
	//runs when someone uses the product dropdown menu to change product type
	productId = document.getElementById("typesDropDown").selectedIndex;
	var prod = productTypes[productId];
	productType = prod.name;
	maxHeight = prod.maxHeight;
	setupSizes();
	
	var mySize = prod.sizes[prod.default].size;
	
	document.getElementById("sizesDropDown").selectedIndex = prod.default;
	sizeName = mySize.name;
	
	if(prod.sizeBy=="circumference") realCircumference = mySize;
	else if(prod.sizeBy=="diameter") realCircumference = mySize*Math.PI;
	
	$("#size").slider( "option", { min: prod.min, max: prod.max, value: mySize} );
	updateSizeUI(mySize);
	
	document.getElementById("tLabel").innerHTML = prod.name;
	
	if(prod.name=="cuff" || isOneLayer || new_isOneLayer) { hide("sliderTwist_inside"); hide("outsideLabel_twist");}
	else {show("sliderTwist_inside");show("outsideLabel_twist");}
}

function setupSizes() {
	//runs everytime the product type is changed (ex. ring to bangle)
	var index = productId;
	var sizeBox = document.getElementById("sizesDropDown");
	
	//empty out options first
	var i;
    for(i=sizeBox.options.length-1;i>=0;i--){
        sizeBox.remove(i);
    }

	var prod = productTypes[index];
	for(j=0;j<prod.sizes.length;j++) {
			var size_option = document.createElement("option");
			var size = prod.sizes[j];
			size_option.text = size.name;
			sizeBox.add(size_option);
	}
   
}

function setupMaterials() {
	var matBox = document.getElementById("materials");
	
	var group = "";
	var matFamily;
	var swatchContainer;
	for(i=0;i<materials.length;i++) {
		var myMat = materials[i];
		if(group != myMat.group) { 
			matFamily = document.createElement('div');
			matFamily.className = 'matFam';
			group = myMat.group;
		
			matBox.appendChild(matFamily);
			var myTitle = document.createElement('div');
			matFamily.appendChild(myTitle);
			myTitle.className = 'cLabel';
			myTitle.innerHTML = group;
			
			swatchContainer = document.createElement('div');
			swatchContainer.className = 'swatchContainer';
			matFamily.appendChild(swatchContainer);
		}
		var mySwatchBox = document.createElement('div'); //tooltip home
		var mySwatch = document.createElement('div'); //color swatch
		var myTooltip = document.createElement('div');//tooltip
		myTooltip.innerHTML = myMat.name;
		myTooltip.className = "tip";
		swatchContainer.appendChild(mySwatchBox);
		mySwatchBox.appendChild(mySwatch);
		mySwatchBox.appendChild(myTooltip);
		mySwatchBox.className = "swatchBox";
		mySwatch.className = "swatch";
		mySwatch.id = "swatch"+i;
		mySwatch.style.backgroundColor = myMat.color;
		mySwatch.onclick = (function(i) {return function(){setMaterial(i);} })(i);
			
		if(myMat.img) mySwatch.innerHTML = "<img src='images/materials/"+myMat.img+"'>";
	}	
}	
var showhelp = false;

function showHelp() {
	showhelp = !showhelp;
	var helper = document.getElementById("helper");
	if(showhelp) helper.style.display = "block";
	else helper.style.display= "none";

}

function saveMessage(saveId) {
	var designURL = myURL + "?l="+saveId;
	var tweetText = '<a href="https://twitter.com/share" class="twitter-share-button" data-text="I created a design for 3d printing online with Cell Cycle by @nervous_system" data-url="' + designURL + '" data-related="nervous_system" data-count="none" data-lang="en">Tweet</a>';
	
	var saveAlert = document.getElementById("saveMessage");

	var scripty = document.createElement("script");
	scripty.src = "//platform.twitter.com/widgets.js";
	
	document.getElementById("saveTweet").innerHTML = tweetText 
	document.getElementById("saveLink").innerHTML = designURL;	
	document.getElementById("saveLink").href = designURL;
	saveAlert.parentNode.insertBefore(scripty,saveAlert);
	
	show("saveMessage");
	setParentInfo();
}

function saveAs() {

	show("saveAsMessage");

}

function doSave(saveas) {
	saveJSON(needToBuy,saveas);
	hide("saveAsMessage");

}

function finishMessage() {
var saveAlert = document.getElementById("saveMessage");
saveAlert.style.display = "none"; 
}



function activateButton(id) {
	/*
	var buttonOld = document.getElementsByClassName("imgButtonSelected")[0];
	buttonOld.className="imgButton";
	
    var buttonNew = document.getElementById(id);
	buttonNew.className="imgButtonSelected";
	toolMode = id;
*/
	if(id == 'mainView')
	{
        camera.position.set( 0, 0, 250);
        //orbitControls.setPolarAngle(0);
        //orbitControls.setAzimuthalAngle(0);
        orbitControls.setTargetPos(0,0,0);
        orbitControls.update();
	}
	else if(id == 'leftView')
	{
		camera.position.set( -250, 0, 0);
        //orbitControls.setPolarAngle(Math.PI);
        //orbitControls.setAzimuthalAngle(0);
        orbitControls.setTargetPos(0,0,0);
        orbitControls.update();
	}
	else if(id == 'topView')
	{
		camera.position.set( 0, 250, 0);
        //orbitControls.setPolarAngle(0);
        //orbitControls.setAzimuthalAngle(Math.PI);
        orbitControls.setTargetPos(0,0,0);
        orbitControls.update();
	}

}

function setLayers(onlyOne,rebuild) {
	if(onlyOne) { //1-layer stuff
		new_isOneLayer = true;
		hide("yInside");
		hide("sliderTwist_inside");
		show("roundUI");
		roundUI_top.draw();
		roundUI_side.draw();
		hide("outsideLabel_twist");
		document.getElementById("outsideLabel_cells").innerHTML="vertical";
	}
	else { //2-layer stuff
		new_isOneLayer = false; 
		show("yInside");
		show("sliderTwist_inside");
		show("roundUI");
		roundUI_side.draw();
		roundUI_top.draw();
		show("outsideLabel_twist");
		document.getElementById("outsideLabel_cells").innerHTML="vertical outside";
	}
	if(rebuild)rebuildB.className = "button flash";
}

function doRebuild() {
	isOneLayer = new_isOneLayer;
	if(changeTypeNow) {
		changeType();
		selectSize();
		setSize();
		NScamera.targetDistance = realCircumference*4;
		prad = rad;
		pcircumference = circumference;
		changeTypeNow = false;
	}
	reset();
	drawCurves();
	rebuildB.className = "button";
	
}

function identifySize() {
	//use this when setGuiFromSettings on loading a file to identify the size 
	
	var i=0;
	var found = false;
	
	var prod = productTypes[productId];
	while(!found && i<prod.sizes.length) {
		var size = prod.sizes[i];
		if(size.name==sizeName){ found = true;}
		else { i++; }
	}
	if(found) document.getElementById("sizesDropDown").selectedIndex = i;

}
function setGuiFromSettings() {
	setParentInfo();
	//use this to set the GUI to match a loaded design
	$( "#xCells" ).slider( "value", x_divs );
	$( "#yCells_inside" ).slider( "value", (y_divs/2)-1 );
	$( "#yCells_outside" ).slider( "value",(y_divs2/2)-1 );
	$( "#twist" ).slider( "value",cTwist );
	$( "#twist2" ).slider( "value",cTwist2 );
	//set product type
	document.getElementById("typesDropDown").selectedIndex = productId;
	
	setupSizes();
	var prod = productTypes[productId];
	maxHeight = prod.maxHeight;
	var sizeDisplayVal;
	
	document.getElementById("tLabel").innerHTML = prod.name;
	
	if(prod.sizeBy=="diameter") {
		document.getElementById("size_label").innerHTML = "diameter";
		sizeDisplayVal = realCircumference / Math.PI;
	}
	else if(prod.sizeBy=="circumference") {
		document.getElementById("size_label").innerHTML = "circumference";
		sizeDisplayVal = realCircumference;
	}
	$("#size").slider( "option", { min: prod.min, max: prod.max, value: sizeDisplayVal} );
	updateSizeUI(sizeDisplayVal);
	
	//set number of layers
	if(isOneLayer) document.getElementById("1layer").checked = true;
	else document.getElementById("2layer").checked = true;
	setLayers(isOneLayer,false);
	rebuildB.className = "button";
	
	setEdges(solidEdge, false);
	
	//material
	
	//size
	identifySize();
	if(sizeName != "custom") {	
		$("#size").slider("disable");
		document.getElementById("sizeSlider").style.display = "none"; 
	}
	else {	
		$("#size").slider("enable");
		document.getElementById("sizeSlider").style.display = "block";
	}
	displaySize();
	//roundness angle //roundness inner //roundness outer
	
//	 roundUI_top = new RoundGui(document.getElementById("roundUI"));
  //   roundUI_side = new RoundSideGui(document.getElementById("roundSideUI"));
	
	//already done - price
	//already done - design title
	if(prod.name=="cuff" || isOneLayer || new_isOneLayer) { 
		hide("sliderTwist_inside"); 
		hide("outsideLabel_twist");
	}
	else {
		show("sliderTwist_inside");
		show("outsideLabel_twist");
	}
	
}

function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	return r + r + g + g + b + b;
	});
	
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16)/255.0,
		parseInt(result[2], 16)/255.0,
		parseInt(result[3], 16)/255.0
	] : null;
}

function displaySize() {
	var myW = (objBbox.max[0] - objBbox.min[0])*units[unitId].scaler;
	var myD = (objBbox.max[1] - objBbox.min[1])*units[unitId].scaler;
	var myH = (objBbox.max[2] - objBbox.min[2])*units[unitId].scaler;
	
	dimensionsDiv.innerHTML = myW.toFixed(1) + " x " + myD.toFixed(1) + " x " + myH.toFixed(1) + " " + units[unitId].name;

}

function setUnits(which) {
	document.getElementById("unit"+unitId).className = "unit";
	document.getElementById("unit"+which).className = "unit unitSel";
	unitId = which;
	displaySize();
	document.getElementById("size_units").innerHTML = units[unitId].name;
	var myS = realCircumference * units[unitId].scaler;
	if(productTypes[productId].sizeBy =="diameter") {
		myS /= Math.PI		
	}
	document.getElementById("size_val").innerHTML = myS.toFixed(1);
}


function hide(id) {
	document.getElementById(id).style.display = "none";
}

function show(id) {
	document.getElementById(id).style.display = "block";
}

function logout() {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "ajax.php",true); 
	
	var logoutData = new FormData();
	logoutData.append("action","logout");

	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4 && xhr.status == 200) {
			//show("addedToCartBox");
			//set shopping cart bar to login
			loggedIn = false;
			document.getElementById("loginOrLogout").innerHTML = '<a class="info" onclick="show(\'login\')">login</a>';
			hide("myAccount");
			document.getElementById("cartContents").innerHTML = "O items";
		}
	};
	xhr.send(logoutData);
}

function isLoggedIn() {
	var loginStatus = new FormData();
	loginStatus.append("action","loginStatus");
	var request = new XMLHttpRequest();
	request.open("POST", "ajax.php",false);
	
	 request.onreadystatechange = function() {
        //don't do anything until call is complete
        if(request.readyState != 4) {  return; } 
		else if(request.status != 200) {
            //error
            return;
        }
        var response = request.responseText;
        if(response=="true") loggedIn = true;
		else loggedIn = false;
		};
	request.send(loginStatus);
	return loggedIn;
}

function resetSaveMessage() {
	hide("loginMsg");
	show("loginForm");
	show("loginButton");
	hide("closeButton");
	show("forgot");
show("createAccount");
}

function login() {
	var loginForm = document.getElementById("loginForm");
	var loginMessage = document.getElementById("loginMsg");
	
	resetSaveMessage();
	
	var formData = new FormData(loginForm);
	
	formData.append("action", "login");
	
	var request = new XMLHttpRequest();
	request.open("POST", "ajax.php");
	request.withCredentials = true;
	//handle response
    request.onreadystatechange = function() {
        //don't do anything until call is complete
        if(request.readyState != 4) {  return; } 
		else if(request.status != 200) {
            //error
            loginMessage.innerHTML = "there was a problem logging you in";
            return;
        }
        var response = request.responseText;
        if(response) {
			//update UI
			if(response == "error") {
				loginMessage.innerHTML = "Error: No match for your email address and/or password.";
				loginMessage.style.display = "block";
			}
			else {
				//hooray! we logged you in
				loggedIn = true;
				customerId = response.split(",")[0];
				document.getElementById("cartContents").innerHTML = response.split(",")[1];
				if(needToSave) {
					//this login is in response to the customer's desire to save / buy the design
					//need to call save after logging in
					hide("login");
					saveFunction(needToBuy,true);
				}
				loginMessage.innerHTML = "hooray! logged in";
				show("loginMsg");
				hide("loginForm");
				hide("loginButton");
				show("closeButton");
				hide("forgot");
				hide("createAccount");
        document.getElementById("myAccount").style.display = "inline";

				//set shopping cart bar to have logout button
				document.getElementById("loginOrLogout").innerHTML = '<a class="info" onclick="logout()">logout</a>';
				hide("myAccount");
			}
        } else {
           loginMessage.innerHTML = "there was a problem logging you in";
           return;
        }
    }    
	request.send(formData);
	
}

function resizeApp() {
    /*
	var c3d = document.getElementById("webgl");
	var windowW = window.innerWidth;
	var windowH = window.innerHeight;
	var minW = 640;
	var minH = 600;
	
	var possibleW = Math.min(windowW - 10, 1280);
	var possibleH = windowH - 100;
	
	var myW = Math.max(minW,possibleW);
	var myH = Math.max(minH,possibleH);

	c3d.style.width = myW;
	c3d.style.height = myH;

	c3d.width = myW;
	c3d.height = myH;

	gl.viewportWidth = myW;
	gl.viewportHeight = myH;
  positionFooter();
  */
}
window.onresize = function() { resizeApp();}

function openTab() {
	if(!isTabOpen) {
		var tab = document.getElementById("templateTab");
		tab.className = "templates templatesOpen";
		isTabOpen = true;
	}
}

function closeTab() {
	if(isTabOpen) {
		var tab = document.getElementById("templateTab");
		//tab.style.display = "none";
		tab.className = "templates templatesClose";
		isTabOpen = false;
	}
}

function startOver() {

	setDefaultConfiguration();
	setGuiFromSettings();
	doRebuild();
	parentId = null;
	lastSaveId = null;
	setParentInfo();
}

function setParentInfo() {
	if(parentId) {
		document.getElementById("parent").style.display = "table-row";
		var parentLink = myURL + "?l=" + parentId;
		document.getElementById("parentLink").href = parentLink;
		var pBox = document.getElementById("parentId");
		pBox.innerHTML = "<a href='" + parentLink + "'>cell cycle #"+parentId+"</a>";
		
		document.getElementById("parentImg").src = "/shop/images/custom_images/custom_" + parentId + ".jpg";
	}
	else {
		hide("parent");
	}
}

function setEdges(solid,rebuild) {
	if(solid) {
		solidEdge = true;
		document.getElementById("edgeSolid").checked = true;
	}
	else {
		solidEdge = false;
		document.getElementById("edgeAlt").checked = true;
	}
		
	if(rebuild)rebuildB.className = "button flash";
}

function Display3DModel()
{
	/*
	<div id="gameCanvas" width="1280px" height="811"></div>
						<div id="divPdfView" class="pdfView" style="visibility: hidden">
	 */
	document.getElementById("gameCanvas").style.visibility = "visible";
	document.getElementById("divPdfView").style.visibility = "hidden";

    document.getElementById("toolBox3D").style.visibility = "visible";
    document.getElementById("toolBoxTuZhi").style.visibility = "hidden";

    if(m_globalFuncUpdateModel != null && m_globalFuncUpdateModel != undefined)
    {
        //m_globalFuncUpdateModel();
    }
}

function DisplayTuZhi()
{
    document.getElementById("gameCanvas").style.visibility = "hidden";
    document.getElementById("divPdfView").style.visibility = "visible";

    document.getElementById("toolBox3D").style.visibility = "hidden";
    document.getElementById("toolBoxTuZhi").style.visibility = "visible";
}

function SaveAndCommit()
{
    $.ajax({
        type: 'POST',
        url: 'http://localhost:1337/api?savemodel=1',
        data: result,
        success: function (response) {
            callback(response);
        },
        error: function (errs) {

            alert(errs.responseText);

        }
    });
}

function OnClickHeadSearch()
{

}

function OnClickParamDesign()
{
    var docElement = document.getElementById("MenuParamDesign");
    if(docElement == null || docElement == undefined)
    {
        return;
    }

    var strVisible = docElement.style.visibility;

    if(strVisible == "visible")
    {
        docElement.style.visibility = "hidden";
        m_globalGui.closed = false;
    }
    else
    {
        docElement.style.visibility = "visible";
        m_globalGui.closed = false;
    }
}

function OnClickHandleSearch()
{

}
function initBindGridEvent()
{
    $("td.editable").unbind();
// 添加单元格点击事件
    addGridClickEvent();
}
function addGridClickEvent(){
    $("td.simpleInput").bind("click",function(){
        $('.simpleInput').each(function(){
            $(this).removeClass("selectCell");
        });
// 给选中的元素添加选中样式
        $(this).addClass("selectCell");
    });
}
function OnClickSaveThisModel()
{
    //弹出确定提示框
    //保存
    var bSaveToSql = confirm("确定要保存这个模型到数据库吗?");
    if(bSaveToSql == false)
	{
		return;
	}

    //var result = JsonToIni(m_globalGuiJsonObj);
    var strJson = JSON.stringify(m_globalGuiJsonObj);

    $.ajax({
        type: 'POST',
        url: globalServerAddr + "api?savemodel=1",
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        data: strJson,
        success: function (response) {
            callback(response);
        },
        error: function (errs) {
            alert(errs.responseText);
        }
    });
}

/*
  color functions adapted from
  http://www.cs.rit.edu/~ncs/color/t_convert.html
*/
function RGBtoHSV( out, rgb )
{
	var min, max, delta;
	min = Math.min( rgb[0], rgb[1], rgb[2] );
	max = Math.max( rgb[0], rgb[1], rgb[2] );
	out[2] = max; // v
	delta = max - min;
	if( max != 0 ) {
		out[1] = delta / max; // s
	} else {
		// r = g = b = 0		// s = 0, v is undefined
		out[1] = 0;
		out[0] = 0;
		return out;
	}
	if( rgb[0] == max ) {
		out[0] = ( rgb[1] - rgb[2] ) / delta;		// between yellow & magenta
	} else if( rgb[1] == max ) {
		out[0] = 2 + ( rgb[2] - rgb[0] ) / delta;	// between cyan & yellow
	} else {
		out[0] = 4 + ( rgb[0] - rgb[1] ) / delta;	// between magenta & cyan
	}
  out[0] /= 6.0;
  if( out[0] < 0 ) {
		out[0] += 1.0;
  }
  return out;
}

function HSVtoRGB( out, hsv )
{
	var i;
	var f, p, q, t;
  var h = hsv[0];
  var s = hsv[1];
  var v = hsv[2];
	if( s == 0 ) {
		// achromatic (grey)
		out[0] = out[1] = out[2] = v;
		return out;
	}
	h *= 6;			// sector 0 to 5
	i = Math.floor( h );
	f = h - i;			// factorial part of h
	p = v * ( 1 - s );
	q = v * ( 1 - s * f );
	t = v * ( 1 - s * ( 1 - f ) );
	switch( i ) {
		case 0:
			out[0] = v;
			out[1] = t;
			out[2] = p;
			break;
		case 1:
			out[0] = q;
			out[1] = v;
			out[2] = p;
			break;
		case 2:
			out[0] = p;
			out[1] = v;
			out[2] = t;
			break;
		case 3:
			out[0] = p;
			out[1] = q;
			out[2] = v;
			break;
		case 4:
			out[0] = t;
			out[1] = p;
			out[2] = v;
			break;
		default:		// case 5:
			out[0] = v;
			out[1] = p;
			out[2] = q;
			break;
	}
  return out;
}



