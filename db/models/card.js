const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var cardSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    card_holder: {
        type: String
    },
    number: {
        type: Number
    },
    name: {
        type: String
    },
    month: {
        type: Number
    },
    year: {
        type: Number
    },
    cvc: {
        type: String
    },
    card_id: {
        type: String,
        required: true
    },
    customer_id: {
        type: String,
        required: true
    },
    data: {
        type: String,
    },
    brand: {
        type: String,
    },
    fingerprint: {
        type: String,
    },
    country: {
        type: String,
    },
    default: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

var card = mongoose.model('card', cardSchema);

module.exports = card;