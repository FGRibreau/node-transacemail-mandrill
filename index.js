var Mandrill = require('node-mandrill');
var _        = require('lodash');
var deepExtend = require('deep-extend');

function MailProvider(apiKey, options){
  this.options  = deepExtend({}, MailProvider.DEFAULT_OPTION, options);
  this.mandrill = Mandrill(apiKey);
}

MailProvider.DEFAULT_OPTION = {
  messsage:{
    track_opens: true,
    track_clicks: true,
    auto_text:false,
    subject: "node-transacemail-mandrill",
    from_email: "mandrill@transacemail.com",
    from_name: "Francois-Guillaume Ribreau"
  }
};

MailProvider.prototype.send = function(mail, fn){
  if(!mail.data || !mail.data.email){
    throw new Error("The `email` field is required");
  }

  var options = deepExtend({}, this.options, mail.mandrill, {
    html:mail.html,
    text:mail.text,
    /**
     * If mail.text is not defined, autotext will be set to true
     * @type {Boolean}
     */
    auto_text:!mail.text,
    message:{
      to:[{
          email:mail.data.email,
          name: mail.data.name
      }]
    }
  });

  mandrill('/messages/send', options, function(error, response){
    //everything's good, lets see what mandrill said
    //[ { email: 'plop@fgribreau.com', status: 'sent' } ]
    fn(error ? JSON.stringify(error): null, response);
  });
};

/**
 * [exports description]
 * @param  {String} apiKey        Mandrill API Key
 * @param  {Object} defaultOption Default send option
 * @return {MailProvider}
 */
function Factory(apiKey, defaultOption){
  if(!apiKey){
    throw new Error("require('transacemail-mandrill')('apikey'), api key is required.");
  }
  return new MailProvider(apiKey, defaultOption || {});
}

Factory.MailProvider = MailProvider;
module.exports       = Factory;
