import React, { PropTypes } from 'react';
import Component from 'PureComponent';

class Header extends Component {
  render() {
    return <div className="footer">&copy; {(new Date()).getFullYear()} Zenith China Inc.</div>
  }
}

export default Header;
