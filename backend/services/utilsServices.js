const { cloudinary } = require('../configs/cloudinaryConfig');
const { MAX } = require('../constant');
const Sentence = require('../models/sentenceModel');


const Word = require('../models/wordModel');

exports.uploadImage = async (imgSrc, folderName = '', config = {}) => {
    try {
        const result = await cloudinary.uploader.upload(imgSrc, {
            folder: folderName,
            ...config,
        });
        const {secure_url = null} = result;
        return secure_url;
    }catch (error) {
        throw error;
    }
}

exports.isExistWord = async (word = '', type = '') => {
    try {
        if (word === '' || type === ''){
            return false;
        }
        return await Word.exists({word, type});
    } catch (error) {
        throw error;
    }
}

exports.isExistSentence = async (sentence = '') => {
    if (sentence === '') return false;
    const newRegex = new RegExp(sentence, 'i');
    return await Sentence.exists({ sentence: newRegex });
};

