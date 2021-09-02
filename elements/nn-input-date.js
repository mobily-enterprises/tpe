import { html } from 'lit'
import { NnInputText } from './nn-input-text'

export class NnInputDate extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="date" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
// window.customElements.define('nn-input-date', NnInputDate)
