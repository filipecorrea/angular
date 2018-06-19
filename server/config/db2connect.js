var ibmdb = require('ibm_db');
var Q = require('q');
var databaseName = 'MOBPR2DB';
var serverIp = '9.16.172.18';
var serverPort = '60000';
var username = 'db2inst1';
var password = 'passw0rd';
var schema = 'MOBPR';
var Pool = ibmdb.Pool;
var poolServer = null;
var cn = "DATABASE="+databaseName+";HOSTNAME="+serverIp+";PORT="+serverPort+";PROTOCOL=TCPIP;UID="+username+";PWD="+password+";";

/**
 * Method open connection Pool with DB2
 * @param  pool
 * @return db   instance connect
 * @author framires
 */
function openConnectionDB2(pool){
  var deferred = Q.defer();
  pool.open(cn, function (err, db) {
    if (err) {
      deferred.reject(err);
    }else{
      deferred.resolve(db);
    }
  });
  return deferred.promise;
}

/**
 * Method execute a Query sql
 * @param  {[Object]} db            instance db2 connected
 * @param  {[String]} queryString   QuerySQL
 * @return {[JSON]}   data          return result QuerySQL
 * @author framires
 */
function  runQuery(db,queryString){
  var deferred = Q.defer();
  db.query(queryString,function(err,data){
    if(err){
      deferred.reject(err);
    }else{
      deferred.resolve(data);
    }
  });
  return deferred.promise;
}


exports.modules = {

  /**
   * Create a new pool
   * @return {[Object]} return object type Pool
   * @author framires
   */
  createConnection : function(){
     poolServer = new Pool();
     return poolServer;
  },

  /**
   * Method clode a pool connection
   * @param  {[Object]} pool
   * @author framires
   */
  closeConnection : function(pool){
    pool.close();
  },

  /**
   * Function open connection and run a QuerySql
   * @param  {[Object]} pool          Object type Pool
   * @param  {[String]} queryString   String sql query
   * @return {[Json]}                 return  query result
   * @author framires
   */
  executeQuery : function(pool,queryString){
        return openConnectionDB2(pool)
    .then(function (db){
        return  runQuery(db,queryString);
    }).catch(function(err){
        throw err;
    });
  },

};
