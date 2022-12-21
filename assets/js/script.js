// encryption via MetaTron on stackoverflow, can be found here: https://stackoverflow.com/a/66938952
const crypt = (salt, text) => {
	const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
	const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
	const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

	return text.split("").map(textToChars).map(applySaltToChar).map(byteHex).join("");
};

const decrypt = (salt, encoded) => {
	const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
	const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
	return encoded
		.match(/.{1,2}/g)
		.map((hex) => parseInt(hex, 16))
		.map(applySaltToChar)
		.map((charCode) => String.fromCharCode(charCode))
		.join("");
};

var searchEl = $("#artistInput");
var apiKey = decrypt("salt", "3d396e3c6e3d3f6e3a3c6779623a3c6c6c6868696b6c3b6b3a693c6c7a3b6839686e6c6079643268323c3f3b333c6b6c6c68");
var videoDivEl = $("#videoDiv");
let recentSearchArr = JSON.parse(localStorage.getItem("searchHistory") || "[]");
const ytAPIKey = decrypt("salt", "4b43706b59734e4648555d3f4c70734b5f5f5b3e7c61426b61603f3a503c4c4e5d6b5c7f616b61");

function addButton(value) {
	if (value == "" || null) {
		return;
	}
	if (recentSearchArr.includes(value)) {
		return;
	}
	recentSearchArr.push(value);
	localStorage.setItem("searchHistory", JSON.stringify(recentSearchArr));
	recentSearches();
}

function recentSearches() {
	var recentSearch = $("#recent-search");
	recentSearch.empty();
	for (var i = 0; i < recentSearchArr.length; i++) {
		var button = `<button id="${i}" class="text-capitalization m-3 p-3 rounded history-button" value="${recentSearchArr[i]}">${recentSearchArr[i]}</button>`;
		recentSearch.append(button);
		$(`#${i}`).click(function (event) {
			searchArtist(event.currentTarget.textContent);
		});
	}
}
recentSearches();

// When return key is pressed, search button clicks.
$(searchEl).submit(searchArtist);

$(".btn").click(function () {
	searchArtist(searchEl.val());
	addButton(searchEl.val());
	// START SEARCH - - TOP TRACKS - - - - - - - - - - - - - - - - - - - - - - - - - - -
});

function searchArtist(search) {
	clearSongResultsListEl();
	var query = search || searchEl.val();
	const settings = {
		async: true,
		crossDomain: true,
		url: "https://shazam.p.rapidapi.com/search?term=" + query + "&locale=en-US&offset=0",
		method: "GET",
		headers: {
			"x-rapidapi-host": "shazam.p.rapidapi.com",
			"x-rapidapi-key": apiKey,
		},
	};

	$.ajax(settings).then(function (response) {
		console.log(response);
		for (var h = 0; h < response.tracks.hits.length; h++) {
			// CREATION OF CARD DIV
			let songResultCardEl = $("<div>");
			songResultCardEl.addClass("card d-flex text-white btn-outline-light col-6 col-sm-4 col-md-3 col-lg-2 p-1 m-2 bg-dark rounded");

			// HOVER ELEMENT FOR CARD DIV
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
			coverArt.attr("href", videoDivEl);
			coverArt.addClass("img coverArt");
			coverArt.appendTo(songResultCardEl);

			// SONG NAME
			let songName = response.tracks.hits[h].track.title;
			artistAndSong = songName + " " + response.tracks.hits[h].track.subtitle;
			var resultTitleEl = $("<h3>" + songName + "</h3>");
			resultTitleEl.addClass("text-center card-text m-1");
			resultTitleEl.appendTo(songResultCardEl);

			// SONG ID - - WILL BE USED TO GET RECOMMENDED SONGS BELOW - - - - -
			let songKey = response.tracks.hits[h].track.key;

			songResultCardEl.appendTo($("#songResultsArray"));
			songResultCardEl.attr("data-id", songKey);
			coverArt.attr("data-id", songKey);
			coverArt.attr("data-artistAndSong", artistAndSong);
		}
	});
}

$(document).on("click", ".img", function () {
	videoDivEl.removeClass("hide");
	videoDivEl.addClass("show");
	$(document).scrollTop($(document).height());
	var artistAndSong = $(this).attr("data-artistAndSong").split(" ");

	var fetchUrl = "https://www.googleapis.com/youtube/v3/search?q=" + artistAndSong + "&key=" + ytAPIKey;
	//the button grabs the value of the text area and turns it into a variable.
	//The variable is inserted into a url string...
	$.ajax({
		method: "get",
		//and an api request is made using the url string
		url: fetchUrl,
	})
		.then(function (response) {
			var videoId = response.items[0].id.videoId;

			return videoId;
		})
		.then(function (videoId) {
			var videoEmbedLink = "https://www.youtube.com/embed/" + videoId;
			console.log(videoEmbedLink);
			$("iframe").attr("src", videoEmbedLink);
		});
});

// START SEARCH - - RECOMMENDATIONS - - - - - - - - - - - - - - - - - - - - - - - - - - -

// console.log(songKey)
// function recommendedSongs() {

// 	console.log(songKey)

// 	const settings = {
// 		"async": true,
// 		"crossDomain": true,
// 		"url": "https://shazam.p.rapidapi.com/songs/list-recommendations?key=" + songKey + "&locale=en-US",
// 		"method": "GET",
// 		"headers": {
// 			"x-rapidapi-host": "shazam.p.rapidapi.com",
// 			"x-rapidapi-key": "73d6d75d06msh06ffbbcaf1a0c6fp1b3bdfjsn8b865196affb"
// 		}
// 	}

// 	$.ajax(settings).done(function (response) {
// 		console.log(response);
// 	});
// }
// //
// //
// // END SEARCH - - RECOMMENDATIONS - - - - - - - - - - - - - - - - - - - - - - - - - - -

function clearSongResultsListEl() {
	$("#songResultsArray").empty();
}
