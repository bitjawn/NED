const express = require('express');
const router = express.Router();
const cfc = require('../modules/cfc');
const strUtils = require('../modules/strUtils');

// user schema
const User = require('../models/user');

// register form
router.get('/register', (req, res) => {
	res.render('register', {title:cfc('registration'), header:cfc('register')});
});

module.exports = router;
