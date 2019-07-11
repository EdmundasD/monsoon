const fs = require('fs');
const timestamp = require('./timestamp');

module.exports = message => {
	const d = new Date();
	const newTimestamp = timestamp(d);
	let logging = fs.createWriteStream('./log.txt', {flags:'a'});
	logging.write(`${newTimestamp}: ${message}\n`);
}