/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {LitElement, html, css} from 'lit';
import {repeat} from 'lit/directives/repeat.js';
// import { flip } from '@lit-labs/motion';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 800px;
      }


      .lists {
        display: flex;
      }

      .list {
        flex: 1;
      }

      ul {
        margin: 0;
        padding: 0;
        outline: none;
      }

      li {
        will-change: transform;
        position: relative;
        background: #ffeb3b;
        padding: 8px;
        border-radius: 12px;
        margin: 8px;
        display: flex;
        align-items: center;
      }

      li > .button {
        border: none;
        background: none;
        outline: none;
      }

      li > .form-field {
        flex: 1;
      }

      .list.completed li {
        background: #4caf50;
      }

      .moving {
        pointer-events: none;
        visibility: hidden;
      }

      .moving ~ li {
        transform: translateY(-100%);
        transition: transform 0.3s ease-in-out;
      }

      .moving ~ li.target,  .moving + li.target ~ li {
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

      .target ~ li {
        transform: translateY(100%);
        transition: transform 0.3s ease-in-out;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      name: {type: String},

      /**
       * The number of times the button has been clicked.
       */
      count: {type: Number},
      lists: { type: Array }
    };
  }

  constructor() {
    super();
    this.name = 'World';
    this.count = 0;
    this.lists = [
      [
        {id: 1, label: 'list A item 1'},
        {id: 2, label: 'list A item 2'},
        {id: 3, label: 'list A item 3'},
      ],
      [
        {id: 4, label: 'list B item 1'},
        {id: 5, label: 'list B item 2'},
        {id: 6, label: 'list B item 3'},
      ]
    ]
  }



  render() {
    return html`
      <h1>Hello, ${this.name}!</h1>
      <nn-button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </nn-button>

      <div class="lists">
        ${repeat(this.lists, l => l, (list, lIdx) => {
            return html`
              <div id="list-${lIdx}" class="list">
                <ul tabindex="-1">
                  ${repeat(list, i => i.id, (item, index) => {
                    return html`
                      <li id=${item.id} data-idx=${index} data-list=${lIdx} draggable="true" @dragstart=${this._dragStart} @dragend=${this._dragEnd} @dragover=${this._dragOver} @dragleave=${this._dragLeave} @drop=${this._drop}>
                        <h5>${item.label}</h5>
                      </li>
                    `
                  })}
                </ul>
              </div>
            `
          })
        }
      </div>
      <slot></slot>
    `;
  }

  _onClick() {
    this.count++;
  }

  _dragStart (e) {
    this.moving = e.currentTarget
    this.origin = this.lists[this.moving.dataset.list]
    this.movingData = this.origin[this.moving.dataset.idx]
    requestAnimationFrame(() => {
      this.moving.classList.add('moving')
    })
  }

  _dragEnd (e) {
    const moving = e.currentTarget
    requestAnimationFrame(() => {
      moving.classList.remove('moving')
    })
  }

  _dragOver (e) {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    const target = e.currentTarget
    requestAnimationFrame(() => {
      target.classList.add('target')
    })
  }

  _dragLeave (e) {
    const target = e.currentTarget
    requestAnimationFrame(() => {
      target.classList.remove('target')
    })
  }

  _drop (e) {
    const target = e.currentTarget
    const targetIndex = target.dataset.list
    requestAnimationFrame(() => {
      target.classList.remove('target')
    })
    const marker = 'remove me'
    if (this.moving.id === target.id) return
    e.preventDefault();
    this.origin[this.moving.dataset.idx] = marker
    this.lists[targetIndex].splice(target.dataset.idx, 0, this.movingData)
    const removeIndex = this.origin.findIndex(i => i === marker)
    this.origin.splice(removeIndex, 1)
    this.requestUpdate('lists')
  }
}

window.customElements.define('my-element', MyElement);
