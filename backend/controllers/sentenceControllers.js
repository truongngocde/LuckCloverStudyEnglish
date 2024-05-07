exports.getAllSentence = async(req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Sentence'
    })
}