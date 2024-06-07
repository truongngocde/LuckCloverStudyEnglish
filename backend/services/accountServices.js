const { ACCOUNT_TYPES, MAX } = require('../constant');
const { hashPassword } = require('../helpers');
const Account = require('../models/accountModels/accountModel');
const User = require('../models/accountModels/userModel');
const { uploadImage } = require('./utilsServices');

exports.createAccount = async (
  email,
  password,
  authType = ACCOUNT_TYPES.LOCAL
) => {
  try {
    const newAccount = await Account.create({
      email,
      password,
      authType,
      createDate: new Date(),
    });
    if (newAccount && newAccount._id) return newAccount._id;
    return null;
  } catch (error) {
    throw error;
  }
};

exports.findAccount = async (email) => {
  try {
    return await Account.findOne({ email });
  } catch (error) {
    throw error;
  }
};

exports.isExistAccount = async (email) => {
  try {
    return await Account.exists({ email });
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (accountId, username, name, avt = '') => {
  try {
    const newUser = await User.create({ accountId, name, username, avt });
    if (newUser && newUser._id) return newUser;
  } catch (error) {
    throw error;
  }
};

exports.isExistWordInFavorites = async (word, username) => {
  try {
    const regex = new RegExp(word, 'i');
    const isExist = await User.exists({
      username,
      favoriteList: {
        $in: regex,
      },
    });

    return isExist;
  } catch (error) {
    throw error;
  }
};

exports.isLimitedFavorites = async (word, username) => {
  try {
    const user = await User.findOne({ username }).select('favoriteList');
    const { favoriteList = null } = user;

    if (
      Array.isArray(favoriteList) &&
      favoriteList.length >= MAX.FAVORITES_LEN
    ) {
      return true;
    }
    return false;
  } catch (error) {
    throw error;
  }
};

exports.updateFavoriteList = async (word, username, isAdd = false) => {
  try {
    if (isAdd) {
      return await User.updateOne(
        { username },
        {
          $push: { favoriteList: word },
        }
      );
    }
  } catch (error) {
    throw error;
  }
};

exports.updateUserCoin = async (newCoin = 0, username = '') => {
    try {
        if (newCoin < 0 || newCoin > MAX.USER_COIN || !username || username === '') {
            return false;
        }
        const updateRes = await User.updateOne({ username}, {coin: newCoin});
        if (updateRes.ok) {
            return true;
        }
    } catch (error) {
        throw error;        
    }
}

exports.updatePassword = async (email = '', newPassword = '') => {
    try {
        const hashPw = await hashPassword(newPassword);
        const res = await Account.updateOne({ email }, {password: hashPw});

        if (res.ok) {
            return true;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

exports.updateAvt = async ( username = '', avtSrc = '') => {
    try {
        const picture = await uploadImage(avtSrc, 'luckcloverEnglish/user-avt');
        const isUpdated = await User.updateOne({username}, {avt: picture});
        if (isUpdated.n && isUpdated.ok) return picture;

        return false;
    } catch (error) {
        throw error;
    }
}

exports.updateProfile = async (username = '', newName = '', newUsername = '') => {
    try {
        if (username.toLowerCase() !== newUsername.toLowerCase()) {
            const isExist = await User.exists({ username: newName});
            if (isExist) {
                return { status: false, message: 'Tên tài khoản đã được sử dụng.'};
            }
        }

        const isUpdated = await User.updateOne(
            { username } ,
            { name: newName, username: newUsername},
        );

        if (isUpdated.n && isUpdated.ok) {
            return { status: true, message: 'success'};
        }
        return false;
    } catch (error) {
        throw error;
    }
}

exports.getProfile = async(accountId = '') => {
    try {
        const account = await Account.findById(accountId).select('email createdDate',);
        return account;
    } catch (error) {
        throw error;
    }
}
