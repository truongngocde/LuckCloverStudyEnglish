const jwt = require('jsonwebtoken');
const { JWT_EXPIRES_TIME } = require('../constant');

const encodedToken = async (secretkey, user, expire = JWT_EXPIRES_TIME) => {
    return await jwt.sign(
        {
            iss: process.env.JWT_ISS,
            sub: user,
        },
        secretkey,
        { expiresIn: expire },
    )
};

module.exports = { encodedToken }