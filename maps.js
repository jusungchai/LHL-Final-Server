require('dotenv').config()
const axios = require('axios');
const GMAPS_KEY = process.env.GMAPS_KEY;

function getDirections(originPostalCode, destinationPostalCode) {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originPostalCode},+Canada&destinations=${destinationPostalCode},+Canada&key=${GMAPS_KEY}`)
    .then((response) => {
      return {
        distance: response.data.rows[0].elements[0].distance.text,
        time: response.data.rows[0].elements[0].duration.text
      };
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { getDirections };