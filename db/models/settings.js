const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var data = mongoose.Schema({
  key: {
    type: String,
  },
  value: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });
var settingsSchema = mongoose.Schema({
  support_email: {
    type: String,
    default: 'support@goldenrose.com',
  },
  type: {
    type: String,
    default: 'SITE',
  },
  fav_icon: {
    type: String,
    default: '',
  },
  site_logo: {
    type: String,
    default: '',
  },
  header_image: {
    type: String,
    default: '',
  },
  site_name: {
    type: String,
    default: '',
  },
  terms: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  content: {
    type:[data],
  },
  privacy: {
    type: String,
    default: '',
  },
  mobile: {
    type: String,
    default: '',
  },
  whats_new: {
    type: String,
    default: '',
  },
  android_link: {
    type: String,
    default: '',
  },
  ios_link: {
    type: String,
    default: '',
  },
  android_version: {
    type: String,
    default: '',
  },
  ios_version: {
    type: String,
    default: '',
  },
  user_site_maintainence: {
    type: Boolean,
    default: false,
  },
  payment_method_paypal: {
    type: Boolean,
    default: false,
  },
  payment_method_stripe: {
    type: Boolean,
    default: false,
  },
  common_discount: {
    type: Number,
    default: 0
  },
  copy_rights: {
    type: String,
    default: '',
  },
  twitter: {
    type: String,
    default: '',
  },
  telegram: {
    type: String,
    default: '',
  },
  youtube: {
    type: String,
    default: '',
  },
  facebook: {
    type: String,
    default: '',
  },
  linkedin: {
    type: String,
    default: '',
  },
  instagramfeed: {
    type: Array
  },
  blog: {
    type: String,
    default: '',
  },
  payment_method_paypal: {
    type: Boolean,
    default: false,
  },
  payment_method_stripe: {
    type: Boolean,
    default: false,
  },
  instagram: {
    type: String,
    default: '',
  },
  site_tracker_code: {
    type: String,
    default: '',
  },
  currency: {
    type: String,
    default: '',
  },
  language: {
    type: String,
    default: '',
  },
  delivery_fee: {
    type: Number,
    default: 0
  },
  order_price: {
    type: Number,
    default: 0
  },
  delivery_fee_above_min: {
    type: Number,
    default: 0
  },
  delivery_fee_below_min: {
    type: Number,
    default: 0
  },
  delivery_fee_above_max: {
    type: Number,
    default: 0
  },
  delivery_fee_below_max: {
    type: Number,
    default: 0
  },
  guest_limit: {
    type: Number,
    default: 0
  },
}, { timestamps: true });

var settings = mongoose.model('settings', settingsSchema);

module.exports = settings;
