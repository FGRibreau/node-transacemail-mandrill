var Mandrill   = require('node-mandrill');
var _          = require('lodash');
var deepExtend = require('deep-extend');

function MailProvider(apiKey, options){
  if(!apiKey){
    throw new Error("require('transacemail-mandrill')('apikey'), api key is required.");
  }

  this.options  = deepExtend({}, MailProvider.DEFAULT_OPTION, options);
  this.mandrill = Mandrill(apiKey);
}

/**
 * Debug mode
 * @type {Boolean}
 */
MailProvider.DEBUG_MODE = false;

/**
 * Default options
 * @type {Object}
 */
MailProvider.DEFAULT_OPTION = {
  message:{
    track_opens: true,
    track_clicks: true,
    auto_text:false,
    subject: "node-transacemail-mandrill",
    from_email: "mandrill@transacemail.com",
    from_name: "Francois-Guillaume Ribreau"
  }
};

/**
 * Send method
 * @param  {Object}   mail TransacEmail Mail object
 * @param  {Function} fn   Callback to call when done
 */
MailProvider.prototype.send = function(mail, fn){
  if(!mail.data || !mail.data.email){
    throw new Error("The `email` field is required");
  }

  var options = deepExtend({}, this.options, mail.mandrill, {
    message:{
      /**
       * If mail.text is not defined, autotext will be set to true
       * @type {Boolean}
       */
      auto_text:!mail.text,

      /**
       * HTML content
       * @type {String}
       */
      html:mail.html,

      /**
       * Text content
       * @type {String}
       */
      text:mail.text,
      to:[{
          email:mail.data.email,
          name: mail.data.name
      }]
    }
  });

  if(MailProvider.DEBUG_MODE){
    console.log("\nSending...");
    console.log(JSON.stringify(options, null, 2));
    fn();
    return;
  }

  this.mandrill('/messages/send', options, function(error, response){
    //everything's good, lets see what mandrill said
    //[ { email: 'plop@fgribreau.com', status: 'sent' } ]
    fn(error ? JSON.stringify(error): null, response);
  });
};

/**
 * TransacEmail-Mandrill factory
 * @param  {String} apiKey        Mandrill API Key
 * @param  {Object} defaultOption Default send option
 * @return {MailProvider}
 */
function Factory(apiKey, defaultOption){
  return new MailProvider(apiKey, defaultOption || {});
}

Factory.MailProvider = MailProvider;
module.exports       = Factory;
