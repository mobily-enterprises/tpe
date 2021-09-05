import { html } from 'lit'
import { NnInputText } from './nn-input-text-class'
import tpeRegistry from '../tpeRegistry'

export class NnInputEmail extends NnInputText {
  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="email" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-input-email', NnInputEmail)
