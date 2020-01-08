const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  if (req.query.id) {
    const queryString = `SELECT * FROM jobs WHERE id=${req.query.id}`;
    pool.query(queryString, (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length > 0) {
        res.json(results.rows)
      } else {
        console.log(results)
      }
    })
  } else {
    const queryString = `SELECT * FROM jobs WHERE jobber_id IS NULL AND is_deleted=false`;
    pool.query(queryString, (error, results) => {
      if (error) {
        throw error
      }
      if (results.rows.length > 0) {
        res.json(results.rows)
      } else {
        console.log(results)
      }
    })
  }
})

router.put('/:id', (req, res) => {
  const jobId = req.params.id
  const queryString = `
  UPDATE jobs SET jobber_id=${req.session.userId}
  WHERE id=${jobId}
  `
  const id = [req.body[0]]
  pool.query(queryString, (error, results) => {
    // if (error) {
    //   res.json({
    //     result: false
    //   });
    //   res.json({
    //     result: true,
    //     message: "job accepted"
    //   })
    // }
  })
  res.send('okay')
})

module.exports = router;