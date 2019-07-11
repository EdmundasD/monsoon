const fetch = require('fetch');
const logging = require('../util/logging');
const regex = require('../util/regex');
const utilRef = require('../util/utilRef');

// Resync order with Solr.
hittingEndpoint = (file, get) => {
	const solrOrderEndpoint = utilRef.solrOrderEndpoint;
	const allOrders = file.match(regex.transactionId);

	// If there are more than 200 transactions to resync...
	if (allOrders.length > 200) {
		return new Promise((resolve, reject) => {
			logging(`Order count: ${allOrders.length}.`);
			logging(`Alert: There are too many orders to resync.`);
			logging(`Resyncing only 100 orders.`);

			// Only resync 100 transactions.
			for (i = 0; i < 100; i++) {
				const link = `${solrOrderEndpoint}${allOrders[i]}`;
				fetch.fetchUrl(link, (error) => {
					if (error) logging(error);
				});
			};
			resolve(logging('Resync successful.'));
		});
	} else {
		return new Promise((resolve, reject) => {

			// Resync all transactions.
			for (i = 0; i < allOrders.length; i++) {
				const link = `${solrOrderEndpoint}${allOrders[i]}`;
				fetch.fetchUrl(link, (error) => {
					if (error) logging(error);
				});
			};
			resolve(logging('Resync successful.'));
		});
	}
}

module.exports = fileName => {
	const fs = require('fs');
	const get = require('simple-get');
	const RateLimiter = require('limiter').RateLimiter;
	const limiter = new RateLimiter(1, 1000);
	const file = fs.readFileSync(`./reports/parsed_reports/${fileName}.txt`, "utf8");
	limiter.removeTokens(1, () => {
		hittingEndpoint(file, get);
	});
}