import { html, css, LitElement } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class EnInputRange extends FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: flex;
          height: 30px;
        }

        #native {
          margin: auto 20px;
        }
      `
    ]
  }

  static get properties () {
    return {
      shownValue: {
        type: String,
        attribute: false
      }
    }
  }

  firstUpdated () {
    super.firstUpdated()
    this.shownValue = this.shadowRoot.querySelector('#native').value
  }

  render () {
    
    return html`
      <slot @slotchange="${this.slotChanged}" id="range-amount-before" name="range-amount-before"></slot>
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input @change=${this.updateShownValue} type="range" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot @slotchange="${this.slotChanged}" id="range-amount-after" name="range-amount-after"></slot>
    `
  }

  _updateSpanInSlot (slot, value) {
    if (slot) {
      const slotContents = slot.assignedElements()[0]
      if (slotContents) {
        const amountSpan = slotContents.querySelector('span#range-amount')
        if (amountSpan) {
          amountSpan.innerHTML = Number(value)
        }
      }
    }
  }

  updateShownValue (e) {
    let slot
    this.shownValue = e.srcElement.value

    slot = this.shadowRoot.querySelector('slot#range-amount-before')
    this._updateSpanInSlot(slot, this.shownValue)

    slot = this.shadowRoot.querySelector('slot#range-amount-after')
    this._updateSpanInSlot(slot, this.shownValue)
  }

  slotChanged (e) {
    this._updateSpanInSlot(e.srcElement, this.shownValue)
  }
}
tpeRegistry.register('ee-input-range', EnInputRange)
