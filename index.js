const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { pool } = require('./config');

const auth = require('./routes/auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/auth', auth);


const stripe = require("stripe")(process.env.STRIPE_KEY);
const uuid = require("uuid/v4");

const getUsers = (request, response) => {
  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addUser = (request, response) => {
  const { name, password, email, phone, customer_id } = request.body

  pool.query('INSERT INTO users(name, password, email, phone, customer_id) VALUES ($1, $2, $3, $4, $5)', [name, password, email, phone, customer_id], error => {
    if (error) {
      throw error
    }
    response.status(201).json({ status: 'success', message: 'User added.' })
  })
}

app.get("/", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { values, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: parseFloat(values.requiredTime * values.payRate * 100),
        currency: "cad",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${values.serviceType}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});

app
  .route('/users')
  // GET endpoint
  .get(getUsers)
  // POST endpoint
  .post(addUser)

// Start server
const port = process.env.PORT || 8001;
app.listen(port);

console.log('App is listening on port ' + port);