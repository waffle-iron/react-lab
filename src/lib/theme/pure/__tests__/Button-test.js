import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Button from '../Button';

describe('Pure', () => {

  describe('Button', () => {
    it('should be: <button type="button" class="pure-button pure-button-primary"></button>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(<Button primary={true}>OK</Button>);
      h.should.be.equal('<button type="button" class="pure-button pure-button-primary">OK</button>');
    });
    it('should be: <button type="button" class="pure-button pure-button-disabled pure-button-primary">OK</button>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(<Button primary={true} disabled={true}>OK</Button>);
      h.should.be.equal('<button type="button" class="pure-button pure-button-disabled pure-button-primary">OK</button>');
    });
    it('should be: <button type="submit" class="pure-button pure-button-active pure-button-primary">OK</button>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(<Button type="submit" primary={true} active={true}>OK</Button>);
      h.should.be.equal('<button type="submit" class="pure-button pure-button-active pure-button-primary">OK</button>');
    });
  });

});
