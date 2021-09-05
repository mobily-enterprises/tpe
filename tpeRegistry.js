class TpeRegistry {

  constructor (){
    this.elements = {}        
    this._definedElementsMap = {}
  }

  register (tagName, cls) {
    this.elements[tagName] = cls
  }

  registerAndDefine (tagName, cls) {
    this.register(tagName, cls)    
    this.define(tagName)
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

export default new TpeRegistry()