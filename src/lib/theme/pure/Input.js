import React, { PropTypes } from 'react';
import Component from 'PureComponent';
import classnames from 'classnames';
import { reduceSizeProps } from './Pure';

/**
 * prop.input
 *   radio: ()label
 *   checkbox: []label
 *   password: label[*]
 *   text: label[-placeholder] or label(-placeholder)
 *   textarea: label[=placeholder] or label(=placeholder)
 *   file: label[^placeholder]
 *   select: label{-1} or label{=6}
 */
const _INPUT_LIKE = /^(.*)(\[.*\]|\(.*\)|\{.*\})(.*)$/;

const _parse = (input) => {
  const found = input.match(_INPUT_LIKE);
  const opts = {
    txtL: found[1] || void 0,
    txtR: found[3] || void 0,
  };
  return _flg2type(found[2], opts);
};

const _flg2type = (f, opts) => {
  opts.multiple = f[1] === '=';
  if (f[0] === '{') {
    opts.enum = true;
    opts.type = 'select';
    opts.size = f.length > 3 ? parseInt(f.substring(2, f.length - 1)) : 1;
  }
  else {
    switch (f[1]) {
      case '-': opts.type = 'text'; break;
      case '=': opts.type = 'textarea'; break;
      case ']':
        opts.type = 'checkbox';
        opts.bool = true;
        break;
      case ')':
        opts.type = 'radio';
        opts.bool = true;
        break;
      case '*': opts.type = 'password'; break;
      case '^': opts.type = 'file'; break;
      default:
        throw new Error('Unknown input flag: ' + f);
    }
    if (!opts.bool) {
      opts.rounded = f[0] === '(';
      opts.txtHint = f.length > 3 ?
        f.substring(2, f.length - 1) : '';
    }
  }
  return opts;
};

const _inputElem = (opts, props) => {
  if (opts.bool) {
    return <input type={opts.type} {...props} />;
  }
  else if (opts.enum) {
    const { items, ...ps } = reduceSizeProps(props);
    const itemElems = items.map((item, i) => {
      return <option key={i} value={item.val}>{item.txt}</option>;
    });
    return <select size={opts.size} multiple={opts.multiple}
      {...ps}>{itemElems}</select>;
  }
  else {
    const { className, ...ps } = reduceSizeProps(props);
    ps.className = classnames(
      className, opts.rounded && 'pure-input-rounded'
    );
    if (opts.multiple) {
      return <textarea placeholder={opts.txtHint} {...ps} />;
    }
    else {
      return <input type={opts.type} placeholder={opts.txtHint} {...ps} />;
    }
  }
};

class Input extends Component {

  render() {
    const { input, br, ...props } = this.props;
    const opts = _parse(input);
    if (!opts) return void 0;

    props.ref = 'input';
    const elem = _inputElem(opts, props);
    if (opts.txtL || opts.txtR) {
      const cls = br ? ('pure-' + opts.type) : void 0;
      return (
        <label htmlFor={props.id} className={cls}>
          {opts.txtL}{elem}{opts.txtR}
        </label>
      );
    }
    else {
      return elem;
    }
  }

  input() {
    return this.node('input');
  }
  focus() {
    return this.input().focus();
  }

}
Input.propTypes = {
  input: PropTypes.string.isRequired
};

export default Input;
