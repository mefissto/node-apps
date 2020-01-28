const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const darkskyId = '9565a1facd05579bc3595fd759506c97';
    const url = `https://api.darksky.net/forecast/${darkskyId}/${latitude},${longitude}`;

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast