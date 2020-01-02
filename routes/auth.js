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
  const table = req.body.jobber ? "jobbers" : "users";
  console.log(table);
  const queryString = `SELECT * FROM ${table} WHERE email = $1`;
  const values = [req.body.email];
  pool.query(queryString, values, (error, results) => {
    if (error) {
      throw error
    }
    if (results.rows.length > 0) {
      bcrypt.compare(req.body.password, results.rows[0].password)
      .then((result) => {
        if (result) {
          req.session.userId = results.rows[0].id;
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
        result: false,
        message: "user not found"
      });
    }
    
    //response.status(200).json(results.rows)
  })
});

router.post('/signup', (req, res) => {
  console.log(req.body);
  const table = req.body.jobber ? "jobbers" : "users";
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    const queryString = `
      INSERT INTO ${table}(name, password, email, phone)
      VALUES ($1, $2, $3, $4)
    `;
    const values = [req.body.name, hash, req.body.email, req.body.phone];
    pool.query(queryString, values, (error, results) => {
      if (error) {
        res.json({
          result: false
        });
        throw error
      }
      res.json({
        result: true,
        message: "user created"
      });
      //response.status(200).json(results.rows)
    });
  });

  router.post('/logout', (req, res) => {
    req.session.user_id = undefined;
  });
});

module.exports = router;