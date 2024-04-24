const express = require('express');
const { loginUser, signupUser, adminLogin, LoginWithGoogle } = require('../controllers/AuthController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.post('/admin-login', adminLogin);
router.post('/login-with-google', LoginWithGoogle);

module.exports = router;