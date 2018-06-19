var request = require('request');
var config = require('../config');
var messages = require('../utils/messages');
var Q = require('q');


var parseBPData = function(data) {

    var obj = data.entry[0].attribute;
	var myBP = {
		data : {}
	};
	var params = ["serialnumber", "cn", "mail", "jobresponsibilities", "co", "buildingname", "floor", "physicaldeliveryofficename", "telephonenumber", "mobile", "tieline"];
	for (var i = 0; i < obj.length; i++) {
		if (params.indexOf(obj[i].name) >= 0) {
            myBP.data[obj[i].name] = obj[i].value[0];
		}
	}
	return myBP.data;
};

exports.getData = function(credentials) {
    var deferred = Q.defer();

    var base64uid  = new Buffer(credentials.username + ':' + credentials.password).toString('base64');

    var path = config.bluePagesUrl + '/BpHttpApisv3/slaphapi?ibmperson/(mail=' + credentials.username + ').list,printable/byjson';

    request({
        method: 'GET',
        url: path
    },function(error, response, body){
        if(!error && response.statusCode === 200) {
            var data = JSON.parse(body).search;
            console.log(JSON.stringify(data));
            if(data.return.code === 0 && data.entry.length > 0) {
                var bpData = parseBPData(data);
                bpData['base64uid'] = base64uid;
                bpData['photo'] = config.userPhotoUrl+ '?email=' + bpData.mail;
                deferred.resolve(bpData);
            } else if(data.entry.length === 0){
                deferred.reject(messages.models.BluePages.user_not_found);
            } else if(data.return.code !== 0) {
                deferred.reject(data.return.message);
            }
        } else {
            console.log(error);
            deferred.reject(new Error(error));
        }
    });

    return deferred.promise;
};
