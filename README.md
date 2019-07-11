# Monsoon

### What is Monsoon?

Monsoon allows you to parse monitor emails, extract necessary data via regex, and hit an endpoint with the extracted data - all in a matter of seconds.

### Why was Monsoon created?

Sometimes we create monitors that return a large number of transaction IDs. More often than not, these monitors act as a precautionary measure to prevent transactions from falling out of sync with Solr. Since we tend to grab large samples of transactions, manually parsing the email and resyncing all transactions is a long and tedious task. Monsoon solves that problem.

### What can Monsoon do?

Currently, the functionality is very limited. Only monitors that return transaction IDs that need to be resynced with Solr are supported.

### What is _forecasted_ for Monsoon?

Monsoon can be expanded to support a lot more functionalities, such as resyncing items/conversations with Solr, or possibly just parsing monitor emails for easier readability and documentation. As of now, unfortunately, there are no plans to expand the functionality of Monsoon.

### Does Monsoon work "out of the box"?

No! I have removed some of the more sensitive information, for obvious reasons. Below I compiled a list of the information that you need in order for it to work as intended.

1. [emailCredentials.js](emailCredentials.js) requires `user`, `password`, `host`, and `port` fields. For more information, see [Google's article on IMAP](https://support.google.com/mail/answer/7126229?hl=en).
2. [utilRef.js](utilRef.js) requires `solrOrderEndpoint` value.
3. [monitors.js](monitors.js) requires `name` and `subject` fields. `id`, `sleep_mins`, and `info_endpoint` are all optional fields.
