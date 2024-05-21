const mongoose = require('mongoose');


const sentenceSchema = new mongoose.Schema({
    sentence: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200,
    },
    mean: {
        type: String,
        required: true,
        trim: true, 
        maxLength: 300,
    },
    note: {
        type: String,
        trim: true,
        maxLength: 300,
    },
    topics: [String],
    isChecked: {
        type: Boolean,
        required: true,
        default: false,
    }
});

const Sentence = mongoose.model('sentence', sentenceSchema);
module.exports = Sentence;