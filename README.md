Mandrill MailProvider for [node-transacemail](https://github.com/FGRibreau/node-transacemail)
===========================================

Usage
=====

```JavaScript
var Mailing = require('node-transacemail');

var mails = Mailing
              .setMailProvider(require('transacemail-mandrill')('apikey'))
              .compile('/path/to/mails');
```
