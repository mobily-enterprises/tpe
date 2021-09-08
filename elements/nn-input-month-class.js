import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputMonth extends NnInputText {
  constructor () {
    super()
    this.type = 'month'
  }
}
tpeRegistry.register('nn-input-month', NnInputMonth)
