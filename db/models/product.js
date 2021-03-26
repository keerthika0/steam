const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var reviewSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    rating: {
        type: String
    },
    review: {
        type: String
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


var productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    product_id: {
        type: String,
        //required: true,
    },
    type: {
        type: [String],
    },
    sub_type: {
      type: String,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: String
    },
    file: {
        type: Array
    },
    size: {
        type: [String],
    },
    weight: {
        type: [String],
    },
    color: {
        type: [String],
    },
    price: {
        type: [Number],
        default: 0
    },
    available_price: {
        type: [Number],
        default: 0
    },
    offer_percentage: {
        type: Number,
        default: 0
    },
    stock_available: {
        type: Boolean,
        default: true
    },
    stock_count: {
        type: [Number],
        default: 0
    },
    stock_notification: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        enum: ["MALE", "FEMALE", 'BOTH'],
        default: "BOTH",
    },
    price_by: {
        type: String,
        enum: ["FIXED", "CUSTOM"],
        default: "FIXED",
    },
    offers: {
        type: [String],
    },
    ratings: {
        type: Number,
        default: 0
    },
    review: {
        type: [reviewSchema],
    },
    services: {
        type: [String],
    },
    protection: {
        type: [String],
    },
    warranty: {
        type: [String],
    },
    storage: {
        type: [String],
    },
    ram: {
        type: [String],
    },
    capacity: {
        type: [String],
    },
    wishlist: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    ],
    specifications: {
        type: String
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

var product = mongoose.model('product', productSchema);

module.exports = product;