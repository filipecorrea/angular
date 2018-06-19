var database =  require('../config/db2connect.js').modules;
var Q = require('q');

/**
 * Method fetch List All Quotes by Owner
 * @param  {[JSON]} param   [param.quote_status, param.filter , param.owner]
 * @return {[JSON]}         [list Object Quote]
 * @author framires
 */
var fetchListQuotes = function(param){
    var queryString =  "SELECT Q.QUOTE_NUMBER,"+
          " Q.QUOTE_OPP_NUMBER,"+
          " Q.QUOTE_CREATED,"+
          " Q.QUOTE_STATUS,"+
          " Q.QUOTE_DATE,"+
          " Q.QUOTE_TOTAL_TCV,"+
          " C.CHIS_DESCRIPTION"+
          " FROM MOBPR.QUOTE AS Q"+
          " INNER JOIN MOBPR.CHIS AS C ON C.QUOTE_QUOTE_NUMBER  = Q.QUOTE_NUMBER"+
          " WHERE Q.QUOTE_STATUS LIKE '%"+param.quote_status+"%' "+
          " OR Q.QUOTE_NUMBER  LIKE  '%"+param.filter+"%' "+
          " OR C.CHIS_CUSTOMER_NUMBER  LIKE  '%"+param.filter+"%' "+
          " OR C.CHIS_CUSTOMER_NAME LIKE '%"+param.filter+"%' "+
          " AND Q.QUOTE_OWNER LIKE '%"+param.owner+"%';";
    //create a pool object
    var pool =  database.createConnection();
    var deferred = Q.defer();
    //execute a query string
    database.executeQuery(pool,queryString)
      .then(function(result){
          deferred.resolve(result);
      }).fail(function(error){
          console.error(JSON.stringify(error));
          deferred.reject(error);
      }).fin(function(){
          database.closeConnection();
      });

      return deferred.promise;

};

exports.fetchListQuotes = fetchListQuotes;
