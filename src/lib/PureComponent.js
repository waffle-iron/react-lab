import React from 'react/addons';

const PureComponent = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  node(refId) {
    const comp = refId ? this.refs[refId] : this;
    return React.findDOMNode(comp);
  },
  render() {
    console.warn('It is an abstract class.');
  }
});

export default PureComponent;
