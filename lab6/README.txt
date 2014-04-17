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
