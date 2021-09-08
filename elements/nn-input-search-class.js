import { NnInputText } from './nn-input-text-class'
import { tpeRegistry } from '../lib/tpeRegistry'

export class NnInputSearch extends NnInputText {
  constructor () {
    super()
    this.type= 'search'
  }
}
tpeRegistry.register('nn-input-search', NnInputSearch)
