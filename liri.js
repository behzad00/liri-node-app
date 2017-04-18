var request = require("request");
var twitter = require('twitter');
var spotify = require('spotify');
// var inquirer = require('inquirer');
var fs = require("fs");

var keys = require("./keys");


const client = new twitter(keys.twitterKeys);

// var options = process.argv[2];
var nodeArgs = process.argv;
var options = process.argv[2];
var movieName ="";
var songName = "";


console.log(options);

if (options === "my-tweets") {

    var params = { screen_name: 'bzadp' };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
       // console.log(tweets.text);
    });

}


if (options == "movie-this") {

	for ( var i=3 ; i<nodeArgs.length ; i++){

		if (i>3 && i< nodeArgs.length){
			movieName = movieName + "+" +nodeArgs[i];


		}
	}    

	 if(!movieName) {
	 	movieName = "Mr. Nobody"
	 }

    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {

        if (!error && response.statuscode === 200) {

            console.log("Title: " + JSON.parse(body).title);
            console.log("Release Year: " + JSON.parse(body).year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Country: " + JSON.parse(body).country);
            console.log("Language: " + JSON.parse(body).language);
            console.log("Plot: " + JSON.parse(body).plot);
            console.log("Actors: " + JSON.parse(body).actors);

            	if(!movieName) {




            	}


        }


    })
}



if (options === "spotify-this-song") {

	for ( var i=3 ; i<nodeArgs.length ; i++){
		
		if (i>3 && i< nodeArgs.length){
			songName = songName + "+" +nodeArgs[i];


		}
	} 

	if (!songName){
		songName = "The Sign";
	}

	console.log(songName);
    

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        }

        	console.log(data.tracks.items.album);
        
    });


}

if (options === "do-what-it-says") {


	fs.readFile("random.txt" , "utf8" , function(err , data) {
		data = data.split(" ,")
		options = data[0];
		songName = data[1];
	});
}