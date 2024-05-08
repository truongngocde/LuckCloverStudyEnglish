const momgoose = require('mongoose');

const bcrypt = require('bcryptjs');
const { MAX, ACCOUNT_TYPES } = require('../../constant');
const { default: mongoose } = require('mongoose');

const accountTypeEnum = (function () {
  let list = [];
  for (let k in ACCOUNT_TYPES) {
    list.push(ACCOUNT_TYPES[k]);
  }
  return list;
})();

const accountSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    maxLength: MAX.EMAIL_LEN,
  },
  password: {
    type: String,
    default: '',
    maxLength: MAX.PASSWORD_LEN,
  },
  authType: {
    type: String,
    enum: accountTypeEnum,
    default: ACCOUNT_TYPES.LOCAL,
  },
  createDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

accountSchema.pre('save', async function (next) {
  try {
    if (Boolean(this.password)) {
      const saltRounds = parseInt(process.env.SALT_ROUND);

      const hashPassword = await bcrypt.hash(this.password, saltRounds);
      this.password = hashPassword;
      next();
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;
