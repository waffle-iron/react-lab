import React from 'react';
import Footer from '../Footer';

describe('Footer', () => {
  it('render', () => {
    const h = React.renderToStaticMarkup(<Footer />);
    h.should.be.equal('<div class="footer">© 2015 Zenith China Inc.</div>');
  });
});
