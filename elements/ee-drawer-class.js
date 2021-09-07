import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { tpeRegistry } from '../lib/tpeRegistry'

const chevronLeft = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`

export class EeDrawer extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      css`
        /* The base style for the ee-drawer element.*/
       :host {
          --ee-drawer-width: 300px;
          --ee-drawer-background-color: #393939;
          --ee-drawer-selected-color: white;
          display: block;
          position: fixed;
          box-sizing: border-box;
          top: 0;
          left: 0;
          z-index: 1; /* z-index is 1 by default, which should fit most scenarios. But it can be adjust by the ee-drawer parent's CSS, is needed */ 
          width: 20px; /* It is reduced to 20px width, which is enough to provide a target are for dragging on the viewport's left edge  */
          height: 100vh;
          user-select: none;
        }

        /* Take entire viewport when opened */
        :host([opened]) {
          width: 100vw;
          height: 100vh;
        }

        /* This class contains the actual drawer UI. It is full height and aligned to the :host edges, but moved horizontally -100% (left) of it's width */
        #container {
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          overflow-x: hidden;
          background-color: var(--ee-drawer-background-color);
          will-change: transform;
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
        }

        /* Reposition the drawer content to the original left edge alignment when opened */
        :host([opened]) #container {
          will-change: transform;
          transform: translateX(0);
        }

        /* Only add the container shadow when opened */
        :host([backdrop][opened]) #container {
          box-shadow: var(--ee-drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14), 0 0 0 100vw rgba(0, 0, 0, 0.15))
        }

        /* The nav element styles.*/

        #nav  {
          box-sizing: border-box;
          width: 100%;
          min-width: var(--ee-drawer-width);
          height: 100%;
          padding: 30px 24px;
          background: var(--ee-drawer-background-color);
          position: relative;
          overflow: auto;
          padding-bottom: 64px;
        }

        /* This will style the drawer items. If the developer decides not to use an <a> tag, the item must have class="drawer-item"  */
        #nav ::slotted(a),
        #nav ::slotted(.drawer-item) {
          display: block;
          text-decoration: none;
          color: var(--ee-drawer-color, #ddd);
          line-height: 32px;
          padding: 0 24px;
          cursor: pointer;
          font-size: 0.9em;
        }

        #nav ::slotted(a[selected]),
        #nav ::slotted(.drawer-item[selected]) {
          color: var(--ee-drawer-selected-color);
          font-weight: bolder;
          border-left: 3px solid var(--ee-drawer-selected-color);
          background-color: rgba(255,255,255, 0.1);
        }

        #nav ::slotted(a:hover),
        #nav ::slotted(.drawer-item:hover) {
          background-color: rgba(255,255,255, 0.05);
        }

        /* A header item can be slotted with class="head". It can be a simple heading tag, or an element containing anything*/
        #nav ::slotted(.head) {
          color: var(--ee-drawer-color, white);
          box-sizing: border-box;
          width: 100%;
          border-bottom: 1px solid var(--ee-drawer-selected-color);
          padding: 6px 70% 6px 0;
          font-size: 1.15em;
          margin: 10px auto;
        }

        /* Close button styles */

        #close {
          -webkit-appearance: none;
          color: var(--ee-drawer-background-color);
          fill: var(--ee-drawer-background-color);
          position: absolute;
          right: 5px;
          z-index: 10;
          background-color: var(--ee-drawer-background-color);
          border: none;
          cursor: pointer;
          right: 0;
          height: 100%;
          box-sizing: border-box;
          padding: 0 2px;
        }

        #close svg {
          height: 20px;
          width: 20px;
        }

        #close:focus, #close:active {
          outline: none !important;
        }

        #close:active, #close:hover {
          filter: brightness(120%);
          fill: var(--ee-drawer-selected-color);
          color: var(--ee-drawer-selected-color);
        }
      `
    ]
  }

  static get properties () {
    return {
      opened: { type: Boolean, reflect: true },
      backdrop: { type: Boolean, reflect: true },
      closeButton: { type: Boolean, attribute: 'close-button' },
      closeThreshold: { type: Number },
      openThreshold: { type: Number }
    }
  }

  constructor () {
    super()
    this.backdrop = true
    this.closeButton = true
    this.opened = false
    // These properties allow the developer to decide how far the user needs to drag in order to trigger open and close events. Values between 0 and 1.
    this.closeThreshold = 0.6
    this.openThreshold = 0.6
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListener('click', this._handleOutsideClick)
    // Add listeners for the events to handle dragging the drawer. Touchevents must be added, besides the fact the mouse events are emulated in mobile devices
    // When these listeners are not added, scrolling behavior from the browser takes over and prevents emulated mouse events from firing.
    // To make sure behavior is consistent, the handlers must call event.preventDefault() which will avoid scrolling and duplicate emulated events
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    this.addEventListener('touchstart', this._handleDragStart)
    this.addEventListener('touchmove', this._handleDrag)
    this.addEventListener('touchend', this._handleDragEnd)
    // These are also needed to support dragging in desktop
    this.addEventListener('mousedown', this._handleDragStart)
    this.addEventListener('mousemove', this._handleDrag)
    this.addEventListener('mouseup', this._handleDragEnd)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.removeEventListener('click', this._handleOutsideClick)
    this.removeEventListener('touchstart', this._handleDragStart)
    this.removeEventListener('touchmove', this._handleDrag)
    this.removeEventListener('touchend', this._handleDragEnd)
    // These are also needed to support dragging in desktop
    this.removeEventListener('mousedown', this._handleDragStart)
    this.removeEventListener('mousemove', this._handleDrag)
    this.removeEventListener('mouseup', this._handleDragEnd)
  }

  firstUpdated () {
    this.container = this.shadowRoot.querySelector('div#container')
  }

  render () {
    
    return html`
      <div id="container">
        ${this.closeButton ? html`<button id="close" @click="${this.close}">${chevronLeft}</button>` : ''}
        <nav id="nav">
          <slot></slot>
        </nav>
      </div>
    `
  }

  open () {
    this.opened = true
  }

  close () {
    this.opened = false
  }

  toggle () {
    this.opened = !this.opened
  }

  _handleOutsideClick (e) {
    // This flag can be set to avoid closing the drawer after finishing a drag, which triggers a click
    if (this.ignoreNextClick) {
      this.ignoreNextClick = false
      return
    }

    if (e.target.nodeName === 'EE-DRAWER') this.close()
  }

  _handleDragStart (e) {
    // save starting point reference
    this.dragStart = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX
    // Force ee-drawer to be full viewport width during the event
    if (!this.opened) this.style.width = '100vw'
  }

  _handleDrag (e) {
    // ignore event if there wasn't a dragStart immediatelly before
    if (this.dragStart === undefined) return
    // Set this flag so it's possible to know if there's an ongoing drag
    this.dragging = true

    // Always call preventDefault when in a touch enabled device, to avoid duplicate simulated mouse events afterwards
    e.preventDefault()

    // Now, we need to compare the current pointer/touch position with the position at the start of the drag. We calculate the offset and get the width of the drawer.
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX
    const offset = x - this.dragStart
    const w = this.container.getBoundingClientRect().width

    // Determine the movement tolerance before triggering open or close during dragging.
    const openTrigger = (w - this.openThreshold * w)
    const closeTrigger = -1 * (w - this.closeThreshold * w)

    // Check if user dragged far enough for either closing or opening the drawer, call _finishDrag to cleanup
    if (offset < closeTrigger) {
      this.close()
      this._finishDrag()
      return
    } else if (offset > openTrigger) {
      this.open()
      // Necessary for mouse events, because calling preventDefault in mouseup handler does not cancel the click event after
      this.ignoreNextClick = true
      this._finishDrag()
      return
    }

    // if still within trigering range, update drawer position smoothly, using requestAnimationFrame
    requestAnimationFrame(() => {
      this.container.style.transform = `translateX(calc(${this.opened ? '' : '-100% +'} ${offset}px))`
    })
    return false
  }

  _handleDragEnd (e) {
    // If this event follows a touchmove/mousemove event, call preventDefault. It is necessary to prevent the click event from firing, as it is next the Event order:
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent#Event_order
    if (this.dragging) e.preventDefault()
    this.dragStart = undefined
    this.dragging = false
    this._finishDrag()
  }

  _finishDrag () {
    // This will clear flags and inline styles after the drag is done
    requestAnimationFrame(() => {
      this.container.style.transform = ''
      if (!this.opened) this.style.width = ''
    })
  }
}
tpeRegistry.register('ee-drawer', EeDrawer)
