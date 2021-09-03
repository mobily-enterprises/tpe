import { ThemeableMixin } from "./mixins/ThemeableMixin"

let _imported = false
let _theme = {}
const _config = {
//  EeAutocompleteInputSpans: 'ee-autocomplete-input-spans',
//  EeAutocompleteItemCountry: 'ee-autocomplete-item-country',
//  EeAutocompleteItemEmail: 'ee-autocomplete-item-email',
//  EeAutocompleteItemLi: 'ee-autocomplete-item-li',
//  EeAutocomplete: 'ee-autocomplete',
 EeDrawer: 'ee-drawer',
 EeFab: 'ee-fab',
 EeFadeIn: 'ee-fade-in',
 EeHeader: 'ee-header',
 EeNavBar: 'ee-nav-bar',
 EeNetwork: 'ee-network',
 EeSnackBar: 'ee-snack-bar',
 EeTabs: 'ee-tabs',
 EeToolbar: 'ee-toolbar',
 EeTable: 'ee-table',
 EeCell: 'ee-cell',
 EeRow: 'ee-row',
 EnForm: 'en-form',
 EnInputRange: 'en-input-range',
 NnButton: 'nn-button',
 NnInputText: 'nn-input-text',
 NnInputButton: 'nn-input-button',
 NnInputCheckbox: 'nn-input-checkbox',
 NnInputColor: 'nn-input-color',
 NnInputDate: 'nn-input-date',
 NnInputDateTimeLocal: 'nn-input-date-time-local',
 NnInputEmail: 'nn-input-email',
 NnInputFile: 'nn-input-file',
 NnInputMonth: 'nn-input-month',
 NnInputNumber: 'nn-input-number',
 NnInputPassword: 'nn-input-password',
 NnInputRadio: 'nn-input-radio',
 NnInputRange: 'nn-input-range',
 NnInputSearch: 'nn-input-search',
 NnInputSubmit: 'nn-input-submit',
 NnInputTel: 'nn-input-tel',
 NnInputTime: 'nn-input-time',
 NnInputUrl: 'nn-input-url',
 NnInputWeek: 'nn-input-week',
 NnMeter: 'nn-meter',
 NnProgress: 'nn-progress',
 NnSelect: 'nn-select',
 NnTextarea: 'nn-textarea',
}

export class TPE {

  set imported (v) {
    if (_imported) return
    _imported = v
  }

  get imported () {
    return _imported
  }

  set theme (v) {
    if (typeof v === 'object') _theme = v
  }

  get theme () {
    return _theme
  }

  get config () {
    return _config
  }

  async importTheme (themeConfig) {
    if (this.imported) throw new Error('Elements already imported. Themes need to be applied before importing.')
    this.theme = { ...themeConfig }
  }

  async importer () {

    const define = (name, module) => {
      customElements.define(name, ThemeableMixin(name, this.theme)(module))
    }

    for (const key in this.config) {
      const name = this.config[key];
      import(`./elements/${name}.js`).then(module => {
        console.log(name, key)
        define(name, module[key])
      })
    }
    
    this.imported = true
  }
}

// Instantiate and export tpe singleton
const tpe = new TPE()

// Export the tpe instance for use with named imports, allowing extra work, like
// applying a theme
export { tpe }
