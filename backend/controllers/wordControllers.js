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