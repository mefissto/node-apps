const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs'); // set default templates as hendlebar insted of html
app.set('views', viewPath); // changing views directory path
hbs.registerPartials(partialsPath); // defining hbs partials path

app.use(express.static(publicDirectoryPath)); // set default public folder path

app.get('', (req, res) => {
  // render page from hendlebar and pass some props to use them in template
  res.render('index', {
    title: 'Weather App',
    name: 'Serhii Maryniuk'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Serhii Maryniuk'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Serhii Maryniuk'
  });
});

app.get('/weather', (req, res) => {
  res.send('weater');
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Serhii Maryniuk'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'My 404 page',
    name: 'Serhii Maryniuk'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
