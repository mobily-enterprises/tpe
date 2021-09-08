import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputDateTimeLocal extends NnInputText {
  constructor () {
    super()
    this.type = 'datetime-local'
  }
}
tpeRegistry.register('nn-input-datetime-local', NnInputDateTimeLocal)
