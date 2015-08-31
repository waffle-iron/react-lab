import React, { PropTypes } from 'react';
import Component from 'PureComponent';

class Loading extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div className="pure-mask loading"
        style={{display: loading ? 'block' : 'none'}}>
        <div>Loading{'...'.substr(0, loading)}</div>
      </div>
    );
  }
}
Loading.propTypes = {
  loading: PropTypes.number.isRequired
};

export default Loading;
