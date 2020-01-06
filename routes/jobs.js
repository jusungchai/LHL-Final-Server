const express = require('express');
const router = express.Router();
const { pool } = require('../config');

router.get('/myjobs', (req, res) => {
  console.log(req.body)
})

module.exports = router;