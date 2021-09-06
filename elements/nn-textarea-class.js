import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { textAreaElement } from '../lib/htmlApi.js'
import tpeRegistry from '../tpeRegistry'

export class NnTextarea extends StyleableMixin(FormElementMixin(NativeValidatorMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...textAreaElement]
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
