import { html } from 'lit'
import { NnInputText } from './nn-input-text'

export class NnInputMonth extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="month" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
// window.customElements.define('nn-input-month', NnInputMonth)
