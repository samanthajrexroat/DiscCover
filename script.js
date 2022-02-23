// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// 
// API Key: 461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810
// 
// DO NOT DELETE - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


var submitBtnEl = $('.btn');
var searchEl = $(".inputValue");
var apiKey = "461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810"



// jQuery code is in here



$(".btn").on("click", function (e) {
			e.preventDefault();
			console.log(searchEl.val());



			// START SEARCH - - TOP TRACKS - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// 
			// 
		// 	alert("the click works")
		// 	const settings = {
		// 		"async": true,
		// 		"crossDomain": true,
		// 		"url": "https://shazam.p.rapidapi.com/search?term=" + searchEl.val() + "&locale=en-US&offset=0&limit=5",
		// 		"method": "GET",
		// 		"headers": {
		// 			"x-rapidapi-host": "shazam.p.rapidapi.com",
		// 			"x-rapidapi-key": "461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810"
		// 		}
			
		// 	}

		// 	$.ajax(settings).then(function (response) {
		// 		console.log(response)
		// 	})
		// })
			// END SEARCH - - TOP TRACKS - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// 
			// START SEARCH - - RECOMENDATIONS - - - - - - - - - - - - - - - - - - - - - - - - - - -
			// 
			// 

			const settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://shazam.p.rapidapi.com/songs/list-recommendations?key=427101360&locale=en-US",
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "shazam.p.rapidapi.com",
					"x-rapidapi-key": "461cbd2219msh0060281615c946dp11914fjsnbde57ac7e810"
				}
			};
			
			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		})