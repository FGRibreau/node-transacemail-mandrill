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
```

## Donate

I maintain this project in my free time, if it helped you please support my work via [paypal](https://paypal.me/fgribreau) or [bitcoins](https://www.coinbase.com/fgribreau), thanks a lot!
