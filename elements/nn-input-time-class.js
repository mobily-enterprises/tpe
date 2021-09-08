import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputTime extends NnInputText {
  constructor () {
    super()
    this.type= 'time'
  }
}
tpeRegistry.register('nn-input-time', NnInputTime)
