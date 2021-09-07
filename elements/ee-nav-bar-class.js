import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { tpeRegistry } from '../lib/tpeRegistry'

export class EeNavBar extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 56px;
          z-index: 100;
        }

        :host nav {
          display: flex;
          width: 100%;
          height: 56px;
          background: var(--ee-navbar-background, white);
          color: var(--ee-navbar-color, black);
          fill: var(--ee-navbar-color, black);
        }

        :host nav > ::slotted(*[nav-item]) {
          margin: 0 auto;
          padding: 8px 12px;
          display: block;
          position: relative;
          opacity: 0.7;
          height: 24px;
          min-width: 80px;
          max-width: 168px;
          text-align: center;
        }

        :host nav > ::slotted(*[nav-item])::after {
          content: attr(item-label);
          position: absolute;
          top: 24px;
          left: 50%;
          line-height: 12px;
          font-size: 12px;
          transform: translateX(-50%);
          margin-top: 6px;
          padding: 6px;
          white-space: nowrap;
          text-transform: uppercase;
        }

        :host nav > ::slotted(*[selected]) {
          opacity: 1;
        }
      `
    ]
  }

  static get properties () {
    return {
      selected: { type: String, reflect: true },
      selectedAttribute: { type: String },
      eventBubbles: { type: Boolean }
    }
  }

  constructor () {
    super()
    this.selected = ''
    this.eventBubbles = false
    this.selectedAttribute = 'name'
  }

  render () {
    
    return html`
      <nav>
        <slot @slotchange="${this._manageSlotted}"></slot>
      </nav>
    `
  }

  connectedCallback () {
    super.connectedCallback()
    // Listen to local clicked-slot event
    this.addEventListener('clicked-slot', this._fireSelectedEvent)
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlotted (e) {
    const slot = e.currentTarget
    const slotted = slot.assignedNodes()
    for (const element of slotted) {
      element.addEventListener('click', this._clickedSlotted.bind(this))
    }
  }

  // Each tab runs this and fires a clicked-slot event, which carries the selected value, It gets the value from the name attribute of the slotted "tab"
  _clickedSlotted (e) {
    console.log('slot clicked', this.selectedAttribute)
    this.dispatchEvent(new CustomEvent('clicked-slot', { detail: { event: e, selected: e.currentTarget.getAttribute(this.selectedAttribute) } }))
  }

  // This function runs when the host element receives a clicked-slot event from it's children. It sets the selected property and fires a 'selected-changed' event with that value.
  _fireSelectedEvent (e) {
    this.dispatchEvent(new CustomEvent('selected-changed', { detail: { selected: e.detail.selected } }))
    this.selected = e.detail.selected
  }
}
tpeRegistry.register('ee-nav-bar', EeNavBar)
