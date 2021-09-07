import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import tpeRegistry from '../lib/tpeRegistry'

export class EeToolbar extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          box-sizing: border-box;
          width: 100%;
          align-items: center;
          position: relative;
          height: var(--ee-toolbar-height, 100%);
          max-height: var(--ee-toolbar-max-height, 96px);
          padding: 0 5px;
          pointer-events: none;
          font-size: var(--ee-toolbar-font-size, 20px);
        }

        :host ::slotted(*) {
          pointer-events: auto;
        }

        :host ::slotted(.icon) {
          font-size: 0;
        }

        :host ::slotted([title]) {
          display: flex;
          margin: auto 20px;
        }

        :host ::slotted([bottom-item]) {
          position: absolute;
          top: unset;
          bottom: 0;
          right: 0;
          left: 0;
        }

        :host ::slotted([top-item]) {
          position: absolute;
          top: 0;
          bottom: unset;
          right: 0;
          left: 0;
        }

        :host ::slotted([spacer]) {
          margin-left: 64px;
        }
      `
    ]
  }

  render () {
    
    return html`
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-toolbar', EeToolbar)
