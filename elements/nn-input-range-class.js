import { tpeRegistry } from '../lib/tpeRegistry'
import { NnInputText } from './nn-input-text-class.js'

export class NnInputRange extends NnInputText {
  constructor () {
    super()
    this.inputType ='range'
  }
}
tpeRegistry.register('nn-input-range', NnInputRange)
