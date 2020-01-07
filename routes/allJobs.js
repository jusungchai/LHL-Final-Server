const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  console.log(req.body)
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
})

module.exports = router;