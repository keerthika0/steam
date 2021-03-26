const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var localeSchema = mongoose.Schema({
    language: {
        type: String,
        required: true,
    },
    symbol: {
        type: String,
        required: true,
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

var locale = mongoose.model('locale', localeSchema);

module.exports = locale;