<<<<<<< HEAD
const {isExistWord, uploadImage} = require('../services/utilsServices');

const { getWordDetail, createNewWord } = require('../services/wordServices');

const Word = require('../models/wordModel');

exports.addWord = async (req, res, next) => {
    try {
        const {picture, word, type, ...rest} = req.body;

        // check word exist
        const isExist = await isExistWord(word, type);
        if(isExist) {
            return res.status(409).json({ message: `Từ "${word} (${type})" đã tồn tại trong từ điển` })
        }

        // upload desc picture 
        let pictureUrl = null;
        if(picture) {
            pictureUrl = await uploadImage(picture, 'luckclover/words')
        }

        // create the new word
        const isCreateSuccess = await createNewWord({
            word, type, picture: pictureUrl, isChecked: false, ...rest,
        });
        if(isCreateSuccess) {
            return res.status(200).json({
                message: 'Tạo từ mới thành công'
            });
        }
        return res.status(503).json({
            message: 'Lỗi dịch vụ, thử lại sau'
        });
    } catch (error) {
        return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
    }
}

exports.getCheckWordExist = async (req, res) => {
    try {
        const { word, type } = req.query;
        const isExist = await isExistWord(word, type);
        return res.status(200).json({ isExist });
    } catch (error) {
        console.error('GET CHECK WORD EXIST ERROR: ', error);
        return res.status(200).json({ isExist: false });
    }
}

exports.getSearchWord = async (req, res) => {
    try {
        const { word, isCompact = false } = req.query;
        const list = await searchWord(
        word,
        20,
        isCompact == 'true'
            ? '-_id word'
            : '-_id type word mean phonetic picture',
        );
        return res.status(200).json({ packList: list });
    } catch (error) {
        console.error('GET SEARCH WORD ERROR: ', error);
        return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
    }
};

exports.getWordDetails = async (req, res, next) => {
    try {
        const {word} = req.query;
        const wordDetail = await getWordDetail(word);
        if (wordDetail) {
            return res.status(200).json(wordDetail)
        }
    }catch (error) {
        console.log(error);
        return res.status(503).json({
            message: 'Lỗi dịch vụ, thử lại sau.'
        });
    }
}


exports.getAllWords = async (req, res, next) => {
    try {
        const words = await Word.find();
        res.status(200).json({
            status: 'success',
            result: words.length,
            data: {
                words
            }
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            status: 'fail',
            message: error,
        }) 
    }
}

=======
const { getWordDetail } = require('../services/wordServices');

exports.getWordDetails = async (req, res, next) => {
    try {
        const {word} = req.query;
        const wordDetail = await getWordDetail(word);
        if (wordDetail) {
            return res.status(200).json(wordDetail)
        }
    }catch (error) {
        console.log(error);
        return res.status(503).json({
            message: 'Lỗi dịch vụ, thử lại sau.'
        });
    }
}
>>>>>>> 6b2f26e08d69e2db20d97b3fce3409e5d02635d4
