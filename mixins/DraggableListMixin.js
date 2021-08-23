// DraggableListMixin
// ====================
//
// This mixin adds a Drag and Drop API basic implementation to any element.
// The base element (the one to which the Mixin is added) needs to have slotted children,
// for which the mixin will add drag events listeners.
// These capabilities are applied solely to the direct slotted children, and not their children.

// For now, the children also need to abide to a few rules:
//
// 1. A child element needs CSS to provide the correct visual state as draggable or not:
//
//   /* Drag and Drop Styles */
//   #handle {
//     display: none;
//     max-width: 18px;
//     height: 18px;
//   }
//
//   :host([header]) .handle,
//   :host([header]) ::slotted(.handle) {
//     pointer-events: none;
//     visibility: hidden;
//   }
//
//   :host([draggable]) .handle,
//   :host([draggable]) ::slotted(.handle) {
//     display: block;
//     cursor: move;
//   }
//
// 2. It needs to have a "no-drag" and/or "no-drop" attribute if the first child is used as a table header and will not be draggable and/or droppable.
// 3. It needs as "drag-data" attribute and/or "dragData" property if any usable data is necessary for the DnD operation. More on that later.
//
// This is the DraggabeListMixin declaration:
import { css } from 'lit'

// These are declared outside the mixin to make sure different instances access the same data.
// This is important in order to support dragging items between separate lists.
window.moving = null
window.originContainer = null
window.targetContainer = null
const targetRows = []
window.lastEntered = null

const debounce = (callback, wait, immediate = false) => {
  let timeout = null
  return function () {
    const callNow = immediate && !timeout
    const next = () => callback.apply(this, arguments)
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)
    if (callNow) {
      next()
    }
  }
}

const debouncedPortionOfDragenterListener = debounce(async function (e) {
  console.log('Debounced dragenter')
  requestAnimationFrame(() => {
    // The targetRows array might have previous targets in it. Remove the target class from them
    targetRows.forEach(element => {
      element.classList.remove('target')
    })
    targetRows.splice(0, targetRows.length)
    // Add target class and push the current target to the targetRows array
    window.lastEntered.classList.add('target')
    targetRows.push(this)
  })
  await window.targetContainer.dragenterHook(e, window.moving, this)
}, 100, true)

