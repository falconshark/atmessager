var nconf = require('nconf');
nconf.file('bots', __dirname + '/../config/bots.json')
     .file('receviers', __dirname + '/../config/receivers.json')
     .file('senders', __dirname + '/../config/senders.json');

function vaildMessage(receiver,message,botname,password,testMode){

  if(message === undefined){

    return {error:369};
  }
}

module.exports = {
  'vaildMessage':vaildMessage
};
