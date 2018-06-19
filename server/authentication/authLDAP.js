var ldap = require('ldapjs');
var messageError = require("../utils/messages");
var Q = require('q');

/**
 * Authentication LDAP
 * @param  {[String]} username [intranetID]
 * @param  {[String]} password
 * @author framires
 */
exports.authenticate = function(username, password) {

  var deferred = Q.defer();
   var opts = {
     filter: '(mail=' + username + ')',
     scope: 'sub'
   };

   var client = ldap.createClient({
     //url: 'ldaps://bluepages.ibm.com:636'
     url: 'ldap://bluepages.ibm.com:389'
   });

   var isFoundEntry = false;

   client.search("ou=bluepages,o=ibm.com", opts, function(err, res) {
     res.on('searchEntry', function(entry) {//found the user entry

       isFoundEntry = true;
       client.bind(entry.dn, password, function(err) {//bind successfully
         if (err) {
           console.log("AuthLDAP -> Your password is not correct.");
           deferred.reject({"httpStatus" : 400,"message" : messageError.models.BluePages.user_pass_invalid});
           // callback(helper.getMessageObject(false, 'Your password is not correct.'));
         } else {
           console.log("AuthLDAP -> Success LDAP");
          deferred.resolve({"httpStatus" : 200,"message" : messageError.models.BluePages.user_ldap_success});
         }
       });
     });

     res.on('error', function(err) {
       console.log("AuthLDAP -> critical error ");
       deferred.reject({"httpStatus" : 500,"message" : messageError.models.BluePages.ldap_error500});
     });
     res.on('end', function(result) {

       client.unbind(function(err) {

         if (err !== null) {
           console.log("AuthLDAP ->Error Unbid");
           deferred.reject({"httpStatus" : 403,"message" : messageError.models.BluePages.ldap_unbid});//ERR UNBIND
         }
       });

       if (!isFoundEntry) {
         console.log("AuthLDAP -> Your IntranetID is not correct.");
       deferred.reject({"httpStatus" : 401,"message" : messageError.models.BluePages.user_not_found_intranetID});
       }
     });
   });

  return deferred.promise;
};
