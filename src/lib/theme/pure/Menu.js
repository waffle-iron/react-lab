import React, { PropTypes } from 'react/addons';
import Component from 'PureComponent';
import classnames from 'classnames';

class MenuItemLabel extends Component {
  render() {
    var label = this.props.label;
    if (typeof label === 'string') {
      return <span>{label}</span>;
    }

    const { url, text, heading } = label;
    const cls = classnames({
      'pure-menu-link': url,
      'pure-menu-heading': heading
    });
    if (url) {
      return <a href={url} className={cls}>{text}</a>;
    }
    else if (heading) {
      return <span className={cls}>{text}</span>;
    }
    else {
      return <span>{text}</span>;
    }
  }
}
MenuItemLabel.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired
};

class MenuItem extends Component {
  render() {
    const { label, items, allowHover, className, disabled, selected, ...props } = this.props;
    props.className = classnames(
      'pure-menu-item', className, {
        'pure-menu-allow-hover': allowHover,
        'pure-menu-disabled': disabled,
        'pure-menu-has-children': items,
        'pure-menu-selected': selected
      });
    const $items = items ? (
      <ul className="pure-menu-children">
        {items.map((item, i) => {
          return <MenuItem key={i} {...item} />;
        })}
      </ul>
    ) : void 0;
    return (
      <li {...props}>
        <MenuItemLabel label={label} />
        {$items}
      </li>
    );
  }
}
MenuItem.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ]).isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  allowHover: PropTypes.bool,
  disabled: PropTypes.bool,
  selected: PropTypes.bool
};
MenuItem.defaultProps = {
  allowHover: false,
  disabled: false,
  selected: false
};

export default
class Menu extends Component {
  render() {
    const { label, items, className, horizontal, scrollable, ...props } = this.props;
    props.className = classnames(
      'pure-menu', className, {
        'pure-menu-horizontal': horizontal,
        'pure-menu-scrollable': scrollable
      });
    const $label = label ? <MenuItemLabel label={label} /> : void 0;
    return (
      <div {...props}>
        {$label}
        <ul className="pure-menu-list">
          {items.map((item, i) => {
            return <MenuItem key={i} {...item} />;
          })}
        </ul>
      </div>
    );
  }
}
Menu.propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string, PropTypes.object
  ]),
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  horizontal: PropTypes.bool,
  scrollable: PropTypes.bool
};
Menu.defaultProps = {
  horizontal: false,
  scrollable: false
};

Menu.ItemLabel = MenuItemLabel;
Menu.Item = MenuItem;

export default Menu;
