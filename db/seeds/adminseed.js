require('../../config/connection.js');
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

var genSalt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("123456", genSalt);

let admin = new Admin({
  user_name: "admin",
  email: "admin@goldenrose.com",
  password: hash,
});

admin.save().then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
