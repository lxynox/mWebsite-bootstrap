/* image scroll functions - at an interal of 2 seconds */ 
function autoScroll() {
	var _scroll = $("#image_slide>ul");
	//ul往左边移动200px
	_scroll.animate({marginLeft:"-200px"}, 1000, function() {
		//把第一个li丢最后面去
		_scroll.css({marginLeft:0}).find("li:first").appendTo(_scroll);
	});
}
/* add description message to my scroll images on the homepage */
function describeImage() {
	var image_slider = document.getElementById("image_slide");
	var image_desc = document.createElement("p");
	/* using element.style object */
	// image_desc.style.color = "lightgrey";
	// image_desc.style.fontSize = ".9em";
	image_desc.className = "createdPara";
	var desc_text = document.createTextNode("focus image to get description");
	var image_alts = image_slider.getElementsByTagName("img");
	var _scrolling = setInterval("autoScroll()",2000);
	// append the image descriptor 
	image_desc.appendChild(desc_text);
	image_slider.appendChild(image_desc);
	
	for (var i=0; i<image_alts.length; i++) {
		// start from the second image ; first image is my head image
		image_alts[i].onmouseover = function() {
			//鼠标移动DIV上停止
			clearInterval(_scrolling);

			image_desc.className = "hoveredPara";// .hoveredPara at the bottom of index.css file
			image_desc_alt = this.getAttribute("alt");
			if (image_desc.lastChild) 
				image_desc.removeChild(image_desc.lastChild);
			// check if 'alt' is text or a link 
			if (image_desc_alt.substr(0,4) == 'http') {
				var image_link = document.createElement("a");
				// TODO: better change link.style (DOM scripts) to css file using className attr
				image_link.style.textDecoration = 'none';
				image_link.setAttribute("href", image_desc_alt);
				if (this.getAttribute("alt").substr(0, 5) == 'https') {// the website is https://github.com}
					image_link.appendChild(document.createTextNode(image_desc_alt));
				} else if (this.getAttribute("alt").substr(11,3) == 'bit') {// beijing institute of technology hovered
					image_link.appendChild(document.createTextNode("Beijing Institute of Technology (undergraduate)"));
				} else if (this.getAttribute("alt").substr(11,3) == 'wpi') {// wpi hovered 
					image_link.appendChild(document.createTextNode("Worcester Polytechnic Institute (graduate)")); 
				} else {/* some addtional conditions */}
				image_desc.appendChild(image_link);
			} else {
				var new_desc_text = document.createTextNode(image_desc_alt);
				image_desc.appendChild(new_desc_text);// append new child
			}
		}
		image_alts[i].onmouseout = function() {
			// do nothing right now, could be expanded if needed 
			//离开继续调用
			_scrolling = setInterval("autoScroll()",2000);
		}
	}
}

addLoadEvent(describeImage);
// alert('hello world!');
