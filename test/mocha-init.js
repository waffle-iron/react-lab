// compilers
var cover = process.env.running_under_istanbul;
require('babel-core/register')({
  'only': cover ? ['**/__tests__/*.js'] : void 0,
  'stage': 0
});
require('require-noop')({
  extensions: ['.css', '.less', '.sass']
});

// assertions
require('chai').should();

// fake DOM
require('./dom.js');
