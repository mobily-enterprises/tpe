import { html } from 'lit'
import { getElementValueSource } from '../lib/getElementValueSource'

export const SyntheticValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validity: {
          type: Object,
          attribute: false
        },
        validator: { type: Object }
      }
    }

    constructor () {
      super()
      this.shownValidationMessage = ''
      this.validator = () => ''
      this.validationMessagePosition = 'before'
      this.validity = { valid: true, _customValidationMessage: '' }
    }

    setCustomValidity (m) {
      if (m === '') {
        this.validity = {
          valid: true,
          _customValidationMessage: ''
        }
        this.removeAttribute('invalid')
        this.shownValidationMessage = ''
      } else {
        this.validity = {
          valid: false,
          customError: true,
          _customValidationMessage: m
        }
        this.setAttribute('invalid', '')
      }
    }

    reportValidity () {
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.validity.customError) {
        const ownErrorMessage = this._runValidator()
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
      }

      // Hide the error message by default
      this.shownValidationMessage = ''

      if (!this.validity.valid) {
        this.shownValidationMessage = this.validity._customValidationMessage
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }))
        return false
      } else {
        this.removeAttribute('invalid')
        return true
      }
    }

    _runValidator () {
      // Call the validator with a value. Here an element could be a checkbox,
      // a select, an simple text input, etc.
      // getElementValueSource is used to figure out what to pass to the
      // validator (as well as _submitObject, if available)
      let value
      let submitObject
      value = this[getElementValueSource(this)]
      submitObject = this.form ? this.form.submitObject : {}

      const ownErrorMessage = this.validator(value, submitObject)
      if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
      return ownErrorMessage
    }

    checkValidity () {
      if (!this.validity.customError) {
        const ownErrorMessage = this._runValidator()
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
      }

      if (!this.validity.valid) {
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }))
        return false
      }
      this.removeAttribute('invalid')
      return true
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    get validationMessageTemplate () {
      return html`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }
  }
}
