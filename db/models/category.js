const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: [String],
        required: true,
    },
    sub_type: {
      type: [String],
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

var category = mongoose.model('category', categorySchema);

module.exports = category;