const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var subtypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
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

var subtype = mongoose.model('subtype', subtypeSchema);

module.exports = subtype;