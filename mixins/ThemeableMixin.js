/* eslint-disable new-cap */
// ThemeableMixin
// ==============
//
// This mixin is entirely responsible for the flexible theming capabilities of
// TPE. There's a simple interface to be implemented by the theme developers.
// The theme is defined with an object containing these keys:

//   - shared: A mixin that will be applied to all tpe elements. If the theme
//     doesn't use any shared code, this key can be ommitted.
//   - [`name`]: in which `name` matches each element that will be modified in
//     the TPE collection. For example, the styles for **nn-input-text** should
//     be defined in a mixin and assined to a "nn-input-text" key in the theme
//     object.

// Another important point is that the theme **must** be assigned to the global
// **window.TP_THEME**, and be available before loading TPE itself. Here's an
// example:

// ```
//     window.TP_THEME = {
//       shared: MySharedThemeMixin,
//       "nn-input-text": MyInputTextThemeMixin,
//       "nn-button": MyButtonThemeMixin,
//       "ee-tabs": MyTabsThemeMixin
//     }
// ```
//
// The actual mixin is relatively simple. It will check for `shared` and for a
// specific value corresponding to the element name, expect as the functiona
// parameter. If they are present, they will be applied to the target element,
// along with two mixins defined below, CustomThemeMixin and LitBits.

import { LitElement, css, html, unsafeCSS } from 'lit-element'

export const ThemeableMixin = (name) => (base) => {
  const shared = (window.TP_THEME && window.TP_THEME.shared) || (p => p)
  const elementTheme = (window.TP_THEME && window.TP_THEME[name]) || (p => p)
  return elementTheme(shared(CustomThemeMixin(LitBits(base))))
}

// In addition to applying the imported theme, ThemeableMixin adds a
// non-standard LitElement property: _customStyles_. Using _customStyles_ allows
// developers to completely bypass the shadowRoot scope and redefine any part or
// all of the elements CSS using a stylesheet string or a CSSTemplateResult
// object. The principle behind this mechanism is that if a new style is added
// using this property, the adopteStylesheet of the element is updated in
// realtime. This approach can be costly for performance if abused, but for the
// main purpose of overriding scoped CSS, it won't have any side effects.

export const CustomThemeMixin = (base) => {
  return class Theme extends base {
    get customStyles () {
      return this._customStyles || ''
    }

    set customStyles (cssTemplate) {
      if (!cssTemplate) return
      if (typeof cssTemplate === 'string') {
        cssTemplate = super.lit.unsafeCSS`${cssTemplate}`
      }
      this._customStyles = cssTemplate
      this.constructor._styles = [...this.constructor._styles, this._customStyles]
      this.adoptStyles()
      this.requestUpdate()
    }
  }
}

// LitBits is a workaround developed to address this
// [issue](https://github.com/Polymer/lit-html/issues/1015#issuecomment-577903812).
// This makes sure the same instance of lit-html is used in the entire mixin
// chain. That issue should be revolved by lit-html's next [version
// update](https://www.polymer-project.org/blog/2020-09-22-lit-element-and-lit-html-next-preview).

export const LitBits = (base) => {
  return class Base extends base {
    static get lit () {
      return {
        LitElement,
        css,
        unsafeCSS,
        html
      }
    }

    get lit () {
      return {
        LitElement,
        css,
        unsafeCSS,
        html
      }
    }
  }
}
