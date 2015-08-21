import React, { PropTypes } from 'react/addons';
import Component from 'PureComponent';

class Header extends Component {
  render() {
    const { history, current } = this.props;
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
}
const linkShape = PropTypes.shape({
  url: PropTypes.string,
  txt: PropTypes.string
});
Header.propTypes = {
  history: PropTypes.arrayOf(linkShape).isRequired,
  current: linkShape.isRequired
};

export default Header;
