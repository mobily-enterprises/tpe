// NativeReflectorMixin
// ====================
//
// This is the centrepiece of the `nn-` elements. Every `nn-` element has the
// characteristic of being basically a native element with theming steroids.
// Each `nn-` element has, in its template, a native element marked as
// `id="native"` which identifies the element they represent. For example
// the `Button.js` file will implement `nn-button` element, which in turn will
// have `<button id="native"` in its template.
//
// The approach to `nn-` elements is to reflect as much as possible, in terms
// of properties and attributes, from the `nn-` element down to the `native` one.
//
// This means that the `nn-` element is a "gateway" to properties and attributes
// of the actual native element inside.
//
// For example writing:
//
//     <nn-button label="Some label"></nn-button>
//
// Will imply that the contained `<button>` element (which is marked as
// `native`) also has the `label` attribute set to `Some label`.
//
// The idea is that between `<nn-button>` and `<button>` _everything_ is
// reflected. This is great in theory, but there is a level of trickery
// required to make things work properly. For example, some attributes will
// _always_ need to be skipped (`id`, `style`, `class`). Also, it's impossible
// to simply reflect every property, since 1) they could be anywhere in the
// prototype chain 2) Some properties should never be reflected (see:
// `setAttribute()`, `hasChildNodes()`, and so on).
//
// So, the approach is:
//
//  * All attributes are reflected, _except_ some that are blacklisted (in
//    `this.skipAttributes`)
//  * Only properties/methods listed in `this.reflectProperties` are reflected.
//    Each element will provide a comprehensive list of reflected properties, which
//    will depend on the HTML specs of the targeted `native` element.
//  * Some "boot" properties are assigned when the element is first updated.
//
// ## Into the code
//
// First of all, NativeRefletorMixin is declared as a mixing in function:
import { element } from '../lib/htmlApi.js'

