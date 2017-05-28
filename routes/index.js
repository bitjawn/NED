const express = require('express');
const cfc = require('../modules/cfc');
const router = express();

// get home view
router.get('/', (req, res) => {
	res.render('index', {title:cfc('home'), header:cfc('Home')});
})

// get about view
router.get('/about', (req, res) => {
	res.render('about', {title:cfc('about'), header:cfc('about us')});
})

// get contact view
router.get('/contact', (req, res) => {
	res.render('contact', {title:cfc('about'), header:cfc('contact us')});
})

module.exports = router;
