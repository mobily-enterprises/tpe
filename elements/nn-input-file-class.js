import { LitElement, html, css } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { NativeValidatorMixin } from '../mixins/NativeValidatorMixin.js'
import { InputMixin } from '../mixins/InputMixin.js'
import { FormElementMixin } from '../mixins/FormElementMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputFile extends FormElementMixin(NativeValidatorMixin(StyleableMixin(InputMixin(NativeReflectorMixin(LitElement))))) {
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
      },
      title: { type: String }
    }
  }

  constructor () {
    super()
    this.manyFilesText = 'Multiple'
    this.title = ''
    this.toggleAttribute('as-file', true)
  }

  render () {
    
    // From https://stackoverflow.com/a/25825731/829771
    return html`
      ${this.ifValidationMessageBefore}
      <input type="file" id="native" @change="${this.fileNameChanged}" ?hidden=${this.hideNative} title=${this.title}>
      ${this.fileName}
      ${this.ifValidationMessageAfter}
    `
  }

  fileNameChanged (e) {
    const native = this.shadowRoot.querySelector('#native')
    const v = native.value
    if (native.files.length > 1) {
      this.fileName = this.manyFilesText + ` (${native.files.length})`
      this.title = Array.from(native.files).map(file => file.name).join('\n')
    } else if (native.files.length === 1) { 
      this.fileName = v.slice(v.lastIndexOf('\\') + 1)
      this.title = this.fileName
    } else {
      this.fileName = ''
      this.title = ''
    }
  }
}
tpeRegistry.register('nn-input-file', NnInputFile)
