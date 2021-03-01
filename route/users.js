const express = require ('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');
// router.get('/profile', userController.);
router.get('/sign-up', userController.signUp);
router.get('/sign-in', userController.signIn);
router.post('/create-session',  passport.authenticate(
    'local',
    {failureRedirect: '/sign-in'}
), userController.createSession);
router.post('/create', userController.create);

module.exports = router;