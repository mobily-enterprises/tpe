import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { CustomStylesMixin } from '../mixins/CustomStylesMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputSubmit extends CustomStylesMixin(FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
  render () {
    
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
tpeRegistry.register('nn-input-submit', NnInputSubmit)
