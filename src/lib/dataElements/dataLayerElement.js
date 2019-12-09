const jp = require('../helpers/jsonpath.js');
module.exports = function(settings) {
  if (window.dataLayer) {
    let state = window.dataLayer.getState();
    let path = settings.path;
    if (!path.startsWith('$.')) {
      path = '$.' + path;
    }
    let res = jp(state, path);
    if (res && res.length > 0) {
      return res[0];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
