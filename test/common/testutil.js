function configExpress(app){

  var bodyParser = require('body-parser');

  app.set('views',__dirname+'/views');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  return app;

}

module.exports = {

  configExpress:configExpress

}
