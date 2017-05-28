const express = require('express');
const mongoose = require('mongoose');
const cfc = require('../../modules/cfc');
const router = express();

let Article = require('../../models/article');

// get add article
router.get('/articles/add', (req, res) => {
	res.render('add_article', {title:cfc('add article'), header:cfc('Add new article')});
})

// post add article
router.post('/articles/add', (req, res) => {
	mongoose.connect('mongodb://_writer:writedeeznuts@localhost/nodekb');
	let date = new Date(),
		year = date.getUTCFullYear(),
		month = date.getUTCMonth() + 1,
		day = date.getDate(),
		hour = date.getUTCHours() + 1,
		minute = date.getUTCMinutes() + 1,
		seconds = date.getUTCSeconds() + 1,
		timestamp = month.toString() + '/' + day.toString() + '/' + year;
	let article = new Article();
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;
	article.url = req.body.url || '';
	article.postDate = timestamp;

	article.save((err) => {
		if(err) {
			console.log(err);
			return;
		} else {
			res.redirect('/read/articles/list');
		}
	});
})

// get load edit article
router.get('/articles/article/edit/:id', (req, res) => {
	Article.findById(req.params.id, (err, article) => {
		res.render('writes/edit_article', {article:article, header: cfc('editing ' + article.title), title:article.title});
	});
})

// post update article
router.post('/articles/article/edit/:id', (req, res) => {
	mongoose.connect('mongodb://_writer:writedeeznuts@localhost/nodekb');

	let article = {};
	article.title = req.body.title;
	article.author = req.body.author;
	article.body = req.body.body;
	article.url = req.body.url || '';
	article.postDate = req.body.posted;

	let query = {_id: req.params.id};

	Article.update(query, article, (err) => {
		if(err) {
			console.log(err);
			return;
		} else {
			res.redirect('/read/articles/list');
		}
	});
})

module.exports = router;
