import { html } from 'lit'
import { NnInputText } from './nn-input-text'

export class NnInputDateTimeLocal extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="datetime-local" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
// window.customElements.define('nn-input-datetime-local', NnInputDateTimeLocal)
