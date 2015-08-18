
/* using jQuery syntax from google */
// $(document).ready(function() {
// //  navigator click events 
// 	$("#comments_view_nav").click(function() {
// 		$(this).css("background-color","#750F19");
// 		$(this).siblings("li").css("background-color", "#CD5C5C");
// 		// $("#newBlog").css("background-color", "#CD5C5C");
// 		// $("#comments").css("background-color", "#CD5C5C");
// 		$("#comments_view_container").css("display", "block");
// 	    $("#comments_view_container").siblings(".selector").css("display", "none");
// 	});
// 	$("#comments_leave_nav").click(function() {
// 		$(this).css("background-color", "#750F19");
// 		$(this).siblings("li").css("background-color", "#CD5C5C");
// 		$("#comments_leave_container").css("display", "block");
// 		$("#comments_leave_container").siblings(".selector").css("display", "none");
// 	});
// });

/* Ajax for communication with the server side */
function showComments() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // change the background-color of the navbar
            var comment_view = document.getElementById('comments_view_nav');
            var comment_leave = document.getElementById('comments_leave_nav');
            comment_view.style.backgroundColor = '#750F19';
            comment_view.className = '';
            comment_leave.style.backgroundColor = '#CD5C5C';
            comment_leave.className = 'btn disabled';
            // change content
            document.getElementById("comments_leave_container").innerHTML = 
            xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET","getComment.php",true);
    xmlhttp.send();
}