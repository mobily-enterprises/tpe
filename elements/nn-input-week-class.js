import { html } from 'lit'
import { NnInputText } from './nn-input-text-class'
import tpeRegistry from '../lib/tpeRegistry'

export class NnInputWeek extends NnInputText {
  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="week" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-input-week', NnInputWeek)
