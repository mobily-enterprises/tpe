import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { textareaElement } from '../lib/htmlApi.js'
import { CustomStylesMixin } from '../mixins/CustomStylesMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnTextarea extends CustomStylesMixin(StyleableMixin(FormElementMixin(NativeValidatorMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...textareaElement]
  }

  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <textarea name="" id="native" real-time-event="input"></textarea>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}

tpeRegistry.register('nn-textarea', NnTextarea)
