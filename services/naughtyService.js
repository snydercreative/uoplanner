const naughtyWords = require('../client/data/naughty-words');
const _ = require('lodash');


const isNaughty = (filterMe, callback) => {
	let isBad = false;

	_.each(naughtyWords.wordList, word => {
		const naughtyIndex = filterMe.toLowerCase().indexOf(word);

		if (naughtyIndex > -1)
			isBad = true;
	});

	callback(isBad);
};


module.exports = { isNaughty };