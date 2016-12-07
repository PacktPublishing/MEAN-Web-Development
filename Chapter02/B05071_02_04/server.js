// Load the 'connect' module
const connect = require('connect');

// Create a new 'connect' application instance
const app = connect();

// Use the 'connect' application instance to listen to the '3000' port
app.listen(3000);

// Log the server status to the console
console.log('Server running at http://localhost:3000/');