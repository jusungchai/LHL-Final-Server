const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  console.log("In History")
  let queryString;
  if (req.session.jobberId) {
    console.log("History Jobber ID: ", req.session.jobberId);
    queryString = `
    SELECT jobs.*, users.name FROM jobs
    JOIN users ON jobs.user_id = users.id
    WHERE jobs.jobber_id=${req.session.jobberId}
    `
  } else if (req.session.userId) {
    console.log("History User ID: ", req.session.userId)
    queryString = `
    SELECT jobs.*, users.name FROM jobs
    JOIN users ON jobs.user_id = users.id
    WHERE jobs.user_id=${req.session.userId} AND user_confirm=true AND jobber_confirm=true
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

module.exports = router;