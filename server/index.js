const config = require('./config.js');

const express = require('express');
const bodyParser = require('body-parser');
const SocketIo = require('socket.io');
const SocketListener = require('./socketio.js');

// Initialize the app
const app = express();
const db = require('./database.js');
const api = require('./controllers/api.js');

// Middleware
app.use(bodyParser.urlencoded({ extended: false })); // Parse data sent by clients
app.use(bodyParser.json()); // Parse data sent by clients
app.use(require('./middleware/session.js')); // track sessions
app.use(require('./middleware/log.js')); // Log activity

// Routes
app.use(express.static(config.public)); // server static files
app.use('/api', api); // handle api calls
app.use(require('./middleware/error.js')); // handle errors

// Start the server
if (module.parent) {
  module.exports = app; // Export for testing
} else {
  // Start the server
  const server = app.listen(config.port, () => {
    console.log(`Environment: ${process.env.NODE_ENV}`);
    console.log(`Listening on port ${config.port}`);
  });
  const io = new SocketIo(server, { path: '/api/result' });
  SocketListener(io);
}
