function createVideoControls() {
	var vids = document.getElementsByTagName("video");
	// start from i=1 while the first video is the writing-in-air demo
	for (var i=2; i<vids.length; i++) {
		addControls(vids[i]);
	}
}

function addControls(vid) {
	vid.removeAttribute("controls");
//  set the width and height of the video (half of origin)
	vid.height = vid.videoHeight/4;
	vid.width = vid.videoWidth/4;
	vid.parentNode.style.height = vid.videoHeight/4 + "px";// container of video - video-wrapper height
	vid.parentNode.style.width = vid.videoWidth/4 + "px";// video-wrapper width
	vid.parentNode.style.marginLeft = 'auto';
	vid.parentNode.style.marginRight = 'auto';

	var controls = document.createElement("div");
	controls.setAttribute("class", "controls");

	var play = document.createElement("button");
	play.setAttribute("title", "play");
	play.innerHTML = "&#x25BA";

	controls.appendChild(play);
	vid.parentNode.insertBefore(controls, vid);

	play.onclick = function() {
		if (vid.ended) {
			vid.currentTime = 0;
		}
		if (vid.paused) {
			vid.play();
		} else {
			vid.pause();
		}
	};

	vid.addEventListener("play", function() {
		play.innerHTML = "&#x2590;&#x2590;";
		play.setAttribute("paused", true);
	}, false);

	vid.addEventListener("pause", function(){
		play.removeAttribute("paused");
		play.innerHTML = "&#x25BA";
	}, false);

	vid.addEventListener("ended", function(){
		vid.pause();
	}, false);
}

addLoadEvent(createVideoControls); 

// window.onload = function() {
// 	createVideoControls();
// 	// alert("the end of createVideoControls reached!");
// }