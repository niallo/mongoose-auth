var mongoose = require('mongoose')
  , mongooseTypes = require('mongoose-types')
  , _schema = require('./schema')
  , everyauth = require('everyauth');
mongooseTypes.loadTypes(mongoose);
var Email = mongoose.SchemaTypes.Email;

module.exports = function dotcloud (schema, opts) {
  schema.add(_schema);

  schema.static('createWithDotcloud', function (dcUser, accessToken, callback) {
    var params = {
      dotcloud: {
          id: dcUser.id
        , type: dcUser.type
        , username: dcUser.username
        , uri: dcUser.uri
        , first_name: dcUser.first_name
        , last_name: dcUser.last_name
      }
    };

    // TODO Only do this if password module is enabled
    //      Currently, this is not a valid way to check for enabled
    if (everyauth.password)
      params[everyauth.password.loginKey()] = "dotcloud:" + dcUser.id; // Hack because of way mongodb treate unique indexes

    this.create(params, callback);
  });
};
