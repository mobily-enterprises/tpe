import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { meterElement } from '../lib/htmlApi'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnMeter extends StyleableMixin(LabelsMixin(NativeReflectorMixin(LitElement))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...meterElement]
  }

  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <meter id="native" real-time-event="input"></meter>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-meter', NnMeter)
