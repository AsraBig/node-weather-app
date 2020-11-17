const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

//path dirname for start express and find location to templates
const app = express();
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');
const secondaryDic = path.join(__dirname, '../templates/views');
const thirdDic = path.join(__dirname, '../templates/partials');

//set app to use from template and hbs files
app.set('view engine', 'hbs');
app.set('views', secondaryDic);
hbs.registerPartials(thirdDic);

//use static express to create app
app.use(express.static(publicDirectory));

//take everythings to create app and main page to my weather application
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'MOHIT'
    })
});

//handle help page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
});

//handle help pages error 
app.get('/help/*', (req, res) => {
    res.send('<h1>this is not help page</h1>');
});

//handle about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        nickName: 'Mohit'
    })
});

//handle about pages error 
app.get('/about/*', (req, res) => {
    res.send('<h1>this is not about me</h1>');
});

//test product to understand from query strings
app.get('/product', (req, res) => {
    
    if(!req.query.search) {
        return res.send({
            error: 'You need a Search option in your request'
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
});

//finally create your weather app
app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You need a address to forecast the location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude , location} = {}) => {
        if (error) {
            return res.send({error: error})
        } forecast(latitude, longitude , req.query.address, (error, forecastData) =>{
            if (error) {
                return res.send({error: error})
            } 
            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
             })
        })
    })

   
});

//handle 404 not found error in your application
app.get('*', (req, res) => {
    res.render('404', {
        error: '404 Not Found'
    })
});



app.listen(port, () => {
    console.log(`This server is run on port ${port}`)
})