const express = require('express');
const cfc = require('../modules/cfc');
const router = express();

// get home page
router.get('/', (req, res) => {
	res.render('index', {title:cfc('home'), header:cfc('Home')});
})

// get add article
router.get('/about', (req, res) => {
	res.render('about', {title:cfc('about'), header:cfc('about us')});
})

module.exports = router;
