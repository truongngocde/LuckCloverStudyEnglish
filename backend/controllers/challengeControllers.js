const { MAX } = require('../constant');
const { randomWordQuestionPack } = require('../helpers/challengeHelpers');
const { getWordPack } = require('../services/utilsServices');

// ========== CORRECT WORD CHALLENGE ==========
exports.getWordPackCorrectWord = async (req, res, next) => {
  try {
    let { nQuestion = 50, ...packInfo } = req.query;

    nQuestion = parseInt(nQuestion);
    if (nQuestion > MAX.LEN_WORD_PACK) nQuestion = MAX.LEN_WORD_PACK;

    const packages = await getWordPack(
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

// ============ WORD MATCH CHALLENGE ==========
exports.getWordPackWordMatch = async (req, res, next) => {
  try {
    let { nQuestion = 50, ...packInfo } = req.query;
    nQuestion = parseInt(nQuestion);
    if (nQuestion > MAX.LEN_WORD_PACK) nQuestion = MAX.LEN_WORD_PACK;

    const seedList = await getWordPack(packInfo, 0, 1500, '-_id word mean');
    if (seedList) {
      return (
        res.status(200),
        json({
          wordPack: seedList
            .sort((_) => Math.random() - 0.5)
            .slice(0, nQuestion),
        })
      );
    }
    return res.status(200).json({ wordPack: [] });
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};

// ============ WORD FAST CHALLENGE ===========
exports.getWordPackWordFast = async (req, res, next) => {
  try {
    let { topic } = req.query;
    const packages = await getWordPack(
      {
        topics: [topic],
      },
      0,
      1500,
      '-_id word picture'
    );

    const nQuestion = 100;
    const wordPack = packages.slice(0, nQuestion);
  } catch (error) {
    return res.status(503).json({ message: 'Lỗi dịch vụ, thử lại sau' });
  }
};
