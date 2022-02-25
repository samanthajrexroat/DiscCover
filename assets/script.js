//WHEN text is entered into the text area and the button is clicked...
$("button-addon2").click(function () {
	var textarea = $(".artistInput").val();
	console.log(textarea);
	var fetchUrl =
		"https://www.googleapis.com/youtube/v3/search?q=" +
		textarea +
		"&key=AIzaSyDVmiKRoGL0qm1tR7KueDy-BCEOoOexHlk";
	//the button grabs the value of the text area and turns it into a variable.
	//The variable is inserted into a url string...
	$.ajax({
		method: "get",
		//and an api request is made using the url string
		url: fetchUrl,
	})
		.then(function (response) {
			console.log(fetchUrl);
			console.log(response);
			console.log(response.items[0].id.videoId);
			var videoId = response.items[0].id.videoId;

			return videoId;
		})
		.then(function (videoId) {
			var videoEmbedLink = "https://www.youtube.com/embed/" + videoId;
			console.log(videoEmbedLink);
			var embedVideo = $("<iframe>");
			embedVideo.attr("width", "560");
			embedVideo.attr("height", "315");
			embedVideo.attr("src", videoEmbedLink);
			embedVideo.attr("title", "Artist Video");
			embedVideo.attr("frameborder", "0");
			embedVideo.attr(
				"allow",
				"alutoplay; clipboard-write; gyroscope; picture in picture; "
			);
			embedVideo.attr("autoplay");
			embedVideo.attr("clipboard-write");

			embedVideo.attr("gyroscope");
			embedVideo.attr("picture-in-picture");
			embedVideo.attr("allowfullscreen");
			embedVideo.append($("#video-player"));
		});
});
