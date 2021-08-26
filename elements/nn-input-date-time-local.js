import { html } from 'lit'
import { NnInputText } from './nn-input-text'
import { ThemeableMixin } from '../mixins/ThemeableMixin'

class NnInputDateTimeLocal extends ThemeableMixin('nn-input-date')(NnInputText) {
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
window.customElements.define('nn-input-datetime-local', NnInputDateTimeLocal)
