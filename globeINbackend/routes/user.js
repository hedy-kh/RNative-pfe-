const router = require('express').Router();
const { createUsers, SignIn, verifyEmail, forgetPassword, resetPassword,logout } = require('../controller/users');
const { isResetTokenValid } = require('../middlewares/user');
const { validateUser, validate } = require('../middlewares/validator');
const passport = require('passport');
router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/profile');
});

router.get('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
  res.redirect('/profile');
});
router.post('/create',validateUser,validate, createUsers);
router.post('/signin', SignIn);
router.post('/verify-email', verifyEmail);
router.post('/logout', logout);
router.post('/forgot-password', forgetPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
router.get('/verify-token', isResetTokenValid, (req, res) => {
  res.json({ success: 'token is valid' });
});



module.exports = router;
