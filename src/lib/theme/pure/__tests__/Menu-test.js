import React from 'react';
import Menu from '../Menu';

describe('Pure', () => {

  describe('Menu.ItemLabel', () => {
    it('should be: <span>OK</span>', () => {
      const h = React.renderToStaticMarkup(<Menu.ItemLabel label='OK' />);
      h.should.be.equal('<span>OK</span>');
    });
    it('should be: <span>OK</span>', () => {
      const h = React.renderToStaticMarkup(<Menu.ItemLabel label={{text: 'OK'}} />);
      h.should.be.equal('<span>OK</span>');
    });
    it('should be: <a href="#" class="pure-menu-link">OK</a>', () => {
      const h = React.renderToStaticMarkup(<Menu.ItemLabel label={{text: 'OK', url: '#'}} />);
      h.should.be.equal('<a href="#" class="pure-menu-link">OK</a>');
    });
    it('should be: <span class="pure-menu-heading">OK</span>', () => {
      const h = React.renderToStaticMarkup(<Menu.ItemLabel label={{text: 'OK', heading: true}} />);
      h.should.be.equal('<span class="pure-menu-heading">OK</span>');
    });
    it('should be: <a href="#" class="pure-menu-link pure-menu-heading">OK</a>', () => {
      var label = {text: 'OK', url: '#', heading: true};
      const h = React.renderToStaticMarkup(<Menu.ItemLabel label={label} />);
      h.should.be.equal('<a href="#" class="pure-menu-link pure-menu-heading">OK</a>');
    });
  });

  describe('Menu.Item', () => {
    it('should be: <li class="pure-menu-item"><span>OK</span></li>', () => {
      const h = React.renderToStaticMarkup(<Menu.Item label='OK' />);
      h.should.be.equal('<li class="pure-menu-item"><span>OK</span></li>');
    });
    it('should be: <li class="pure-menu-item pure-menu-allow-hover"><span>OK</span></li>', () => {
      const h = React.renderToStaticMarkup(<Menu.Item allowHover={true} label='OK' />);
      h.should.be.equal('<li class="pure-menu-item pure-menu-allow-hover"><span>OK</span></li>');
    });
    it('should be: <li class="pure-menu-item pure-menu-disabled"><span>OK</span></li>', () => {
      const h = React.renderToStaticMarkup(<Menu.Item disabled={true} label="OK" />);
      h.should.be.equal('<li class="pure-menu-item pure-menu-disabled"><span>OK</span></li>');
    });
    it('should be: <ul class="pure-menu-children"></ul>', () => {
      const h = React.renderToStaticMarkup(<Menu.Item items={[]} label="OK" />);
      h.should.be.equal([
        '<li class="pure-menu-item pure-menu-has-children"><span>OK</span>',
        '<ul class="pure-menu-children"></ul></li>'
      ].join(''));
    });
    it('should has: <li class="pure-menu-item"><span>Sub1</span></li><li class="pure-menu-item"><span>Sub2</span></li>', () => {
      const h = React.renderToStaticMarkup(<Menu.Item items={[{label: 'Sub1'}, {label: 'Sub2'}]} label="OK" />);
      h.should.be.equal([
        '<li class="pure-menu-item pure-menu-has-children"><span>OK</span>',
        '<ul class="pure-menu-children">',
        '<li class="pure-menu-item"><span>Sub1</span></li>',
        '<li class="pure-menu-item"><span>Sub2</span></li>',
        '</ul></li>'
      ].join(''));
    });
    it('should be: <li class="pure-menu-item pure-menu-selected"><span>OK</span></li>', () => {
      const h = React.renderToStaticMarkup(<Menu.Item selected={true} label="OK" />);
      h.should.be.equal('<li class="pure-menu-item pure-menu-selected"><span>OK</span></li>');
    });
  });

  describe('Menu', () => {
    it('should be: <div class="pure-menu"><ul class="pure-menu-list"></ul></div>', () => {
      const h = React.renderToStaticMarkup(<Menu items={[]} />);
      h.should.be.equal('<div class="pure-menu"><ul class="pure-menu-list"></ul></div>');
    });
    it('should has: <li class="pure-menu-item"><span>Sub1</span></li><li class="pure-menu-item"><span>Sub2</span></li>', () => {
      const h = React.renderToStaticMarkup(<Menu items={[{label: 'Sub1'}, {label: 'Sub2'}]} />);
      h.should.be.equal([
        '<div class="pure-menu">',
        '<ul class="pure-menu-list">',
        '<li class="pure-menu-item"><span>Sub1</span></li>',
        '<li class="pure-menu-item"><span>Sub2</span></li>',
        '</ul></div>'
      ].join(''));
    });
    it('should be: <div class="pure-menu"><span>Main</span><ul class="pure-menu-list"></ul></div>', () => {
      const h = React.renderToStaticMarkup(<Menu label="Main" items={[]} />);
      h.should.be.equal('<div class="pure-menu"><span>Main</span><ul class="pure-menu-list"></ul></div>');
    });
    it('should be: <div class="pure-menu pure-menu-horizontal"><ul class="pure-menu-list"></ul></div>', () => {
      const h = React.renderToStaticMarkup(<Menu horizontal={true} items={[]} />);
      h.should.be.equal('<div class="pure-menu pure-menu-horizontal"><ul class="pure-menu-list"></ul></div>');
    });
    it('should be: <div class="pure-menu pure-menu-scrollable"><ul class="pure-menu-list"></ul></div>', () => {
      const h = React.renderToStaticMarkup(<Menu scrollable={true} items={[]} />);
      h.should.be.equal('<div class="pure-menu pure-menu-scrollable"><ul class="pure-menu-list"></ul></div>');
    });
  });

});
