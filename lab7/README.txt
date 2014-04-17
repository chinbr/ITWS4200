go to directory where mongodb is installed:
run mongod.exe
run mongo.exe
run apache server on xamp
place mongo.php, style2.css in xampp htdocs folder
for windows:
need to download the php_mongo.dll extension.
instructions and how to find the right dll is here. http://php.net/manual/en/mongo.installation.php

in the xamp folder, go to php->ext and drop the php_mongo.dll file there. in php.ini, add "extension=php_mongo.dll" at the bottom and save.

in node command prompt, type node tweet.js.
This generates JSON, CSV, the database in mongo, and outputs it to html via php. Comments are in the code. To execute these commands, open index.html in your browser.

Clicking Read Database button links to the php file.
The php file looks for the mongo database and collection called tweets and iterates through the results. It requires use of the module php_mongo.dll

A database called "tweets is created. A collection in that database is created - called "tweets" as well.

in the mongo.exe console, type "use tweets" to access mongo commands. 


to check if values have been created, type in mongo console db.tweets.find().pretty()

to delete: db.tweets.drop()

==============================================================
Previous Readme for Build Json and Build CSV:
Express and ntwitter modules are in the node_module folder.
To run:
In node command prompt: node tweet.js
open index.html to access web form.
	click on the buttons to create JSON or CSV.

Gets all tweets pertaining to keyword spring

In webpage, clicking "Build JSON file" makes a jquery call (in script.js) that communicates with the server by making a post call on the port the server is on. The server then checks if that post call has been made. If it has, it calls the json() function in tweet.js, which builds the JSON file called twitter.json.

Json file get 10 tweets.

Clicking the "Convert to CSV" does the same procedure, except it reads from the JSON file, parses it, and adds the selected fields to the CSV file (twitter.csv). Fields have double quotes surrounding them and are seperated by commas. 

Code has comments.	
