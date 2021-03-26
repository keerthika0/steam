const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var customnotificationSchema = mongoose.Schema({

  title: {
    type: String,
  },
  message: {
    type: String,
  },
  to: {
    type: String,
    enum: ['ALL','CUSTOM-USER']
  },
  type: {
    type: String,
    enum: ['PUSH','MAIL'],
    default: 'PUSH',
  },
  user_list: [String],
  status: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

var customnotification = mongoose.model('customnotification', customnotificationSchema);

module.exports = customnotification;
