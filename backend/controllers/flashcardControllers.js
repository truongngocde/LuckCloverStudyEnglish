const { getWordPackService } = require('../services/utilsServices');
const { countWordPack } = require('../services/utilsServices');

exports.getWordPack = async (req, res, next) => {
  try {
    const { page, perPage, packInfo } = req.query;
    const pageInt = parseInt(page);
    const perPageInt = parseInt(perPage);
    const skip = (pageInt - 1) * perPageInt;

    // Simplified service call
    const packList = await getWordPackService(
      JSON.parse(packInfo),
      skip,
      perPageInt,
      '-_id type word mean level phonetic examples picture',
      null,
      { $and: [{ picture: { $ne: null } }, { picture: { $ne: '' } }] }
    );

    return res.status(200).json({ packList });
  } catch (error) {
    console.error('Error in getWordPack:', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

exports.getTotalWorkPack = async (req, res, next) => {
  try {
    const { packInfo } = req.query;
    const total = (await countWordPack(JSON.parse(packInfo))) || 0;
    return res.status(200).json({ total });
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};
