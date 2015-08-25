import React from 'react';
import Table from '../Table';

describe('Pure', () => {

  describe('Table.Row', () => {
    it('should be: <table class="pure-table"><tr class=""><td>OK</td></tr></table>', () => {
      const h = React.renderToStaticMarkup(<Table><Table.Row><td>OK</td></Table.Row></Table>);
      h.should.be.equal('<table class="pure-table"><tr class=""><td>OK</td></tr></table>');
    });
    it('should be: <table class="pure-table"><tr class="pure-table-odd"><td>OK</td></tr></table>', () => {
      const h = React.renderToStaticMarkup(<Table><Table.Row odd><td>OK</td></Table.Row></Table>);
      h.should.be.equal('<table class="pure-table"><tr class="pure-table-odd"><td>OK</td></tr></table>');
    });
    it('should be: <table class="pure-table"><tr class="pure-table-odd selected"><td>OK</td></tr></table>', () => {
      const h = React.renderToStaticMarkup(<Table><Table.Row odd selected><td>OK</td></Table.Row></Table>);
      h.should.be.equal('<table class="pure-table"><tr class="pure-table-odd selected"><td>OK</td></tr></table>');
    });
  });

  describe('Table', () => {
    it('should be: <table class="pure-table pure-table-bordered">OK</table>', () => {
      const h = React.renderToStaticMarkup(<Table bordered={true}>OK</Table>);
      h.should.be.equal('<table class="pure-table pure-table-bordered">OK</table>');
    });
    it('should be: <table class="pure-table pure-table-striped">OK</table>', () => {
      const h = React.renderToStaticMarkup(<Table striped={true}>OK</Table>);
      h.should.be.equal('<table class="pure-table pure-table-striped">OK</table>');
    });
    it('should be: <table class="pure-table pure-table-horizontal">OK</table>', () => {
      const h = React.renderToStaticMarkup(<Table horizontal={true}>OK</Table>);
      h.should.be.equal('<table class="pure-table pure-table-horizontal">OK</table>');
    });
  });

});
