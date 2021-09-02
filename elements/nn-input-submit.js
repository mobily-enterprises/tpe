import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'

export class NnInputSubmit extends FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <input @click="${this._formSubmit}" type="submit" id="native">
    `
  }

  _formSubmit (e) {
    if (this.form) {
      this.form.submit()
    }
  }
}
// customElements.define('nn-input-submit', NnInputSubmit)
