// $(document).ready(function () {

	// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	// 
	// API Key: 461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810
	// 
	// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


	var submitBtnEl = $('.btn');
	var searchEl = $('#artistInput');
	var apiKey = "461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810"

	var submitBtnEl = document.querySelector('.btn');

	// jQuery code is in here
	var artist = $('#artistInput');
	var songName = "";
	var songId = ''
	var songTitle = "";
	var songTitleEl = ""
	var hits = [];
	var songResultCardEl = ""


	$('.btn').click(function () {
		// preventDefault();
		console.log(searchEl.val());
		clearSongResultsListEl()


		// START SEARCH - - TOP TRACKS - - - - - - - - - - - - - - - - - - - - - - - - - - -


		const settings = {
			"async": true,
			"crossDomain": true,
			"url": "https://shazam.p.rapidapi.com/search?term=" + searchEl.val() + "&locale=en-US&offset=0&limit=5",
			"method": "GET",
			"headers": {
				"x-rapidapi-host": "shazam.p.rapidapi.com",
				"x-rapidapi-key": "461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810"
			}
		}

		$.ajax(settings).then(function (response) {
			console.log(response)

			for (var h = 0; h < 5; h++) {
				// CREATION OF CARD DIV
				songResultCardEl = $('<div>');
				songResultCardEl.addClass('card text-white btn-outline-light col-2 p-1 bg-dark rounded')
				songResultCardEl.appendTo($('#songResultsArray'))
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
				songId = response.tracks.hits[h].track.key
				console.log(songId)
				songResultCardEl.attr('songId', songId)

			}

		
			
		
			// START SEARCH - - RECOMENDATIONS - - - - - - - - - - - - - - - - - - - - - - - - - - -

			console.log(songId)
			$('.card').click(function (songId) {
				console.log(songId)

				const settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://shazam.p.rapidapi.com/songs/list-recommendations?key=50881388&locale=en-US",
					"method": "GET",
					"headers": {
						"x-rapidapi-host": "shazam.p.rapidapi.com",
						"x-rapidapi-key": "461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810"
					}
				}

				$.ajax(settings).done(function (response) {
					console.log(response);
				});
			})
			// 
			// 
			// END SEARCH - - TOP TRACKS - - - - - - - - - - - - - - - - - - - - - - - - - - -


		})







	})

	function clearSongResultsListEl() {
		$('#songResultsArray').empty();
	}


	// console.log(songId)
// })
