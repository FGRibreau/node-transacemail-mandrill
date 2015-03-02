Mandrill MailProvider for [node-transacemail](https://github.com/FGRibreau/node-transacemail)
===========================================

Usage
=====

```JavaScript
var Mailing = require('transacemail');

var mails = Mailing
              .compile('/path/to/mails')
              .setMailProvider(require('transacemail-mandrill')('apikey'));

// OR
var Mandrill = require('transacemail-mandrill');

var mails = Mailing
              .compile('/path/to/mails')
              .setMailProvider(Mandrill('apikey', {
                track_opens: true,
                track_clicks: true,
                auto_text:false,
                subject: "node-transacemail-mandrill",
                from_email: "mandrill@transacemail.com",
                from_name: "Francois-Guillaume Ribreau"
              }));


mails.setMailProvider();
```

## Donate
[Donate Bitcoins](https://coinbase.com/checkouts/fc3041b9d8116e0b98e7d243c4727a30)
