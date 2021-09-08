import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { tpeRegistry } from '../lib/tpeRegistry'

export class EeTabs extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          position: relative;
          border-bottom: 1px solid var(var(--ee-tabs-lines-color, #bbb));
        }

        :host nav {
        display: flex; 
          position: var(--ee-tabs-nav-position, sticky);
          top:0;
          width: 100%;
          border-bottom: 1px solid var(--ee-tabs-lines-color, #bbb);
          height: var(--ee-tabs-height, 32px);
          z-index: var(--ee-tabs-z-index, 1);
          overflow: var(--ee-tabs-nav-overflow);
        }

        :host #contentContainer {
          height: 100%;
          padding: var(--ee-tabs-content-padding, 10px);
        }

        #contentContainer ::slotted(*) {
          display: none;
        }

        #contentContainer ::slotted([active]) {
          display: initial;
        }

        nav ::slotted(*) .icon {
          fill: var(--ee-tabs-color, black);
        }

        nav > ::slotted(*[active]) .icon {
          fill: var(--ee-tabs-active-color, black);
        }

        nav > ::slotted(*) {
          color: var(--ee-tabs-color, black);
          text-decoration: none;
          line-height: var(--ee-tabs-height, 20px);
          padding: 4px 12px;
          border: unset;
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-background-color, #bbb);
          font-size: 0.9em;
          border-radius: 0;
          width: 100%;
          text-align: center;
          background-color:  var(--ee-tabs-background-color, whitesmoke);
          cursor: default;
        }

        :host([min-width-tabs]) nav > ::slotted(*) {
          max-width: max-content;
        }

        nav > ::slotted(:last-child) {
          border-right-color: var(--ee-tabs-background-color, #bbb)
        }

        nav > ::slotted(:first-child) {
          border-left-color: var(--ee-tabs-background-color, #bbb)
        }

        nav > ::slotted([active]) {
          color: var(--ee-tabs-active-color);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          background-color: var(--ee-tabs-active-background-color, white);
          font-weight: bold;
        }

        nav > ::slotted(:focus),
        nav > ::slotted(:hover) {
          /* outline:0 ; */
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          filter: brightness(115%)
        }

        nav > ::slotted(:active) {
          background: #cccccc;
          border-bottom: 4px solid #bdbdbd;
          box-shadow: none;
        }

        nav > ::slotted([disabled]) {
          box-shadow: none
        }

        nav > ::slotted(.icon:active) {
          background: #cccccc;
          border: unset;
          border-radius: 50%;
        }

        nav > ::slotted(.icon:hover) svg, :host > ::slotted(:hover) svg {
          fill: var(--ee-tabs-color, black);
        }
      `
    ]
  }

  static get properties () {
    return {
      useHash: { type: Boolean, attribute: 'use-hash' },
      passive: { type: Boolean },
      default: { type: String },
      nameAttribute: { type: String, attribute: 'name-attribute' },
      minWidthTabs: { type: Boolean, reflect: true, attribute: 'min-width-tabs' }
    }
  }

  constructor () {
    super()
    this.nameAttribute = 'name'
    this.useHash = false
    this.passive = false
  }

  /** Tabs usage
   * add elements within the ee-tabs tags to create tabs.
   * Tab elements must have an name attribute, or you can set a custom value to 'active-attribute'. Index support will be added soon
   */
  render () {
    
    return html`
    <nav>
      <slot id="tabs" @slotchange="${this._manageSlottedTabs}"></slot>
    </nav>
    <div id="contentContainer">
      <slot name="content"></slot>
    </div>
    `
  }

  _allTabs () {
    return this.shadowRoot.querySelector('slot#tabs').assignedElements()
  }

  _workoutHash () {
    let tab
    if (this.useHash) {
      if (window.location.hash) tab = window.location.hash.substr(1)
      else if (this.default) tab = this.default
      else tab = this._allTabs()[0]
    }
    return tab
  }

  firstUpdated () {
    super.firstUpdated()

    const tab = this._workoutHash()
    this.select(tab, false)

    window.addEventListener('popstate', e => {
      const tab = this._workoutHash()
      if (this.useHash) {
        this.select(tab, true)
      }
    })
  }

  _isActive (el) {
    return el.hasAttribute('active')
  }

  select (tab, clearAll = true) {
    let pages

    // Find the tab. If it can't be found, end of story
    if (typeof tab === 'string') {
      tab = this._allTabs().find(i => i.getAttribute(this.nameAttribute) === tab)
    }
    if (!tab) return

    // If clearAll was passed, clear selection of tabs and (if !passive) pages
    if (clearAll) {
      pages = this.shadowRoot.querySelector('slot[name="content"]').assignedElements()

      if (!this.passive) {
        this._clearAll(this._allTabs(), pages)
      } else {
        this._clearAll(this._allTabs())
      }
    }

    // Activate the tab
    tab.toggleAttribute('active', true)
    tab.active = true

    // If !passive, activate the corresponding page
    if (!this.passive) {
      const name = tab.getAttribute(this.nameAttribute)
      const activePage = pages.find(el => el.getAttribute(this.nameAttribute) === name)
      if (activePage) {
        activePage.toggleAttribute('active', true)
        activePage.active = true
      }
    }
  }

  // Clear the seletecAttribute from the current active tab and page
  _clearAll (tabs, pages) {
    //
    const currentTab = tabs.find(this._isActive.bind(this))
    if (currentTab) {
      currentTab.toggleAttribute('active', false)
      currentTab.active = false
    }

    if (!this.passive) {
      const currentPage = pages.find(this._isActive.bind(this))
      if (currentPage) {
        currentPage.toggleAttribute('active', false)
        currentPage.active = false
      }
    }
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlottedTabs (e) {
    for (const element of this._allTabs()) {
      element.addEventListener('click', (e) => { this.select.bind(this)(e.currentTarget) })
      element.setAttribute('tabindex', 1)
    }

    if (!this.passive && this.default) {
      this.select(this.default, true)
    }
  }
}
tpeRegistry.register('ee-tabs', EeTabs)
