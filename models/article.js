let mongoose = require('mongoose');

// article schema
let articleSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	postDate: {
		type: String,
		required: true,
	},
	postTime: {
		type: String,
		required: false
	},
	url: {
		type:String,
		required: false
	}
});

articleSchema.statics.findByTitle = function findByTitle(keyword, cb) {
	return this.where('title', new RegExp(keyword.trim(), 'i')).exec(cb);
};

articleSchema.statics.findByAuthor = function findByTitle(keyword, cb) {
	return this.where('author', new RegExp(keyword.trim(), 'i')).exec(cb);
};

let Article = module.exports = mongoose.model('Article', articleSchema);
