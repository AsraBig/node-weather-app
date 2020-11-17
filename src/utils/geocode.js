const request = require('request');

const geocode = (address, callback) => {
    const url_map = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYnJhcGJyYXAiLCJhIjoiY2toMmhiNW51MDI0MzJybmwzaTRnczJwMCJ9.u_u91W4MSIgWBzBCLitx9A`;

    request({ url: url_map , json: true}, (error, { body }) => {
        if(error) {
            callback('Your Connection is corrupted', undefined);
        } else if (body.features.length == 0) {
            callback('404 Not Found', undefined);
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                lotitude : body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;