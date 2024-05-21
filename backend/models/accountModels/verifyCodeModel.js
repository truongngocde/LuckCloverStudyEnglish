const momgoose = require('mongoose');
const { MAX } = require('../../constant');
const { default: mongoose } = require('mongoose');

const verifyCodeSchema = new momgoose.Schema({
  code: {
    type: String,
    maxLength: MAX.VERIFY_CODE,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    maxLength: MAX.EMAIL_LEN,
    required: true,
    trim: true,
  },
  createDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const Verifycode = mongoose.model('Verifycode', verifyCodeSchema);
module.exports = Verifycode;
