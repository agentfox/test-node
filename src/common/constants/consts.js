'use strict';

exports.Constants = {
  SCHEMA_OPTIONS: {
    versionKey: false,
    getters: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    id: false
  },
  ROLES: {
    ADMIN: 'admin',
    CLIENT: 'client',
    ROOT: 'super admin'
  },
  RESULT_DEV_API: `<h1 style="text-align: center;color: darkred;margin-top: 150px;">
        <a style="text-decoration: none;font-size: 45px;color: darkred" target="_blank" href="http://vmodev.com">Welcome Signage's API Development</a></h1>`,
  RESULT_PROD_API: `<h1 style="text-align: center;color: darkred;margin-top: 150px;">
        <a style="text-decoration: none;font-size: 45px;color:darkred;" target="_blank" href="http://vmodev.com">Welcome Signage's API Production</a></h1>`,
  REGISTRATION_TOKEN: "dMQa6wvfiXk:APA91bG1P8L7sHZw7BWV10sN6apsF_c_tbL4JMr_48OTFEoAJYEPuj3CPn3YebznGRZWOXemIduk4TKbJEW4mFceILL71Inj5cSTVvlwu-hU1kTFXFhz20gx03ACET_yCmPintS-bMxo"
};