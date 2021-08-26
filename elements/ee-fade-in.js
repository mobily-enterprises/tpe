import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { ThemeableMixin } from '../mixins/ThemeableMixin'

export class EeFadeIn extends ThemeableMixin('ee-fade-in')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        @-webkit-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @-moz-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @-o-keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes fadeIn {
          0%   { opacity: 0; }
          100% { opacity: 1; }
        }

        :host(:not([no-animation])) {
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-animation: fadeIn 0.3s ease-in; /* Safari 4+ */
          -moz-animation:    fadeIn 0.3s ease-in; /* Fx 5+ */
          -o-animation:      fadeIn 0.3s ease-in; /* Opera 12+ */
          animation:         fadeIn 0.3s ease-in; /* IE 10+, Fx 29+ */
        }

      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      <slot></slot>
    `
  }
}
customElements.define('ee-fade-in', EeFadeIn)
