import { defineProperty, observer, computed } from '@ember/object';
import Component from '@ember/component';
import layout from './template';
import { camelize } from '@ember/string';

export default Component.extend({
  tagName: 'button',
  layout,
  attributeBindings: ['type', 'title'],
  classNameBindings: ['isActive:active'],
  type: 'button',
  init() {
    this._super(...arguments);
    this._updateIsActiveCP();
  },
  onForDidChange: observer('attributeName', 'attributeValue', function() {
    this._updateIsActiveCP();
  }),
  _updateIsActiveCP() {
    let attributeName = this.get('attributeName');
    let fullPath = `editor.activeSectionAttributes.${camelize(attributeName)}`;
    let cp = computed(fullPath, 'attributeValue', function(){
      return (this.get(fullPath) || []).includes(this.get('attributeValue'));
    });
    defineProperty(this, 'isActive', cp);
  },
  click() {
    let editor = this.get('editor');
    let attributeName = this.get('attributeName');
    let attributeValue = this.get('attributeValue');
    editor.setAttribute(attributeName, attributeValue);
  }
});
