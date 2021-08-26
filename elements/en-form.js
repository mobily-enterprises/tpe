import { html } from 'lit'
import { NnForm } from './nn-form.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin'

/* globals customElements CustomEvent */
class EnForm extends ThemeableMixin('en-form')(NnForm) {
  get skipProperties () {
    return [...super.skipProperties, 'submit']
  }

  static get properties () {
    return {

      fetchingElement: {
        type: String,
        attribute: 'fetching-element'
      },

      recordId: {
        type: String,
        attribute: 'record-id'
      },

      setFormAfterSubmit: {
        type: Boolean,
        attribute: 'set-form-after-submit'
      },

      resetFormAfterSubmit: {
        type: Boolean,
        attribute: 'reset-form-after-submit'
      },

      validateOnLoad: {
        type: Boolean,
        attribute: 'validate-on-load'
      },

      validateOnRender: {
        type: Boolean,
        attribute: 'validate-on-render'
      },

      submitCheckboxesAsNative: {
        type: Boolean,
        attribute: 'submit-checkboxes-as-native'

      },
      noAutoload: {
        type: Boolean,
        attribute: 'no-autoload'
      },

      // This will allow users to redefine methods declaratively
      presubmit: { type: Object, attribute: false },
      response: { type: Object, attribute: false },
      incomingData: { type: Object, attribute: false },
      dataLoaded: { type: Object, attribute: false },
      extrapolateErrors: { type: Object, attribute: false }

    }
  }

  constructor () {
    super()
    this.validateOnLoad = false
    this.validateOnRender = false
    this.fetchingElement = null
    this.submitCheckboxesAsNative = false
    this._boundRealtimeSubmitter = this._realTimeSubmitter.bind(this)
    this.attemptedFlight = false
    this.inFlightMap = new WeakMap()
    this.attemptedFlightMap = new WeakMap()
    this.submitObject = {}
  }

  async _allChildrenCompleted () {
    // Wait for all children to be ready to rock and roll
    for (const el of this.elements) {
      // TODO: What about React, Vue, etc.? Uniform API across element libraries?
      if (typeof el.updateComplete !== 'undefined') {
        await el.updateComplete
      }
    }
  }

  _realTimeSubmitter (e) {
    this.submit(e.target)
  }

  connectedCallback () {
    super.connectedCallback()
    this._allChildrenCompleted().then(() => {
      for (const el of this.elements) {
        const realTime = el.getAttribute('real-time') !== null
        const realTimeEvent = el.getAttribute('real-time-event') || 'input'
        if (!realTime || !realTimeEvent) continue
        el.addEventListener(realTimeEvent, this._boundRealtimeSubmitter)
      }
    })
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    for (const el of this.elements) {
      const realTime = el.getAttribute('real-time')
      if (realTime === null) continue
      const realTimeEvent = el.getAttribute('real-time-event')
      if (!realTimeEvent) continue

      el.removeEventListener(realTimeEvent, this._boundRealtimeSubmitter)
    }
  }

  async firstUpdated () {
    super.firstUpdated()

    if (this.validateOnRender) {
      await this._allChildrenCompleted()
      // Check validity
      this.reportValidity()
    }
  }

  setFormElementValues (o) {
    for (const k in o) {
      this.setFormElementValue(k, o[k], true)
    }
  }

  setRecordObject (o) {
    o = { ...o }
    const elHash = {}
    for (const el of this.elements) elHash[el.getAttribute('name')] = el

    for (const k of Object.keys(elHash)) {
      o[k] = this.getFormElementValue(k)
    }
    return o
  }

  extrapolateErrors (o) {
    return o
  }

  async presubmit (fetchOptions) {}

  async response (response, errs, fetchOptions) {} // If (response !== null and response.ok), it worked

  async incomingData (o, op) {} // op can be 'autoload' or 'submit'

  async dataLoaded (o, op) {} // op can be 'autoload' or 'submit'

  // Disabled here is set (and checked) with both the attribute and the property
  // 'disabled' since an element might be disabled in the html, but might
  // not have had a chance to render yet (in which case, for non-native elemtns,
  // it would mean that the property is not yet there, since the reflector hasn't
  // yet run)
  _disableElements (elements) {
    this.__disabled = new WeakMap()
    for (const el of elements) {
      if (!el.disabled && !el.hasAttribute('disabled')) {
        el.setAttribute('disabled', true)
        el.disabled = true
        this.__disabled.set(el, true)
      }
    }
  }

