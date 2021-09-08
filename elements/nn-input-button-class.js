import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputButton extends FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(LitElement)))) {
  render () {
    return html`
      <input type="button" id="native">
        <slot></slot>
     `
  }

  constructor () {
    super()
  }
  
}
tpeRegistry.register('nn-input-button', NnInputButton)
