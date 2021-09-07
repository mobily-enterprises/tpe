import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import tpeRegistry from '../lib/tpeRegistry'

export class NnInputCheckbox extends FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="checkbox" as-checkbox value-source="checked" id="native" real-time-event="click">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  _updateAssociatedForm () {
    this.internals.setFormValue(this.checked ? this.value : null)
  }
}
tpeRegistry.register('nn-input-checkbox', NnInputCheckbox)
