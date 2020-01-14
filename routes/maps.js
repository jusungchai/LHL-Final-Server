require('dotenv').config()
const axios = require('axios');
const GMAPS_KEY = process.env.GMAPS_KEY;
const express = require('express');
const router = express.Router();
const { pool } = require('../config');

function getDirections(origin, destination) {
  console.log('from getdir', origin.origin.latitude, destination)
  return axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.origin.longitude},${origin.origin.latitude}&destinations=${destination},+Canada&key=${GMAPS_KEY}`)
    .then((response) => {
      console.log(response.data.rows[0].elements[0].distance.text)
      return {
        distance: response.data.rows[0].elements[0].distance.text,
        time: response.data.rows[0].elements[0].duration.text
      };
    })
    .catch((error) => {
      console.log("Error in GMAPS call: ", error);
    });
}

const setDistanceTime = async function (jobs, jobberCoords) {
  for (let job of jobs) {
    await getDirections(jobberCoords, job.post_code)
      .then((directions) => {
        // pool.query(`UPDATE jobs SET distance=$1, time=$2 WHERE id=$3;`, 
        // [directions.distance, directions.time, job.id])
        job.distance = directions.distance;
        job.time = directions.time;
      })
  }
  return jobs
}

router.post('/', (req, res) => {
  console.log(req.body)
  const queryString = `
  SELECT * FROM jobs 
  WHERE is_deleted=false 
  AND jobber_id IS NULL`
  pool.query(queryString, (error, results) => {
    if (error) throw error
    console.log('query results rows', results.rows)
    if (results.rows.length > 0) {
      setDistanceTime(results.rows, req.body)
    }

  })
  getDirections(req.body.origin, req.body.destination).then((response) => res.json(response))
  
})




module.exports = router;