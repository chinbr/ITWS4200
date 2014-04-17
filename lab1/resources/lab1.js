/* lab 1 javascript file    */


$(document).ready(function () {
    
    var current_index = 0;
    var index_final = 0;
    var tweet_start;

    $.getJSON("resources/tweets-clean.json", function (data) {
        index_final = data.length;
    });
    tweet_start = setInterval(remove, 4000);

    function json_get() {
        $.getJSON("resources/tweets-clean.json", function (data) {

            var turn = current_index + 5;
            for (var i = current_index; i < turn; i++) {
                //$('#output').append(current_index);
                
                if (current_index < index_final) {
                    
                    var html = '<div class="tweet">';
                    html += '<div class="text">' + data[i]['text'];
                    html += '</div>';
                    html += '<div class="user">' + data[i]['user']['name'] + '</div></br>';

                    $("#container").append(html).hide().fadeIn();
                    current_index = current_index + 1;
                }

            }
            
        });
    }

    function remove() {
        if (current_index < index_final) {
            $("#container").fadeOut();
            $("#container").empty();
            json_get();   
        }
        else { //reloop
            current_index = 0;
   
        }

    }
    
});


