/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// import { tpe } from '../tpe.js'
// await tpe.importer()
import {LitElement, html, css} from 'lit';
import { repeat } from 'lit-html/directives/repeat.js';
import  './list-element.js'
import tpeRegistry from '../tpeRegistry'

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
        border-radius: 10px;
        padding: 16px;
        max-width: 800px;
        margin: 50px auto auto;
        box-shadow: 0 0 40px 0px rgb(0,0,0,0.15);
      }


      .lists {
        display: flex;
      }

      list-element {
        flex: 1;
      }

    `;
  }

  static get properties() {
    return {
      lists: { type: Array }      
    };
  }

  constructor() {
    super();
    this.lists = [
      [
        { id: 1, label: 'Item 1' },
        { id: 2, label: 'Item 2' },
        { id: 3, label: 'Item 3' },
      ],
      [
        { id: 4, label: 'Item 4' },
        { id: 5, label: 'Item 5' },
        { id: 6, label: 'Item 6' },
      ],
    ]
    this.moving = null
    this.target = null
    this.originList = null
    this.targetList = null
  }

  render() {
    return html`
      <h1>Drag them!</h1>
      <nn-button></nn-button>
      <!-- Emulating our nested lists scenario -->
      <div class="lists">
        ${repeat(this.lists, l => l, (list, index) => {
            return html`
              <list-element name=${index} .data=${list}
                @dnd-moving=${this._updateMoving}
                @dnd-target=${this._updateTarget}
                @dnd-drop=${this._handleDrop}
              ></list-element>
            `
          })
        }
      </div>
    `;
  }

  _updateMoving(e) {
    this.moving = e.detail.moving
    this.originList = e.detail.originList
  }

  _updateTarget(e) {
    this.target = e.detail.target
    this.targetList = e.detail.targetList
    if (this.moving === this.target) return
  }

  _handleDrop() {
    this._updatePositions()
    this._reset()
  }

  _updatePositions () {
    const movingData = this.originList[this.moving.dataset.index]
    const marker = 'remove me'
    this.originList[this.moving.dataset.index] = marker
    this.targetList.splice(this.target.dataset.index, 0, movingData)
    const removeIndex = this.originList.findIndex(i => i === marker)
    this.originList.splice(removeIndex, 1)
    this.requestUpdate('lists')
  }

  _reset() {
    this.moving = null
    this.target = null
    this.originList = null
    this.targetList = null
  }
}

tpeRegistry.register('my-element', MyElement);
