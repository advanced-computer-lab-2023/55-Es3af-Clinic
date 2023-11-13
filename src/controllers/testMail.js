const formData = require('form-data');
const Mailgun = require('mailgun-js');
const mailgun = new Mailgun(formData);
const mg = mailgun.client({username: 'api', key: 'cb839bfbc2c34934949e3aac976afdab-8c9e82ec-8dfbc359'});

mg.messages.create('sandbox-123.mailgun.org', {
	from: "Excited User <mailgun@sandbox-123.mailgun.org>",
	to: "55es3afclinicpharmacy@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomeness!",
	html: "<h1>Testing some Mailgun awesomeness!</h1>"
})
.then(msg => console.log(msg)) // logs response data
.catch(err => console.log(err)); // logs any error