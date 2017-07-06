/**
 * Created by Dainguyen on 2/6/2017.
 */
$(document).ready(function(){
    var weather = new ForecastWeather(21.056164199999998, 105.78686569999999).init();
})
function ForecastWeather(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.layout = $('<div class="container-forecast"></div>');
    this.nameLocation = $('<div class="name-location"></div>')
    this.date = $('<div class="date-of-forecast"></div>');
    this.contentWeather = $('<div class="weather-content"></div>');
    this.icon = $('<img>');
    this.statusWeather = $('<div class="status-weather"></div>');
    this.descripttionWeather = $('<div class="desc-weather"></div>')
    this.contentTemperature = $('<div class="temp-content"></div>');
    this.buttonCelsius = $('<button class="button-convert-to-c">C</button>');
    this.buttonFahrenheit = $('<button class="button-convert-to-f">F</button>');

    this.init = function() {
        $('body').append(this.layout);
        this.layout.append(this.date);
        this.layout.append(this.nameLocation);
        this.layout.append(this.date);
        this.layout.append(this.contentWeather);
        this.contentWeather.append(this.icon);
        this.contentWeather.append(this.statusWeather);
        this.contentWeather.append(this.descripttionWeather);
        this.layout.append(this.contentTemperature);
        this.layout.append(this.buttonCelsius);
        this.layout.append(this.buttonFahrenheit);
        //Add data weather
        this.putDataWeather(this.nameLocation, this.icon, this.statusWeather, this.descripttionWeather, this.contentTemperature);
        this.convertTemp();
        this.getDate();
    };

    //Put data from API Open Weather
    this.putDataWeather = function(nameLocation, icon, statusWeather, descripttionWeather, contentTemperature) {
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/weather?lat=" + this.lat + "&lon=" + this.lon + "&units=metric&appid=de3e54c5a4a6a1b31c8ca5398dba772e"
        }).done(function(data) {
            var urlIcon = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            var tempC = Math.round(parseFloat(data.main.temp));
            nameLocation.text(data.name)
            icon.attr('src', urlIcon);
            statusWeather.text(data.weather[0].main);
            descripttionWeather.text('(' + data.weather[0].description + ')');
            contentTemperature.html(tempC + '&#176;' + 'C');
            contentTemperature.attr('type', 'C');
        });
    }

    //Convert Temperature
    this.convertTemp = function() {
        var self = this;
        this.buttonFahrenheit.on('click', function() {
            if (self.contentTemperature.attr('type') == 'C') {
                var currentTemp = parseFloat(self.contentTemperature.text());
                var tempF = currentTemp * 1.8 + 32;
                self.contentTemperature.html(Math.round(tempF) + '&#176;' + 'F');
                self.contentTemperature.attr('type', 'F');
            } else {
                return
            }
        });
        this.buttonCelsius.on('click', function() {
            if (self.contentTemperature.attr('type') == 'F') {
                var currentTemp = parseFloat(self.contentTemperature.text());
                var tempC = (currentTemp - 32) / 1.8;
                self.contentTemperature.html(Math.round(tempC) + '&#176;' + 'C');
                self.contentTemperature.attr('type', 'C');
            } else {
                return
            }
        });
    }
    //Get date
    this.getDate = function() {
        var d = new Date();
        var day = d.getDate();
        var month = d.getMonth();
        var year = d.getFullYear();
        this.date.html(day + '/' + month + '/' + year);
    }
}