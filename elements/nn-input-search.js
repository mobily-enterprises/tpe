import { html } from 'lit'
import { NnInputText } from './nn-input-text'

export class NnInputSearch extends NnInputText {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="search" id="native">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
// window.customElements.define('nn-input-search', NnInputSearch)