export const DraggableListMixin = (base) => {
  return class Base extends base {
    // Necessary styles to be added to the litElement based target element:
    static get styles () {
      return [
        super.styles,
        css`
          @-webkit-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @-moz-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @-o-keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes fadeIn {
            0%   { opacity: 0; }
            100% { opacity: 1; }
          }

          @-webkit-keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          @-moz-keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          @-o-keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          @keyframes flash {
            0%   {opacity: 0}
            70% {opacity: 0.5;}
            100% {opacity: 0;}
          }

          ::slotted(.success-overlay), ::slotted(.error-overlay) {
            position: relative;
          }

          ::slotted(.success-overlay)::after, ::slotted(.error-overlay)::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: green;
            opacity: 0;
            animation: flash 0.3s ease;
          }

          ::slotted(.error-overlay)::after {
            background-color: red;
          }

          ::slotted(.target), ::slotted(.moving) {
            box-sizing: border-box;
            outline: 6px solid orange;
            background-color: papayawhip;
            opacity: 0.2;
          }

          ::slotted(.target) {
            position: relative;
            box-sizing: border-box;
            background-color: white;
          }
        `
      ]
    }

    static get properties () {
      return {
        dragDrop: { type: Boolean, attribute: 'drag-drop' }
      }
    }

    constructor () {
      super()
      this.addEventListener('enable-dnd', this._enableDndForElement)
    }

    _enableDndForElement (e) {
      const el = e.srcElement
      // Do not enable if drag-drop attribute is not present in the list element, if
      if (!this.dragDrop) return
      e.stopPropagation()
      const dndHandle = el.querySelector('#dnd-handle')

      // el.dndContainerElement = this // NOT USED ANYWHERE

      // If element is marked as no-drag, skip this block
      if (!el.hasAttribute('no-drag')) {
        // If a DND handle is defined (element with ID dnd-handle), then
        // use THAT as the only option to move elements around
        if (dndHandle) {
          // Hovering the handle will enable dragging the element
          dndHandle.addEventListener('mouseover', () => {
            el.setAttribute('draggable', 'true')
            el.addEventListener('dragstart', this._dragstartListener, false)
          })
          dndHandle.addEventListener('mouseout', () => {
            el.removeAttribute('draggable')
            el.removeEventListener('dragstart', this._dragstartListener)
          })
        } else {
          el.setAttribute('draggable', 'true')
          el.addEventListener('dragstart', this._dragstartListener, false)
        }
      }

      // Enables drop event, in the element is not marked as no-drop
      if (!el.hasAttribute('no-drop')) {
        // Add event listeners to element
        el.addEventListener('dragenter', this._dragenterListener, false)
        el.addEventListener('dragend', this._dragendListener, false)
        el.addEventListener('drop', this._dropListener, false)

        el.addEventListener('dragleave', this._dragleaveListener, false)
        el.addEventListener('dragexit', this._dragexitListener, false)
        el.addEventListener('dragover', this._dragoverListener, false)
      }
    }

    // HOOKS to be redefined by the mixing class

    async dragstartHook (e, moving) { return true }
    async dragenterHook (e, moving, target) { return true }
    async dragendHook (e, moving, target) { return true }
    async dropHook (e, moving, target) { return true }

    async dragexitHook (e, moving) { return true }
    async dragleaveHook (e, moving, target) { return true }
    async dragoverHook (e, moving, target) { return true }
    validDropHook (e, moving, target) { return true }

    // # Drag and Drop Handlers and hooks
    //
    // All the logic used during DnD is defined in these handlers, which are registered as listeners during instantiation.
    // All listeners are private and not supposed to be modified. They call a hook for each type of event.
    // The hooks should be redefined to handle any work that's needed during of in response to the drag event.
    _dragstartListener (e) {
      window.lastEntered = null
      // Start out by assuming the user is moving, and that moving is allowed. This can be changed in the hook.
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      // The proper way to 'move' data around while dragging is to use the dataTransfer interface. However, webKit based browsers
      // only make that data accessible in the drop event, so getting anything in dragenter or dragover is impossible.
      // To make it simpler and fully intereoperable, we store a reference to the parent of the moving item and the item itself
      // in the Mixin's outer scope
      window.originContainer = this.parentElement
      window.moving = this
      // Use requestAnimationFrame API to update styles, toa void performance issues
      requestAnimationFrame(() => {
        window.moving.classList.add('moving')
      })
      // All handler hooks are called from the list parent, which must implement them.
      window.originContainer.dragstartHook(e, window.moving)
    }

    _dragenterListener (e) {
      if (this === window.lastEntered) return

      // Like in dragstart with the moving item, we store the target's parent reference for later use
      window.targetContainer = this.parentElement
      if (!window.targetContainer.validDropHook(e, window.moving, this)) {
        return
      }

      // preventDefault is necessary to ALLOW custom dragenter handling
      e.preventDefault()
      window.previousLastEntered = window.lastEntered
      window.lastEntered = this

      debouncedPortionOfDragenterListener.call(this, e)
    }

    // dragover, dragleave and dragexit listeners are setup and hooks are available, but no work is done here by default
    _dragoverListener (e) {
      // preventDefault is necessary to ALLOW custom dragover and dropping handling
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'

      window.targetContainer.dragoverHook(e, window.moving, this)
    }

    _dragleaveListener (e) {
      window.targetContainer.dragleaveHook(e, window.moving, this)
    }

    _dragexitListener (e) {
      window.targetContainer.dragexitHook(e, window.moving, this)
    }

    _dragendListener (e) {
      // some niche cases might result in this method running when references are empty. Bail to avoid errors
      if (!window.originContainer || !window.targetContainer) return

      if (!window.originContainer.validDropHook(e, window.moving, window.lastEntered)) return

      // This hook needs to be a promise, so references are not cleared before the hook is done
      window.originContainer.dragendHook(e, window.moving).then(() => {
        // only clear styles and references if dropEffect is none, which should be set while validating the target in the hooks
        // if (e.dataTransfer.dropEffect === 'none') {
        requestAnimationFrame(() => {
          this.classList.remove('moving')
          console.log(targetRows)
          targetRows.forEach(element => {
            element.classList.remove('target')
          })
          targetRows.splice(0, targetRows.length)
          window.moving = null
          window.originContainer = null
          window.targetContainer = null
          window.lastEntered = null
        })
        // }
      })
    }

    _dropListener (e) {
      e.preventDefault()
      // Like with dragend, the hook needs to return a promise to avoid timing issues.
      window.targetContainer.dropHook(e, window.moving, this)
    }
  }
}
