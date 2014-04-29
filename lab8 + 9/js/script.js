
$(document).ready(function () {

    $('#JSON').click(function () {
	    console.log("building json");
        $.post("http://127.0.0.1:8000/json", function () {
        });

        return false;
    });

    $('#CSV').click(function () {
        console.log("building csv");
        $.post("http://127.0.0.1:8000/csv", function () {
        });

        return false;
    });
    $('#Build_db').click(function () {
        console.log("building db");
        $.post("http://127.0.0.1:8000/b_db", function () {
        });

        return false;
    });
   
    function startTimer() {

    }

    function loadTweets() {
        $.post('/lt', function(data) {
           var tweets = JSON.parse(data);
            console.log(tweets.length);
      
            var output = ""
            var tmp = ""

            for (var i = tweets.length-8; i < tweets.length; i++) {
                if (tweets[i]['user_name'] == null) {
                    tmp = tweets[i]['user']['name'];
                }
                else {
                    tmp = tweets[i]['user name'];
                }
                output += "<div class='text'>" + tweets[i]['text'] + "</div> <div class='user'>" + tmp + ", " + tweets[i]['created_at'] + "</div>"; // tweets[i]['user_name']
                
            }
            document.getElementById('results').innerHTML = output;
        });

    }


    function follower() {
        var dat;
        $.post("/follower_counter", function(data) {
            data = JSON.parse(data);
            console.log("favs" + data);
            dat = 
             [
            {
                value: data[0],
                color:"#F81F71"
            },
            {
                value : data[1],
                color : "#349400"
            },
            {
                value : data[2],
                color : "#464646"
            },
            {
                value : data[3],
                color : "#00CDEF"
            },

            ];
            var ctx = document.getElementById("followersChart").getContext("2d");
            var myNewChart = new Chart(ctx).Pie(dat);     
         });
       
    }

    function friends() {
        var dat;
        $.post("/friend_counter", function(data) {
            data = JSON.parse(data);
            console.log("friends" + data);
            dat = 
             [
            {
                value: data[0],
                color:"#F81F71"
            },
            {
                value : data[1],
                color : "#349400"
            },
            {
                value : data[2],
                color : "#464646"
            },
            {
                value : data[3],
                color : "#00CDEF"
            },

            ];

            var ctx = document.getElementById("friendsChart").getContext("2d");
            var myNewChart = new Chart(ctx).Pie(dat);     
         });
       
    }
     function retweets() {
        var dat;
        $.post("/retweet_counter", function(data) {
            data = JSON.parse(data);
            console.log("retweets" + data);
            dat = 
             [
            {
                value: data[0],
                color:"#F81F71"
            },
            {
                value : data[1],
                color : "#349400"
            },
            {
                value : data[2],
                color : "#464646"
            },
            {
                value : data[3],
                color : "#00CDEF"
            },

            ];


            var ctx = document.getElementById("retweetsChart").getContext("2d");
            var myNewChart = new Chart(ctx).Pie(dat);     
         });
       
    }
    $('#read').submit(function (event) {
        //$('#content').hide();
        console.log("clicked");
        event.preventDefault();
        //start timer here
       // loadTweets();
       setInterval(function() {
            loadTweets();
            friends();
            retweets();
            follower();
        }, 3000);
         
    });


  

}); //document.ready end