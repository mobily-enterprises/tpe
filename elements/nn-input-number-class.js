import { html } from 'lit'
import { NnInputText } from './nn-input-text-class'
import tpeRegistry from '../lib/tpeRegistry'

export class NnInputNumber extends NnInputText {
  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="number" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-input-number', NnInputNumber)
