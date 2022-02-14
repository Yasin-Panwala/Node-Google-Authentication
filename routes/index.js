const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect('/login');
  } else {
    res.render('login');
  }
})

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) {
    res.render('index', { user: req.user });
  } else {
    res.redirect('/');
  }
})

router.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/login');
})

router.get('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;