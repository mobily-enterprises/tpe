export function getElementValueSource (el) {
    if (
      el.getAttribute('type') === 'checkbox' ||
      el.getAttribute('type') === 'radio' ||
      el.hasAttribute('as-checkbox') ||
      el.hasAttribute('as-radio')
    ) {
      return 'checked'
    }
  
    if (el.getAttribute('value-source')) return el.getAttribute('value-source')
  
    return 'value'
  }
    