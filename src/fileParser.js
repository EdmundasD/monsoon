const fs = require('fs');
const solrSync = require('./solrSync');
const logging = require('../util/logging');
const regex = require ('../util/regex');

module.exports = (fileName, monitorName) => {

	// Check if filename matches monitor name.
	if (fileName.includes(monitorName)) {
		try {

			// Read file.
			const file = fs.readFileSync(`./reports/monitor_reports/${fileName}.txt`, "utf8");

			// Apply regex to retrieve transaction IDs.
			const orders = file.match(regex.transactionId);
			
			// Create new file and write order IDs.
			fs.writeFile(`./reports/parsed_reports/${fileName}.txt`, orders, err => {

				// Log error if one found.
				if (err) return logging(err);
				logging(`"${monitorName}" was parsed and rewritten.`);

				// Resync transaction IDs with Solr.
				solrSync(fileName);
			});
		}

		// Log error if one found.
		catch (e) {
			return logging(`"${monitorName}" was not parsed - nothing fetched.`);
		}
	}
}