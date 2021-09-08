import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputPassword extends NnInputText {
  constructor () {
    super()
    this.type = 'password'
  }
}
tpeRegistry.register('nn-input-password', NnInputPassword)
