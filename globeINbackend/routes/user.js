const router = require('express').Router();
const { createUsers, SignIn, verifyEmail, forgetPassword, resetPassword } = require('../controller/users');
const { isResetTokenValid } = require('../middlewares/user');
const { validateUser, validate } = require('../middlewares/validator');

router.post('/create', validateUser, validate, createUsers);
router.post('/signin', SignIn);
router.post('/verify-email', verifyEmail);
router.post('/forgot-password', forgetPassword);
router.post('/reset-password', isResetTokenValid, resetPassword);
router.get('/verify-token', isResetTokenValid, (req, res) => {
  res.json({ success: 'token is valid' });
});



module.exports = router;
