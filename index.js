const express = require('express');
const app = express();
const http = require("http");
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieSession = require('cookie-session');
const jobs = require('./routes/jobs');
const allJobs = require('./routes/allJobs');
const auth = require('./routes/auth');
const checkout = require('./routes/checkout');
const skills = require('./routes/skills');
const history = require('./routes/history');
const maps = require('./routes/maps');
//const server = http.createServer(app);
const server = require("http").Server(app);

const WebSocket = require('ws');

// app.use(cors());
const wss = new WebSocket.Server( !process.env.PRODUCTION ? {port: 8080} : { server } );

wss.on('connection', socket => {
  console.log('connected')
  socket.on('message', data => {
    console.log('message', data)
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
app.use('/jobs', allJobs);
app.use('/history', history);
app.use('/travel', maps)



// Start server
const port = process.env.PORT || 8001;
server.listen(port);

console.log('App is listening on port ' + port);