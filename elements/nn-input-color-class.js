import { NnInputText } from './nn-input-text-class.js'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputColor extends NnInputText {
  constructor () {
    super()
    this.inputType ='color'
  }
}
tpeRegistry.register('nn-input-color', NnInputColor)
