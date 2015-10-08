import React, { PropTypes } from 'react';
import Component from 'PureComponent';
import classnames from 'classnames';

class Button extends Component {
  render() {
    const { type, href, className, active, disabled, primary, ...props } = this.props;
    props.className = classnames(
      'pure-button', className, {
        'pure-button-active': active,
        'pure-button-disabled': disabled,
        'pure-button-primary': primary
      });

    if (href) {
      return <a href={href} {...props} />;
    }
    else {
      return <button type={type || 'button'} {...props} />;
    }
  }
}
Button.propTypes = {
  type: PropTypes.string,
  href: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  primary: PropTypes.bool
};
Button.defaultProps = {
  active: false,
  disabled: false,
  primary: false
};

export default Button;
