import { LitElement, html, css } from 'lit'
import { NativeReflectorMixin } from '../mixins/NativeReflectorMixin.js'
import { StyleableMixin } from '../mixins/StyleableMixin.js'
import { LabelsMixin } from '../mixins/LabelsMixin.js'
import { progressElement } from '../lib/htmlApi'
import tpeRegistry from '../tpeRegistry'

export class NnProgress extends StyleableMixin(LabelsMixin(NativeReflectorMixin(LitElement))) {
  static get properties () {
    return {
    }
  }

  static get styles () {
    return [
      css`
      progress {
        display: block; /* default: inline-block */
        width: 100%;
        margin: auto;
        padding: 2px;
        border: 0 none;
        background: #777;
        border-radius: 14px;
        box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
      }
      progress::-moz-progress-bar {
        border-radius: 12px;
        background: var(--nn-progress-color, #fff);
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3);
        
      }
      /* webkit */
      @media screen and (-webkit-min-device-pixel-ratio:0) {
        progress {
          height: 10px;
        }
      }
      progress::-webkit-progress-bar {
        background: transparent;
      }  
      progress::-webkit-progress-value {  
        border-radius: 12px;
        background: var(--nn-progress-color, #fff);
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3); 
      } 
      `
    ]
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...progressElement]
  }

  render () {
    
    return html`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <progress id="native" real-time-event="input"></progress>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-progress', NnProgress)
