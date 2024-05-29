const express = require('express');
const accountController = require('../controllers/accountControllers')
const passport = require('passport');
const authMiddleware = require('../middlewares/authMiddlewares')
const router = express.Router();

router.post('/register', accountController.postRegisterAccount);
router.post('/login', accountController.postLogin);
router.post('/logout', accountController.postLogout);
// router.post(
//   '/login-gg',
//   passport.authenticate('google-token', { session: false }),
//   accountController.postLoginSocialNetwork,
// );
// router.post(
//   '/login-fb',
//   passport.authenticate('facebook-token', { session: false }),
//   accountController.postLoginSocialNetwork,
// );
router.post('/reset-password', accountController.postResetPassword);

router.put('/toggle-favorite', accountController.putToggleFavorite);
router.put(
  '/update-coin',
  authMiddleware.jwtAuthentication,
  accountController.putUpdateUserCoin,
);
router.put(
  '/update-avt',
  authMiddleware.jwtAuthentication,
  accountController.putUpdateAvt,
);
router.put(
  '/update-profile',
  authMiddleware.jwtAuthentication,
  accountController.putUpdateProfile,
);

router.get(
    '/user-info',
    authMiddleware.jwtAuthentication,
    accountController.getUserInfo,
  );
  router.get('/send-verify-code', accountController.getVerifyCode);
  router.get(
    '/user-profile',
    authMiddleware.jwtAuthentication,
    accountController.getUserProfile,
  );

module.exports = router;