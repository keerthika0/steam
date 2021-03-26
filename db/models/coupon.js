const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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
        default: 100
    },
    description: {
        type: String
    },
    validitydays: {
        type: Number,
        required: true
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

var coupon = mongoose.model('coupon', couponSchema);

module.exports = coupon;