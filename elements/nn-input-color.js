import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'
export class NnInputColor extends FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="color" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
// window.customElements.define('nn-input-color', NnInputColor)
