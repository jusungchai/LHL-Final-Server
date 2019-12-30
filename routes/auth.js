const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/', (req, res) => {
  res.json({
    message: 'yolo'
  });
});

router.post('/login', (req, res) => {
  console.log(req.body);
  pool.query(`SELECT * FROM users WHERE email='${req.body.email}'`, (error, results) => {
    if (error) {
      throw error
    }
    res.json({
      message: results.rows.length > 0 ? results.rows : "user not found"
    });
    //response.status(200).json(results.rows)
  })
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  const queryString = `
    INSERT INTO users(name, password, email, phone, customer_id)
    VALUES ('${req.body.name}', '${req.body.password}', '${req.body.email}', '${req.body.phone}', ${req.body.customer_id})
  `;
  pool.query(queryString, (error, results) => {
    if (error) {
      throw error
    }
    res.json({
      message: "user created"
    });
    //response.status(200).json(results.rows)
  })
});

module.exports = router;