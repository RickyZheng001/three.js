function positionFooter() {
				var winH;
				//IE
				if(!window.innerWidth) {
					//strict mode
					if(!(document.documentElement.clientWidth == 0)) {winH = document.documentElement.clientHeight;}
					//quirks mode
					else {winH = document.body.clientHeight;}
				}
				//w3c
				else {winH = window.innerHeight;}	
				var heightContent = 0;
        // Get biggest column height by checking left, middle and right column
        if (document.getElementById('content')){ heightContent = document.getElementById('content').offsetHeight;}
        var footerElement = document.getElementById('footer');
				var footerHeight  = footerElement.offsetHeight;
				if (winH - (heightContent + footerHeight) >= 0) {
				   var kibbles = winH-footerHeight;
					// var kibbles = winH;
					 // IE or not IE?
            if (navigator.userAgent && navigator.userAgent.indexOf("MSIE") >= 0){
                document.getElementById('footer').style.setAttribute('top', kibbles + 'px');
            } else {
                document.getElementById('footer').style.setProperty('top', kibbles + 'px', null);
            }						 
					}	else {
            // IE or not IE?
            if (navigator.userAgent && navigator.userAgent.indexOf("MSIE") >= 0){
                document.getElementById('footer').style.setAttribute('top', heightContent + 'px');
            } else {
                document.getElementById('footer').style.setProperty('top', heightContent + 'px', null);
            }
        }
    }
//		window.onload = function() {positionFooter();}
		window.addEventListener("load",positionFooter,false);
		window.addEventListener("resize",positionFooter,false);
	//	window.onresize = function() {positionFooter();}