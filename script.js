// $(document).ready(function () {

// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 
// API Key: 461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810
// 
// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


var submitBtnEl = $('.btn');
var searchEl = $('#artistInput');
var apiKey = "7da8b855c2mshf8ae485a53472afp140c70jsn230119fecc1f"

var submitBtnEl = document.querySelector('.btn');

// jQuery code is in here
var artist = $('#artistInput');
var songName = "";
var songKey = ''
var songTitle = "";
var songTitleEl = ""
var hits = [];
var songResultCardEl = ""
var songKeyValue = ""


$('.btn').click(function () {
	// preventDefault();
	console.log(searchEl.val());
	clearSongResultsListEl()


	// START SEARCH - - TOP TRACKS - - - - - - - - - - - - - - - - - - - - - - - - - - -


	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://shazam.p.rapidapi.com/search?term=kiss%20the%20rain&locale=en-US&offset=0&limit=5",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "shazam.p.rapidapi.com",
			"x-rapidapi-key": "7da8b855c2mshf8ae485a53472afp140c70jsn230119fecc1f"
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response);
	});
// 

		for (var h = 0; h < 5; h++) {
			// CREATION OF CARD DIV
			songResultCardEl = $('<div>');
			songResultCardEl.addClass('card text-white btn-outline-light col-2 p-1 bg-dark rounded')

			// HOVER ELEMENT FOR CAR DIV
			$(".card").hover(
				function () {
					$(this).addClass('shadow-lg col-3').css('cursor', 'pointer');
				},
				function () {
					$(this).removeClass('shadow-lg col-3');
				}
			);

			// CREATION OF ELEMENTS INSIDE CARD DIV 

			// COVER ART AT TOP OF CARD
			var coverArt = $('<img>')
			coverArt.attr('src', response.tracks.hits[h].track.images.coverart)
			coverArt.appendTo(songResultCardEl)

			// SONG NAME 
			songName = response.tracks.hits[h].track.title
			var resultTitleEl = $('<h3>' + songName + '</h3>')
			resultTitleEl.addClass('text-center card-text m-1')
			resultTitleEl.appendTo(songResultCardEl)

			// SONG ID - - WILL BE USED TO GET RECOMENDED SONGS BELOW - - - - -  
			songKey = response.tracks.hits[h].track.key
			console.log(songKey)

			
			songResultCardEl.appendTo($('#songResultsArray'))
			// console.log(songResultCardEl.attributes[1].val())
			songResultCardEl.attr('data-id', songKey)
			
			console.log(songKey)
			// var test = element.
			
			
		}
	})


$('#songResultsArray').on('click', function() {
	// + $("#test").html());
	var test = songResultCardEl.attributes[1].val()
	// var test = songResultCardEl.getAttribute("data-id");
	console.log(test);
	recommendedSongs()
})

// $('.card').click(function () {
// 	console.log(response.id)
// 	songKeyValue = $('.card').id
// 	// console.log(response)
// 	// songKeyNumber = parseint(songKeyValue)
// 	// console.log(songKeyValue)
// 	recommendedSongs()
// })

console.log(songKey)


// START SEARCH - - RECOMMENDATIONS - - - - - - - - - - - - - - - - - - - - - - - - - - -

// console.log(songKey)
function recommendedSongs() {
	console.log(songKeyValue)

	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://shazam.p.rapidapi.com/search?term=kiss%20the%20rain&locale=en-US&offset=0&limit=5",
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "shazam.p.rapidapi.com",
			"x-rapidapi-key": "7da8b855c2mshf8ae485a53472afp140c70jsn230119fecc1f"
		}
	};
	
	$.ajax(settings).done(function (response) {
		console.log(response);
});
}// 
// 
// END SEARCH - - TOP TRACKS - - - - - - - - - - - - - - - - - - - - - - - - - - -


function clearSongResultsListEl() {
	$('#songResultsArray').empty();
}


// console.log(songKey)
// })