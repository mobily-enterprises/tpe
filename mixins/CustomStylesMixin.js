
import { unsafeCSS } from 'lit'
import { adoptStyles } from '@lit/reactive-element'

// CustomStylesMixin adds a non-standard LitElement property: _customStyles_.
// Using _customStyles_ allows developers to completely bypass the shadowRoot
// scope and redefine any part or all of the elements CSS using a stylesheet
// string or a CSSTemplateResult object. The principle behind this mechanism is
// that if a new style is added using this property, the adopteStylesheet of the
// element is updated in realtime. This approach can be costly for performance
// if abused, but for the main purpose of overriding scoped CSS, it won't have
// any side effects.

export const CustomStylesMixin = (base) => {
  return class Theme extends base {
    get customStyles () {
      return this._customStyles || []
    }

    set customStyles (cssTemplate) {
      if (!cssTemplate) return
      if (typeof cssTemplate === 'string') {
        cssTemplate = unsafeCSS`${cssTemplate}`
      }

      // Always set customStyles as an array, as always redefine the property,
      // for simplicity in subsequent steps
      if (!Array.isArray(cssTemplate)) cssTemplate = [cssTemplate]
      this._customStyles = cssTemplate

      // If customStyles exists at construction time (usually because it was set
      // by an attribute), shadowRoot won't be available, which means the
      // element is not ready for overriding styles. The redefined
      // `createRenderRoot` below will use the customStyles at the right time 
      if (!this.shadowRoot) return
      adoptStyles(this.shadowRoot, [...this.constructor.styles, ...this._customStyles])
      this.requestUpdate()
    }

    createRenderRoot () {
      const renderRoot = this.shadowRoot || this.attachShadow(this.constructor.shadowRootOptions)
      // Use customStyles along with memoized elementStyles  
      adoptStyles(renderRoot, [...this.constructor.elementStyles, ...this.customStyles])
      return renderRoot;
    }
  }
}