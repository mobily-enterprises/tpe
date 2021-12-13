import { LitElement, html } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { selectElement } from '../lib/htmlApi.js'
import { CustomStylesMixin } from '../mixins/CustomStylesMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnSelect extends CustomStylesMixin(FormElementMixin(NativeValidatorMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement)))))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...selectElement]
  }

  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div style="display: none">
        <slot id="slot" @slotchange="${this.refreshOptions}"></slot>
      </div>
      <select id="native" real-time-event="selected"></select>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  async refreshOptions (e) {
    const select = this.shadowRoot.querySelector('#native')
    const slot = this.shadowRoot.querySelector('#slot')
    if (!select || !slot) return

    const options = slot.assignedElements()
    select.innerHTML = ''
    // while (select.firstChild) {
    //   if (!select.lastChild.value) break
    //   select.removeChild(select.lastElementChild)
    // }
    for (const option of options) {
      select.appendChild(option.cloneNode(true))
    }

    // The element's value depends on what it can contain. For example
    // the first selected option will be the element's value.
    // The assign will ensure that the value is updated as a property
    // This will trigger the setter, which will in turn trigger
    // `afterSettingProperty` (which is used for example by
    // AddHasValueAttributeMixin to set the has-value property)
    //
    this.value = this.value // eslint-disable-line
  }
}
tpeRegistry.register('nn-select', NnSelect)
