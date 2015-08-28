import React, { PropTypes } from 'react/addons';
import Component from 'PureComponent';
import classnames from 'classnames';

const _normalizeSize = (s = '') => s.toString().replace('/', '-');
const _cssShowOrHide = (show) => !show ? void 0 : 'display: block; padding-left: 0;';

export
function reduceSizeProps(props, prefix = 'pure-u') {
  const { auto, size, sm, md, lg, xl, className, ...ps } = props;
  if (auto) {
    ps.className = classnames(prefix, className);
  }
  else {
    ps.className = classnames(
      size && prefix + '-' + _normalizeSize(size),
      sm && prefix + '-sm-' + _normalizeSize(sm),
      md && prefix + '-md-' + _normalizeSize(md),
      lg && prefix + '-lg-' + _normalizeSize(lg),
      xl && prefix + '-xl-' + _normalizeSize(xl),
      className
    );
  }
  return ps;
}

export
class Grid extends Component {
  render() {
    const { className, ...props } = this.props;
    props.className = classnames('pure-g', className);
    return <div {...props} />;
  }
}

export
class Cell extends Component {
  render() {
    const props = reduceSizeProps(this.props);
    return <div {...props} />;
  }
}
Cell.propTypes = {
  auto: PropTypes.bool,
  size: PropTypes.string.isRequired,
  sm: PropTypes.string,
  md: PropTypes.string,
  lg: PropTypes.string,
  xl: PropTypes.string
}

export
class Mask extends Component {
  render() {
    const { show, className, ...props } = this.props;
    props.className = classnames('pure-mask', className);
    props.style = _cssShowOrHide(show);
    return <div {...props} />;
  }
}
Mask.propTypes = {
  show: PropTypes.bool
}

export
class Well extends Component {
  render() {
    const { show, className, ...props } = this.props;
    props.className = classnames('pure-well', className);
    props.style = _cssShowOrHide(show);
    return <div {...props} />;
  }
}
Well.propTypes = {
  show: PropTypes.bool
}
