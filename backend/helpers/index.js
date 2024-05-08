const bcrypt = require('bcryptjs');
const { MAX } = require('../constant');

exports.createUsername = (email = '', id = '') => {
    const idStr = id.toString();
    return (
        email.toString().split('@')[0] + idStr.slice(idStr.length - 5, idStr.length)
    );
};

exports.generateVerifyCode = (numberOfDigits) => {
    const m = parseInt(numberOfDigits);
    const number = Math.floor(Math.random() * Math.pow(10, n)) + 1;
    let numberStr = number.toString();
    const l = numberStr.length;
    for( let i = 0; i < MAX.VERIFY_CODE - 1; ++i) {
        numberStr = '0' + numberStr;
    }
    return numberStr;
}

exports.hashPassword = async ( password = '') => {
    const saltRounds = parseInt(process.env.SALT_ROUND);
    const hashPassword = await bcrypt.hash(password, saltRounds);
    return hashPassword;
}