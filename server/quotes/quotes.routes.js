// Controllers
var quotesController = require('./quotes.controller.js');

  module.exports = function(app){

    app.get('/api/quotes/:quote_status/:filter/:owner', quotesController.fetchListQuotes);

}
