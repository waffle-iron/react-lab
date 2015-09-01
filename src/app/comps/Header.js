import React, { PropTypes } from 'react';
import Component from 'PureComponent';

class Header extends Component {
  render() {
    const { nav } = this.props;
    if (nav.length > 0) {
      const history = [...nav];
      const current = history.pop();
      return (
        <div className="header">
          {history.map((link, idx) =>
            <span key={idx}>
              <a href={link.url}>{link.txt}</a>
              <i className="fa fa-chevron-right" />
            </span>
          )}
          <span>{current.txt}</span>
        </div>
      );
    }
    else {
      return <div className="header" />;
    }
  }
}
Header.propTypes = {
  nav: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    txt: PropTypes.string
  })).isRequired
};

export default Header;
