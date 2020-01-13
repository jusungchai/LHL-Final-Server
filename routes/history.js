const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  if (req.session.jobberId) {
    const queryString = `
    SELECT jobs.*, users.name FROM jobs
    JOIN users ON jobs.user_id = users.id
    WHERE jobs.jobber_id=${req.query.jobber_id} AND user_confirm=true AND jobber_confirm=true
    `
  } else if (req.session.userId) {
    const queryString = `
    SELECT jobs.*, users.name FROM jobs
    JOIN users ON jobs.user_id = users.id
    WHERE jobs.user_id=${req.query.user_id} AND user_confirm=true AND jobber_confirm=true
    `
  };
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
});