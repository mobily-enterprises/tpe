class TpeRegistry {

  constructor (){
    this.elements = {}        
    this._definedElementsMap = {}
  }

  register (tagName, cls) {
    this.elements[tagName] = cls
  }

  defineAll () {
    for (const k in this.elements) {
      this.define(k)
    }
  }
  
  define (elName) {
    if(this._definedElementsMap[elName]){
      throw new Error('You can only tun tpeRegistry.define() once')
    }
    customElements.define(elName, this.elements[elName])
    this._definedElementsMap[elName] = true
  }
}

export const tpeRegistry = new TpeRegistry()