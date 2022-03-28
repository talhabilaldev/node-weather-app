const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const weatherStackUrl = 'http://api.weatherstack.com/current?access_key=e08093476d27a6acb71152097bb98b3c&query=' + latitude+','+longitude;
    request({ url: weatherStackUrl, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather services.',undefined);
        }
        else if (response.body.error) {
            callback('Unable to find location, try another search.',undefined);
        }
        else {
            callback(undefined, response.body.current.weather_descriptions+". It is currently "+response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike+ " degrees out. Humidity is "+response.body.current.humidity+" %.")
        }
    })
}

module.exports = forecast


//const request = require('request');
//const request = require('postman-request')
//weather stack
// const url='http://api.weatherstack.com/current?access_key=e08093476d27a6acb71152097bb98b3c&query=multan'
// request({url:url, json:true} ,(error,response)=>{
//     // console.log(response.body.current);
//     // const data = JSON.parse(response.body); // replacement of json:true
//     if(error){
//         console.log('Unable to connect to weather services');
//     }
//     else if (response.body.error){
//         console.log('Unable to find location');
//     }
//     else{
//         console.log("It is currently "+response.body.current.temperature+" degrees out. It feels like "+response.body.current.feelslike+ " degrees out.");
//     }
// })
