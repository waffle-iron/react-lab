import React from 'react';
import { Grid, Cell } from '../Pure';

describe('Pure', () => {

  describe('Cell', () => {
    it('should be: <div class="pure-u">OK</div>', () => {
      const h = React.renderToStaticMarkup(<Cell auto>OK</Cell>);
      h.should.be.equal('<div class="pure-u">OK</div>');
    });
    it('should be: <div class="pure-u-1-3">OK</div>', () => {
      const h = React.renderToStaticMarkup(<Cell size="1/3">OK</Cell>);
      h.should.be.equal('<div class="pure-u-1-3">OK</div>');
    });
    it('should be: <div class="pure-u-1-3 pure-u-sm-1-2 pure-u-lg-1-4">OK</div>', () => {
      const h = React.renderToStaticMarkup(<Cell size="1/3" sm="1/2" lg="1/4">OK</Cell>);
      h.should.be.equal('<div class="pure-u-1-3 pure-u-sm-1-2 pure-u-lg-1-4">OK</div>');
    });
    it('should be: <div class="pure-u-1-3 pure-u-md-1-2 pure-u-xl-1-4">OK</div>', () => {
      const h = React.renderToStaticMarkup(<Cell size="1/3" md="1/2" xl="1/4">OK</Cell>);
      h.should.be.equal('<div class="pure-u-1-3 pure-u-md-1-2 pure-u-xl-1-4">OK</div>');
    });
  });

});
