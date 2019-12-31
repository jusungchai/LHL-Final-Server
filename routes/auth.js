const express = require('express');
const router = express.Router();
const { pool } = require('../config');
const bcrypt = require('bcrypt');

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
    if (results.rows.length > 0) {
      bcrypt.compare(req.body.password, results.rows[0].password)
      .then((result) => {
        if (result) {
          req.session.user_id = results.rows[0].id;
          res.json({
            result,
            message: "logged in"
          });
        } else {
          res.json({
            result,
            message: "wrong pw"
          });
        }        
      })
    } else {
      res.json({
        message: "user not found"
      });
    }
    
    //response.status(200).json(results.rows)
  })
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    const queryString = `
      INSERT INTO users(name, password, email, phone, customer_id)
      VALUES ('${req.body.name}', '${hash}', '${req.body.email}', '${req.body.phone}', ${req.body.customer_id})
    `;
    pool.query(queryString, (error, results) => {
      if (error) {
        throw error
      }
      res.json({
        message: "user created"
      });
      //response.status(200).json(results.rows)
    });
  });
});

module.exports = router;