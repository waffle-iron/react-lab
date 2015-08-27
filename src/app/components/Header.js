import React, { PropTypes } from 'react';
import Component from 'PureComponent';

class Header extends Component {
  render() {
    const { navis } = this.props;
    if (navis.length > 0) {
      const history = [...navis];
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
  navis: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string,
    txt: PropTypes.string
  })).isRequired
};

export default Header;
