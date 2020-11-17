const request = require('request');

const forecast = (latitude, longitude, name, callback) => {
    //   const url_forecast = "api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=6a9173a7d380590b6350b1d3d2317912";

      const url_forecast = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(name) + "&appid=6a9173a7d380590b6350b1d3d2317912&units=metric";

    request({ url: url_forecast, json: true}, (error, { body }) => {
        if(error) {
            callback('Your Connection is corrupted', undefined);
        } else if (body.name.length == 0) {
            callback('Internal error', undefined)
        } else {
            callback(undefined, `Temperature : ${body.main.temp} celsius --- 
            Weather : ${body.weather[0].description}`
            )
        }
    })
}

module.exports = forecast;