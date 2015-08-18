/* animation functions */
function moveElement(elementID, final_x, final_y, interval) {
	if (!document.getElementById) return false;
	if (!document.getElementsByTagName) return false;
	if (!document.getElementById(elementID)) return false;
	var elem = document.getElementById(elementID);
	// 安全性检查 object detection
	if (!elem.style.left) elem.style.left = "0px";
	if (!elem.style.top) elem.style.top = "0px";
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	// check the relative position of the element to final destination
	if (xpos == final_x && ypos == final_y) return true;
	// 平滑的动画效果 替代 x_pos++/x_pos--
	if (xpos < final_x) xpos += Math.ceil((final_x - xpos)/10);// Math.ceil是向上取整 Math.floor是向下取整 Math.round取最近
	if (xpos > final_x) xpos -= Math.ceil((xpos - final_x)/10);
	if (ypos < final_y) ypos += Math.ceil((final_y - ypos)/10);
	if (ypos > final_y) ypos -= Math.ceil((ypos - final_y)/10);
	// udpate position on DOM 
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat ="moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval 
				+ ")";
	// recursive call until dest reached 
	if (elem.movement) clearTimeout(elem.movement);// in case of user change their focus too fast - avoid animation delay
	elem.movement = setTimeout(repeat, interval);
	//alert("this is the end of moveElement method");
}

function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		/* add this new func to window.onload */
		window.onload = func;
	} else {
		/* add this new func to the oldLoadEvent queue */
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

/* retrieve all the child elements of the given parentNode */ 
function getChildElements(parentElement) {
	var childs = parentElement.childNodes;
	var childElements = new Array();
	var j=0;
	for (var i=0; i<childs.length; i++) {
		if (childs[i].nodeType == 1) {
			childs[i].number = j;// add new attribute to the child element 
			childElements[j++] = childs[i];
		}
	}
	return (childElements.length>0? childElements:null);
}

function getSiblingElements(element) {
	var siblingElements = new Array();
	var j=0;
	var siblings = element.parentNode.childNodes;
	for (var i=0; i<siblings.length; i++) {
		if (siblings[i].nodeType == 1) {
			if (siblings[i] != element) {
				siblingElements[j++] = siblings[i];
			}
		} 
	}
	return (siblingElements.length>0? siblingElements:null);
}

// test 
function prepareMovement() {
	var android = document.getElementById('android-wrapper');
	var software = document.getElementById('software-engineering-wrapper');

	var android_ui_list = android.getElementsByTagName('ul');
	var software_ui_list = software.getElementsByTagName('ul');
	var ui_list = new Array();
	for (var i=0; i<android_ui_list.length; i++) {ui_list[i] = android_ui_list[i];}
	for (var i=0; i<software_ui_list.length; i++) {ui_list[android_ui_list.length+i] = software_ui_list[i];}

	for (var n=0; n<ui_list.length; n++) {
		if (ui_list[n].className == 'ui_list') { 
			var ui_list_items = getChildElements(ui_list[n]);
			if (ui_list_items) {
				// alert(ui_list_items.length);
				for (var i=0; i<ui_list_items.length; i++) {
					ui_list_items[i].onmouseover = function() {
						// alert(this.lastChild.nodeValue);
						// change color of the hovered items
						this.style.backgroundColor = "lightgrey";
						var siblingElements = getSiblingElements(this);
						for (var j=0; j<siblingElements.length; j++) {
							siblingElements[j].style.backgroundColor = "white";
						}

						var num = this.number;// retrieve its number ((num+1)th child)
						moveElement("airline_image_container", 0, -300*num, 10);	
						moveElement("artifact_image_container1", -300*num, 0, 10);	
					}
				}
			}
		}
	}
	// alert("hello world"); 
}

addLoadEvent(prepareMovement);
// alert("hi, i'm xuamyu");


