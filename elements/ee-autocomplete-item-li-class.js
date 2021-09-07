import { LitElement, html, css } from 'lit'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import tpeRegistry from '../lib/tpeRegistry'

export class EeAutocompleteItemLi extends StyleableMixin(LitElement) {
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
          text-align: left;
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
      path: 'name'
    }
  }

  render () {
    
    return html`
    <li>${this.data[this.config.path]}</li>
    `
  }

  /* API */

  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this.data[this.config.path]
  }

  stringToData (string) {
    return {
      [this.config.path]: string
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemLiView
  }
}
tpeRegistry.register('ee-autocomplete-item-li', EeAutocompleteItemLi)

export class EeAutocompleteItemLiView extends EeAutocompleteItemLi {
  static get styles () {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
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
      path: 'name'
    }
  }

  render () {
    
    return html`
      -${this.data[this.config.path]}-
    `
  }
}
tpeRegistry.register('ee-autocomplete-item-li-view', EeAutocompleteItemLiView)
