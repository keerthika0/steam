const mongoose = require("mongoose");


var couponSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  couponcode: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  },
  validitydays: {
    type: Date,
    required: true
  },
  couponused: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

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
  default: {
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


var userSchema = mongoose.Schema(
  {
    user_name: {
      type: String,
      default: "",
    },
    nick_name: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthday: {
      type: Date,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      unique: true,
    },
    country_code: {
      type: String,
    },
    password: {
      type: String,
      select: false,
    },
    address: {
      type: [addressSchema],
    },
    coupon: {
      type: [couponSchema],
    },
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    cart: [cartSchema],
    card_customer_id: {
      type: String,
      unique: true
    },
    tfa_temp: {
      type: String,
    },
    tfa: {
      type: String,
      select: false,
    },
    tfa_active: {
      type: Boolean,
      default: false,
    },
    referral_token: {
      type: String,
    },
    referred_by: {
      type: String,
      ref: "user",
      default: "",
    },
    referral_amount: {
      type: Number,
      default: 0,
    },
    balance: {
      type: Number,
      default: 0,
    },
    pin: {
      type: String,
      default: "",
    },
    pin_status: {
      type: Boolean,
      default: false,
    },
    finger_status: {
      type: Boolean,
      default: false,
    },
    face_id: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: "",
    },
    user_type: {
      type: String,
      enum: ["NORMAL", "VIP"],
      default: "NORMAL",
    },
    login_type: {
      type: String,
      enum: ["NORMAL", "GOOGLE"],
      default: "NORMAL",
    },
    device_type: {
      type: String,
      enum: ["web", "android", "ios"],
      default: "web",
    },
    device_id: {
      type: String,
      default: "",
    },
    device_token: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "es",
    },
    currency: {
      type: String,
      default: "USD",
    },
    currency_symbol: {
      type: String,
      default: "$",
    },
    website_url: {
      type: String,
      default: "",
    },
    cover_image: {
      type: String,
      default: "",
    },
    profile_image: {
      type: String,
      default: "",
    },
    active: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verified_code: {
      type: String,
      default: '',
    },
    verified_code_expiry: {
      type: Date,
    },
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

var user = mongoose.model("user", userSchema);

module.exports = user;
