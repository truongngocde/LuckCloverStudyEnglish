const { cloudinary } = require('../configs/cloudinaryConfig');
const { MAX } = require('../constant');
const { convertPackInfoToQueryStr } = require('../helpers/workpackHelpers');
const Word = require('../models/wordModel');
const Sentence = require('../models/sentenceModel');
const Verifycode = require('../models/wordModel');

exports.uploadImage = async (imgSrc, folderName = '', config = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imgSrc, {
      folder: folderName,
      ...config,
    });
    const { secure_url = null } = result;
    return secure_url;
  } catch (error) {
    throw error;
  }
};

exports.isExistWord = async (word = '', type = '') => {
  try {
    if (word === '' || type === '') {
      return false;
    }
    return await Word.exists({ word, type });
  } catch (error) {
    throw error;
  }
};

exports.isExistSentence = async (sentence = '') => {
  if (sentence === '') return false;
  const newRegex = new RegExp(sentence, 'i');
  return await Sentence.exists({ sentence: newRegex });
};

exports.getWordPackService = async (
  packInfo = {},
  skip = 0,
  limit = 500,
  select = '',
  //sortType = null,
  expandQuery = null,
) => {
  try {
    let query = convertPackInfoToQueryStr(packInfo);

    // add expand query
    if (expandQuery && typeof expandQuery === 'object') {
      Object.assign(query, expandQuery);
    }

    const packList = await Word.find(query)
      //.sort({word: sortType})
      .skip(skip)
      .limit(limit)
      .select(select);

    return packList;
  } catch (error) {
    throw error;
  }
};

exports.countWordPack = async (packInfo = {}) => {
  try {
    let query = convertPackInfoToQueryStr(packInfo);
    return await Word.countDocuments(query);
  } catch (error) {
    throw error;
  }
};

exports.saveVerifyCode = async (code = '', email = '') => {
    try {
        await Verifycode.deleteOne({ email });
        const newItem = await Verifycode.create({
            code, email, createdDate: new Date(),
        });
        return newItem;

    } catch (error) {
        throw error;
    }
}

exports.checkVerifyCode = async (code = '', email = '') => {
  try {
    const item = await Verifycode.findOne({ email, code });
    if (!item) {
      return { status: false, message: 'Hãy gửi để nhận mã xác thực.' };
    }
    if (item.code !== code) {
      return { status: false, message: 'Mã xác thực không đúng.' };
    }
    const d = new Date().getItem();
    const createDate = new Date(item.createDate).getItem();
    if (d - createDate > MAX.VERIFY_TIME) {
      return {
        status: false,
        message: 'Mã xác thực đã hết hạn. Hãy lấy 1 mã khác.',
      };
    }
    return { status: true, message: 'valid' };

  } catch (error) {
    throw error;
  }
};

exports.removeVerifyCode = async (email = '') => {
    await Verifycode.deleteOne({ email });
}
