const { MAX } = require('../constant');
const { randomWordQuestionPack } = require('../helpers/challengeHelpers');
const { getWordPackService } = require('../services/utilsServices');

// ======== CORRECT WORD========
exports.getWordPackCorrectWord = async (req, res, next) => {
  try {
    let { nQuestion = 50, ...packInfo } = req.query;

    nQuestion = parseInt(nQuestion);
    if (nQuestion > MAX.LEN_WORD_PACK) nQuestion = MAX.LEN_WORD_PACK;

    const packages = await getWordPackService(
      packInfo,
      0,
      1500,
      '-_id word mean phonetic synonyms',
    );

    const packLen = packages.length > nQuestion ? nQuestion : packages.length;

    if (packLen < 4) {
      return res.status(200).json({ wordPack: [] });
    }
    const wordPack = randomWordQuestionPack(packages, packLen);
    return res.status(200).json({ wordPack });
  } catch (error) {
    console.error('GET WORD PACK CWG ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

// ======== WORD MATCH ========
exports.getWordPackWordMatch = async (req, res, next) => {
  try {
    let { nQuestion = 50, ...packInfo } = req.query;
    nQuestion = parseInt(nQuestion);
    if (nQuestion > MAX.LEN_WORD_PACK) nQuestion = MAX.LEN_WORD_PACK;

    const seedList = await getWordPackService(packInfo, 0, 1500, '-_id word mean');
    if (seedList) {
      return res.status(200).json({
        wordPack: seedList.sort((_) => Math.random() - 0.5).slice(0, nQuestion),
      });
    }

    return res.status(200).json({ wordPack: [] });
  } catch (error) {
    console.error('GET WORD PACK WMG ERROR: ', error);
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

// ======== FAST WORD ========
exports.getWordPackWordFast = async (req, res, next) => {
  try {
    const { topic } = req.query;
    const packages = await getWordPackService(
      { topics: [topic] },
      0,
      1500,
      '-_id word picture',
    );

    const nQuestion = 100;
    const wordPack = packages.slice(0, nQuestion);

    return res.status(200).json({ wordPack });
  } catch (error) {
    console.error('GET WORD PACK FAST ERROR: ', error);
    return res.status(500).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};
