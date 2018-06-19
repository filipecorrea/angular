var request = require('request');
var Q = require('q');
var parseString = require('xml2js').parseString;
var messageError = require("../utils/messages");

// mudar para bluebirds ...

var groupsToCheck = ["LA TPA - Data adm - Dev",
                     "LA TPA - Pricer - Dev",
                     "LA TPA - PDTL - DEV",
                     "LA TPA - Sales CM - Dev",
                     "LA TPA - Regional TE - Dev",
                     "LA TPA - IOT TE - Dev",
                     "LA TPA - IOT GE - Dev",
                     "LA TPA - Global TE - Dev",
                     "LA TPA  - Seller - Dev"];

var deferred = Q.defer();

var checkNextGroup = function(email, path, groupIndex) {

        request({
            method: 'GET',
            url: path + groupsToCheck[groupIndex]
        },function(error, response, body){
            if(!error && response.statusCode === 200) {
                parseString(body, { attrkey: 'temp', explicitArray : false }, function (err, result) {
                    for (myKey in result) {
                        if (result.group.rc === '0') {
                            role = result[myKey].groupName.split("-")[1].trim();
                            deferred.resolve(role);
                        } else {
                            if(groupIndex+1 < groupsToCheck.length) {
                                checkNextGroup(email, path, groupIndex+1)
                            } else {
                                deferred.reject({"httpStatus" : 401,"message" : messageError.routes.api.authentication.bluegroups.user_not_found});
                            }
                        }
                    }
                });
            } else {
                console.log(error);
            }
        });
};

exports.getBlueGroupRole = function(email) {

    var role = 'norole';
    var groups = '&group=LA TPA - Seller - Dev' +
        '&group=LA TPA - Data adm - Dev' +
        '&group=LA TPA - Pricer - Dev' +
        '&group=LA TPA - PDTL - DEV' +
        '&group=LA TPA - Sales CM - Dev' +
        '&group=LA TPA - Regional TE - Dev' +
        '&group=LA TPA - IOT TE - Dev' +
        '&group=LA TPA - IOT GE - Dev' +
        '&group=LA TPA - Global TE - Dev' +
        '&group=LA TPA  - Seller - Dev';

    //var path = 'https://bluepages.ibm.com/tools/groups/groupsxml.wss?task=inAnyGroup&email=' + email + '&group=' + groups;
    var path = 'https://bluepages.ibm.com/tools/groups/groupsxml.wss?task=inAGroup&email=' + email + '&group=';

   checkNextGroup(email, path, 0);

    return deferred.promise;
};
