const User = require('../models/accountModels/userModel');
const jwt = require('jsonwebtoken');
const { KEYS, ACCOUNT_TYPES } = require('../constant');
const passport = require('passport');


exports.jwtAuth = async ( req, res, next) => {
    try {
        res.locals.isAuth = false;
        let token = req.cookies ? req.cookies[KEYS.JWT_TOKEN] : null;
        if (!token) {
            next();
            return;
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded) {
            const { accountId } = decoded.sub;
            let user = await User.findOne({ accountId }).select(
                '-_id username name avt favoriteList coin',
            );
            if (user) {
                user.accountId = accountId;
                res.locals.isAuth = true;
                req.user = user;
            }
        }
        next();
    } catch (error) {
        console.error('Authentication with JWT ERROR: ', error);
        return res.status(401).json({
            message: 'Unauthorized.',
            error,
        })
    }
}