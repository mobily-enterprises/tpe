import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

export class NnInputRadio extends FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input as-radio value-source="checked" @change="${this._excludeOthers}" type="radio" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  // _updateAssociatedForm () {}
  firstUpdated () {
    super.firstUpdated()
    this.setAttribute('type', 'radio')
  }

  _excludeOthers (e) {
    // Uncheck all other radio elements in the same form, with the same name, marked as `as-radio` or with type="radio"
    const others = [...this.form.children].filter(el =>
      el !== this &&
      !!el.form &&
      el.getAttribute('name') &&
      el.getAttribute('name') === this.getAttribute('name') &&
      (el.getAttribute('type') === 'radio' || el.getAttribute('as-radio') !== null)
    )
    for (const el of others) {
      const prop = el.getAttribute('value-source') || 'checked'
      el[prop] = false
    }

    if (this.internals) {
      this.internals.setFormValue(this.checked ? this.value : null)
    }
  }
}
// customElements.define('nn-input-radio', NnInputRadio)
