const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var notificationSchema = mongoose.Schema({

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  custom_notification_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customnotification',
  },
  coupon_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coupon',
  },

  message: {
    type: String,
  },
  email: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

var notification = mongoose.model('notification', notificationSchema);

module.exports = notification;
