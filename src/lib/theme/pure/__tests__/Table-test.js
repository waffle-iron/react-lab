import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Table from '../Table';

describe('Pure', () => {

  describe('Table', () => {
    it('should be: <table class="pure-table pure-table-bordered">OK</table>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(<Table bordered={true}>OK</Table>);
      h.should.be.equal('<table class="pure-table pure-table-bordered">OK</table>');
    });
    it('should be: <table class="pure-table pure-table-striped">OK</table>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(<Table striped={true}>OK</Table>);
      h.should.be.equal('<table class="pure-table pure-table-striped">OK</table>');
    });
    it('should be: <table class="pure-table pure-table-horizontal">OK</table>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(<Table horizontal={true}>OK</Table>);
      h.should.be.equal('<table class="pure-table pure-table-horizontal">OK</table>');
    });
  });

});
