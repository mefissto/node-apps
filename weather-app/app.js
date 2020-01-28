const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const address = process.argv[2];

if (!address) {
  console.log('Please, provide an address');
} else {
  geocode(address, (error, data) => {
    if (error) {
      return console.log('Error', error);
    }

    forecast(data.latitude, data.longitude, (forecastError, forecastData) => {
      if (forecastError) {
        console.log('Error', forecastError);
      }

      console.log('Data', forecastData);
    });
  });
}
