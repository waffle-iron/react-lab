import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Footer from '../Footer';

describe('Footer', () => {
  it('render', () => {
    const h = ReactDOMServer.renderToStaticMarkup(<Footer />);
    h.should.be.equal('<div class="footer">© 2015 Zenith China Inc.</div>');
  });
});
