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

router.put('/', (req, res) => {
  const jobId = req.body.params.id;
  // console.log("test", req);
  let queryString;
  console.log(req.body.params)

  if (req.body.params.dropJob) {
    queryString = `
    UPDATE jobs SET jobber_id=NULL
    WHERE id=${jobId}
    `
  } else if (req.body.params.markComplete) {
    console.log("here")
    queryString = `
    UPDATE jobs SET jobber_confirm=true
    WHERE id=${jobId}
    `
  } else if (req.body.params.confirmComplete) {
    console.log("here")
    queryString = `
    UPDATE jobs SET user_confirm=true
    WHERE id=${jobId}
    `
  } else {
    queryString = `
    UPDATE jobs SET jobber_id=${req.session.userId}
    WHERE id=${jobId}
    `
  }
  console.log("QS", queryString)
  // const id = [req.body[0]]
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