import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { CustomStylesMixin } from '../mixins/CustomStylesMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class EeCell extends CustomStylesMixin((StyleableMixin(LitElement))) {
  static get styles () {
    return [
      css`
        :host {
          flex-grow: 1;
          flex-shrink: 1;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 3px;
          border: 1px solid transparent;
        }

        :host([selectable]:hover) {
          border: 1px solid var(--ee-cell-hover-border-color, #ddd);
          background-color: 1px solid var(--ee-cell-hover-background-color, #eee);
        }

        :host([sq]) {
          flex-grow: 0.25;
        }
        :host([sh]) {
          flex-grow: 0.5;
        }
        :host([s1]) {
          flex-grow: 1;
        }
        :host([s2]) {
          flex-grow: 2;
        }
        :host([s3]) {
          flex-grow: 3;
        }
        :host([s4]) {
          flex-grow: 4;
        }
        :host([s5]) {
          flex-grow: 5;
        }

        /*
         ::slotted(#dnd-handle) {
          cursor: pointer;
        }

        ::slotted(*) {
          cursor: pointer;
        }
        */

      `
    ]
  }

  static get properties () {
    return {
    }
  }

  constructor () {
    super()
    this.SOMETHING = false
  }

  connectedCallback () {
    super.connectedCallback()
  }

  render () {
    
    return html`
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-cell', EeCell)
