const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const auth = require('./routes/auth');
const checkout = require('./routes/checkout');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', auth);
app.use('/checkout', checkout);

// Start server
const port = process.env.PORT || 8001;
app.listen(port);

console.log('App is listening on port ' + port);