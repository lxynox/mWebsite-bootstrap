// window.onload = function() {
// 	if (!document.getElementById) return false;
// 	if (!document.getElementsByTagName) return false;

// 	if (document.getElementById("copyright")) {
// 		document.getElementById("copyright").innerHTML = 
// 			"<p>@copy, "+ new Date()+ "Xuanyu Li, all rights reserved.</p>";
// 	}
// }

$(function() { 
	$("h2").hover(function(){ 
		$(this).next().slideDown(200); 
	});

	$(".view_button").click(function() {
		$(this).next().css("display", "block");
	});

});