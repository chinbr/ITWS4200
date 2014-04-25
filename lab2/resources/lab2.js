//using http://openweathermap.org



$(document).ready(function () {
    var latitude;
    var longitude;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
        else {
            alert("Geolocation is not supported by this browser.");
        }
    }

    function showPosition(position) {

        latitude = position.coords.latitude;
        longitude = position.coords.longitude;


        getWeather(latitude, longitude);
        getForecast(latitude, longitude);
    }

    function getWeather(_latitude, _longitude) {

        var conn = 'http://api.openweathermap.org/data/2.5/weather?lat=' + _latitude + '&lon=' + _longitude;
        $.getJSON(conn, function (json_data) {

            var img_name = json_data['weather'][0]['icon'];
            var img_src = 'http://openweathermap.org/img/w/' + json_data['weather'][0]['icon'] + '.png'

            var image = document.createElement("img");
            image.setAttribute("src", img_src);
            image.setAttribute("class", "weather_pic");
            $('#temp1').append(image);


            var temp_kelvin = json_data['main']['temp'];
            var temp_f = 9 / 5 * (temp_kelvin - 273) + 32;
            var temp_f = Math.round(temp_f);
            var temp = '<h1>' + temp_f + '&deg F' + '</h1>';
            $('#temp1').append(temp)

            var min = json_data['main']['temp_min'];
            var max = json_data['main']['temp_max'];
            min = 9 / 5 * (min - 273) + 32;
            max = 9 / 5 * (max - 273) + 32;
            min = Math.round(min);
            max = Math.round(max);

            var min_max = '<div>' + max + '&deg / ' + min + '&deg</div>';
            $('#text1').append(min_max);

            var desc = '<div>' + json_data['weather'][0]['description'] + '</div>';
            $('#text1').append(desc);
            var city = '<div></br>' + json_data['name'] + '</div>';
            $('#text1').append(city);

        });
    }

    function getForecast(_latitude, _longitude) {

        var conn = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + _latitude + '&lon=' + _longitude;
        $.getJSON(conn, function (json_data) {


            var img_src = 'http://openweathermap.org/img/w/' + json_data['list'][0]['weather'][0]['icon'] + '.png'

            var image = document.createElement("img");
            image.setAttribute("src", img_src);
            image.setAttribute("class", "weather_pic");
            $('#temp2').append(image);

            var temp_kelvin = json_data['list'][0]['main']['temp'];
            var temp_f = 9 / 5 * (temp_kelvin - 273) + 32;
            var temp_f = Math.round(temp_f);
            var temp = '<h1>' + temp_f + '&deg F' + '</h1>';
            $('#temp2').append(temp)

            var min = json_data['list'][0]['main']['temp_min'];
            var max = json_data['list'][0]['main']['temp_max'];
            min = 9 / 5 * (min - 273) + 32;
            max = 9 / 5 * (max - 273) + 32;
            min = Math.round(min);
            max = Math.round(max);

            var min_max = '<div>' + max + '&deg F / ' + min + '&deg F </div>';
            $('#text2').append(min_max);

            var desc = '<div>' + json_data['list'][0]['weather'][0]['description'] + '</div>';
            $('#text2').append(desc);
            $('#text2').append("</br>In 3 hours");

        });

    }


    getLocation();


});






