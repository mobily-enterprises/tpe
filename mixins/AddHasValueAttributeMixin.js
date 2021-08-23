// AddHasValueAttributeMixin
// =========================
//
// In some cases, elements will experience some change in state, like the value
// in an input field or focus, and it would be convenient to have styling
// applied to the element, providing user feedback. Standard CSS can deal with
// that automatically by using pseudo classes like :focus and :placeholder-hown.
// However, there are a few limitations:
//
// - varying browser support for some of those features
// - CSS doesn't provide a way to selcet "up", meaning we can't have a rule that
//   target an element for which a child has a state or class
//
// Because TPE aims to reflect the native elements behavior, we need some way to
// make state changes in an input apparent in the wrapper element.
// Unfortunately, there's no native way to use observers to track those states.
// So, this Mixin provides a way of updating a boolean attribute to reflect
// changes that need to be considered in the wrapper element. There ate two
// cases implemented currently, `has-focus` and `has-value`.
//

export const AddHasValueAttributeMixin = (base) => {
  return class Base extends base {
    _observeInput (e) {
      const target = e.currentTarget
      this.toggleAttribute('has-value', __hasValue(target.value))
    }

    _observeFocus (e) {
      this.toggleAttribute('has-focus', true)
    }

    _observeBlur (e) {
      this.toggleAttribute('has-focus', false)
    }

    afterSettingProperty (prop, newValue) {
      super.afterSettingProperty()

      if (prop === 'value') {
        this.toggleAttribute('has-value', __hasValue(newValue))
      }
    }

    firstUpdated () {
      super.firstUpdated()

      this.native.addEventListener('input', this._observeInput.bind(this))
      this.native.addEventListener('focus', this._observeFocus.bind(this))
      this.native.addEventListener('blur', this._observeBlur.bind(this))

      this.toggleAttribute('has-value', __hasValue(this.value))
    }
  }
}

function __hasValue (v) {
  return v !== 'undefined' && v !== 'null' && v !== ''
}
