import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputNumber extends NnInputText {
  constructor () {
    super()
    this.inputType ='number'
  }
}
tpeRegistry.register('nn-input-number', NnInputNumber)
