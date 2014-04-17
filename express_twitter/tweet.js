//Brian Chin Lab 4

var app = require('express').createServer(), //load express and create server
    twitter = require('ntwitter'), //load ntwitter module
    fs = require('fs'); //load fs module for file writing

var wstream = fs.createWriteStream('twitter.json');

app.listen(3000);

//twitter app access information
var twit = new twitter({
    consumer_key: 'hBHekrWZqkO1SwUNynCJkw',
    consumer_secret: 'g8rEJYYJkqdQ9FL05t7W70awdfoaugHEqFyEvVTFWc',
    access_token_key: '2353816338-52lphA3uIICQo5a87gaNv3tYw1E296a0fsII0Wc',
    access_token_secret: 'e1Zcir5DCBkX5ydnzrQ4sG5UCF9lyHXjTbRqfc5fLkd9g'
});

//search tweets containing oscars
var i = 0;
twit.stream('statuses/filter', { track: ['oscars'] }, function (stream) {
    stream.on('data', function (data) {
       if (i < 100) {
            var str = JSON.stringify(data);

            fs.appendFile('twitter.json', str, function (err) { //writes twitter stream to file twitter.json 
                if (err) throw err;

            });
            i++;
        }
    });
});
