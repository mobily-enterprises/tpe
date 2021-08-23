// LabelsMixin
// ====================
//
// The LabelsMixin is custom solution to supporting label positioning and optional usage in TPE.
// For native elements, the <label> tag can be placed before or after the form control element,
// and that still works fine in our implementation. However, to support robust theming and simplify
// markup, all nn- elements have internal label tags, which allows scoped CSS to keep consistency
// and control the design, while keeping the native platform features of the <label> tag intact.
//
// The one downside we faced was that positioning the label would be taken out of the developers control.
// To mitigate this, LabelsMixin provides the following features:
//    * the **label** attribute, which accepts any string value to be used as the label
//    * one extra non-standard property: **label-position**
//    * Option to slot any element to be used as abel content
//
// The Mixin is declared here.
import { html, css } from 'lit'

export const LabelsMixin = (base) => {
  return class Base extends base {
// In the scoped CSS, the label content is set to keep the correct alignment and avoid overflowing text.
    static get styles () {
      return [
        super.styles || [],
        css`             
          label div#label-text, ::slotted(*) {
            display: inline-block;
            vertical-align: text-bottom;
            /* It's also possible to control the width of the label with a custom 
            / CSS property **labels-mixin-input-label-width**.
            */
            width: var(--labels-mixin-input-label-width, auto);
            /* Make sure content larger than the element is clipped and show an ellipsis */
            overflow: hidden;
            text-overflow: ellipsis;
          }

        `
      ]
    }

// The **label** property takes a string which is shown as the label.
// The **labelPosition** property is set with attribute label-position, used to determine if <label>
// will be rendered before or after the native input element
    static get properties () {
      return {
        label: { type: String },
        labelPosition: {
          type: String,
          attribute: 'label-position'
        }
      }
    }

    constructor () {
      super()
      // Label position is set to `before` by default
      this.labelPosition = 'before'
    }

    // This getter return the label template
    get labelTemplate () {
      return html`
        <label id="label" for="native">
          <div id="label-text">${this.label}</div>
          <slot id="label-slot" name="label"></slot>
        </label>
      `
    }

    // Note that the mixin wouldn't be able to modify the mixed in element's **render** method to include the label in the right position,
    // so _LabelsMixin_ provides the two getters below, that will only return the **labelTemplate** value if **labelPosition** is the correct value.
    // This can be use the mixed in element's render method
    get ifLabelBefore () {
      return (this.labelPosition === 'before') ? this.labelTemplate : ''
    }

    get ifLabelAfter () {
      return (this.labelPosition === 'after') ? this.labelTemplate : ''
    }
  }
}
