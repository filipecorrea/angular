'use strict';

var messages = require('../utils/messages');
var quoteDAO = require('./quotes.dao.js');

/**
 * Method call a function for fetch List Quotes
 * @param  {quote_status : 1 , filter : 'blabla', owner : 'framires@br.ibm.com' }
 * @return {[JSON]}     [Return list Object Quotes]
 * @author framires
 */
var fetchListQuotes = function(req,res){
      var param = req.params;
      if(param.filter == null){
         param.filter == "";
      }
      if(param.quote_status == null){
         param.quote_status == "";
      }
      if(param.owner == null){
          res.status(messages.routes.error.bad_request.code).json(messages.quote.quote_owner_empty);
      }
      quoteDAO.fetchListQuotes(param)
        .then(function(result){
            res.status(200).json(result);
        }).fail(function(error){
           res.status(messages.routes.error.internal_error.code).json(messages.routes.error.internal_error.txt);
        });
};

exports.fetchListQuotes = fetchListQuotes;
