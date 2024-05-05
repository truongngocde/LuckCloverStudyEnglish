exports.getWordDetails = async (req, res, next) => {
    try {
        res.status(200).json({
            message: "Success",
            data: "HelloWord",
        })
    }catch (error) {
        console.log(error);
        return res.status(503).json({
            message: 'Lỗi dịch vụ, thử lại sau.'
        });
    }
}