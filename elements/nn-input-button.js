import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

class NnInputButton extends ThemeableMixin('nn-input-button')(FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <input type="button" id="native">
        <slot></slot>
     `
  }
}
customElements.define('nn-input-button', NnInputButton)
