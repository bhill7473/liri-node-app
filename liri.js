var fs = require("fs");
var keys = require('./keys.js');
var twitterKeys = keys.twitterKeys;
var spotify = require ("node-spotify-api");
var Twitter = require('twitter');
var action = process.argv[2];
var value = process.argv[3];
switch(action) {
case 'spotify-this-song':
    spotifyThis();
    break;
case 'my-tweets':
    twitter();
    break;
case 'movie-this':
    movies();
    break;
case 'do-what-it-says':
    doThis();
    break;   
}
function twitter(){
	var client = new Twitter({
		consumer_key:'jyjrW4xlEbeWCxDQvPFT6CZ1L',
		consumer_secret: 'jyjrW4xlEbeWCxDQvPFT6CZ1L',
		access_token_key: '909974717322481664-QM7fBMw4rdgyx76vG5prUHOs6D3BRu6',
		access_token_secret: 'bnJmjGwvFU1teV5lmBWL8Ki6KuIkPOFb2dZJdhb7ueKcd',
	});
	var params = {
		screen_name: 'JonTwittyo',
		count: '20',
	}
	client.get('statuses/user_timeline', params, function(error, timeline, response){
		if(!error){
			for(tweet in timeline){
				var tDate = new Date(timeline[tweet].created_at);
				console.log("Tweet #: " + (parseInt(tweet)+1) + " ");
				console.log(tDate.toString().slice(0, 24) + " ");
				console.log(timeline[tweet].text);

			}
		} 
	})

}
  function spotifyThis() {

  var Spotify = require('node-spotify-api');
  var spotify = new Spotify({
  id: '8c471d742cee486c892718797321e6d5',
  secret: '7fef3e4217ee4f61aace2665076d43e0'
});
  spotify.search({ type: 'track', query: value }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    else {
    var call = data.tracks.items[0];
    var artist = call.artists[0].name;
    console.log("Artist: " + artist);
    var song = call.name;
    console.log("Song name: " + song);
    var preview = call.preview_url;
    console.log("Preview Link: " + preview);
    var album = call.album.name;
    console.log("Album: " + album);

}

    
});
}
function movies() {
var request = require('request');
var name = value;
var movie = "Mr.Nobody";
var url = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + name + '&y=&plot=short&r=json';
var urlDefault = 'http://www.omdbapi.com/?apikey=40e9cece&t=' + movie + '&y=&plot=short&r=json';

 if (name != null) {
    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
              console.log("Title: " + value);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };
      });
    } 
      else {
      request(urlDefault, function (error, response, body) {
        if (!error && response.statusCode == 200) {
              console.log("Title: " + movieDefault);
              console.log("Year: " + JSON.parse(body)["Year"]);
              console.log("Rating: " + JSON.parse(body)["imdbRating"]);
              console.log("Country of Production: " + JSON.parse(body)["Country"]);
              console.log("Language: " + JSON.parse(body)["Language"]);
              console.log("Plot: " + JSON.parse(body)["Plot"]);
              console.log("Actors: " + JSON.parse(body)["Actors"]);
            };
      });
    }
  }
function doThis(){
 fs.readFile("random.txt", "utf8", function(error, data) {
  if (error) {
    return console.log(error);
  }
  console.log(data);
  var dataArr = data.split(",");
  spotifyThis(dataArr);		
});
}