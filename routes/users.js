const express = require('express');
const router = express.Router();
const cfc = require('../modules/cfc');
const strUtils = require('../modules/strUtils');
const bcrypt = require('bcryptjs');

// user schema
const User = require('../models/user');

// register form
router.get('/register', (req, res) => {
	res.render('register', {title:cfc('registration'), header:cfc('register')});
});

// register
router.post('/register', (req, res) => {
	const name = req.body.name;
	const email = req.body.email;
	const alias = req.body.alias;
	const pwd1 = req.body.password;
	const pwd2 = req.body.password2;

	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty().isEmail();
	req.checkBody('alias', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords don\'t match').equals(req.body.password);

	let errors = req.validationErrors();

	if (errors) {
		res.render('register', {errors:errors});
	} else {
		let newUser = new User({
			name:name,
			email:email,
			username:alias,
			password:pwd1
		});

		bcrypt.genSalt(10, function(err, salt){
			bcrypt.hash(newUser.password, salt, function(err, hash) {
				if (err) {
					console.log(err);
				}
				newUser.password = hash;
				newUser.save((err) => {
					if (err) {
						console.log(err);
						return;
					} else {
						req.flash('success', 'You can now login');
						res.redirect('/users/login');
					}
				});
			});
		});
	}
});

router.get('/login', (req, res) => {
	res.render('login');
});

module.exports = router;
