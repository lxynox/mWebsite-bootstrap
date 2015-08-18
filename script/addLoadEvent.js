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

/* functions used combining with insertBefore to insert new element to DOM tree */
function insertAfter(insert_element, target_element) {
	var parent = target_element.parentNode;
	if (parent.lastChild == target_element) {
		parent.appendChild(insert_element);
	} else {
		parent.insertBefore(insert_element, target_element.nextSibling);// using dom library: parentNode.insertBefore(newElement, targetElement);
	}
}

/* function used to retrieve next element of all the next siblings */
function nextSiblingElement(element) {
	var nextElement = element.nextSibling;
	if (nextElement.nodeType == 1) {// nodeType is element 
		return nextElement;
	} 
	if (nextElement) {
		return nextSiblingElement(nextElement);
	}
	return null;
}

/* append new class attribute to element */
function addClassName(element, newClass) {
	if (!element.className) {
		// no class attribute in html doc - single class attribute only
		element.className = newClass;
	} else {
		// more than one class attribute  
		var oldClass = element.className;
		oldClass += " ";
		oldClass += newClass;
		element.className = oldClass;
	}
}

// alert("hello world");//test method 