  _enableElements (elements) {
    this.__disabled = this.__disabled || new WeakMap()
    for (const el of elements) {
      if (this.__disabled.has(el)) {
        el.removeAttribute('disabled')
        el.disabled = false
        this.__disabled.delete(el)
      }
    }
  }

  _fetchEl (specificElement) {
    // Tries to figure out what the fetching element is.
    // if fetching-element was passed, then it's either considered an ID
    // or the element itself.
    // Otherwise it will look for an ee-network or with an element with class
    // .network. Finally, it will use `window`
    if (specificElement) {
      let pEl
      pEl = specificElement
      let found = false
      while (pEl.parentElement) {
        pEl = pEl.parentElement
        if (pEl.tagName === 'EE-NETWORK' || pEl.classList.contains('network')) {
          found = true
          break
        }
      }
      return found ? pEl : window
    } else {
      if (this.fetchingElement) {
        if (typeof this.fetchingElement === 'string') return this.querySelector(`#${this.fetchingElement}`)
        else return this.fetchingElement
      } else {
        let maybeNetwork = this.querySelector('ee-network')
        if (!maybeNetwork) maybeNetwork = this.querySelector('.network')
        return maybeNetwork || window
      }
    }
  }

  async _wait (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    })
  }

  async submit (specificElement) {
    // Clear all custom validities if they are set
    // Native elements will NEED this, or any invalid state
    // will persist even if validation passes
    // Then, make up submit object and check whether reportValidity returns
    // false (which basically means "abort")
    if (specificElement) {
      this.clearAllCustomValidity([specificElement])
      this.submitObject = this.createSubmitObject([specificElement])
      if (typeof specificElement.reportValidity === 'function' && !specificElement.reportValidity()) return
    } else {
      this.clearAllCustomValidity(this.elements)
      this.submitObject = this.createSubmitObject(this.elements)
      if (!this.reportValidity()) return
    }

    // Give users the ability to listen to @submit and then Allow for a presubmit hook
    const submitEvent = new CustomEvent('submit', { cancelable: true, bubbles: true, composed: true })
    this.dispatchEvent(submitEvent)
    if (submitEvent.defaultPrevented) return

    // inFlightMap is a map of all connections, using the specificElement
    // as key (or "window" if there is no specific element)
    const mapIndex = specificElement || this

    // The connection is ongoing: add a "specificElement" to the attempted
    // field, and simply return.
    // Towards the end, this function will check that "attempted" which,
    // if set, means that the form needs to be resubmitted with that
    // specificElement
    if (this.inFlightMap.has(mapIndex)) {
      this.inFlightMap.set(mapIndex, { attempted: true })
      return
    }
    this.inFlightMap.set(mapIndex, { attempted: false })

    // The element's method can only be null, POST or PUT.
    // If not null, and not "PUT", it's set to "POST"
    let elementMethod = this.getAttribute('method')
    if (elementMethod && elementMethod.toUpperCase() !== 'PUT') {
      elementMethod = 'POST'
    }

    // The 'method' attribute will have priority no matter what.
    // If `method` is not set, then it will depend on recordId (PUT if present,
    // POST if not)
    const method = elementMethod === null
      ? this.recordId ? 'PUT' : 'POST'
      : elementMethod

    // Set the url, which will also depend on recordId
    const action = this.getAttribute('action')
    if (!action) throw new Error('The submitted form has no action URL set')
    const url = action + (this.recordId ? `/${this.recordId}` : '')

    const fetchOptions = {
      url,
      method,
      headers: { 'Content-Type': this.getAttribute('enctype') || 'application/json' },
      redirect: 'follow', // manual, *follow, error
      body: this.submitObject // body data type must match "Content-Type" header
    }

    // HOOK: Allow devs to customise the request about to be sent to the server
    await this.presubmit(fetchOptions)

    // Disable the elements
    if (!specificElement) this._disableElements(this.elements)

    // Delete the multipart/form-data header if it was set, since
    // the browser will set it (with the right boundary parameter)
    // https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
    // https://stackoverflow.com/questions/35192841/fetch-post-with-multipart-form-data
    //
    // ALSO turn body into a FormData object, with all values appended.
    // Note that for files. createSubmitObject will assign the element itself
    // as the value.
    if (fetchOptions.headers['Content-Type'] === 'multipart/form-data') {
      delete fetchOptions.headers['Content-Type']

      const body = fetchOptions.body
      const formData = new FormData()

      for (const k in body) {
        if (body[k] instanceof HTMLElement) {
          const filesInEl = body[k].files
          for (const f of filesInEl) formData.append(k, f)
        } else {
          formData.append(k, body[k])
        }
      }
      fetchOptions.body = formData
    }

    // Attempt the submission
    let networkError = false
    let response
    let errs
    const body =
      fetchOptions.headers['Content-Type'] === 'application/json' &&
      typeof fetchOptions.body === 'object' &&
      fetchOptions.body !== null
        ? JSON.stringify(fetchOptions.body)
        : fetchOptions.body
    try {
      // fetch() wants a stingified body
      const fo = { ...fetchOptions, ...{ body: body } }
      const el = this._fetchEl(specificElement)
      response = await el.fetch(fetchOptions.url, fo)
    } catch (e) {
      console.log('ERROR!', e)
      networkError = true
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!')

      // Re-enable the elements
      if (!specificElement) {
        this._enableElements(this.elements)
        await this._wait(0)
      }

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'network' }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Response hook
      await this.response(null, null, fetchOptions)
    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      //
      // Try and get the errors object from the reponse's json
      let originalErrs
      try {
        originalErrs = await response.json()
      } catch (e) {
        originalErrs = {}
      }
      errs = this.extrapolateErrors(originalErrs) || {}

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Re-enable the elements
      // This must happen before setCustomValidity() and reportValidity()
      if (!specificElement) {
        this._enableElements(this.elements)
        await this._wait(0)
      }

      // Set error messages
      if (errs.errors && errs.errors.length) {
        const elHash = {}
        for (const el of this.elements) {
          elHash[el.getAttribute('name')] = el
        }
        for (const err of errs.errors) {
          const el = elHash[err.field]
          if (el && el.setCustomValidity) {
            el.setCustomValidity(err.message)
            el.reportValidity()
          }
        }
      }

      // Response hook
      await this.response(response, errs, fetchOptions)
    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json()

      let attempted
      if (this.inFlightMap.has(mapIndex)) {
        attempted = this.inFlightMap.get(mapIndex).attempted
      }

      await this.incomingData(v, 'submit')

      // HOOK Set the form values, in case the server processed some values
      // Note: this is only ever called if set-form-after-submit was
      // passed to the form.
      if (this.setFormAfterSubmit) {
        // Won't overwrite fields if another attempt is queued
        if (!attempted) {
          if (!specificElement) {
            this.setFormElementValues(v)
          } else {
            const name = mapIndex.name
            this.setFormElementValues({ [name]: v[name] })
          }
        }
      }

      // Re-enable the elements
      if (!specificElement) {
        this._enableElements(this.elements)
        await this._wait(0)
      }

      // Maybe reset the form if it was so required
      if (this.resetFormAfterSubmit && !attempted && !specificElement) this.reset()

      await this.dataLoaded(v, 'submit')

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true })
      this.dispatchEvent(event)

      // Response hook
      await this.response(response, v, fetchOptions)
    }

    if (this.inFlightMap.has(mapIndex)) {
      const attempted = this.inFlightMap.get(mapIndex).attempted
      this.inFlightMap.delete(mapIndex)
      if (attempted) {
        this.submit(specificElement)
      }
    }
  }

  async updated (changedProperties) {
    // The 'await' here has the side effect of waiting for the next tick,
    // which means that children elements will have a chance to render
    await super.updated()

    // If no-autoload is set to true, or there is no autoload or no recordId,
    // simply give up: nothing to do
    if (this.noAutoload || !changedProperties.has('recordId')) return

    // Record ID must be "something"
    if (typeof this.recordId === 'undefined' || this.recordId === null) return

    return this.preloadData()
  }

  async preloadData () {
    // Work out the action's URL, adding the record ID  at the end
    // (It will be a get)
    // If there is a result, fetch the element values
    const action = this.getAttribute('action')
    let response
    if (action) {
      // This will make sure that the element is actually visible
      // before doing the fetch
      await this.updateComplete

      // Disable elements
      this._disableElements(this.elements)

      // Fetch the data and trasform it to json
      let v
      try {
        const el = this._fetchEl()
        response = await el.fetch(action + '/' + this.recordId)
        v = await response.json()
      } catch (e) {
        console.error('WARNING: Fetching element failed to fetch')
        v = {}
      }

      await this.incomingData(v, 'autoload')

      // Set values
      this.setFormElementValues(v)

      // Re-enabled all disabled fields
      this._enableElements(this.elements)
      await this._wait(0)

      // Run reportValidity if validateOnLoad is on
      if (this.validateOnLoad) {
        this.reportValidity()
      }

      // Run hook
      await this.dataLoaded(v, 'autoload')
    }
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <form id="native">
        <slot></slot>
      </form>
    `
  }
}
customElements.define('en-form', EnForm)
