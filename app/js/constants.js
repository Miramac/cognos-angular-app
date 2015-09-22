'use strict';

var AppSettings = {
  appTitle: 'Cognos WebApp',
  cognosCgi: '/cognos/cgi-bin/cognos.cgi',
  xmlCredentialTpl:'<credentials><credentialElements><name>CAMNamespace</name><label>AD</label><value><actualValue>AD</actualValue></value></credentialElements><credentialElements><name>CAMUsername</name><label>User ID:</label><value><actualValue>{{username}}</actualValue></value></credentialElements><credentialElements><name>CAMPassword</name><label>Password:</label><value><actualValue>{{password}}</actualValue></value></credentialElements></credentials>'
};

module.exports = AppSettings;