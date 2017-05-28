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

let Article = module.exports = mongoose.model('Article', articleSchema);
