var all = {
  jwt: {
        secret: 'mobile-pricng-web-secret',
        duration: 60*13 // Time left untill credentials to expires
    },
  bluePagesUrl: 'http://bluepages.ibm.com',
  connectionsUrl: 'http://w3-connections.ibm.com',
  userPhotoUrl:  "http://w3.ibm.com/bluepages/photo/Photo.jsp",
  loadXmlEncoding: 'utf8',  // used by api/quote/quote.controller.js(uploadFromChis)


};

module.exports = all;
