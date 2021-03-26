const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

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
        default:''
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
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    quantity: {
        type: Number,
        default: 1
    },
    total_price: {
        type: Number,
        default: 0
    },
    available_price: {
        type: Number,
        default: 0
    },
    offer_percentage: {
        type: Number,
        default: 0
    },
    price_per_qty: {
        type: Number,
        default: 0
    },
    price_id: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

var orderSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    order_id: {
        type: Number,
        default:0
    },
    tx_id: {
        type: String,
    },
    email: {
        type: String,
    },
    product: {
        type: [productSchema],
    },
    payment_type: {
        type: String,
    },
    amount: {
        type: Number,
        default:0
    },
    delivery_fee: {
        type: Number,
        default:0
    },
    amount_paid: {
        type: Number,
        default:0
    },
    address: {
        type: addressSchema,
    },
    order_status: {
        type: String,
        enum: ['ORDERED','PACKED','SHIPPED','DELIVERED','RETURN','RETURNED','CANCELLED'],
        default: "ORDERED",
    },
    payment_status: {
        type: Number,
        default: 0,
    },
    paid_through: {
        type: String,
        default: "",
    },
    quantity: {
        type: Number,
        default: 0,
    },
    coupon_used: {
        type: String,
        default: null
    },
    coupon_offer: {
        type: Number,
        default: 0
    },
    ordered_date: { 
        type: Date 
    },
    packed_date: { 
        type: Date 
    },
    shipped_date: { 
        type: Date 
    },
    delivered_date: { 
        type: Date 
    },
    return_date: { 
        type: Date 
    },
    returned_date: { 
        type: Date 
    },
    cancelled_date: { 
        type: Date 
    },
    delivery_type: { 
        type: String,
        enum: ['NORMAL','EXPRESS'],
        default: "NORMAL",
    },
    order_type: { 
        type: String,
        enum: ['USER','GUEST'],
        default: "USER",
    },
    status: {
        type: Number,
        default: 0,
    },
    deleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

var order = mongoose.model('order', orderSchema);

module.exports = order;