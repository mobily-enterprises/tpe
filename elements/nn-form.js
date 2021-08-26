import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'
import { formElement } from '../lib/htmlApi.js'

/* globals customElements */
export class NnForm extends ThemeableMixin('nn-form')(StyleableMixin(NativeReflectorMixin(LitElement))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...formElement]
  }

  get skipProperties () {
    return [...super.skipProperties, 'elements', 'checkValidity', 'reportValidity', 'reset']
  }

  reportValidity () {
    // Check validity in form
    let valid = true

    for (const el of this.elements) {
      if (typeof el.reportValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('')
        if (!el.reportValidity()) {
          valid = false
        }
      }
    }
    return valid
  }

  clearAllCustomValidity (elements) {
    for (const el of elements) {
      if (typeof el.setCustomValidity === 'function') el.setCustomValidity('')
    }
  }

  checkValidity () {
    // Check validity in form
    let valid = true
    // if (!this.native.checkValidity()) valid = false

    for (const el of this.elements) {
      if (typeof el.checkValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('')
        if (!el.checkValidity()) {
          valid = false
        }
      }
    }
    return valid
  }

  reset () {
    if (!this.native) return

    this.native.reset()

    // TODO: Adjust this for radios in a nice sensible way
    for (const el of this.elements) {
      const valueSource = this._getElementValueSource(el)

      // Reset validity, so that error messages are also reset
      if (typeof el.setCustomValidity === 'function') el.setCustomValidity('')

      if (this._radioElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null
      } else if (this._checkboxElement(el)) {
        el[valueSource] = el.hasAttribute(valueSource)
      } else {
        el[valueSource] = el.getAttribute(valueSource)
      }
    }
  }

  createSubmitObject (elements) {
    const r = {}
    for (const el of elements) {
      const elName = el.getAttribute('name')
      // Every submit element MUST have a name set
      if (typeof elName === 'undefined' || elName === null) continue

      // Radio will only happen once thanks to checking for undefined
      if (typeof r[elName] !== 'undefined') continue
      if (el.hasAttribute('no-submit')) continue
      // Checkboxes are special: they might be handled as native ones,
      // (NOTHING set if unchecked, and their value set if checked) or
      // as booleans (true for checked, or false for unchecked)
      if (this._checkboxElement(el)) {
        if (this.submitCheckboxesAsNative) {
          // As native checkboxes.
          const val = this.getFormElementValue(elName)
          if (val) r[elName] = val
        } else {
          // As more app-friendly boolean value
          r[elName] = !!this.getFormElementValue(elName)
        }
      // For "file" types (uploads), it will
      } else if (el.getAttribute('type') === 'file' || el.getAttribute('as-file')) {
        r[elName] = el
      } else {
        r[elName] = this.getFormElementValue(elName)
      }
    }
    return r
  }

  getFormElementValue (elName) {
    const elements = [...this.elements].filter(el => el.getAttribute('name') === elName)

    if (!elements.length) {
      console.error('Trying to set', elName, 'but no such element in form')
      return
    }

    if (elements.length === 1) {
      const el = elements[0]

      const valueSource = this._getElementValueSource(el)
      if (this._checkboxElement(el)) {
        return el[valueSource]
          ? (el.value ? el.value : 'on')
          : undefined
      } else if (this._selectElement(el)) {
        return el[valueSource]
      } else {
        return el[valueSource]
      }
    } else {
      const nonRadio = elements.filter(el => !this._radioElement(el))
      if (nonRadio.length) {
        console.error('Duplicate name', elName, 'for non-radio elements')
        return
      }

      const checked = elements.find(el => {
        const valueSource = this._getElementValueSource(el)
        return el[valueSource]
      })
      if (checked) return checked.value
      else return undefined
    }
  }

  setFormElementValue (elName, value, skipHiddenElements) {
    const el = [...this.elements].find(el => {
      if (this._radioElement(el)) {
        return el.getAttribute('name') === elName && el.value === value
      } else {
        return el.getAttribute('name') === elName
      }
    })

    // Don't do anything if the element wasn't found OR if the type was hidden
    // (which 99.9% of the time is set by the form)
    if ((!el || (el.getAttribute('type') === 'hidden')) && skipHiddenElements) return
    // Get the original value
    const valueSource = this._getElementValueSource(el)

    // CHECKBOXES
    if (this._checkboxElement(el)) {
      el[valueSource] = !!value

    // RADIO
    // Radio elements
    } else if (this._radioElement(el)) {
      el[valueSource] = true
      const others = [...this.elements].filter(e =>
        el !== e &&
        this._radioElement(el)
      )
      for (const other of others) other[valueSource] = false

    // SELECT
    // Selectable elements (with prop selectedIndex)
    } else if (this._selectElement(el)) {
      if (!value) el.selectedIndex = 0
      else el[valueSource] = value

    // Any other case
    } else {
      el[valueSource] = value
    }
  }

  _selectElement (el) {
    if (typeof el.selectedIndex !== 'undefined' || el.hasAttribute('as-select')) return true
    return false
  }

  _checkboxElement (el) {
    if (el.getAttribute('type') === 'checkbox') return true
    if (el.hasAttribute('as-checkbox')) return true
    return false
  }

  _radioElement (el) {
    if (el.getAttribute('type') === 'radio') return true
    if (el.hasAttribute('as-radio')) return true
    return false
  }

  _getElementValueSource (el) {
    if (
      el.getAttribute('type') === 'checkbox' ||
      el.getAttribute('type') === 'radio' ||
      el.hasAttribute('as-checkbox') ||
      el.hasAttribute('as-radio')
    ) return 'checked'

    if (el.getAttribute('value-source')) return el.getAttribute('value-source')
    return 'value'
  }

  get elements () {
    // A tags (links) can have "name", filter them out
    return [...this.querySelectorAll('[name]')].filter(el => el.tagName !== 'A')
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
customElements.define('nn-form', NnForm)
