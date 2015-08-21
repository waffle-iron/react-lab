//var jsdom = require('node-jsdom'); // node.js
var jsdom = require('jsdom'); // io.js

// setup the simplest document possible
var doc = jsdom.jsdom('<!doctype html><html><body></body></html>');

// get the window object out of the document
var win = doc.defaultView;

// set globals for mocha that make access to document and window feel
// natural in the test environment
global.document = doc;
global.window = win;

// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(win);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (win) {
  for (var key in win) {
    if (win.hasOwnProperty(key)
      && global[key] === void 0) {
      global[key] = win[key];
    }
  }
}
