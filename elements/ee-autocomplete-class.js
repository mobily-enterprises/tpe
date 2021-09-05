import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'
import './ee-autocomplete-item-li-class'
import tpeRegistry from '../tpeRegistry'

export class EeAutocomplete extends StyleableMixin(LitElement) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          position: relative;
        }

        #suggestions-elements {
          box-sizing: border-box;
          background-color: white;
          position: absolute;
          z-index: 1000;
          max-height: 200px;
          max-width: calc(95% - 17px);
          overflow-y: scroll;
          top: 90%;
          left: 17px;
          visibility: hidden;
        }

        #suggestions-elements[populated] {
          width: auto;
          min-width: var(--ee-autocomplete-suggestions-min-width, 400px);
          box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 0 2px 2px rgba(0, 0, 0, 0.05);
          padding: 10px;
        }

        #suggestions-elements > *[selected], #suggestions-elements > *:focus, #suggestions-elements > *:hover  {
          background-color: #eee;
        }

        [hidden] {
          display: none !important;
        }
      `
    ]
  }

  static get properties () {
    return {
      url: {
        type: String
      },
      informational: {
        type: Boolean
      },
      target: {
        type: String
      },
      targetForId: {
        type: String,
        attribute: 'target-for-id'
      },
      displaySingleSuggestion: {
        type: Boolean, attribute: 'display-single-suggestion'
      },
      picked: {
        type: Boolean,
        reflect: true
      },
      pickedData: {
        type: Object
      },
      suggestions: {
        type: Array,
        attribute: false
      },
      itemElement: {
        type: String,
        attribute: 'item-element'
      },
      itemElementConfig: {
        type: Object,
        attribute: 'item-element-config'
      },
      itemElementAttributes: {
        type: Object,
        attribute: 'item-element-attributes'
      }
    }
  }

  constructor () {
    super()
    this.url = ''
    this.target = null
    this.targetForId = null
    this.suggestions = []
    this.pickedData = {}
    this.itemElement = 'ee-autocomplete-item-li'
    this.itemElementConfig = {}
    this.itemElementAttributes = {}

    this._boundInputEvent = this._inputEvent.bind(this)
    this._boundKeydownEvent = this._keydownEvent.bind(this)
  }

  // If if's not set, return the first child
  // If it's set:
  //   If it's a string, return the #element
  //   If it's an object, return it directly (assumption that it's an element)
  _findTarget (target) {
    if (target !== null) {
      if (typeof target === 'string') return this.querySelector(`#${target}`)
      else if (typeof target === 'object') return target
    } else {
      return this.children[0]
    }
    return null
  }

  // If if's not set, don't do anything
  // If it's set:
  //   If it's an empty string, look for the first [name] element without no-submit,
  //   If it's a string, return the #element
  //   If it's an object, return it  directly (assumption that it's an element)
  _findTargetForId (target) {
    if (target !== 'null') {
      if (typeof target === 'string') {
        return target === ''
          ? this.querySelector('[name]:not([no-submit])')
          : this.querySelector(`#${target}`)
      } else if (typeof target === 'object') return target
    }
    return null
  }

  connectedCallback () {
    super.connectedCallback()

    this.targetElement = this._findTarget(this.target)
    this.targetForId = this._findTargetForId(this.targetForId)

    // The target for Id is the true source of the value
    // in case of ID submission. So, two things must happen:
    // 1) If it has a value already (it might have been set by a data load before the autocomplete), then picked is true
    // 2) Its value needs to be observed, so that if a value is set at any point, picked becomes true
    if (this.targetForId) {
      this.picked = !!this.targetForId.getAttribute('value')

      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            this.picked = !!this.targetForId.getAttribute('value')
            if (!this.targetForId.getAttribute('value')) {
              this.pickedData = null
            }
          }
        })
      })
      thisObserver.observe(this.targetForId, { attributes: true })
    }

    if (!this.targetElement) {
      console.error('Target element not found')
      return
    }

    this.targetElement.addEventListener('input', this._boundInputEvent)
    this.targetElement.addEventListener('keydown', this._boundKeydownEvent)

    // API USE: If the target input element implements multiInputApi,
    // then set the basic parameters for all
    // picked items (element name, config and attributes)
    if (this.targetElement.multiInputApi) {
      this.targetElement.setPickedElement(this.itemElement, this.itemElementConfig, this.itemElementAttributes)
    }

    // Setup ARIA attributes on target
    this.targetElement.setAttribute('aria-autocomplete', 'list')
    this.targetElement.setAttribute('aria-controls', 'suggestions')
    this.targetElement.toggleAttribute('aria-activedescendant', true)
    // Setup ARIA attributes on ee-autocomplete
    this.setAttribute('role', 'combobox')
    this.setAttribute('aria-owns', 'suggestions')
  }

  disconnectedCallback () {
    if (!this.targetElement) return

    this.targetElement.removeEventListener('input', this._boundInputEvent)
    this.targetElement.removeEventListener('keydown', this._boundKeydownEvent)
  }

  render () {
    
    return html`
      <slot></slot>
      <div @click="${this._picked}" id="suggestions" role="listbox" @keydown=${this._handleKeyEvents}>
        <div id="suggestions-elements"></div>
      </div>
    `
  }

  _keydownEvent (e) {
    switch (e.key) {
    case 'Escape':
      this.dismissSuggestions()
      break
    case 'KeyDown':
      if (this.suggestions.length) {
        const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements')
        suggestionsDiv.firstChild.focus()
      }
    }
  }

  pickFirst () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements')
    suggestionsDiv.querySelector('[selected]').click()
  }

  focusNext () {
    if (!this.suggestions.length) return
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements')
    let selected = suggestionsDiv.querySelector('[selected]') || suggestionsDiv.firstElementChild
    if (this.suggestions.length > 1) {
      selected.toggleAttribute('selected', false)
      selected = selected.nextElementSibling || selected.previousElementSibling
    }
    if (selected) selected.focus()
  }

  _picked (e) {
    console.log(e.currentTarget, e.target)
    if (this.informational || !this.targetElement || e.target.tagName.toLowerCase() !== this.itemElement) return

    if (this.targetElement.multiInputApi) {
      this.targetElement.pickedElement(e.target.data)
    } else {
      this.targetElement.value = e.target.textValue
      if (this.targetForId) {
        this.targetForId.value = e.target.idValue
        this.picked = true
        this.pickedData = e.target.data
      }
    }
    this.dismissSuggestions()
    this.targetElement.focus()

    // Dispatch input event since input happened
    this._dispatchPickedEvent()
  }

  _dispatchPickedEvent () {
    if (!this.picked) return
    const inputEvent = new CustomEvent('input', { composed: true, bubbles: true, cancelable: false, detail: { synthetic: true, data: this.pickedData } })
    this.targetElement.dispatchEvent(inputEvent)
  }

  _jsonCopy (o) {
    return JSON.parse(JSON.stringify(o))
  }

  async updated (cp) {
    if (!cp.has('suggestions')) return

    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements')

    // while (suggestionsDiv.firstChild) { suggestionsDiv.removeChild(suggestionsDiv.firstChild) }
    suggestionsDiv.innerHTML = ''

    if (this._autocompleteInFlight) return

    if (this.targetElement.multiInputApi) {
      if (this.targetElement.autocompleteValue === '') {
        suggestionsDiv.toggleAttribute('populated', false)
        return
      }
    }

    for (const suggestion of this.suggestions) {
      const el = document.createElement(this.itemElement)
      el.config = { ...this._jsonCopy(el.config), ...this._jsonCopy(this.itemElementConfig) }
      for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k])
      el.data = this._jsonCopy(suggestion)
      // el.onkeydown = this._handleKeyEvents.bind(this)
      // Make span focusable AND in the tab list
      el.setAttribute('tabindex', 0)
      suggestionsDiv.appendChild(el)
    }

    // Only 1 response and it's a plain text input? Autocomplete if text fully matches
    // beginning of the only result
    if (
      this.suggestions.length === 1 &&
      !this.targetElement.multiInputApi &&
      typeof this.targetElement.setSelectionRange === 'function'
    ) {
      const firstOption = suggestionsDiv.firstChild
      const textValue = firstOption.textValue
      if (textValue.toUpperCase().startsWith(this.targetElement.value.toUpperCase())) {
        const oldValue = this.targetElement.value
        this.targetElement.value = textValue
        this.targetElement.setSelectionRange(oldValue.length, textValue.length)
        if (this.targetForId) {
          this.targetForId.value = firstOption.idValue
          this.picked = true
          this.pickedData = firstOption.data
          if (!this.displaySingleSuggestion) {
            this.dismissSuggestions()
            this._dispatchPickedEvent()
          }
        }
      }
    }

    if (!this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', false)
    }

    if (this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', true)
      suggestionsDiv.firstChild.toggleAttribute('selected', true)
      const bounding = this._isOutOfViewport(suggestionsDiv)
      if (bounding.any) {
        console.log(bounding)
        console.log(suggestionsDiv)
        suggestionsDiv.style.transform = `translateY(${this._calcTranslateY(bounding.top, bounding.bottom, suggestionsDiv)}px) translateX(${this._calcTranslateX(bounding.left, bounding.right)}px)`
      }
      suggestionsDiv.style.visibility = 'unset'
    }
  }

  _calcTranslateY (top, bottom, el) {
    top = Number(top) * -1
    bottom = Number(bottom) * -1
    const inputOffset = el && bottom ? el.offsetHeight * -1 + this.targetElement.offsetHeight * -1 : 0
    return top + inputOffset
  }

  _calcTranslateX (left, right) {
    left = Number(left) * -1
    right = Number(right) * -1
    return left + right
  }

  _isOutOfViewport (elem) {
    // Get element's bounding
    const bounding = elem.getBoundingClientRect()

    // Check if it's out of the viewport on each side
    const out = {}
    out.top = bounding.top < 0 ? bounding.top : false
    out.left = bounding.left < 0 ? bounding.left : false
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight) ? bounding.bottom - window.innerHeight : false
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth) ? bounding.right - window.innerWidth : false
    out.any = !!(out.top || out.left || out.bottom || out.right)
    out.all = !!(out.top && out.left && out.bottom && out.right)
    return out
  }

  toggleSuggestions () {
    if (this.suggestions.length) {
      this.dismissSuggestions()
      this.targetElement.value = ''
    } else {
      this.openSuggestions()
    }
  }

  openSuggestions () {
    this.targetElement.value = ' '
    this._inputEvent({})
  }

  dismissSuggestions () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions')
    suggestionsDiv.toggleAttribute('populated', false)
    this.suggestions = []
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget.getRootNode().activeElement

    if (!this.suggestions.length || !target.parentElement) return

    switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      target.previousElementSibling
        ? target.previousElementSibling.focus()
        : target.parentElement.lastElementChild.focus()
      break
    case 'ArrowDown':
      e.preventDefault()
      target.nextElementSibling
        ? target.nextElementSibling.focus()
        : target.parentElement.firstElementChild.focus()
      break
    case 'Tab':
    case 'Enter':
      this._picked(e)
      e.preventDefault()
      this.targetElement.focus()
      break
    case 'Escape':
      this.dismissSuggestions()
      this.targetElement.focus()
      break
    }
  }

  async _inputEvent (e) {
    console.log(e, this._autocompleteInFlight)
    // This is a synthetic event triggered by autocomplete itself
    // once a selection was made: ignore
    if (e.detail !== 0 && e.detail && e.detail.synthetic) return

    // Nothing can nor should happen without a target
    const target = this.targetElement
    if (!target) return

    // There is more input: a new query will be made,
    // so the list is now stale
    this.dismissSuggestions()

    // If the target element is not valid, don't take off at all
    // TAKEN OUT as autocomplete might be necessary to actually make
    // it valid
    // if (!target.validity.valid) {
    //  this.suggestions = []
    //  return
    // }

    // Check if it's inflight. If so, queue up an autocomplete
    // with the same 'e'
    if (this._autocompleteInFlight) {
      this._attemptedAutocompleteFlight = e
      return
    }

    if (this.targetForId) {
      this.targetForId.value = ''
      this.picked = false
      this.pickedData = null
    }

    // IN FLIGHT!
    this._autocompleteInFlight = true

    // Set the url, which will also depend on recordId
    const value = target.autocompleteValue || target.value

    // No input: do not run a wide search
    if (!value) {
      this._autocompleteInFlight = false
      this.dismissSuggestions()
      return
    }

    const url = this.url + value

    const fetchOptions = {
      method: 'GET',
      redirect: 'follow' // manual, *follow, error
    }

    // Attempt the submission
    let networkError = false
    let response
    try {
      response = await fetch(url, fetchOptions)
    } catch (e) {
      console.log('ERROR!', e)
      networkError = true
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!')

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'network' }, bubbles: true, composed: true })
      this.dispatchEvent(event)

    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      console.log('Fetch error!')

      const errs = await response.json()
      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true })
      this.dispatchEvent(event)

    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json()

      this.suggestions = v

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true })
      this.dispatchEvent(event)
    }

    this._autocompleteInFlight = false
    if (this._attemptedAutocompleteFlight) {
      const oldE = this._attemptedAutocompleteFlight
      this._attemptedAutocompleteFlight = false
      this._inputEvent(oldE)
    }
  }
}
tpeRegistry.register('ee-autocomplete', EeAutocomplete)
