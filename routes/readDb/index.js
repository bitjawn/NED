const express = require('express');
const mongoose = require('mongoose');
const cfc = require('../../modules/cfc');
const router = express();

mongoose.connect('mongodb://_reader:readdeeznuts@localhost/nodekb');
let db = mongoose.connection;

// check connection
db.once('open', () => {
	console.log('Connected to MongoDB');
});

// check db errors
db.on('error', (err) => {
	console.log(err);
});

let Article = require('../../models/article');

// articles list
router.get('/articles/list', (req, res) => {
	Article.find({}, (err, articles) => {
		if (err) {
			console.log(err);
		} else {
			res.render('reads/index', {title:cfc('articles'), header:cfc('add article'), articles:articles});
		}
	});
});

// get single article
router.get('/articles/article/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		res.render('reads/article', {article:article,title:article.title});
	});
});

module.exports = router;
