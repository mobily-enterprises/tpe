import { tpeRegistry } from '../lib/tpeRegistry'
import { NnInputText } from './nn-input-text-class.js'

export class NnInputColor extends NnInputText {
  constructor () {
    super()
    this.type = 'color'
  }
}
tpeRegistry.register('nn-input-color', NnInputColor)
