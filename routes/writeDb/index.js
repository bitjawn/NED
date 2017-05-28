const express = require('express');
const mongoose = require('mongoose');
const cfc = require('../../modules/cfc');
const router = express();

// mongoose.connect('mongodb://_writer:writedeeznuts@localhost/nodekb');
// let db = mongoose.connection;

// check connection
// db.once('open', () => {
// 	console.log('Connected to MongoDB');
// });

// check db errors
// db.on('error', (err) => {
// 	console.log(err);
// });

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

module.exports = router;
