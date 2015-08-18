/**
 * @author: lxynox
 * Date: 16, Jul, 2015
 * Description: js source for index.html 
 */

window.onload = function() {
	if (!document.getElementById) return false;// Object detection replacing browser sniffing
	if (!document.getElementsByTagName) return false;

	setInterval("changeColor()", 1000);
	// addAudio();
	// alert("audio added");
}

/* change the font color of the Header dynamically */
var state = 0;
function changeColor() { 
	var color = ["white", "#750F19"];
	if (document.getElementById('home'))
		document.getElementById("home").style.color = color[state++%2];
	// footer: get copyright &&  update time 
	document.getElementById("copyright").innerHTML = 
	"<p>@copy, "+ new Date()+ "Xuanyu Li, all rights reserved.</p>";
} 
/* add audio file to the leftside bar */ 
function addAudio() {
	var audi = document.createElement("AUDIO");
	audi.style.margin = "20px 20px";
	audi.setAttribute("controls", "controls");
	// 获取当前文件名以确定 src 路径
	var strUrl = window.location.href;
	var arrStrUrl = strUrl.split("/");// 当前 文件名数组
	if (arrStrUrl[arrStrUrl.length-1] == 'index.html')
		audi.setAttribute('src', './audio/song.mp3');
	else 
		audi.setAttribute('src', '../audio/song.mp3');

	var left_side_bar = document.getElementById("left_side");
	left_side_bar.appendChild(audi);
}


