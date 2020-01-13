require('dotenv').config()
const axios = require('axios');
const GMAPS_KEY = process.env.GMAPS_KEY;

async function getDirections(origin, destination) {
  console.log(origin, destination)
  const res = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.latitude},${origin.longitude}&destinations=${destination},+Canada&key=${GMAPS_KEY}`)
  const distance = await res.data.rows[0].elements[0].distance.text;
  const time = await res.data.rows[0].elements[0].duration.text;
  const result = await { 
    distance,
    time
  }
  
  return res.data.rows[0].elements[0].distance === undefined ?
  result :
  { distance: 0, time: 0}

}

module.exports = { getDirections };