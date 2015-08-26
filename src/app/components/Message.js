import React, { PropTypes } from 'react';
import Component from 'PureComponent';

class Message extends Component {
  render() {
    const { message } = this.props;
    return (
      <div className="message"
        style={{display: message ? 'block' : 'none'}}>
        <div>{message}</div>
      </div>
    );
  }
}
Message.PropTypes = {
  message: PropTypes.string.isRequired
};

export default Message;
