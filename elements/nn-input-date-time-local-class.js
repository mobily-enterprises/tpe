import { html } from 'lit'
import { NnInputText } from './nn-input-text-class'
import tpeRegistry from '../tpeRegistry'

export class NnInputDateTimeLocal extends NnInputText {
  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="datetime-local" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-input-datetime-local', NnInputDateTimeLocal)
