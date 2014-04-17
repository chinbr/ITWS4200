
$(document).ready(function () {

    $('#JSON').click(function () {

        $.post("http://127.0.0.1:8000/json", function () {
        });

        return false;
    });

    $('#CSV').click(function () {
       
        $.post("http://127.0.0.1:8000/csv", function () {
        });

        return false;
    });

});