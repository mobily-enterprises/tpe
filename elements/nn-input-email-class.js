import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputEmail extends NnInputText {
  constructor () {
    super()
    this.type = 'email'
  }
}
tpeRegistry.register('nn-input-email', NnInputEmail)
