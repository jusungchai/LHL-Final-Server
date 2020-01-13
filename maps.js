require('dotenv').config()
const axios = require('axios');
const GMAPS_KEY = process.env.GMAPS_KEY;

function getDirections(origin, destination) {
  console.log("getDirections call: ", origin, destination)
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.latitude},${origin.longitude}&destinations=${destination},+Canada&key=${GMAPS_KEY}`)
    .then((response) => {
      return {
        distance: response.data.rows[0].elements[0].distance.text,
        time: response.data.rows[0].elements[0].duration.text
      };
    })
    .catch((error) => {
      console.log("Error in GMAPS call: ", error);
    });
}

module.exports = { getDirections };