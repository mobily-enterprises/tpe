// StyleableMixin
// ==============
//
// This mixin adds the capability to use common _<style>_ tags. Our goal is to
// reduce friction for anyone not used to custom elements, shadow DOM and
// prefers to create and style their projects using plain HTML markup.
//
// Usage is simple. Any TPE elements accepts plain CSS code added as <style
// slot="style"></style>, nested in the elements markup, like so:
//
// ```
// <nn-input-text>
//   <style slot="style">
//    #native {
//      color: blue;
//    }
//   </style>
// </nn-input-text>
// ```
//
// That allows developers to pierce the shadow DOM and override all of the
// elements styles using familiar syntax.
//

export const StyleableMixin = (base) => {
  return class Base extends base {
    static get styles () {
      return []
    }

    firstUpdated () {
      super.firstUpdated()

      // Add the equivalent of
      // <slot name="style" id="style-slot"></slot>
      // To the shadow DOM
      const styleSlot = document.createElement('slot')
      styleSlot.setAttribute('name', 'style')
      styleSlot.setAttribute('id', 'style-slot')
      this.shadowRoot.appendChild(styleSlot)

      // If an element has one or more <any-tag slot="style"> in its
      // light DOM, the newly added styleSlot will have
      // them  as an assigned element.
      // Clone over all of the ones where any-tag is `style`.
      // So, any <style slot="style"> will be cloned over
      for (const styleElement of styleSlot.assignedElements()) {
        if (styleElement.tagName === 'STYLE') {
          this.shadowRoot.appendChild(styleElement)
        }
      }
    }
  }
}
