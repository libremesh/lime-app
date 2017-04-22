const jsSHA = require("jssha");

const getChallenge = (api) => {
  return api.call('','',[],'challenge');
};

const shaToken = (password, token) => {
  let shaPassword = new jsSHA("SHA-1", "TEXT");
  let shaToken = new jsSHA("SHA-1", "TEXT");
  shaPassword.update(password);
  shaToken.update(token);
  shaToken.update(shaPassword.getHash('HEX'));
  return shaToken.getHash('HEX');
};

export const login = (api, auth) => {
  return getChallenge(api)
    .map(x => x.token)
    .switchMap((token) => {
      let shaPassword = shaToken(auth.password, token);
      return api.call('','', [auth.user, shaPassword],'login').map(data => data.success);
    });
};

export const changeUrl = (api, url) => {
  api._wss.url = url;
  return api.call('','',[],'reconect');
};

export const getCloudNodes = (api, sid) => {
  return api.call(sid, 'get_cloud_nodes', {})
   .map(x => x.nodes)
   .map(data => Object.keys(data).map((key, index)=>data[key]).reduce((x,y) => x.concat(y), []));
};

export const getHostname = (api, sid) => {
  return api.call(sid, 'get_hostname', {});
};