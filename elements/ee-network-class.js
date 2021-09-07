import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'
export class EeNetwork extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: relative;
        }

        :host([inline]) {
          display: inline-block;
        }

        :host([status="loading"]) ::slotted(*),
        :host([status="saving"]) ::slotted(*),
        :host([status="loading-error"]) ::slotted(*),
        :host([status="saving-error"]) ::slotted(*) {
          z-index: 0;
        }

        #overlay {
          display: none; /* Hide by default */
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          text-align: center;
          transition: background var(--ee-network-transition-duration, 200ms);
        }

        #overlay.overlay-loading {
          display: block;
          color: var(--ee-network-overlay-loading-color, #666);
          background-color: var(--ee-network-overlay-loading-background-color, rgba(190, 190, 190, 0.75));
          z-index: 10;
        }

        #overlay.overlay-error {
          display: block;
          cursor: pointer; /* Hint that the object is clickable */
          color: var(--ee-network-overlay-error-color, #c00);
          background-color: var(--ee-network-overlay-error-background-color, rgba(255, 0, 0, 0.25));
          z-index: 10;
        }

        #overlay #statusMessage {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
        }

        #content-wrapper.overlay-error,
        :host([status="overlay-error"]) {
          pointer-events: none;
          opacity: 0.25;
          min-height: 1.25rem; /* FIXME: find a proper value, this is made up */
        }
      `
    ]
  }

  static get properties () {
    return {
      manageLoadingErrors: {
        type: Boolean,
        attribute: 'manage-loading-errors'
      },
      manageSavingErrors: {
        type: Boolean,
        attribute: 'manage-saving-errors'
      },
      retryMethod: {
        type: Function,
        attribute: false
      },
      noReloadOnTap: {
        type: Boolean,
        attribute: 'no-reload-on-tap'
      },
      status: {
        type: String,
        reflect: true
      },
      statusMessages: {
        type: Object,
        attribute: 'status-messages'
      },
      messenger: {
        type: Function,
        attribute: false
      },
      overlayClass: {
        type: String,
        attribute: false
      },
      response: { type: Function, attribute: false },
      prefetch: { type: Function, attribute: false }
    }
  }

  constructor () {
    super()
    this.manageLoadingErrors = false
    this.manageSavingErrors = false
    this.retryMethod = null
    this.noReloadOnTap = false
    this.status = 'loaded'
    this.statusMessages = {
      loading: 'Loading\u2026', // &hellip; equivalent
      saving: 'Saving\u2026', // &hellip; equivalent
      error: 'An error has occurred. Click here to try again.'
    }

    this.lastInitObject = null
    this.lastUrl = null
    this.response = this.prefetch = () => {}
  }

  render () {
    
    return html`
      <slot></slot>
      <div id="overlay" class="${this.overlayClass}" @click="${this._overlayClicked}">
        <div id="statusMessage">${this.statusMessages[this.status]}</div>
      </div>
    `
  }

  firstUpdated () {
    this._setOverlay()
  }

  _setOverlay () {
    switch (this.status) {
    case 'loaded':
    case 'saved':
      this.overlayClass = 'clear'
      break
    case 'loading':
    case 'saving':
      this.overlayClass = 'overlay-loading'
      break
    case 'loading-error':
      this.overlayClass = this.manageLoadingErrors ? 'overlay-error' : 'clear'
      break
    case 'saving-error':
      this.overlayClass = this.manageSavingErrors ? 'overlay-error' : 'clear'
      break
    }
  }

  /*
    TODO DOCUMENTATION:
    // EVENT LISTENING WAY. With @retry-successful="${this._refetched.bind(this)}" in ee-network
    async _retrySuccessful (e) {
      this[this.localDataProperty] = await e.detail.fetched.json()
    }

    // REFETCH WAY. WITH .retryMethod="${this._retry.bind(this)}" in ee-network
    async _retry (status, url, initObject) {
      const job = await this.fetch(url, initObject)
      this.job = await job.json()
    }
 */

  async _overlayClicked (e) {
    if (this.noReloadOnTap) return

    // Stop the event here
    e.stopPropagation()
    e.preventDefault()

    // If the status is 'error', try to reload
    if (this.status === 'loading-error' || this.status === 'saving-error') {
      if (!this.retryMethod) {
        const fetched = await this.fetch(this.lastUrl, this.lastInitObject)
        if (fetched.ok) {
          this.dispatchEvent(new CustomEvent('retry-successful', {
            detail: {
              url: this.lastUrl,
              initObject: this.lastInitObject,
              fetched
            },
            composed: true,
            bubbles: false
          }))
        }
      }
      else this.retryMethod(this.status, this.lastUrl, this.lastInitObject)
    }
  }

  response () {}

  messenger () {}

  async fetch (url, initObject = {}) {
    this.lastUrl = url
    this.lastInitObject = initObject

    // Work out manageErrors, which will only ever
    // applu to GET
    const fetchMethod = (initObject && initObject.method && initObject.method.toUpperCase()) || 'GET'
    const isGet = fetchMethod === 'GET'
    initObject.url = url

    this.status = isGet ? 'loading' : 'saving'
    this._setOverlay()
    this.messenger({
      status: this.status,
      url,
      initObject,
      networkElement: this
    })
    this.prefetch(initObject)

    try {
      const response = await fetch(initObject.url, initObject)

      // console.log('Cloning the response and waiting for the text...')
      // Wait for the _actual_ data to get here
      const r2 = response.clone()
      const v = await r2.json()

      if (response.ok) {
        this.status = isGet ? 'loaded' : 'saved'
      } else {
        this.status = isGet ? 'loading-error' : 'saving-error'
      }
      this._setOverlay()
      this.messenger({
        status: this.status,
        url,
        initObject,
        response,
        networkElement: this
      })
      // Response hook
      this.response(response, v, initObject)

      return response
    } catch (e) {
      this.status = isGet ? 'loading-error' : 'saving-error'
      this._setOverlay()
      this.messenger({
        status: this.status,
        url,
        initObject,
        networkElement: this
      })
      this.response(null, null, initObject)
      throw (e)
    }
  }
}
tpeRegistry.register('ee-network', EeNetwork)
