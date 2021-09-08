import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputUrl extends NnInputText {
  constructor () {
    super()
    this.type= 'url'
  }
}
tpeRegistry.register('nn-input-url', NnInputUrl)
