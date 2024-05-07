const { addTopicsQuery } = require('../helpers/workpackHelpers');
const Sentence = require('../models/sentenceModel');

exports.createSentence = async (sentence, mean, note, topics) => {
    try {
        const result = Sentence.create({ sentence, mean, note, topics });
        if ( result ) return true;
        return false;
    } catch (error) {
        throw error;
    }
};

exports.getTotalSentences = async (topics = []) => {
    try {
        let query = {};

        addTopicsQuery(topics, query);

        const total = await Sentence.countDocuments(query);
        return total;
    } catch (error) {
        throw error;
    }
};

exports.getSentenceList = async (page = 1, perPage = 20, topics = []) => {
    try {
        const pageInt = parseInt(page),
            perPageInt = parseInt(perPage);
    } catch (error) {
        
    }
}