const mongoose = require("mongoose");

var addressSchema = mongoose.Schema({
  user_name: {
    type: String
  },
  mobile: {
    type: String
  },
  pincode: {
    type: String
  },
  locality: {
    type: String
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  language: {
    type: String,
    default: 'es'
  },
  landmark: {
    type: String,
  },
  alt_mobile: {
    type: String,
  },
  address_type: {
    type: String,
    default: 'HOME'
  },
  status: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


var cartSchema = mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 1
  },
  price_id: {
    type: Number,
    default: 0
  },
  status: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });


var guestSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      default: "GUEST",
    },
    session_token: {
      type: String,
    },
    email: {
      type: String,
    },
    ip_address: {
      type: String,
    },
    session_expiry: { 
        type: Date 
    },
    address: {
      type: [addressSchema],
    },
    cart: [cartSchema],
    status: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

var guest = mongoose.model("guest", guestSchema);

module.exports = guest;
