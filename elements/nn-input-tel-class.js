import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputTel extends NnInputText {
  constructor () {
    super()
    this.type= 'tel'
  }
}
tpeRegistry.register('nn-input-tel', NnInputTel)
