require('dotenv').config()
const axios = require('axios');
const GMAPS_KEY = process.env.GMAPS_KEY;

function getDirections(originPostalCode, destinationPostalCode) {
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originPostalCode},+Canada&destinations=${destinationPostalCode},+Canada&key=${GMAPS_KEY}`)
    .then((response) => {
      //console.log(response.data.rows[0].elements[0].distance.text);
      return {
        distance: response.data.rows[0].elements[0].distance.text,
        time: response.data.rows[0].elements[0].duration.text
      };
    })
    .catch((error) => {
      console.log(error);
    });
}

// function getTime(originPostalCode, destinationPostalCode) {
//   return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${originPostalCode},+Canada&destinations=${destinationPostalCode},+Canada&key=${GMAPS_KEY}`)
//     .then((response) => {
//       //console.log(response.data.rows[0].elements[0].duration.text);
//       return response.data.rows[0].elements[0].duration.text;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

//getDistance("L4S1H3", "M6J3W7").then(distance => console.log(distance));
//getTime("L4S1H3", "M6J3W7").then(time => console.log(time));

module.exports = { getDirections };