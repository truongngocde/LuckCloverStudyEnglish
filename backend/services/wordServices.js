const Word = require('../models/wordModel');

exports.getWordDetail = async (word = '') => {
    try {
        const res = await Word.findOne({ word });
        return res;
    } catch (error) {
        throw error;
    }
}