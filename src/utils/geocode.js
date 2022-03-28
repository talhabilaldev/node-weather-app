const request = require('request');

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGFsaGFiaWxhbGRldiIsImEiOiJja3lhaXdjMGwwNXdrMndtcGc2N3F6OXZiIn0.54ICuAIxlAbt05OCU-o00A&limit=1';
    request({ url: geocodeUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services.',undefined);
        }
        else if (response.body.features.length == 0) {
            callback('Unable to find location, try another search.',undefined);
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


//const request = require('request');
//const request = require('postman-request')
//geocoding
// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/%201h12.json?access_token=pk.eyJ1IjoidGFsaGFiaWxhbGRldiIsImEiOiJja3lhaXdjMGwwNXdrMndtcGc2N3F6OXZiIn0.54ICuAIxlAbt05OCU-o00A&limit=1'
// request({ url: geocodeUrl, json: true }, (error, response) => {
//     if (error) {
//         console.log('Unable to connect to location services');
//     }
//     else if(response.body.features.length == 0 ){
//         console.log('Unable to find location');
//     }
//     else{
//         const longitude = response.body.features[0].center[0];
//         const latitude = response.body.features[0].center[1];
//         console.log(response.body.features[0].place_name + " - " + response.body.features[0].center);
//     }

// })