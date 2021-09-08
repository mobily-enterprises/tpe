import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputDate extends NnInputText {
  constructor () {
    super()
    this.type = 'date'
  }
}
tpeRegistry.register('nn-input-date', NnInputDate)
