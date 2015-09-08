var fs = require('fs');
var nconf = require('nconf');

//Require log4js for display running log
var log4js = require('log4js');
var logger = log4js.getLogger('APP_LOG');

function startServer(app){

    var port = nconf.get('server').port;
    var listen = app.listen(port);

    logger.info('ATMessager is now running on port '+ port + '∠( ᐛ 」∠)＿');

}

module.exports ={
    startServer:startServer
}
