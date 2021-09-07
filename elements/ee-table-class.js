import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { tpeRegistry } from '../lib/tpeRegistry'

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://dev.to/drews256/ridiculously-easy-row-and-column-layouts-with-flexbox-1k01

// https://github.com/Victor-Bernabe/lit-media-query/blob/master/lit-media-query.js

// eslint-disable-next-line new-cap
export class EeTable extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      super.styles || [],
      css`
        :host {
          display: block;
          width: 100%;
        }

        :host([striped]) ::slotted(ee-row:nth-child(odd)) {
          background-color: var(--ee-table-striped-odd-color, white)
        }

        :host([striped]) ::slotted(ee-row:nth-child(even)) {
          background-color: var(--ee-table-striped-even-color, whitesmoke)
        }
      `
    ]
  }

  static get properties () {
    return {
      small: {
        type: String
      },
      medium: {
        type: String
      }
    }
  }

  constructor () {
    super()
    this.small = 600
    this.medium = 1024
  }

  _changeRowsSize (size) {
    const rows = this.shadowRoot.querySelector('slot').assignedElements()
    for (const row of rows) row.setAttribute('size', size)
  }

  _handleResize () {
    if (window.matchMedia(`(max-width: ${this.small}px)`).matches) {
      this._changeRowsSize('small')
    } else if (window.matchMedia(`(max-width: ${this.medium}px)`).matches) {
      this._changeRowsSize('medium')
    } else {
      this._changeRowsSize('large')
    }
  }

  firstUpdated () {
    super.firstUpdated()
    this._handleResize()
  }

  connectedCallback () {
    super.connectedCallback()

    // Check if Visual Viewport API is supported
    const listenObject = window.visualViewport || window
    listenObject.addEventListener('resize', () => {
      this._handleResize()
    })
  }

  render () {
    
    return html`
      <slot @slotchange="${this._slotChanged}"></slot>
    `
  }

  _slotChanged () {
    this._handleResize()
    // this._updateDragDrop()
  }
}
tpeRegistry.register('ee-table', EeTable)
