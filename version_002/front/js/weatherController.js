app.controller("WeatherController", function ($scope, $http, $interval, $timeout, $animate) {
    $http(
        {
            method: 'get',
            url: ROOT_FRONT + 'application/service/weather/generalWeatherForecast',
        }
    ).then(function (result) {

        icon = result.data.condition.text.split(" ");
        icon = icon[icon.length - 1].toLowerCase();

        $scope.weather_today = {
            temp: result.data.condition.temp,
            text: result.data.condition.text,
            wind: result.data.wind.speed,
            sunrise: result.data.astronomy.sunrise,
            sunset: result.data.astronomy.sunset,
            icon: icon,
        };
        $scope.weather_results = result.data.forecasts;
        console.log('weather', result)
        console.log('weather', $scope.weather_today)

        $scope.short_day = function (string) {
            switch(string) {
                case 'Mon':
                    string ='Ma';
                    break;
                case 'Tue':
                     string ='Di';
                    break;
                case 'Wed':
                    string ='Wo';
                    break;
                case 'Thu':
                    string ='Do';
                    break;
                case 'Fri':
                    string ='Vr';
                    break;
                case 'Sat':
                    string ='Za';
                    break;
                case 'Sun':
                    string ='Zo';
                    break;

            }
            return string;
        }
    });

    function convertTo24Hour(time) {
        var hours = parseInt(time.substr(0, 2));

        if(time.indexOf('am') != -1 && hours == 12) {
            time = time.replace('12', '0');
        }
        if(time.indexOf('pm')  != -1 && hours < 12) {
            time = time.replace(hours, (hours + 12));
        }
        return time.replace(/(am|pm)/, '');
    }


    $scope.contver_time=function (string){
        return convertTo24Hour(string)
    }
});
