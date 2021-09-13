import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputEmail extends NnInputText {
  constructor () {
    super()
    this.inputType ='email'
  }
}
tpeRegistry.register('nn-input-email', NnInputEmail)
