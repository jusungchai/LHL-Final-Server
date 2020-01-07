const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  const queryString = `SELECT * FROM skills`;
  pool.query(queryString, (error, results) => {
    if (error) {
      throw error
    } else {
      res.json(
        results.rows
      );
    }    
  });
});

module.exports = router;