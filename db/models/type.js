const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var typeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        //unique: true
    },
    file: {
        type: Array
    },
    header_image: {
        type: Array
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

var type = mongoose.model('type', typeSchema);

module.exports = type;