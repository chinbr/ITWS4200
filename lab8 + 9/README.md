MAY NEED TO RUN BUILD DATABASE FIRST TO SET UP DATABASE

go to directory where mongodb is installed:
run mongod.exe
run mongo.exe

in node command prompt, run cmd "node tweet.js"
in browser, navigate to http://localhost:8000. Click start to display tweets / graphs. Click the other options to read the database into other formats, or to create the database and insert new tweets.
In the console of your browser, you can see the information being passed.

in tweet.js:
Streams tweets from twitter containing the keyword 'spring'. Every 5 tweets, the collection of tweets is sent by post 'lt' via the load function.
Information about the number of followers, friends, and retweets are sent as well via the follower_counter, friend_counter, and retweet_counter functions, respectively. They use post requests to send the data.

Script js:
Retrieves the information sent by tweet.js every 3 seconds.
Outputs them to the page, with chart.js pie charts to visualize the data. 

Responsiveness:
supports 960 px and below, and 480px and below screens.

