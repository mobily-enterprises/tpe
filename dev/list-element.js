import { LitElement, html, css } from 'lit';
import { repeat } from 'lit/directives/repeat'

class ListElement  extends LitElement {

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 10px;
      }

      .list {
        flex: 1;
      }

      ul {
        margin: 0;
        padding: 0;
        outline: none;
      }

      .item {
        box-sizing: border-box;
        position: relative;
        display: flex;
        align-items: center;
        will-change: transform;
        background: steelblue;
        margin: 5px;
        padding: 10px;
        border-radius: 10px;
        transform: translateY(0);
        transition: transform 0.3s ease-in-out;
      }

      .item > .button {
        border: none;
        background: none;
        outline: none;
      }

      .item > .form-field {
        flex: 1;
      }

      .moving {
        pointer-events: none;
        visibility: hidden;
      }

      .moving ~ .item {
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
      }

      .moving ~ .item.target,  .moving ~ .item.target ~ .item {
        transform: translateY(0);
      }

      .target {
        position: relative;
        background: #4caf50;
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
      }

      .target::before {
        content: '';
        height: 100%;
        width: 100%;
        position: absolute;
        top: -100%;
        left: 0;
      }

      .target ~ .item {
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
      }
    `;
  }

  static get properties() {
    return {
      data: { type: Array },
      name: { type: String }
    };
  }

  constructor() {
    super();
    this.data = []
    this.name = ''
  }

  render() {
    return html`
      <div class="list">
        <h3>List ${this.name}</h3>
        <ul id="list" tabindex="-1">
          ${repeat(this.data, i => i.id, (item, index) => {
            return html`
              <li class="item" data-id=${item.id} data-index=${index}
                draggable="true"
                @dragstart=${this._dragStart} 
                @dragend=${this._dragEnd} 
                @dragenter=${this._dragEnter}
                @dragleave=${this._dragLeave}
                @drop=${this._drop}>
                <strong>${item.label}</strong>
              </li>
            `
          })}
        </ul>
      </div>
    `;
  }


  _dragStart (e) {
    const moving = e.currentTarget
    const originList = this.data
    this.dispatchEvent(new CustomEvent('dnd-moving', {
      composed: true,
      bubbles: true,
      detail: {
        moving,
        originList,
      }
    }))
    requestAnimationFrame(() => {
      moving.classList.add('moving')
    })
  }

  _dragEnd (e) {
    const moving = e.currentTarget
    requestAnimationFrame(() => {
      moving.classList.remove('moving')
    })
    this.dispatchEvent(new CustomEvent('dnd-moving', {
      composed: true,
      bubbles: true,
      detail: {
        moving: null,
        originList: null,
      }
    }))
  }

  _dragEnter (e) {
    const target = e.currentTarget
    const targetList = this.data
    requestAnimationFrame(() => {
      target.classList.add('target')
    })
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    this.dispatchEvent(new CustomEvent('dnd-target', {
      composed: true,
      bubbles: true,
      detail: {
        target,
        targetList,
      }
    }))
  }

  _dragLeave (e) {
    const target = e.currentTarget
    requestAnimationFrame(() => {
      target.classList.remove('target')
    })
    this.dispatchEvent(new CustomEvent('dnd-target', {
      composed: true,
      bubbles: true,
      detail: {
        target: null,
        targetList: null,
      }
    }))
  }

  _drop (e) {
    const target = e.currentTarget
    requestAnimationFrame(() => {
      target.classList.remove('target')
    })
    e.preventDefault()
    this.dispatchEvent(new CustomEvent('dnd-drop', { 
      composed: true, 
      bubbles: true
    }))
  }
}

customElements.define('list-element', ListElement);