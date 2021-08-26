import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { ThemeableMixin } from '../mixins/ThemeableMixin.js'

export class EeAutocompleteItemCountry extends ThemeableMixin('ee-autocomplete-item-country')(StyleableMixin(LitElement)) {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        :host(:last-child) {
          border-bottom: unset;
        }

        :host(:hover) {
          background-color: #eee;
        }

        li {
          list-style: none;
        }

      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super()
    this.config = {
      id: 'id',
      countryName: 'name',
      countryCapital: 'capital'
    }
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
    <li>${this.data[this.config.countryName]} (Capital: ${this.data[this.config.countryCapital]})</li>
    `
  }

  /* API */

  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this.data[this.config.countryName]
  }

  stringToData (string) {
    return {
      [this.config.countryName]: string,
      valid: true
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemCountryView
  }
}
customElements.define('ee-autocomplete-item-country', EeAutocompleteItemCountry)

class EeAutocompleteItemCountryView extends ThemeableMixin('ee-autocomplete-item-country-view')(EeAutocompleteItemCountry) {
  static get styles () {
    return [
      css`
        :host {
          position: relative;
          display: inline-block;
          font-size: 0.9em;
        }
      `
    ]
  }

  render () {
    if (this.themeRender) return this.themeRender()
    return html`
      ${this.data[this.config.countryName]}
      <slot></slot>
    `
  }
}
customElements.define('ee-autocomplete-item-country-view', EeAutocompleteItemCountryView)
