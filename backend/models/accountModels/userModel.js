const mongoose = require('mongoose');
const { MAX, DEFAULT } = require('../../constant');

const userSchema = new mongoose.Schema({
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'account',
    },
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: MAX.NAME_LEN,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        maxlength: MAX.USER_NAME
    },
    avt: {
        type: String,
        trim: true, 
        default: '',
    },
    coin: {
        type: Number,
        required: true, 
        default: DEFAULT.USER_COIN,
        min: 0,
        max: MAX.USER_COIN,
    },
    favoriteList: [String],
});

const User = mongoose.model('User', userSchema);
module.exports = User;
