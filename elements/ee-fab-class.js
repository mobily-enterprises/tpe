import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin'
import { ifDefined } from 'lit-html/directives/if-defined.js'
import tpeRegistry from '../tpeRegistry'

const plusIcon = html`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`

export class EeFab extends StyleableMixin(NativeReflectorMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          position: fixed;
          right: 16px;
          left: initial;
          bottom: 16px;
          top: initial;
        }
      `
    ]
  }

  static get properties () {
    return {
      icon: { type: Object },
      label: { type: String }
    }
  }

  render () {
    
    return html`
      <button data-descr=${ifDefined(this.label)} id="native">
        ${this.icon ? this.icon : plusIcon}
      </button>
    `
  }
}
tpeRegistry.register('ee-fab', EeFab)
