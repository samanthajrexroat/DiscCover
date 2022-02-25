// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
//
// API Key: 461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810
//
// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

var submitBtnEl = $(".btn");
var searchEl = $("#artistInput");
var apiKey = "73d6d75d06msh06ffbbcaf1a0c6fp1b3bdfjsn8b865196affb";

var submitBtnEl = document.querySelector(".btn");

// jQuery code is in here
var artist = $("#artistInput");
var songName = "";
var songKey = "";
var songTitle = "";
var songTitleEl = "";
var hits = [];
var songResultCardEl = "";
var songKeyValue = "";

$(".btn").click(function () {
	// preventDefault();
	console.log(searchEl.val());
	clearSongResultsListEl();

	$(searchEl).keydown(function (event) {
		if (event.which == 13) {
			event.preventDefault();
			$(submitBtnEl).click();
		} else {
			return;
		}
	});

	$(".btn").click(function () {
		console.log(searchEl.val());
		clearSongResultsListEl();

		$.ajax(settings).then(function (response) {
			console.log(response);

			// $.ajax(settings).done(function (response) {
			// 	console.log(response);

			const settings = {
				async: true,
				crossDomain: true,
				url:
					"https://shazam.p.rapidapi.com/search?term=" +
					searchEl.val() +
					"&locale=en-US&offset=0&limit=5",
				method: "GET",
				headers: {
					"x-rapidapi-host": "shazam.p.rapidapi.com",
					"x-rapidapi-key":
						"73d6d75d06msh06ffbbcaf1a0c6fp1b3bdfjsn8b865196affb",
				},
			};

			$.ajax(settings).then(function (response) {
				console.log(response);

				for (var h = 0; h < 5; h++) {
					// CREATION OF CARD DIV
					songResultCardEl = $("<div>");
					songResultCardEl.addClass(
						"card text-white btn-outline-light col-2 p-1 bg-dark rounded"
					);
					songResultCardEl.appendTo($("#songResultsArray"));
					// HOVER ELEMENT FOR CAR DIV
					$(".card").hover(
						function () {
							$(this).addClass("shadow-lg col-3").css("cursor", "pointer");
						},
						function () {
							$(this).removeClass("shadow-lg col-3");
						}
					);

					// CREATION OF ELEMENTS INSIDE CARD DIV

					// COVER ART AT TOP OF CARD
					var coverArt = $("<img>");
					coverArt.attr("src", response.tracks.hits[h].track.images.coverart);
					coverArt.appendTo(songResultCardEl);

					// SONG NAME
					songName = response.tracks.hits[h].track.title;
					var resultTitleEl = $("<h3>" + songName + "</h3>");
					resultTitleEl.addClass("text-center card-text m-1");
					resultTitleEl.appendTo(songResultCardEl);

					// SONG ID - - WILL BE USED TO GET RECOMENDED SONGS BELOW - - - - -
					songId = response.tracks.hits[h].track.key;
					console.log(songId);
					songResultCardEl.attr("songId", songId);
				}

				// START SEARCH - - RECOMENDATIONS - - - - - - - - - - - - - - - - - - - - - - - - - - -

				console.log(songId);
				$(".card").click(function (songId) {
					console.log(songId);

					const settings = {
						async: true,
						crossDomain: true,
						url: "https://shazam.p.rapidapi.com/songs/list-recommendations?key=50881388&locale=en-US",
						method: "GET",
						headers: {
							"x-rapidapi-host": "shazam.p.rapidapi.com",
							"x-rapidapi-key":
								"461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810",
						},
					};
				});

				// CREATION OF ELEMENTS INSIDE CARD DIV

				// COVER ART AT TOP OF CARD
				var coverArt = $("<img>");
				coverArt.attr("src", response.tracks.hits[h].track.images.coverart);
				coverArt.addClass("img coverArt");
				coverArt.appendTo(songResultCardEl);

				// SONG NAME
				songName = response.tracks.hits[h].track.title;
				artistAndSong = response.tracks.hits[h].track.share.subject;
				console.log(artistAndSong);
				var resultTitleEl = $("<h3>" + songName + "</h3>");
				resultTitleEl.addClass("text-center card-text m-1");
				resultTitleEl.appendTo(songResultCardEl);

				// SONG ID - - WILL BE USED TO GET RECOMENDED SONGS BELOW - - - - -
				songKey = response.tracks.hits[h].track.key;
				console.log(songKey);

				songResultCardEl.appendTo($("#songResultsArray"));
				// console.log(songResultCardEl.attributes[1].val())
				songResultCardEl.attr("data-id", songKey);
				coverArt.attr("data-id", songKey);
				coverArt.attr("data-artistAndSong", artistAndSong);

				console.log(songKey);
				// var test = element.
			});
		});
	});
});
$(document).on("click", ".img", function () {
	var songKey = $(this).attr("data-id");
	var artistAndSong = $(this).attr("data-artistAndSong");
	console.log(songKey);
	console.log(artistAndSong);
	// recommendedSongs(songKey);

	// var textarea = $(".artistInput").val();
	// console.log(textarea);
	//Youtube API fetch var
	var fetchUrl =
		"https://www.googleapis.com/youtube/v3/search?q=" +
		artistAndSong +
		//youtube data api key
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
			//Video id needed for imbeded video
			console.log(response.items[0].id.videoId);
			var videoId = response.items[0].id.videoId;

			return videoId;
		})
		.then(function (videoId) {
			//var for the completed video link to be imbeded.
			var videoEmbedLink = "https://www.youtube.com/embed/" + videoId;
			console.log(videoEmbedLink);
			// var embedVideo = $("<iframe>");
			// embedVideo.attr("width", "560");
			// embedVideo.attr("height", "315");
			// embedVideo.attr("src", videoEmbedLink);
			// embedVideo.attr("title", "Artist Video");
			// embedVideo.attr("frameborder", "0");
			// embedVideo.attr(
			// 	"allow",
			// 	"alutoplay; clipboard-write; gyroscope; picture in picture; "
			// );
			// embedVideo.attr("autoplay");
			// embedVideo.attr("clipboard-write");

			// embedVideo.attr("gyroscope");
			// embedVideo.attr("picture-in-picture");
			// embedVideo.attr("allowfullscreen");
			// embedVideo.append($("#video-player"));
		});
});

console.log(songKey);

function clearSongResultsListEl() {
	$("#songResultsArray").empty();
}
