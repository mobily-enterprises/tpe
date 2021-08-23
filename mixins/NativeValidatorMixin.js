import { html, css } from 'lit'

export const NativeValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        nativeErrorMessages: {
          type: Boolean,
          attribute: 'native-error-messages'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validator: { type: Function },
        validationMessages: {
          type: Object,
          attribute: 'validition-messages'
        },
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        }
      }
    }

    static get styles () {
      return [
        super.styles || [],
        css`

          span.error-message {
            color: red;
          }

          :invalid {
            background-color: pink;
            border: var(--native-validator-mixin-input-border-invalid, 1px solid #bb7777);
          }
        `
      ]
    }

    constructor () {
      super()
      this.validator = () => ''
      this.nativeValidationKeys = [
        'badInput',
        'customError',
        'patternMismatch',
        'rangeOverflow',
        'rangeUnderflow',
        'stepMismatch',
        'valueMissing',
        'tooLong',
        'tooShort',
        'typeMismatch'
      ]
      this.validationMessages = {}
      this.validationMessagePosition = 'before'
      this._showPrettyError = false
    }

    get skipProperties () {
      return [...super.skipProperties, 'checkValidity', 'reportValidity', 'setCustomValidity']
    }

    get validationMessageTemplate () {
      return html`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    setCustomValidity (m) {
      if (!this.native) return
      return this.native.setCustomValidity(m)
    }

    _runValidator () {
      // Call the validator with a value. Here an element could be a checkbox,
      // a select, an simple text input, etc.
      // If the containing form has _getElementValueSource, that is used to
      // figure out what to pass to the validato (as well as _submitObject)
      let value
      let submitObject
      if (this.form && this.form._getElementValueSource) {
        value = this[this.form._getElementValueSource(this)]
        submitObject = this.form.submitObject
      }
      const ownErrorMessage = this.validator(value, submitObject)
      if (ownErrorMessage) this.setCustomValidity(ownErrorMessage)
    }

    reportValidity () {
      if (!this.native) return true

      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.native.validity.customError) {
        this._runValidator()
      }

      // Hide the fancy error message by default
      this.shownValidationMessage = ''

      // Run reportValidity which will display the native
      // error messages.
      // Suppress the pretty error messages
      if (this.nativeErrorMessages) {
        this._showPrettyError = false
        return this.native.reportValidity()
      } else {
        // Since pretty errors will be shown, it will actually
        // return checkValidity() which will not show the
        // error messages
        this._showPrettyError = true
        return this.native.checkValidity()
      }
    }

    checkValidity () {
      if (!this.native) return true
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.native.validity.customError) {
        this._runValidator()
      }

      this._showPrettyError = false
      return this.native.checkValidity()
    }

    firstUpdated () {
      super.firstUpdated()
      this.native.oninput = (e) => {
        this.setCustomValidity('')
        this.reportValidity()
      }

      this.native.oninvalid = (e) => {
        // No pretty error to be shown (probably running checkValidity())
        if (!this._showPrettyError) return

        const validity = e.target.validity

        // Find which one flag in validity is raised
        let found
        for (const k of this.nativeValidationKeys) {
          if (validity[k]) {
            found = k
            break
          }
        }

        // Assign shownValidationMessage
        // Allow translating with specific function
        const translator = this.validationMessages[found]
        if (translator) {
          this.shownValidationMessage = (typeof translator === 'function')
            ? translator(e.target.validationMessage)
            : translator
        } else {
          this.shownValidationMessage = e.target.validationMessage
        }
      }
    }
  }
}
