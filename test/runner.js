'use strict';

(function() {

  if (typeof exports !== "object") {
    // for node (polyfill)
    require('babel/polyfill');
  } else {
    // for browser (polyfill & global utilities)
    require('babel/browser-polyfill');
    window.assert = require('power-assert');
    window.sinon = require('sinon');
  }

})();
