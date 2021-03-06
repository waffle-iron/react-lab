import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactTestUtils from 'react-addons-test-utils';

import Editable from '../Editable';

let _value = '1';
let _cancelled = false;
const _eventHandlers = {
  onUpdate: value => _value = value,
  onCancel: () => _cancelled = true
};
const _elem = () => {
  return <Editable text="OK" value={_value} {..._eventHandlers} />;
};
const _html = () => {
  return ReactDOMServer.renderToStaticMarkup(_elem());
};
const _comp = (eventHandlers) => {
  return ReactTestUtils.renderIntoDocument(_elem());
};

describe('Pure', () => {

  describe('Editable', () => {
    it('should be: <div>OK</div>', () => {
      const h = _html();
      h.should.be.equal('<div>OK</div>');
    });
    it('should turn into edit mode when doubleClicked', () => {
      const comp = _comp();
      ReactTestUtils.Simulate.doubleClick(comp.node());
      comp.state.editing.should.be.true;
    });
    it('should change state.editValue', () => {
      _value = '1';
      const newValue = '2';
      const comp = _comp();
      ReactTestUtils.Simulate.doubleClick(comp.node());
      const node = comp.input();
      node.value = newValue;
      ReactTestUtils.Simulate.change(node);
      comp.state.editValue.should.be.equal(newValue);
    });
    it('should update _value when keyUp(Enter)', () => {
      _value = '11';
      const newValue = '12';
      const comp = _comp();
      ReactTestUtils.Simulate.doubleClick(comp.node());
      const node = comp.input();
      node.value = newValue;
      ReactTestUtils.Simulate.change(node);
      ReactTestUtils.Simulate.keyUp(node, {key: 'Enter'});
      comp.state.editing.should.be.false;
      _value.should.be.equal(newValue);
    });
    it('should update _cancelled and _value is unchanged when keyUp(Escape)', () => {
      _value = '21';
      const oldValue = _value;
      const newValue = '22';
      _cancelled = false;
      const comp = _comp();
      ReactTestUtils.Simulate.doubleClick(comp.node());
      const node = comp.input();
      node.value = newValue;
      ReactTestUtils.Simulate.change(node);
      ReactTestUtils.Simulate.keyUp(node, {key: 'Escape'});
      comp.state.editing.should.be.false;
      _value.should.be.equal(oldValue);
      _cancelled.should.be.true;
    });
    it('should update _value when blur', () => {
      _value = '31';
      const newValue = '32';
      _cancelled = false;
      const comp = _comp();
      ReactTestUtils.Simulate.doubleClick(comp.node());
      const node = comp.input();
      node.value = newValue;
      ReactTestUtils.Simulate.change(node);
      ReactTestUtils.Simulate.blur(node);
      comp.state.editing.should.be.false;
      _value.should.be.equal(newValue);
    });
  });

});
