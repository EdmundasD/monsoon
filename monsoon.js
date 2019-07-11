const emailFetcher = require('./src/emailFetcher');
const fileParser = require('./src/fileParser');
const logging = require('./util/logging');
const monitors = require('./src/monitors');
const timestamp = require('./util/timestamp');

logging('****************************** Here we go... ******************************');

Object.keys(monitors).forEach(async monitorKey => {
	const d = new Date();
	const newTimestamp = timestamp(d);
	const monitor = monitors[monitorKey];
	const monitorName = monitor.name;
	const subject = monitor.subject;
	const filename = `${newTimestamp} - ${subject}`;
	await emailFetcher(subject, monitorName, filename)
	.then(() => fileParser(filename, monitorName));
});