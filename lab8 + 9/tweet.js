
var express = require('express'); //load express module
var app = express();
var http = require('http');
var server = http.createServer(app);
var mongo = require('mongodb');
app.use(express.bodyParser()); //creating server



var twitter = require('ntwitter'), //load ntwitter module
    fs = require('fs'); //load fs module

var Db = require('mongodb').Db;
//var conenction = require('mongodb').Connection;
var Server = require('mongodb').Server;
//var BSON = require('mongodb').BSON;
//var objectID = require('mongodb').objectID;

var db_server = new Server('localhost', 27017, { auto_reconnect: true });
var db = new Db('tweets', db_server);


var MongoClient = require('mongodb').MongoClient;
var tweets;
MongoClient.connect('mongodb://127.0.0.1:27017/tweets', function(err, db) {
    if(!err) console.log('we are connected');
    tweets = db.collection('tweets');
});


  var twit = new twitter({
        consumer_key: 'hBHekrWZqkO1SwUNynCJkw',
        consumer_secret: 'g8rEJYYJkqdQ9FL05t7W70awdfoaugHEqFyEvVTFWc',
        access_token_key: '2353816338-52lphA3uIICQo5a87gaNv3tYw1E296a0fsII0Wc',
        access_token_secret: 'e1Zcir5DCBkX5ydnzrQ4sG5UCF9lyHXjTbRqfc5fLkd9g'
    });



var json = function () {
    console.log("Building JSON...");

    //twitter app access information
    var wstream = fs.createWriteStream('twitter.json');


    //search tweets containing the word spring
    var i = 0; 
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


//connects to tweet database. If it doesn't exist, createDB is called.
var b_db = function () {
    console.log("Building database");


    db.open(function (err, db) {
        if (!err) {
            console.log("Connecting to tweets database");
            db.collection('tweets', { strict: true }, function (err, collection) {

                if (err) {
                    console.log("Doesn't exist. creating tweets database");
                }
                else {
                    console.log("Collection 'tweets' already exists. Inserting new entries");
                }
                createDB();
            });
        }
    });
}

//Reads from the JSON and inputs it into mongodb. Creates database and collection called tweets.
var createDB = function () {

    fs.exists('twitter.json', function (exists) { //check if twitter.json exists
        if (exists) {

            var data = fs.readFileSync("twitter.json", "utf8"); //reads from twitter.json
            var tweets = JSON.parse(data);

            //looping through JSON file. adding one object at a time
            for (var i = 0; i < tweets.length; i++) {
                var tmp = [{
                    "created_at": tweets[i]['created_at'],
                    "id": tweets[i]['id'],
                    "text": tweets[i]['text'],
                    "user_id": tweets[i]['user']['id'],
                    "user_name": tweets[i]['user']['name'],
                    "user_screen_name": tweets[i]['user']['screen_name'],
                    "user_location": tweets[i]['user']['location'],
                    "user_followers_count": tweets[i]['user']['followers_count'],
                    "user_friends_count": tweets[i]['user']['friends_count'],
                    "user_created_at": tweets[i]['user']['created_at'],
                    "user_time_zone": tweets[i]['user']['time_zone'],
                    "user_profile_background_color": tweets[i]['user']['profile_background_color'],
                    "user_profile_image_url": tweets[i]['user']['profile_image_url'],
                    "geo": tweets[i]['geo'],
                    "coordinates": tweets[i]['coordinates'],
                    "place": tweets[i]['place']
                }];

                db.collection('tweets', function (err, collection) {
                    collection.insert(tmp, { safe: true }, function (err, result) { });

                });
              
            }
            
        }
        else {
            console.log('twitter.json does not exist. Build JSON first'); //does nothing if JSON is not built already
        }
        db.close();
    });
}

var stream = function() {
   

}
app.post('/json', function (req, res) { //looks for posts requests index.html/json and builds json
    json();
});
app.post('/csv', function (req, res) { //looks for posts requests index.html/csv and builds csv
    csv();
});
app.post('/b_db', function (req, res) { //looks for posts requests index.html/b_db and builds mongo database
    b_db();
});
  

var arr;
var i=0, count = 5; 
twit.stream('statuses/filter', { track: ['spring'] }, function (stream) {
    
                stream.on('data',  function (data) {
         
                        if (i < count) {

                            tweets.insert(data, function(err, result) {
                                if (err) return err;
                                i++;
                            });
                        }
                        else if (i >= count) {

                            tweets.find().toArray(function (err, items) {

                                i = 0;
                                if (err) {
                                    console.log(err);

                                }
                                else {

                                    arr  = items.slice(0);
                                    load();
                                    items.forEach(function(item) {
                                        friend_counter(item['user']['friends_count']);
                                        retweet_counter(item['retweet_count']);
                                        follower_counter(item['user']['followers_count']);
                                    });
                                    
  
                                }
                            });
                           
                        }
                        
                });

            });

function load() {
      app.post('/lt', function(req, res) {

                                          res.send(JSON.stringify(arr));
                                          
                                });
}

var follower_count = [0, 0 ,0 ,0]
function follower_counter(source) {
   //console.log("source: " + source);
    if (source < 100) {
        follower_count[0]++;
    }
    else if (source > 100 && source < 501) {
        follower_count[1]++;
    }
    else if (source > 500 && source < 1001) {
        follower_count[2]++;
    }
    else {
        follower_count[3]++;
    }
    app.post('/follower_counter', function(req, res) {
        res.send(JSON.stringify(follower_count));
});

}

var retweet_count = [0, 0 ,0 ,0]
function retweet_counter(source) {
  //console.log("source: " + source);
    if (source < 100) {
        retweet_count[0]++;
    }
    else if (source > 100 && source < 501) {
        retweet_count[1]++;
    }
    else if (source > 500 && source < 1001) {
        retweet_count[2]++;
    }
    else {
        retweet_count[3]++;
    }
    app.post('/retweet_counter', function(req, res) {

        res.send(JSON.stringify(retweet_count));
});

}

var friend_count = [0, 0 ,0 ,0] // <100, 100 -500, 501 - 1000, 1000+
function friend_counter(source) {
   // console.log("source: " + source);
    if (source < 100) {
        friend_count[0]++;
    }
    else if (source > 100 && source < 501) {
        friend_count[1]++;
    }
    else if (source > 500 && source < 1001) {
        friend_count[2]++;
    }
    else {
        friend_count[3]++;
    }
    app.post('/friend_counter', function(req, res) {
        res.send(JSON.stringify(friend_count));
});

}


//retrieve html, css, and javascript files
app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/css/:filename', function (req, res) {
    var filename = req.params.filename;
    res.sendfile(__dirname + '/css/' + filename);
});

app.get('/js/:jsname', function (req, res) {
    var jsname = req.params.jsname;
    res.sendfile(__dirname + '/js/' + jsname);
});

app.listen(8000, function () { //server listens to port 8000
    console.log("Server running");
});