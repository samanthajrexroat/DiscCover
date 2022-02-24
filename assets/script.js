//WHEN text is entered into the text area and the button is clicked...
$("#search").click(function () {
	var textarea = $("#textarea-input").val();
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
			embedVideo.attr("autoplay");
			embedVideo.attr("clipboard-write");
			embedVideo.attr("autoplay");
			embedVideo.attr("gyroscope");
			embedVideo.attr("picture-in-picture");
			embedVideo.attr("allowfulscreen");
			embedVideo.append($("#video-player"));
		});
});

//BUGS

//text area value is not being injected into url string for api request. blank request is sent, and a response is give, but the array is the same for every response due to no search terms provided

//Query.Deferred exception: embedVideo.attr is not a function TypeError: embedVideo.attr is not a function
