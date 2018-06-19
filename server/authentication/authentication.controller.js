'use strict';

var messages = require('../utils/messages');
var BP = require('./bluepages.service');
var BG = require('./bluegroups.service');
var jwt = require('jsonwebtoken');
var config = require('../config');
var ldap = require('./authLDAP');


/**
 * Method verify permission in LDAP , verify in blueGroups and return UserBluePages
 * @param  {[JSON]} req       req.body have a credentials  username and password
 * @return {[JSON]}           return a jsonObject username
 * @author framires
 */
var authenticationLDAP  = function(req, res) {
    console.log(req);
    var credentials = req.body;

    console.log("Controller");
    var user = null;
    ldap.authenticate(credentials.username,credentials.password)
        .then(function(){
           return   BP.getData(credentials);
         }).then(function(userData){
           user = userData;
           return   BG.getBlueGroupRole(user.mail);
         }).then(function(role) {
          user.countryCode = 631;
          user.countryName = "Brazil";
          user.role = role;
          var token = jwt.sign({userid: user.serialnumber}, config.jwt.secret, { expiresInMinutes: config.jwt.duration });
          user.token  = token;
          res.status(200).json(user);
        }).fail(function(errorMsg){
            res.status(errorMsg.httpStatus).json(errorMsg.message);
        }).catch(function(error){
            console.error(JSON.stringify(error));
            res.status(messages.routes.error.internal_error.code).json(messages.routes.error.internal_error.txt);
        });
};

exports.authenticationLDAP = authenticationLDAP;
