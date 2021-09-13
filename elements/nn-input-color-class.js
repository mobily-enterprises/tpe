import { tpeRegistry } from '../lib/tpeRegistry'
import { NnInputText } from './nn-input-text-class.js'

export class NnInputColor extends NnInputText {
  constructor () {
    super()
    this.inputType ='color'
  }
}
tpeRegistry.register('nn-input-color', NnInputColor)
