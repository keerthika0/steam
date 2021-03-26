const mongoose = require('mongoose');

var returnSchema = mongoose.Schema({
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    type: {
        type: String,
    },
    reference: {
        type: String,
    },
    reason: {
        type: String,
    },
    image: {
        type: Array,
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

var returnForm = mongoose.model('return', returnSchema);

module.exports = returnForm;