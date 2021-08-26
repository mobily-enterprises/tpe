
import { inputElement } from '../lib/htmlApi.js'

export const InputMixin = (base) => {
  return class Base extends base {
    get skipAttributes () {
      return [...super.skipAttributes, 'type']
    }

    get reflectProperties () {
      return [...super.reflectProperties, ...inputElement]
    }
  }
}
