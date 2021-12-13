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

export const ThemeableMixin = (name, theme) => (base) => {
  if (!base) console.log(name, base)
  const shared = (theme && theme.shared) || (p => p)
  const elementTheme = (theme && theme[name]) || (p => p)
  return elementTheme(shared(base))
}