// Controllers
var authenticationController = require('./authentication.controller.js');

  module.exports = function(app){

    app.post('/api/authentication', authenticationController.authenticationLDAP);

}
