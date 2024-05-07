
const mongoose = require('mongoose');
const { NUM_OF_SPECIALTY, NUM_OF_TOPICS } = require('../constant');

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    mean: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    type: {
        type: String,
        enum: ['', 'n', 'adj', 'adv', 'v', 'con', 'pre', 'pro', 'det'],
        default: '', 
    },
    level: {
        type: String,
        required: true,
        enum: ['0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
        default: '0',
    },
    phonetic: {
        type: String,
        trim: true,
        maxLength: 50,
        default: '',
    },
    examples: [
        {
            type: String,
            maxlength: 200,
        }
    ],
    picture: {
        type: String,
        trim: true,
        default: null,
    },
    specialty: {
        type: String,
        enum: Array.from({ length: NUM_OF_SPECIALTY}, (_, key) => key.toString()),
        default: '0',
    }, 
    topics: [
        {
            type: String,
            enum: Array.from({ length: NUM_OF_TOPICS }, (_, key) => key.toString()),   
        }
    ],
    synonyms: [{type: String, maxlength: 50}],
    antonyms: [{ type: String, maxlength: 50}],
    note: {
        type: String,
        trim: true,
        maxLength: 150,
    }, 
    isChecked: {
        type: Boolean,
        required: false,
    },
});

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;
