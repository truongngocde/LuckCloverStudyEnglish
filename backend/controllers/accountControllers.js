const { createUsername, generateVerifyCode } = require('../helpers');
const bcrypt = require('bcryptjs');

const {
  isExistAccount,
  createAccount,
  createUser,
  findAccount,
  updateFavoriteList,
  isExistWordInFavorites,
  isLimitedFavorites,
  updateUserCoin,
  updatePassword,
  updateProfile,
  getProfile,
  updateAvt,
} = require('../services/accountServices');

const { COOKIE_EXPIRES_TIME, KEYS, ACCOUNT_TYPES, MAX,} = require('../constant');

const jwtConfig = require('../configs/jwtConfig')
