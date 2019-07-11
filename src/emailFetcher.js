const Imap = require('imap');
const fs = require('fs');
const emailCredentials = require('./emailCredentials');
const logging = require('../util/logging');

let buffer;

module.exports = (monitor, monitorName, fileName) => {

	// Create a new imap connection.
	const imap = new Imap({
		user: emailCredentials.user,
		password: emailCredentials.password,
		host: emailCredentials.host,
		port: emailCredentials.port,
		tls: emailCredentials.tls
	});

	// Connect to inbox.
	imap.once('ready', () => {
		logging(`Successfully connected regarding "${monitorName}".`);

		// Open inbox.
		imap.openBox('INBOX', false, err => {

			// If issue occurs, throw error.
			if (err) throw err;

			// Find all unread emails that match the subject line.
			imap.search(['UNSEEN', ['SUBJECT', monitor]], (err, results) => {

				// If issue occurs, throw error.
				if (err) throw err;

				try {

					// Fetch content of all applicable emails and mark it read.
					const f = imap.fetch(results, {
						bodies: '1',
						markSeen: true
					});

					// If error fetching email content, throw error.
					f.once('error', err => {
						logging('Fetch error: ' + err);
					});

					// Write contens of email to file.
					f.on('message', msg => {
						msg.on('body', stream => {
							stream.on('data', chunk => {
								buffer += chunk.toString('utf8');
							})
							stream.pipe(fs.createWriteStream(`./reports/monitor_reports/${fileName}.txt`));
						});
						msg.once('end', () => {
							logging(`Successfully finished writing "${monitorName}" to file.`);
						});
					});

					// End connection.
					f.once('end', () => {
						logging(`Finished fetching email for "${monitorName}".`);
						imap.end();

					});
				}

				// If issue occurs, log error.
				catch (e) {
					logging(`Nothing to fetch for "${monitorName}".`);
					imap.end();
				}
			});
		});
	});

	// // If issue occurs, log error.
	imap.once('error', err => {
		logging(err);
	});

	imap.connect();
	return new Promise((resolve, reject) => {
		imap.once('end', err => {
			if (err) {
				reject(err);
			} else {
				resolve(logging(`Successfully disconnected regarding "${monitorName}".`));
			}
		});
	});
}