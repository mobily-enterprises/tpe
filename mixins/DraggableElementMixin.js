// DraggableElement
// ===============
//
// This mixin should be applied to LitElement based elements meant to be
// compatible with _DraggableListMixin_. It will dispatch an event when the
// enable-dnd attribute is added, which allows for consistent fucntionality of
// the the _DraggableListMixin_. This is a solution to an issue that can occur
// if the list children are rendered with a _map_ function or the lit-html
// _repeat_ directive, which causes _DraggableListMixin_ to not find the
// children at the right time, because they are not rendered yet. The event
// makes sure the mixin is able to find and modify the children accordingly to
// enable drag and drop features.
//
export const DraggableElementMixin = (base) => {
  return class Base extends base {
    // Necessary styles to be added to the litElement based target element:
    static get styles () {
      return [
        super.styles
      ]
    }

    // These properties are also added to the target element.
    static get properties () {
      return {
        dragData: { type: Object, attribute: 'drag-data' }
      }
    }

    constructor () {
      super()
      this.dragData = {}
    }

    firstUpdated () {
      super.firstUpdated()
      if (this.hasAttribute('enable-dnd')) {
        this.dispatchEvent(new CustomEvent('enable-dnd', { bubbles: true }))
      }
    }
  }
}
