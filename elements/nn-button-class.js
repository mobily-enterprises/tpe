import { LitElement, html, css } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
// import { ThemeableMixin } from '../mixins/ThemeableMixin.js'
import { buttonElement } from '../lib/htmlApi.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnButton extends FormElementMixin(NativeValidatorMixin(StyleableMixin(NativeReflectorMixin(LitElement)))) {
  get skipAttributes () {
    return [...super.skipAttributes, 'form']
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...buttonElement]
  }

  static get styles () {
    return [
      super.styles || [],
      css`
      /*  This is necessary as a workaround to this chrome bug:
      /   https://bugs.chromium.org/p/chromium/issues/detail?id=1061240&can=2&q=status%3Aunconfirmed&colspec=ID%20Stars%20Area%20Feature%20Status%20Summary%20Modified%20OS&sort=-id 
      */
        :host([disabled]) {
          pointer-events: none;
        }
      `
    ]
  }

  render () {
    
    return html`
      <button @click="${this._clicked}" id="native">
        <slot></slot>
      </button>
    `
  }

  _clicked (e) {
    // trigger submit on the parent form. Use requestSubmit if available
    if (this.getAttribute('type') === 'submit') {
      this.form.requestSubmit ? this.form.requestSubmit() : this.form.submit()
    }
  }
}
tpeRegistry.register('nn-button', NnButton)
