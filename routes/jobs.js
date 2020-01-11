const express = require('express');
const router = express.Router();
const { pool } = require('../config');
const axios = require('axios');

router.get('/', (req, res) => {
  // console.log(req.body)
  const queryString = `SELECT * FROM jobs WHERE user_id=$1 AND is_deleted=false`;
  console.log(req.session.userId)
  const id = [req.session.userId];
  console.log(id)
  pool.query(queryString, id, (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length > 0) {
      res.json(results.rows)
    } else {
      res.json([])
      // console.log(results)
    }
  })
})

// router.get('/all', (req, res) => {
//   console.log('lol', req.body)
//   const queryString = `SELECT * FROM jobs WHERE is_deleted=false;`;
//   pool.query(queryString, (error, results) => {
//     if (error) {
//       throw error
//     }
//     if (results.rows.length > 0) {
//       res.json(results.rows)
//     } else {
//       console.log(results)
//     }
//   })
// })

router.post('/', (req, res) => {
  let queryString = `
  INSERT INTO jobs(
    service_type, 
    user_id, 
    description, 
    hourly_rate,
    time_estimate,
    street_address,
    post_code,
    lat,
    long
    )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`
  let values = [
    req.body.serviceType,
    req.session.userId,
    req.body.description,
    req.body.payRate,
    req.body.requiredTime,
    req.body.address,
    req.body.postalCode.split(" ").join(""),
    req.body.coords.lat,
    req.body.coords.lng
  ]
  pool.query(queryString, values, (error, results) => {
    if (error) {
      res.json({
        result: false
      });
      throw error
    }
    res.json({
      result: true,
      message: "job posted"
    });
  })
})

router.put('/', (req, res) => {
  console.log(req.body[0])
  const queryString = `
  UPDATE jobs SET is_deleted=true
  WHERE id=$1
  `
  const id = [req.body[0]]
  pool.query(queryString, id, (error, results) => {
    if (error) {
      res.json({
        result: false
      });
      res.json({
        result: true,
        message: "job deleted"
      })
    }
  })
  res.send('okay')
})

module.exports = router;