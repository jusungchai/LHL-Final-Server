const express = require('express');
const app = express();
const http = require("http");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const jobs = require('./routes/jobs');
const auth = require('./routes/auth');
const checkout = require('./routes/checkout');
const skills = require('./routes/skills');
const server = http.createServer(app);

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('connected')
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.options('*:*', cors())

app.use(cookieSession({
  name: 'session',
  keys: ["yolo"],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))

app.use('/auth', auth);
app.use('/checkout', checkout);
app.use('/skills', skills);
app.use('/myjobs', jobs);


// Start server
const port = process.env.PORT || 8001;
app.listen(port);

console.log('App is listening on port ' + port);