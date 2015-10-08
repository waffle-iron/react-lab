import React from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactTestUtils from 'react-addons-test-utils';

import Input from '../Input';

const _noop = (evt) => {};

describe('Pure', () => {

  describe('Input[checkbox]', () => {
    // checkbox (checked, disabled)
    it('should be: <label for="foo-id"><input type="checkbox" id="foo-id" name="foo" value="bar" checked="" disabled=""/>Foo</label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input id="foo-id" input="[]Foo" name="foo" value="bar" checked={true} disabled={true} />);
      h.should.be.equal('<label for="foo-id"><input type="checkbox" id="foo-id" name="foo" value="bar" checked="" disabled=""/>Foo</label>');
    });
  });

  describe('Input[radio]', () => {
    // radio (checked, onChange)
    it('should be: <label for="foo-id"><input type="radio" id="foo-id" name="foo" value="bar" checked=""/>Foo</label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input id="foo-id" input="()Foo" name="foo" value="bar" checked={true} onChange={_noop} />);
      h.should.be.equal('<label for="foo-id"><input type="radio" id="foo-id" name="foo" value="bar" checked=""/>Foo</label>');
    });
  });

  describe('Input[text]', () => {
    // text (readOnly, disabled)
    it('should be: <label for="foo-id">Foo<input type="text" placeholder="Bar" id="foo-id" name="foo" value="bar" readonly="" disabled="" class=""/></label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input input="Foo[-Bar]" id="foo-id" name="foo" value="bar" readOnly={true} disabled={true} />);
      h.should.be.equal('<label for="foo-id">Foo<input type="text" placeholder="Bar" id="foo-id" name="foo" value="bar" readonly="" disabled="" class=""/></label>');
    });
    // text (readOnly, size)
    it('should be: <label for="foo-id">Foo<input type="text" placeholder="Bar" id="foo-id" name="foo" value="bar" readonly="" class="pure-u-23-24"/></label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input input="Foo[-Bar]" id="foo-id" name="foo" value="bar" readOnly={true} size="23/24" />);
      h.should.be.equal('<label for="foo-id">Foo<input type="text" placeholder="Bar" id="foo-id" name="foo" value="bar" readonly="" class="pure-u-23-24"/></label>');
    });
    // text (onChange)
    it('should be: <label for="foo-id">Foo<input type="text" placeholder="Bar" id="foo-id" name="foo" value="bar" class=""/></label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input input="Foo[-Bar]" id="foo-id" name="foo" value="bar" onChange={_noop} />);
      h.should.be.equal('<label for="foo-id">Foo<input type="text" placeholder="Bar" id="foo-id" name="foo" value="bar" class=""/></label>');
    });
  });

  describe('Input[textarea]', () => {
    // textarea (readOnly, disabled)
    it('should be: <label for="foo-id">Foo<textarea placeholder="Bar" id="foo-id" name="foo" readonly="" disabled="" class="">bar</textarea></label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input input="Foo[=Bar]" id="foo-id" name="foo" value="bar" readOnly={true} disabled={true} />);
      h.should.be.equal('<label for="foo-id">Foo<textarea placeholder="Bar" id="foo-id" name="foo" readonly="" disabled="" class="">bar</textarea></label>');
    });
    // textarea (onChange)
    it('should be: <label for="foo-id">Foo<textarea placeholder="Bar" id="foo-id" name="foo" class="pure-u-11-12">bar</textarea>Boo</label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input input="Foo[=Bar]Boo" id="foo-id" name="foo" value="bar" size="11/12" onChange={_noop} />);
      h.should.be.equal('<label for="foo-id">Foo<textarea placeholder="Bar" id="foo-id" name="foo" class="pure-u-11-12">bar</textarea>Boo</label>');
    });
  });

  describe('Input[file]', () => {
    // file (size, onChange)
    it('should be: <label for="foo-id">Foo<input type="file" placeholder="Bar" id="foo-id" name="foo" value="bar" class="pure-u-11-12"/></label>', () => {
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input input="Foo[^Bar]" id="foo-id" name="foo" value="bar" size="11/12" onChange={_noop} />);
      h.should.be.equal('<label for="foo-id">Foo<input type="file" placeholder="Bar" id="foo-id" name="foo" value="bar" class="pure-u-11-12"/></label>');
    });
  });

  describe('Input[select]', () => {
    // select
    it('should be a <select>', () => {
      const items = [
        {val: 'A', txt: 'Apple'},
        {val: 'B', txt: 'Banana'},
        {val: 'C', txt: 'Cranberry'},
      ];
      const h = ReactDOMServer.renderToStaticMarkup(
        <Input input="Foo{-}" items={items} id="foo-id" name="foo" size="11/12" onChange={_noop} />);
      h.should.be.equal([
        '<label for="foo-id">Foo',
        '<select size="1" id="foo-id" name="foo" class="pure-u-11-12">',
        '<option value="A">Apple</option>',
        '<option value="B">Banana</option>',
        '<option value="C">Cranberry</option>',
        '</select></label>',
      ].join(''));
    });
  });

  describe('renderIntoDocument', () => {
    it('should render an email input', () => {
      const comp = ReactTestUtils.renderIntoDocument((
        <Input input="[-Email]" id="email" />
      ));
      const node = comp.input();
      node.id.should.be.equal('email');
      node.type.should.be.equal('text');
      node.getAttribute('placeholder').should.be.equal('Email');
    });
    it('should render an email input with label fixed', () => {
      const comp = ReactTestUtils.renderIntoDocument((
        <Input input="Please mail [-Email] to me!" id="email" />
      ));
      const node = comp.input();
      node.id.should.be.equal('email');
      node.type.should.be.equal('text');
      node.getAttribute('placeholder').should.be.equal('Email');
    });
  });

});
