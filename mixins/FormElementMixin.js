
import 'element-internals-polyfill'

// FormElementMixin
// ================
//

export const FormElementMixin = (base) => {
  return class Base extends base {
    get skipAttributes () {
      return [
        ...super.skipAttributes, 'form'
      ]
    }

    get skipProperties () {
      return [...super.skipProperties, 'form']
    }

    /**
     * Returning `true` for the formAssociated property allows the element to be
     * detected and participate as a form control element in native forms. It is
     * also necessary to add the lifecycle hooks related to that behavior.
    */
    static get formAssociated () { return true }

    static get properties () {
      return {
        disabled: { type: Boolean },
        required: { type: Boolean }
      }
    }

    constructor () {
      super()
      // Check if the `attachInternals` method is available and call it to enable
      // the ElementInternals API.
      if (this.attachInternals) {
        this.internals = this.attachInternals()
      }
    }

    firstUpdated () {
      super.firstUpdated()
      if (this.internals && this.native) {
        // Update form with current value on firstUpdate
        this._updateAssociatedForm()
        this.native.addEventListener('input', (e) => {
          // Update form value at every input change
          this._updateAssociatedForm()
        })
      }
    }

    connectedCallback () {
      super.connectedCallback()
      this._assignFormProperty()
    }

    _updateAssociatedForm () {
      const data = new FormData()
      data.append(this.name, this.value)
      this.internals.setFormValue(data)
    }

    // From [web.dev article](https://web.dev/more-capable-form-controls/):
    // The following properties and methods aren't strictly required,
    // but browser-level form controls provide them. Providing them helps
    // ensure consistency with browser-provided controls.
    get form () { return this._assignFormProperty() }
    get name () { return this.getAttribute('name') }
    get type () { return this.localName }

    // These validity related callbacks are optional, and are already
    // implemented in the NativeValidatorMixin, so we are not going to use the
    // ElementInternals API methods, except for **willValidate**.
    //
    //
    get willValidate () { return this.internals.willValidate }
    // get validity () { return this.internals.validity }
    // get validationMessage () { return this.internals.validationMessage }
    // checkValidity () { console.log('check validity called'); return this.internals.checkValidity() }
    // reportValidity () { console.log('report validity called'); return this.internals.reportValidity() }

    _assignFormProperty () {
      // if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return
      if (this.internals && this.internals.form) {
        return this.internals.form
      }
      let el = this
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM' && !el.hasAttribute('as-form'))) { } // eslint-disable-line no-empty
      return el
    }
  }
}
