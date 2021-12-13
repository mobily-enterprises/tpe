import { LitElement, html, css } from 'lit'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { SyntheticValidatorMixin } from '../mixins/SyntheticValidatorMixin'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { CustomStylesMixin } from '../mixins/CustomStylesMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class EeAutocompleteInputSpans extends CustomStylesMixin(SyntheticValidatorMixin(StyleableMixin(LabelsMixin(LitElement)))) {
  static get properties () {
    return {
      name: {
        type: String
      },
      valueAs: {
        type: String,
        attribute: 'value-as'
      },
      valueSeparator: {
        type: String,
        attribute: 'value-separator'
      },
      clearOnSetValue: {
        type: Boolean,
        attribute: 'clear-on-set-value'
      }
    }
  }

  constructor () {
    super()
    this.labelForElement = 'ni'
    this.valueAs = 'text' // can be text, ids, json
    this.removeIcon = '<svg class="icon" height="15" viewBox="0 0 24 24" width="15"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>'
    this.itemElement = ''
    this.itemElementConfig = {}
    this.itemElementAttributes = {}
    this.valueSeparator = ','
  }

  static get styles () {
    return [
      super.styles,
      css`

        :host(:focus) {
          outline: none;
        }

        #list {
          display: flex;
          flex-wrap: wrap;
        }

        #list > span {
          position: relative;
          display: flex;
          font-size: 0.8em;
          width: max-content;
        }

        #list > span > *:not(button) {
          position: relative;
          /* display: inline-block; */
          padding: 3px 6px;
          padding-right: 24px;
          border: 1px solid #ddd;
          border-radius: 1em;
          margin: 2px;
          vertical-align: middle;
          line-height: 1em;
        }

        #list > span > *:not(button)[invalid] {
          background-color: pink;
          border-color: red;
        }

        #list > span:active > *:not(button), #list > span:focus > *:not(button), #list > span:hover > *:not(button) {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          background-color: #eee;
          outline: none;
        }
        #list > span:active > *:not(button), #list > span:focus > *:not(button) {
          border-color: #ccc;
        }

        #list > span button.remove {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          fill: #999;
          border: none;
          padding: 0;
          /* display: inline-block; */
          position: absolute;
          top: 55%;
          right: 6px;
          transform: translateY(-50%);
          background: none;
        }

        #list > *:focus, #list > span *:active {
          outline: none;
        }

        #list > span button.remove svg {
          z-index: -1;
        }

        #list > span button.remove:hover {
          fill: #555;
        }

        input {
          box-sizing: border-box;
          margin: 0;
          outline: none;
          vertical-align: middle;
          height: 1.5em;
          border: none;
          font-size: 0.9em;
          min-width: 120px;
          flex: 1;
        }

        input:focus, input:hover {
          outline: none
        }

        span.error-message {
          color: red;
        }

        :invalid {
          background-color: pink;
          border: 1px solid #bb7777;
        }
      `
    ]
  }

  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div id="list" @click="${this._listClicked}">
        <input @keydown="${this._handleKeyEvents}" rows="1" id="ta" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" dir="ltr" role="combobox" aria-autocomplete="list"/>
      </div>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <input id="ni" type="hidden" name="${this.name}">
    `
  }

  connectedCallback () {
    super.connectedCallback()
    this.addEventListener('click', this.focus)
  }

  disconnectedCallback () {
    super.connectedCallback()
    this.removeEventListener('click', this.focus)
  }

  firstUpdated () {
    if (this._tempValue) {
      this.value = this._tempValue
    }
    this._updateNativeInputValue()
  }

  focus () {
    this.shadowRoot.querySelector('#ta').focus()
  }

  _listClicked (e) {
    e.stopPropagation()
  }

  get value () {
    let r
    let list
    switch (this.valueAs) {
    case 'json':
      r = {}
      list = this.shadowRoot.querySelector('#list')
      for (const span of list.children) {
        if (span.id === 'ta') continue
        const idValue = span.firstChild.idValue
        r[idValue] = span.firstChild.data
      }
      return r
    default:
      r = []
      list = this.shadowRoot.querySelector('#list')
      for (const span of list.children) {
        if (span.id === 'ta') continue
        if (this.valueAs === 'text') {
          // Won't push invalid spans to the final value
          if (span.getAttribute('invalid') === null) r.push(span.firstChild.textValue)
        } else {
          r.push(span.firstChild.idValue)
        }
      }
      return r.join(this.valueSeparator)
    }
  }

  set value (v) {
    const list = this.shadowRoot.querySelector('#list')

    if (!list) {
      this._tempValue = v
      return
    }
    // Remove all children
    while ((this.clearOnSetValue || v === '' || v === null || v === undefined) && list.firstChild) {
      if (list.firstChild.id === 'ta') break
      list.removeChild(list.firstChild)
    }

    // Assign all children using pickedElement
    if (Array.isArray(v)) {
      for (const o of v) {
        this.pickedElement(o, false, true)
      }
    } else if (typeof v === 'object' && v !== null) {
      for (const k of Object.keys(v)) {
        const $o = v[k]
        this.pickedElement($o, false, true)
      }
    } else if (typeof v === 'string' && v !== '') {
      for (const s of v.split(this.valueSeparator)) {
        this.pickedElement(s, false, true)
      }
    }
    this._tempValue = null
    // Sets the native input
    this._updateNativeInputValue()

    // Rerun validator
    this.setCustomValidity('')
    this.reportValidity()
  }

  get validationMessage () {
    return this.validity._customValidationMessage
  }

  get autocompleteValue () {
    const ta = this.shadowRoot.querySelector('#ta')
    if (ta) return ta.value
    return ''
  }

  /* END OF CONSTRAINTS API */

  // Run this when there are no suggestions and the user hits Tab or Enter in #ta
  // This will run pickElement with a STRING, which will get the element to
  // work out a data structure based on the string
  _pickCurrentValue () {
    if (this.valueAs === 'text') {
      this.pickedElement(this.shadowRoot.querySelector('#ta').value, true)
    }
  }

  _askToRemove (e) {
    const target = e.currentTarget
    this._removeItem(target.parentElement)
  }

  _updateNativeInputValue () {
    const ni = this.shadowRoot.querySelector('#ni')
    ni.value = this.value
  }

  _removeItem (target, which = 'previous') {
    // Focus previous item before deleting target. If it's the first/only, select the input
    const previous = target.previousElementSibling || target.nextElementSibling
    previous.focus()
    target.remove()
    this._updateNativeInputValue()
    // Rerun validator
    this.setCustomValidity('')
    this.reportValidity()
  }

  _createRemoveBtn () {
    const el = document.createElement('button')
    el.innerHTML = this.removeIcon
    el.onclick = this._askToRemove.bind(this)
    el.classList.add('remove')
    return el
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget

    switch (e.key) {
    case 'ArrowLeft':
      if (target.previousElementSibling) {
        e.preventDefault()
        target.previousElementSibling.focus()
      }
      break

    case 'ArrowRight':
      if (target.id !== 'ta') {
        e.preventDefault()
        target.nextElementSibling
          ? target.nextElementSibling.focus()
          : target.parentElement.firstElementChild.focus()
      }
      break

    case 'ArrowDown':
      if (this.parentElement.suggestions.length) {
        e.preventDefault()
        this.parentElement.focusNext()
      }
      break
    case 'Backspace':
    case 'Delete':
      if (target.id === 'ta' && target.parentElement.children.length > 1 && !target.value) {
        this._removeItem(target.previousElementSibling)
      } else if (target.id !== 'ta') {
        this._removeItem(target)
      }
      break
    case 'Tab':
    case 'Enter':
      if (!this.autocompleteValue) break
      if (!this.parentElement.suggestions.length) {
        e.preventDefault()
        this._pickCurrentValue()
      } else {
        e.preventDefault()
        this.parentElement.pickFirst()
      }
    }
  }

  /* API */
  get multiInputApi () { return true }

  pickedElement (data, force = false, skipValidation = false) {
    const parentEl = document.createElement(this.itemElement)
    const el = new parentEl.constructor.PickedElement()

    el.config = { ...el.config, ...this.itemElementConfig }
    for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k])

    // Convert string into data if necessary
    if (typeof data === 'string') {
      if (!data.length) return
      data = parentEl.stringToData(data)
      if (!data.valid) {
        el.toggleAttribute('invalid', true)
        if (!force) return
      }
    }
    el.data = data

    const list = this.shadowRoot.querySelector('#list')
    const span = document.createElement('span')
    // -1 means that it will not in the list of tabs, but
    // it will be focusable (spans aren't by default)
    span.setAttribute('tabindex', -1)
    const ta = this.shadowRoot.querySelector('#ta')
    const removeBtn = this._createRemoveBtn()

    span.onkeydown = this._handleKeyEvents.bind(this)
    // Span will be not in the list of tabs
    // Necessary since this is a button and it IS
    // in tab list by default
    removeBtn.setAttribute('tabindex', -1)
    span.appendChild(el)
    span.appendChild(removeBtn)

    list.insertBefore(span, ta)
    ta.value = ''

    this._updateNativeInputValue()

    // Rerun validator
    if (!skipValidation) {
      this.setCustomValidity('')
      this.reportValidity()
    }
  }

  setPickedElement (itemElement, itemElementConfig, itemElementAttributes) {
    this.itemElement = itemElement
    this.itemElementConfig = itemElementConfig
    this.itemElementAttributes = itemElementAttributes
  }
}

tpeRegistry.register('ee-autocomplete-input-spans', EeAutocompleteInputSpans)
