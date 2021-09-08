import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputWeek extends NnInputText {
  constructor () {
    super()
    this.type= 'week'
  }
}
tpeRegistry.register('nn-input-week', NnInputWeek)
