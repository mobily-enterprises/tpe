import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import tpeRegistry from '../tpeRegistry'

export class EeAutocompleteItemEmail extends StyleableMixin(LitElement) {
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
      emailName: 'name',
      emailAddress: 'email'
    }
  }

  render () {
    
    return html`
    <li>${this.textValue}</li>
    `
  }

  /* API */
  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this._textValueGetter()
  }

  _textValueGetter (short = false) {
    if (short) return this.data[this.config.emailName] || this.data[this.config.emailAddress]
    const name = this.data[this.config.emailName]
    const address = this.data[this.config.emailAddress]
    if (name && address) return `${name} <${address}>`
    else if (name) return name
    else if (address) return address
    else return ''
  }

  stringToData (string) {
    let emailName
    let emailAddress

    if (!string.match('@')) {
      return {
        [this.config.emailName]: string,
        [this.config.emailAddress]: '',
        valid: false
      }
    }

    const emails = string.match(/[^@<\s]+@[^@\s>]+/g)
    if (emails) {
      emailAddress = emails[0]
    }

    const names = string.split(/\s+/)

    if (names.length > 1) {
      names.pop()
      emailName = names.join(' ').replace(/"/g, '')
    }

    const valid = !!emailAddress

    return {
      [this.config.emailName]: emailName,
      [this.config.emailAddress]: emailAddress,
      valid: valid
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemEmailView
  }
}
tpeRegistry.register('ee-autocomplete-item-email', EeAutocompleteItemEmail)

export class EeAutocompleteItemEmailView extends EeAutocompleteItemEmail {
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
    
    return html`
      ${this._textValueGetter(true)}
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-autocomplete-item-email-view', EeAutocompleteItemEmailView)
