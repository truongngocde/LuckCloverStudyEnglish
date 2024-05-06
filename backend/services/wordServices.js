const Word = require('../models/wordModel');

exports.createNewWord = async (wordInfo) => {
    try {
        const newWord = await Word.create({...wordInfo});
        if (newWord) {
            return true;
        }
        return false;
    }catch (error) {
        throw error;
    }
}

exports.searchWord = async(word = '', limit = 20, select = '') => {
    try {
        const regex = new RegExp(`^${word}.*`, 'gi');
        const list = await Word.find({ word: regex })
            .limit(limit)
            .select(select);
        return list;
    } catch (error) {
        console.log(error)
    }
}

exports.getWordDetail = async (word = '') => {
    try {
        const res = await Word.findOne({ word });
        return res;
    } catch (error) {
        throw error;
    }
}

exports.getFavoriteList = async (rawFavorites = []) => {
    try {
        if (!Array.isArray(rawFavorites) || rawFavorites.length === 0){
            return [];
        }

        let list = [];
        for (let word of rawFavorites) {
            const regex = new RegExp(`^${word}.*`, 'gi');
            const wordDetails = await Word.findOne({ word: regex }).select('-_id type word mean phonetic picture',);
            if (wordDetails) {
                list.push(wordDetails);
            }
        }
        return list;
    } catch (error) {
        throw error;
    }
}