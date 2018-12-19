const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let itemSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name is a required field']
    },
    amount: {
        type: Number,
        default: 0
    },
    lastUpdateAmount: {
        type: Date,
        default: Date.now(),
        required: false
    },
    price: {
        type: Number,
        default: 0,
        required: false
    },
    lastUpdatePrice: {
        type: Date,
        default: Date.now(),
        required: false
    }
});

module.exports = mongoose.model('item', itemSchema);