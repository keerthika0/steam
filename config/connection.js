const mongoose = require('mongoose');
const options = { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,useFindAndModify:true };

// Mongodb connection
mongoose.connect((process.env.db_url,"mongodb://localhost:27017/goldenrose"), options);

// Mongodb connection success
mongoose.connection.on('connected', function() {
  console.log('Mongoose connection is open ');
});

// Mongodb connection error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection has occured ' + err + ' error');
});

// Mongodb connection disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose connection is disconnected');
});
