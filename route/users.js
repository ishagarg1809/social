const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

// profile to be only accessible when signed in
router.get('/profile', passport.checkAuthentication, userController.profile);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create', userController.create);
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect = '/users/sign-in'}
), userController.createSession);

module.exports = router;