export const NativeReflectorMixin = (base) => {
  return class Base extends base { // eslint-disable-line

// The firstUpdated method is used to perform one-time work after the element's
// template has been created. In this case, it will need to:
//
// 1) Find the native element (marked with `id="native"`)
// 3) Start reflection of attributes and properties
//
    firstUpdated () {
      /* Find the native element */
      this.native = this.shadowRoot.querySelector('#native')

      /* Reflect all attributes and properties */
      /*  - all properties are reflected except some (listed in skipAttributes) */
      /*  - only elected properties are reflected (listed in reflectProperties) */
      this._reflectAttributesAndProperties()
    }

    get reflectProperties () {
      return element
    }

    get skipProperties () {
      return ['style']
    }

    get skipAttributes () {
      return ['id', 'style', 'class']
    }

    afterSettingProperty () {}

    getAttribute (attr) {
      if (!this.native || this.skipAttributes.indexOf(attr) !== -1) {
        return super.getAttribute(attr)
      }

      return this.native.getAttribute(attr)

      /*
      const nativeAttribute = this.native.getAttribute(attr)
      if (nativeAttribute !== null) return nativeAttribute

      // This shouldn't really happen, but it's here as a fallback
      // TODO: Maybe delete it and always return the native's value regardless
      return super.getAttribute(attr)
      */
    }

    setAttribute (attr, value) {
      // Set the attribute
      super.setAttribute(attr, value)

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, value)
    }

    removeAttribute (attr) {
      // Set the attribute
      super.removeAttribute(attr)

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, null)
    }

    toggleAttribute (attr, force) {
      // Call the base class toggleAttribute
      super.toggleAttribute(attr, force)

      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax,
      // and use internal `toggle` instead of `set` method
      this._setSubAttr(attr, force, true)
    }

    _setSubAttr (subAttr, attrValue, toggle) {
      const tokens = subAttr.split('::')

      // Safeguard: if this.native is not yet set, it means that
      // an attribute was set BEFORE the element was rendered. If that
      // is the case, simply give up. _reflectAttributesAndProperties() will
      // be run afterwards to sync things up anyway
      if (!this.native) return

      // No :: found, simply change attribute in `native`
      if (tokens.length === 1) {
        (attrValue === null)
          ? this.native.removeAttribute(subAttr)
          : toggle 
            ? this.native.toggleAttribute(subAttr, attrValue) 
            : this.native.setAttribute(subAttr, attrValue)

      // Yes, :: is there: assign the attribute to the element with the
      // corresponding ID
      } else if (tokens.length === 2) {
        const dstElement = this.shadowRoot.querySelector(`#${tokens[0]}`)
        if (dstElement) {
          attrValue === null
            ? dstElement.removeAttribute(tokens[1])
            : toggle 
              ? dstElement.toggleAttribute(tokens[1], attrValue)
              : dstElement.setAttribute(tokens[1], attrValue)
        }
      }
    }

    _reflectAttributesAndProperties () {
      // STEP #1: ATTRIBUTES FIRST

      // Assign all starting attribute to the destination element
      for (const attributeObject of this.attributes) {
        const attr = attributeObject.name

        if (this.skipAttributes.indexOf(attr) !== -1) continue
        this._setSubAttr(attr, super.getAttribute(attr))
      }

      // Observe changes in attribute from the source element, and reflect
      // them to the destination element
      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const attr = mutation.attributeName

            // Don't reflect forbidden attributes
            if (this.skipAttributes.indexOf(attr) !== -1) return

            // Don't reflect attributes with ::
            if (attr.indexOf('::') !== -1) return

            // Check if the value has changed. If it hasn't, there is no
            // point in re-assigning it, especially since the observer
            // might have been triggered by this very mixin
            const newValue = this.native.getAttribute(attr)
            const thisValue = super.getAttribute(attr)
            if (newValue === thisValue) return

            // Assign the new value
            (newValue === null)
              ? super.removeAttribute(attr)
              : super.setAttribute(attr, newValue)
          }
        })
      })
      thisObserver.observe(this.native, { attributes: true })

      // STEP #2: METHODS (as bound functions) AND PROPERTIES (as getters/setters)

      const uniqProps = [...new Set(this.reflectProperties)]
      const proto = Object.getPrototypeOf(this)

      if (!proto._alreadyReflecting) {
        uniqProps.forEach(prop => {
          if (this.skipProperties.indexOf(prop) !== -1) return
          Object.defineProperty(Object.getPrototypeOf(this), prop, {
            get: function () {
              const dst = this.native
              if (!this.native) return undefined
              if (typeof dst[prop] === 'function') return dst[prop].bind(dst)
              else return dst[prop]
            },
            set: function (newValue) {
              const dst = this.native

              // It IS possile that this.native isn't set yet, since the
              // property observer is on the prototype. So, you could have
              // one nn-input-box without a value assigned (and the observer is
              // installed for prototype) and then another one with a property
              // assigned at creation (observer is set, but this.native is not yet set)
              // If that is the case, it will assign the object's prop. Then,
              // when firstUpdated() runs, it will forward-assign this value to
              // this.native
              if (!dst) {
                if (typeof newValue !== 'undefined') {
                  Object.defineProperty(this, prop, { value: newValue, configurable: true, writable: true })
                }
                return
              }

              if (typeof this.beforeSettingProperty === 'function') {
                this.beforeSettingProperty(prop, newValue)
              }
              if (typeof dst[prop] === 'function') return
              const oldValue = dst[prop]

              // Set the new value
              dst[prop] = newValue

              // This is required by litElement since it won't
              // create a setter if there is already one
              this.requestUpdate(prop, oldValue)

              if (typeof this.afterSettingProperty === 'function') {
                this.afterSettingProperty(prop, newValue)
              }
            },
            configurable: true,
            enumerable: true
          })
        })
        proto._alreadyReflecting = true
      }

      // Assign existing properties, in case the setter had already been triggered
      // BEFORE firstUpdated() (in which case, the setter would have assigned
      // OBJECT properties, without reflection)
      uniqProps.forEach(prop => {
        if (this.skipProperties.indexOf(prop) !== -1) return

        let propValue
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
          propValue = this[prop]
          delete this[prop]
          this[prop] = propValue
        }
      })
    }
  }
}
