require('dotenv').config()
const axios = require('axios');
const GMAPS_KEY = process.env.GMAPS_KEY;

function getDistance(originPostalCode, destinationPostalCode) {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originPostalCode},+Canada&destinations=${destinationPostalCode},+Canada&key=${GMAPS_KEY}`)
    .then((response) => {
      return response.data.rows[0].elements[0].distance.text;
    })
    .catch((error) => {
      console.log("getDistance Error: ", error);
    });
}

function getTime(originPostalCode, destinationPostalCode) {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originPostalCode},+Canada&destinations=${destinationPostalCode},+Canada&key=${GMAPS_KEY}`)
    .then((response) => {
      return response.data.rows[0].elements[0].duration.text;
    })
    .catch((error) => {
      console.log("getTime Error: ", error);
    });
}

module.exports = { getDistance, getTime };