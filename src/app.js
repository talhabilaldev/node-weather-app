const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/weatherstack');
const app = express()

// define paths for express
const publicDirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// setup handlebars and views
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory path 
app.use(express.static(publicDirPath))

app.get('',(req, res) => {
    res.render('index',{
        title:"Weather App",
        name: "Talha Bilal"
    })
})
app.get('/about',(req, res) => {
    res.render('about',{
        title:"About",
        name: "Talha Bilal"
    })
})
app.get('/help',(req, res) => {
    res.render('help',{
        title:"Help",
        name: "Talha Bilal"
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error:"Address should not be empty"
        })
    }

    geocode(req.query.address, (error, geocodeData = {}) => {
        if(error){
            return res.send({
                error : error
            })
        }
        forecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error : error
                })
            }
            res.send({
                forecast: forecastData,
                location: geocodeData.location
            })
            // console.log(geocodeData.location)
            // console.log(forecastData)
        })
    })

    // res.send({
    //     forecast:"Sunny",
    //     location: "Talha Bilal",
    //     address: req.query.address
    // })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title:"Error 404",
        name:"Talha Bilal",
        errorMsg:"Help article not found"
    })
})
app.get('*',(req, res) => {
    res.render('404',{
        title:"Error 404",
        name:"Talha Bilal",
        errorMsg:"Page not found"
    })
})


app.listen(3000, () => {
    console.log('Server is up on 3000')
})


// app.get('',(req, res) => {
//     res.send('Hello express')
// })
// app.get('/help',(req, res) => {
//     res.send('Help page')
// })
// app.get('/about',(req, res) => {
//     res.send('about page')
// })


// app.get('/help/*',(req, res) => {
//     res.send('Help article not found')
// })
// app.get('/*',(req, res) => {
//     res.send('Page not found')
// })