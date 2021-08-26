import { LitElement, html, css } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

export class NnInputFile extends ThemeableMixin('nn-input-file')(FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(LitElement))))))) {
  static get styles () {
    return [
      super.styles,
      css`
        /* From https://zellwk.com/blog/hide-content-accessibly/ */
        [hidden] {
          border: 0;
          clip: rect(0 0 0 0);
          height: auto; /* new - was 1px */
          margin: 0; /* new - was -1px */
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          white-space: nowrap; /* 1 */
        }

        nn-button { 
          margin: auto
        }
      `
    ]
  }

  static get properties () {
    return {
      hideNative: { type: Boolean },
      fileName: { type: String },
      manyFilesText: {
        type: String,
        attribute: 'many-files-text'
      }
    }
  }

  constructor () {
    super()
    this.manyFilesText = 'Many'
  }

  render () {
    if (this.themeRender) return this.themeRender()
    // From https://stackoverflow.com/a/25825731/829771
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="file" id="native" @change="${this.fileNameChanged}" ?hidden=${this.hideNative}>
      ${this.ifValidationMessageAfter}
      ${this.fileName}
      ${this.ifLabelAfter}
    `
  }

  fileNameChanged (e) {
    const native = this.shadowRoot.querySelector('#native')
    const v = native.value
    this.fileName = native.files.length > 1 ? this.manyFilesText : v.slice(v.lastIndexOf('\\') + 1)
  }
}
customElements.define('nn-input-file', NnInputFile)
