
var express = require('express'); //load express module
var app = express();
var http = require('http'); 
var server = http.createServer(app);
app.use(express.bodyParser()); //creating server

var twitter = require('ntwitter'), //load ntwitter module
    fs = require('fs'); //load fs module

var json = function () {
    console.log("Building JSON...");

    //twitter app access information
    var wstream = fs.createWriteStream('twitter.json');
    var twit = new twitter({
        consumer_key: 'hBHekrWZqkO1SwUNynCJkw',
        consumer_secret: 'g8rEJYYJkqdQ9FL05t7W70awdfoaugHEqFyEvVTFWc',
        access_token_key: '2353816338-52lphA3uIICQo5a87gaNv3tYw1E296a0fsII0Wc',
        access_token_secret: 'e1Zcir5DCBkX5ydnzrQ4sG5UCF9lyHXjTbRqfc5fLkd9g'
    });

    //search tweets containing the word spring
    var i = 0; var counter = [];
    twit.stream('statuses/filter', { track: ['spring'] }, function (stream) {
        stream.on('data', function (data) {
            if (i < 10) {
                counter[i++] = data;
            }
            else if (i == 10) {
                fs.writeFile('twitter.json', JSON.stringify(counter), function (err) {
                    if (err) {
                        console.log("error in JSON format");
                    }
                    console.log('Finished');
                });
                i++;
            }
        });
    });
    wstream.end();
}

var csv = function () {
    console.log("Building CSV...");
    fs.exists('twitter.csv', function (exists) { //check if twitter.csv already exists
        if (exists) {
            //overwrite file
            console.log("twitter.csv already exists. Overwriting...")
            fs.truncate('twitter.csv', 0);
        }
        else {
            //appendFile alreday creates if doesn't exist
        }
    });
    fs.exists('twitter.json', function (exists) { //check if twitter.json exists
        if (exists) {

            var data = fs.readFileSync("twitter.json", "utf8"); //reads from twitter.json
            var tweets = JSON.parse(data);

            //creating arrays for looping through fields titles and values
            var fields = []; var user_in = [];
            fields = ['created_at', 'id', 'text', 'user', 'geo', 'coordinates', 'place'];
            user_in = ['id', 'name', 'screen_name', 'location', 'followers_count', 'friends_count', 'created_at', 'time_zone', 'profile_background_color', 'profile_image_url'];

            var total = "";

            //creating header row
            for (var i = 0; i < fields.length; i++) {
                if (fields[i] == 'user') {
                    for (var j = 0; j < user_in.length; j++) {
                        total += '"' + 'user' + "_" + user_in[j] + '"' + ',';

                    }
                }
                else {
                    if (i == fields.length - 1) {
                        total += '"' + fields[i] + '"' + '\n';
                    }
                    else {
                        total += '"' + fields[i] + '"' + ',';
                    }

                }

            }
            //add header row to file
            fs.appendFile('twitter.csv', total);
            total = "";

            //looping through JSON file. Adding to CSV at end.
            for (var i = 0; i < tweets.length; i++) {
                for (var j = 0; j < fields.length; j++) {
                    //if in [users] object, go into [users_in]
                    if (j == 3) { 
                        for (var k = 0; k < user_in.length; k++) {
                            var tmp;
                            if (tweets[i][fields[j]][user_in[k]] == null) {
                                tmp = '"' + "null" + '"' + ',';
                            }
                            else {
                                tmp = '"' + tweets[i][fields[j]][user_in[k]] + '"' + ',';
                            }
                            total += tmp;
                        }
                    }
                    else if (j == fields.length - 1) { //add new line: reached end of all fields
                        var tmp;
                        if (tweets[i][fields[j]] == null) {
                            tmp = '"' + "null" + '"' + '\n';
                        }
                        else {
                            tmp = '"' + tweets[i][fields[j]]['name'] + '"' + '\n';
                        }
                        total += tmp;
                    }
                    else {
                        var tmp;
                        if (tweets[i][fields[j]] == null) {
                            tmp = '"' + "null" + '"' + ',';
                        }
                        else {
                            tmp = '"' + tweets[i][fields[j]] + '"' + ',';
                        }
                        total += tmp;
                    }
                }
                fs.appendFile('twitter.csv', total); //add to csv file
                total = "";
            }
        }
        else {
            console.log('twitter.json does not exist. Build JSON first'); //does nothing if JSON is not built already
        }
    });
    
}

app.post('/json', function (req, res) { //looks for posts requests index.html/json and builds json
    json();
});


app.post('/csv', function (req, res) { //looks for posts requests index.html/csv and builds csv
    csv();
});

app.listen(8000, function () { //server listens to port 8000
    console.log("Server running");
});