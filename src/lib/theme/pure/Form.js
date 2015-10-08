import React, { PropTypes } from 'react';
import Component from 'PureComponent';
import classnames from 'classnames';

class Form extends Component {
  render() {
    const { className, stacked, aligned, ...props } = this.props;
    props.className = classnames(
      'pure-form', {
        'pure-form-stacked': stacked,
        'pure-form-aligned': aligned
      },
      className
    );
    return <form {...props} />;
  }
}
Form.propTypes = {
  stacked: PropTypes.bool,
  aligned: PropTypes.bool
};
Form.defaultProps = {
  stacked: false,
  aligned: false
};

class LR extends Component {
  render() {
    const { className, ...props } = this.props;
    props.className = classnames('pure-control-group', className);
    return <div {...props} />;
  }
}

class L extends Component {
  render() {
    return <label {...this.props} />;
  }
}
class R extends Component {
  render() {
    const { className, ...props } = this.props;
    props.className = classnames('pure-controls', className);
    return <div {...props} />;
  }
}

Form.Aligned = { LR, L, R };

export default Form;
