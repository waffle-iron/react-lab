import React from 'react';
import Form from '../Form';

describe('Pure', () => {

  describe('Form', () => {
    it('should be: <form class="pure-form">OK</form>', () => {
      const h = React.renderToStaticMarkup(<Form>OK</Form>);
      h.should.be.equal('<form class="pure-form">OK</form>');
    });
    it('should be: <form class="pure-form pure-form-stacked">OK</form>', () => {
      const h = React.renderToStaticMarkup(<Form stacked>OK</Form>);
      h.should.be.equal('<form class="pure-form pure-form-stacked">OK</form>');
    });
    it('should be: <form class="pure-form pure-form-aligned">OK</form>', () => {
      const h = React.renderToStaticMarkup(<Form aligned>OK</Form>);
      h.should.be.equal('<form class="pure-form pure-form-aligned">OK</form>');
    });
  });

});
