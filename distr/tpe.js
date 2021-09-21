!function(){"use strict";const t=new class{constructor(){this.elements={},this._definedElementsMap={}}register(t,e){this.elements[t]=e}defineAll(){for(const t in this.elements)this.define(t)}define(t){if(this._definedElementsMap[t])throw new Error("You can only tun tpeRegistry.define() once");customElements.define(t,this.elements[t]),this._definedElementsMap[t]=!0}},e=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new Map;
/**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class r{constructor(t,e){if(this._$cssResult$=!0,e!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=s.get(this.cssText);return e&&void 0===t&&(s.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const o=t=>new r("string"==typeof t?t:t+"",i),a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new r(s,i)},n=(t,i)=>{e?t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style");i.textContent=e.cssText,t.appendChild(i)}))},l=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return o(e)})(t):t
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */;var d,h;const c={toAttribute(t,e){switch(e){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},u=(t,e)=>e!==t&&(e==e||t==t),p={attribute:!0,type:String,converter:c,reflect:!1,hasChanged:u};class g extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;null!==(e=this.l)&&void 0!==e||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Eh(i,e);void 0!==s&&(this._$Eu.set(s,i),t.push(s))})),t}static createProperty(t,e=p){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const r=this[t];this[e]=s,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||p}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(l(t))}else void 0!==t&&e.push(l(t));return e}static _$Eh(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$Em)&&void 0!==e?e:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$Em)||void 0===e||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return n(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$Eg(t,e,i=p){var s,r;const o=this.constructor._$Eh(t,i);if(void 0!==o&&!0===i.reflect){const a=(null!==(r=null===(s=i.converter)||void 0===s?void 0:s.toAttribute)&&void 0!==r?r:c.toAttribute)(e,i.type);this._$Ei=t,null==a?this.removeAttribute(o):this.setAttribute(o,a),this._$Ei=null}}_$AK(t,e){var i,s,r;const o=this.constructor,a=o._$Eu.get(t);if(void 0!==a&&this._$Ei!==a){const t=o.getPropertyOptions(a),n=t.converter,l=null!==(r=null!==(s=null===(i=n)||void 0===i?void 0:i.fromAttribute)&&void 0!==s?s:"function"==typeof n?n:null)&&void 0!==r?r:c.fromAttribute;this._$Ei=a,this[a]=l(e,t.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||u)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,e)=>this[e]=t)),this._$Et=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$ET()}catch(t){throw e=!1,this._$ET(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$Em)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,e)=>this._$Eg(e,this[e],t))),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
var m,b;g.finalized=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null===(d=globalThis.reactiveElementPlatformSupport)||void 0===d||d.call(globalThis,{ReactiveElement:g}),(null!==(h=globalThis.reactiveElementVersions)&&void 0!==h?h:globalThis.reactiveElementVersions=[]).push("1.0.0-rc.4");const f=globalThis.trustedTypes,v=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,y=`lit$${(Math.random()+"").slice(9)}$`,w="?"+y,E=`<${w}>`,x=document,k=(t="")=>x.createComment(t),_=t=>null===t||"object"!=typeof t&&"function"!=typeof t,A=Array.isArray,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$=/-->/g,C=/>/g,V=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,M=/'/g,T=/"/g,O=/^(?:script|style|textarea)$/i,I=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),L=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),R=new WeakMap,F=x.createTreeWalker(x,129,null,!1),N=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":"",a=S;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===S?"!--"===l[1]?a=$:void 0!==l[1]?a=C:void 0!==l[2]?(O.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=V):void 0!==l[3]&&(a=V):a===V?">"===l[0]?(a=null!=r?r:S,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?V:'"'===l[3]?T:M):a===T||a===M?a=V:a===$||a===C?a=S:(a=V,r=void 0);const c=a===V&&t[e+1].startsWith("/>")?" ":"";o+=a===S?i+E:d>=0?(s.push(n),i.slice(0,d)+"$lit$"+i.slice(d)+y+c):i+y+(-2===d?(s.push(void 0),e):c)}const n=o+(t[i]||"<?>")+(2===e?"</svg>":"");return[void 0!==v?v.createHTML(n):n,s]};class z{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[l,d]=N(t,e);if(this.el=z.createElement(l,i),F.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=F.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(y)){const i=d[o++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+"$lit$").split(y),e=/([.?@])?(.*)/.exec(i);n.push({type:1,index:r,name:e[2],strings:t,ctor:"."===e[1]?H:"?"===e[1]?q:"@"===e[1]?W:U})}else n.push({type:6,index:r})}for(const e of t)s.removeAttribute(e)}if(O.test(s.tagName)){const t=s.textContent.split(y),e=t.length-1;if(e>0){s.textContent=f?f.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),F.nextNode(),n.push({type:2,index:++r});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===w)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(y,t+1));)n.push({type:7,index:r}),t+=y.length-1}r++}}static createElement(t,e){const i=x.createElement("template");return i.innerHTML=t,i}}function j(t,e,i=t,s){var r,o,a,n;if(e===L)return e;let l=void 0!==s?null===(r=i._$Cl)||void 0===r?void 0:r[s]:i._$Cu;const d=_(e)?void 0:e._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(t),l._$AT(t,i,s)),void 0!==s?(null!==(a=(n=i)._$Cl)&&void 0!==a?a:n._$Cl=[])[s]=l:i._$Cu=l),void 0!==l&&(e=j(t,l._$AS(t,e.values),l,s)),e}class D{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:i},parts:s}=this._$AD,r=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:x).importNode(i,!0);F.currentNode=r;let o=F.nextNode(),a=0,n=0,l=s[0];for(;void 0!==l;){if(a===l.index){let e;2===l.type?e=new B(o,o.nextSibling,this,t):1===l.type?e=new l.ctor(o,l.name,l.strings,this,t):6===l.type&&(e=new K(o,this,t)),this.v.push(e),l=s[++n]}a!==(null==l?void 0:l.index)&&(o=F.nextNode(),a++)}return r}m(t){let e=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class B{constructor(t,e,i,s){var r;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=j(this,t,e),_(t)?t===P||null==t||""===t?(this._$AH!==P&&this._$AR(),this._$AH=P):t!==this._$AH&&t!==L&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):(t=>{var e;return A(t)||"function"==typeof(null===(e=t)||void 0===e?void 0:e[Symbol.iterator])})(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==P&&_(this._$AH)?this._$AA.nextSibling.data=t:this.S(x.createTextNode(t)),this._$AH=t}T(t){var e;const{values:i,_$litType$:s}=t,r="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=z.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===r)this._$AH.m(i);else{const t=new D(r,this),e=t.p(this.options);t.m(i),this.S(e),this._$AH=t}}_$AC(t){let e=R.get(t.strings);return void 0===e&&R.set(t.strings,e=new z(t)),e}M(t){A(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new B(this.A(k()),this.A(k()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cg=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class U{constructor(t,e,i,s,r){this.type=1,this._$AH=P,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=j(this,t,e,0),o=!_(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const s=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=j(this,s[i+a],e,a),n===L&&(n=this._$AH[a]),o||(o=!_(n)||n!==this._$AH[a]),n===P?t=P:t!==P&&(t+=(null!=n?n:"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.k(t)}k(t){t===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class H extends U{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===P?void 0:t}}class q extends U{constructor(){super(...arguments),this.type=4}k(t){t&&t!==P?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class W extends U{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=j(this,t,e,0))&&void 0!==i?i:P)===L)return;const s=this._$AH,r=t===P&&s!==P||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==P&&(s===P||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class K{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){j(this,t)}}
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
var X,G,Y;null===(m=globalThis.litHtmlPlatformSupport)||void 0===m||m.call(globalThis,z,B),(null!==(b=globalThis.litHtmlVersions)&&void 0!==b?b:globalThis.litHtmlVersions=[]).push("2.0.0-rc.5");class J extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=((t,e,i)=>{var s,r;const o=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let a=o._$litPart$;if(void 0===a){const t=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;o._$litPart$=a=new B(e.insertBefore(k(),t),t,void 0,null!=i?i:{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1)}render(){return L}}J.finalized=!0,J._$litElement$=!0,null===(X=globalThis.litElementHydrateSupport)||void 0===X||X.call(globalThis,{LitElement:J}),null===(G=globalThis.litElementPlatformSupport)||void 0===G||G.call(globalThis,{LitElement:J}),(null!==(Y=globalThis.litElementVersions)&&void 0!==Y?Y:globalThis.litElementVersions=[]).push("3.0.0-rc.4");const Z=t=>class extends t{static get styles(){return[super.styles||[],a`             
          label div#label-text, ::slotted(*) {
            display: inline-block;
            vertical-align: text-bottom;
            /* It's also possible to control the width of the label with a custom 
            / CSS property **labels-mixin-input-label-width**.
            */
            width: var(--labels-mixin-input-label-width, auto);
            /* Make sure content larger than the element is clipped and show an ellipsis */
            overflow: hidden;
            text-overflow: ellipsis;
          }

        `]}static get properties(){return{label:{type:String},labelPosition:{type:String,attribute:"label-position"}}}constructor(){super(),this.labelPosition="before"}get labelTemplate(){return I`
        <label id="label" for="native">
          <div id="label-text">${this.label}</div>
          <slot id="label-slot" name="label"></slot>
        </label>
      `}get ifLabelBefore(){return"before"===this.labelPosition?this.labelTemplate:""}get ifLabelAfter(){return"after"===this.labelPosition?this.labelTemplate:""}},Q=t=>class extends t{static get properties(){return{validationMessagePosition:{type:String,attribute:"validation-message-position"},shownValidationMessage:{type:String,attribute:!1},validity:{type:Object,attribute:!1},validator:{type:Object}}}constructor(){super(),this.shownValidationMessage="",this.validator=()=>"",this.validationMessagePosition="before",this.validity={valid:!0,_customValidationMessage:""}}setCustomValidity(t){""===t?(this.validity={valid:!0,_customValidationMessage:""},this.toggleAttribute("valid",!0),""===t&&(this.shownValidationMessage="")):(this.validity={valid:!1,customError:!0,_customValidationMessage:t},this.toggleAttribute("valid",!1))}reportValidity(){if(!this.validity.customError){const t=this._runValidator();t&&this.setCustomValidity(t)}return this.shownValidationMessage="",this.validity.valid?(this.toggleAttribute("valid",!0),!0):(this.toggleAttribute("valid",!1),this.shownValidationMessage=this.validity._customValidationMessage,this.dispatchEvent(new CustomEvent("invalid",{cancelable:!0,bubbles:!1,composed:!0})),!1)}_runValidator(){let t,e;this.form&&this.form._getElementValueSource&&(t=this[this.form._getElementValueSource(this)],e=this.form.submitObject);const i=this.validator(t,e);i&&this.setCustomValidity(i)}checkValidity(){if(!this.validity.customError){const t=this._runValidator();t&&this.setCustomValidity(t)}return!!this.validity.valid||(this.dispatchEvent(new CustomEvent("invalid",{cancelable:!0,bubbles:!1,composed:!0})),!1)}get ifValidationMessageBefore(){return"after"===this.validationMessagePosition?"":this.validationMessageTemplate}get ifValidationMessageAfter(){return"before"===this.validationMessagePosition?"":this.validationMessageTemplate}get validationMessageTemplate(){return I`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `}},tt=t=>class extends t{static get styles(){return[]}firstUpdated(){super.firstUpdated();const t=document.createElement("slot");t.setAttribute("name","style"),t.setAttribute("id","style-slot"),this.shadowRoot.appendChild(t);for(const e of t.assignedElements())"STYLE"===e.tagName&&this.shadowRoot.appendChild(e)}};class et extends(Q(tt(Z(J)))){static get properties(){return{name:{type:String},valueAs:{type:String,attribute:"value-as"},valueSeparator:{type:String,attribute:"value-separator"},clearOnSetValue:{type:Boolean,attribute:"clear-on-set-value"}}}constructor(){super(),this.labelForElement="ni",this.valueAs="text",this.removeIcon='<svg class="icon" height="15" viewBox="0 0 24 24" width="15"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>',this.itemElement="",this.itemElementConfig={},this.itemElementAttributes={},this.valueSeparator=","}static get styles(){return[super.styles,a`

        :host(:focus) {
          outline: none;
        }

        #list {
          display: flex;
          flex-wrap: wrap;
        }

        #list > span {
          position: relative;
          display: flex;
          font-size: 0.8em;
          width: max-content;
        }

        #list > span > *:not(button) {
          position: relative;
          /* display: inline-block; */
          padding: 3px 6px;
          padding-right: 24px;
          border: 1px solid #ddd;
          border-radius: 1em;
          margin: 2px;
          vertical-align: middle;
          line-height: 1em;
        }

        #list > span > *:not(button)[invalid] {
          background-color: pink;
          border-color: red;
        }

        #list > span:active > *:not(button), #list > span:focus > *:not(button), #list > span:hover > *:not(button) {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          background-color: #eee;
          outline: none;
        }
        #list > span:active > *:not(button), #list > span:focus > *:not(button) {
          border-color: #ccc;
        }

        #list > span button.remove {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
          fill: #999;
          border: none;
          padding: 0;
          /* display: inline-block; */
          position: absolute;
          top: 55%;
          right: 6px;
          transform: translateY(-50%);
          background: none;
        }

        #list > *:focus, #list > span *:active {
          outline: none;
        }

        #list > span button.remove svg {
          z-index: -1;
        }

        #list > span button.remove:hover {
          fill: #555;
        }

        input {
          box-sizing: border-box;
          margin: 0;
          outline: none;
          vertical-align: middle;
          height: 1.5em;
          border: none;
          font-size: 0.9em;
          min-width: 120px;
          flex: 1;
        }

        input:focus, input:hover {
          outline: none
        }

        span.error-message {
          color: red;
        }

        :invalid {
          background-color: pink;
          border: 1px solid #bb7777;
        }
      `]}render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div id="list" @click="${this._listClicked}">
        <input @keydown="${this._handleKeyEvents}" rows="1" id="ta" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" dir="ltr" role="combobox" aria-autocomplete="list"/>
      </div>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <input id="ni" type="hidden" name="${this.name}">
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.focus)}disconnectedCallback(){super.connectedCallback(),this.removeEventListener("click",this.focus)}firstUpdated(){this._tempValue&&(this.value=this._tempValue),this._updateNativeInputValue()}focus(){this.shadowRoot.querySelector("#ta").focus()}_listClicked(t){t.stopPropagation()}get value(){let t,e;switch(this.valueAs){case"json":t={},e=this.shadowRoot.querySelector("#list");for(const i of e.children){if("ta"===i.id)continue;t[i.firstChild.idValue]=i.firstChild.data}return t;default:t=[],e=this.shadowRoot.querySelector("#list");for(const i of e.children)"ta"!==i.id&&("text"===this.valueAs?null===i.getAttribute("invalid")&&t.push(i.firstChild.textValue):t.push(i.firstChild.idValue));return t.join(this.valueSeparator)}}set value(t){const e=this.shadowRoot.querySelector("#list");if(e){for(;(this.clearOnSetValue||""===t||null==t)&&e.firstChild&&"ta"!==e.firstChild.id;)e.removeChild(e.firstChild);if(Array.isArray(t))for(const e of t)this.pickedElement(e,!1,!0);else if("object"==typeof t&&null!==t)for(const e of Object.keys(t)){const i=t[e];this.pickedElement(i,!1,!0)}else if("string"==typeof t&&""!==t)for(const e of t.split(this.valueSeparator))this.pickedElement(e,!1,!0);this._tempValue=null,this._updateNativeInputValue(),this.setCustomValidity(""),this.reportValidity()}else this._tempValue=t}get validationMessage(){return this.validity._customValidationMessage}get autocompleteValue(){const t=this.shadowRoot.querySelector("#ta");return t?t.value:""}_pickCurrentValue(){"text"===this.valueAs&&this.pickedElement(this.shadowRoot.querySelector("#ta").value,!0)}_askToRemove(t){const e=t.currentTarget;this._removeItem(e.parentElement)}_updateNativeInputValue(){this.shadowRoot.querySelector("#ni").value=this.value}_removeItem(t,e="previous"){(t.previousElementSibling||t.nextElementSibling).focus(),t.remove(),this._updateNativeInputValue(),this.setCustomValidity(""),this.reportValidity()}_createRemoveBtn(){const t=document.createElement("button");return t.innerHTML=this.removeIcon,t.onclick=this._askToRemove.bind(this),t.classList.add("remove"),t}_handleKeyEvents(t){const e=t.currentTarget;switch(t.key){case"ArrowLeft":e.previousElementSibling&&(t.preventDefault(),e.previousElementSibling.focus());break;case"ArrowRight":"ta"!==e.id&&(t.preventDefault(),e.nextElementSibling?e.nextElementSibling.focus():e.parentElement.firstElementChild.focus());break;case"ArrowDown":this.parentElement.suggestions.length&&(t.preventDefault(),this.parentElement.focusNext());break;case"Backspace":case"Delete":"ta"===e.id&&e.parentElement.children.length>1&&!e.value?this._removeItem(e.previousElementSibling):"ta"!==e.id&&this._removeItem(e);break;case"Tab":case"Enter":if(!this.autocompleteValue)break;this.parentElement.suggestions.length?(t.preventDefault(),this.parentElement.pickFirst()):(t.preventDefault(),this._pickCurrentValue())}}get multiInputApi(){return!0}pickedElement(t,e=!1,i=!1){const s=document.createElement(this.itemElement),r=new s.constructor.PickedElement;r.config={...r.config,...this.itemElementConfig};for(const t of Object.keys(this.itemElementAttributes))r.setAttribute(t,this.itemElementAttributes[t]);if("string"==typeof t){if(!t.length)return;if(!(t=s.stringToData(t)).valid&&(r.toggleAttribute("invalid",!0),!e))return}r.data=t;const o=this.shadowRoot.querySelector("#list"),a=document.createElement("span");a.setAttribute("tabindex",-1);const n=this.shadowRoot.querySelector("#ta"),l=this._createRemoveBtn();a.onkeydown=this._handleKeyEvents.bind(this),l.setAttribute("tabindex",-1),a.appendChild(r),a.appendChild(l),o.insertBefore(a,n),n.value="",this._updateNativeInputValue(),i||(this.setCustomValidity(""),this.reportValidity())}setPickedElement(t,e,i){this.itemElement=t,this.itemElementConfig=e,this.itemElementAttributes=i}}t.register("ee-autocomplete-input-spans",et);const it=["accessKey","accessKeyLabel","contentEditable","isContentEditable","contextMenu ","dataset","dir","draggable","dropzone","hidden","inert","innerText","itemScope ","itemType","itemId ","itemRef","itemProp","itemValue ","lang","noModule","nonce","offsetHeight","offsetLeft","offsetParent","offsetTop","offsetWidth","properties","spellcheck","tabIndex","title","translate","attachInternals","blur","click","focus","forceSpellCheck","style"],st=["length","name","method","target","action","encoding","enctype","acceptCharset","autocomplete","noValidate","requestAutocomplete","submit","checkValidity","reportValidity","reset","elements"],rt=["form","formAction","formEncType","formMethod","formNoValidate","formTarget","name","type","disabled","autofocus","required","value","checkValidity","validity","validationMessage","willValidate","checked","defaultChecked","indeterminate","alt","height","src","width","accept","allowdirs ","files","webkitdirectory ","webkitEntries ","autocomplete","max","maxLength","min","minLength","pattern","placeholder","readOnly","size","selectionStart","selectionEnd","selectionDirection","defaultValue","dirName","accessKey","list","multiple","files","labels","step","valueAsDate","valueAsNumber","autocapitalize ","inputmode","align ","useMap ","blur","click","focus","select","setSelectionRange","setRangeText","setCustomValidity","reportValidity","stepDown","stepUp"],ot=["accessKey","autofocus","disabled","form","formAction","formEnctype","formMethod","formNoValidate","formTarget","labels","menu ","name","tabIndex","type","willValidate","validationMessage","validity","value","checkValidity","reportValidity","setCustomValidity"],at=["autofocus","disabled","labels","length","multiple","name","options","required","selectedIndex","selectedOptions","size","type","validationMessage","validity","value","willValidate","add","blur","focus","item","namedItem","remove","checkValidity","reportValidity","setCustomValidity","form"],nt=["type","value","textLength","defaultValue","placeholder","rows","cols","autofocus","name","disabled","labels","maxLength","accessKey","readOnly","required","tabIndex","selectionStart","selectionEnd","selectionDirection","validity","willValidate","validationMessage","autocomplete ","autocapitalize ","inputMode ","wrap","blur","focus","select","setRangeText","setSelectionRange","checkValidity","reportValidity","setCustomValidity","form"],lt=["high","low","max","min","optimum","value","labels"],dt=["max","position","value","labels"],ht=t=>class extends t{firstUpdated(){this.native=this.shadowRoot.querySelector("#native"),this._reflectAttributesAndProperties()}get reflectProperties(){return it}get skipProperties(){return["style"]}get skipAttributes(){return["id","style","class"]}afterSettingProperty(){}getAttribute(t){return this.native&&-1===this.skipAttributes.indexOf(t)?this.native.getAttribute(t):super.getAttribute(t)}setAttribute(t,e){super.setAttribute(t,e),-1===this.skipAttributes.indexOf(t)&&this._setSubAttr(t,e)}removeAttribute(t){super.removeAttribute(t),-1===this.skipAttributes.indexOf(t)&&this._setSubAttr(t,null)}_setSubAttr(t,e){const i=t.split("::");if(this.native)if(1===i.length)null===e?this.native.removeAttribute(t):this.native.setAttribute(t,e);else if(2===i.length){const t=this.shadowRoot.querySelector(`#${i[0]}`);t&&(null===e?t.removeAttribute(i[1]):t.setAttribute(i[1],e))}}_reflectAttributesAndProperties(){for(const t of this.attributes){const e=t.name;-1===this.skipAttributes.indexOf(e)&&this._setSubAttr(e,super.getAttribute(e))}new MutationObserver((t=>{t.forEach((t=>{if("attributes"===t.type){const e=t.attributeName;if(-1!==this.skipAttributes.indexOf(e))return;if(-1!==e.indexOf("::"))return;const i=this.native.getAttribute(e);if(i===super.getAttribute(e))return;null===i?super.removeAttribute(e):super.setAttribute(e,i)}}))})).observe(this.native,{attributes:!0});const t=[...new Set(this.reflectProperties)],e=Object.getPrototypeOf(this);e._alreadyReflecting||(t.forEach((t=>{-1===this.skipProperties.indexOf(t)&&Object.defineProperty(Object.getPrototypeOf(this),t,{get:function(){const e=this.native;if(this.native)return"function"==typeof e[t]?e[t].bind(e):e[t]},set:function(e){const i=this.native;if(!i)return void(void 0!==e&&Object.defineProperty(this,t,{value:e,configurable:!0,writable:!0}));if("function"==typeof this.beforeSettingProperty&&this.beforeSettingProperty(t,e),"function"==typeof i[t])return;const s=i[t];i[t]=e,this.requestUpdate(t,s),"function"==typeof this.afterSettingProperty&&this.afterSettingProperty(t,e)},configurable:!0,enumerable:!0})})),e._alreadyReflecting=!0),t.forEach((t=>{if(-1!==this.skipProperties.indexOf(t))return;let e;Object.prototype.hasOwnProperty.call(this,t)&&(e=this[t],delete this[t],this[t]=e)}))}},ct=t=>class extends t{get skipAttributes(){return[...super.skipAttributes,"type"]}get reflectProperties(){return[...super.reflectProperties,...rt]}};!function(){const t=new WeakMap,e=new WeakMap,i=new WeakMap,s=new WeakMap,r=new WeakMap,o=new WeakMap,a=new WeakMap,n=new WeakMap,l=new WeakMap,d=new WeakMap,h=new WeakMap,c=new WeakMap,u=new WeakMap,p=new WeakMap,g={attributes:!0,attributeFilter:["disabled"]},m=new MutationObserver((t=>{for(const e of t){const t=e.target;if(t.constructor.formAssociated){const e=t.hasAttribute("disabled");t.toggleAttribute("internals-disabled",e),t.formDisabledCallback&&t.formDisabledCallback.apply(t,[t.hasAttribute("disabled")])}}})),b=t=>{i.get(t).forEach((t=>{t.remove()})),i.set(t,[])},f=(t,e)=>{const s=document.createElement("input");return s.type="hidden",s.name=t.getAttribute("name"),t.after(s),i.get(e).push(s),s},v=(t,e)=>{if(e.length){Array.from(e).forEach((e=>e.addEventListener("click",t.focus.bind(t))));let i=e[0].id;e[0].id||(i=`${e[0].htmlFor}_Label`,e[0].id=i),t.setAttribute("aria-labelledby",i)}},y=t=>{const e=t.target,i=n.get(e);if(i.size){if(Array.from(i).reverse().map((t=>s.get(t).reportValidity())).includes(!1))t.stopImmediatePropagation(),t.stopPropagation(),t.preventDefault();else if(p.get(e)){!1===p.get(e).call(e,t)&&t.preventDefault()}}},w=t=>{const e=n.get(t.target);e&&e.size&&e.forEach((t=>{t.constructor.formAssociated&&t.formResetCallback&&t.formResetCallback.apply(t)}))},E=(t,e,i)=>{if(e){e.onsubmit&&(p.set(e,e.onsubmit.bind(e)),e.onsubmit=null);const s=n.get(e);if(s)s.add(t);else{const i=new Set;i.add(t),n.set(e,i),e.addEventListener("submit",y),e.addEventListener("reset",w)}o.set(e,{ref:t,internals:i}),t.constructor.formAssociated&&t.formAssociatedCallback&&setTimeout((()=>{t.formAssociatedCallback.apply(t,[e])}),0)}},x=t=>{let e=t.parentNode;return e&&"FORM"!==e.tagName?e=x(e):e||"[object ShadowRoot]"!==t.toString()||(e=x(t.host)),e},k=(t,e,i=DOMException)=>{if(!t.constructor.formAssociated)throw new i(e)},_=(t,e,i)=>{const r=n.get(t);return r&&r.size&&r.forEach((t=>{s.get(t)[i]()||(e=!1)})),e},A=t=>{if(t.constructor.formAssociated){const e=s.get(t),{labels:i,form:r}=e;v(t,i),E(t,r,e)}},S={ariaAtomic:"aria-atomic",ariaAutoComplete:"aria-autocomplete",ariaBusy:"aria-busy",ariaChecked:"aria-checked",ariaColCount:"aria-colcount",ariaColIndex:"aria-colindex",ariaColSpan:"aria-colspan",ariaCurrent:"aria-current",ariaDisabled:"aria-disabled",ariaExpanded:"aria-expanded",ariaHasPopup:"aria-haspopup",ariaHidden:"aria-hidden",ariaKeyShortcuts:"aria-keyshortcuts",ariaLabel:"aria-label",ariaLevel:"aria-level",ariaLive:"aria-live",ariaModal:"aria-modal",ariaMultiLine:"aria-multiline",ariaMultiSelectable:"aria-multiselectable",ariaOrientation:"aria-orientation",ariaPlaceholder:"aria-placeholder",ariaPosInSet:"aria-posinset",ariaPressed:"aria-pressed",ariaReadOnly:"aria-readonly",ariaRelevant:"aria-relevant",ariaRequired:"aria-required",ariaRoleDescription:"aria-roledescription",ariaRowCount:"aria-rowcount",ariaRowIndex:"aria-rowindex",ariaRowSpan:"aria-rowspan",ariaSelected:"aria-selected",ariaSort:"aria-sort",ariaValueMax:"aria-valuemax",ariaValueMin:"aria-valuemin",ariaValueNow:"aria-valuenow",ariaValueText:"aria-valuetext"};class ${constructor(){this.badInput=!1,this.customError=!1,this.patternMismatch=!1,this.rangeOverflow=!1,this.rangeUnderflow=!1,this.stepMismatch=!1,this.tooLong=!1,this.tooShort=!1,this.typeMismatch=!1,this.valid=!0,this.valueMissing=!1,Object.seal(this)}}const C=t=>{let e=!0;for(let i in t)"valid"!==i&&!1!==t[i]&&(e=!1);return e};function V(t){t.forEach((t=>{const{addedNodes:e,removedNodes:r}=t,o=Array.from(e),n=Array.from(r);o.forEach((t=>{if(s.has(t)&&t.constructor.formAssociated){const e=s.get(t),{form:i}=e;E(t,i,e),v(t,e.labels)}if(d.has(t)){const e=d.get(t);Object.keys(S).filter((t=>null!==e[t])).forEach((i=>{t.setAttribute(S[i],e[i])})),d.delete(t)}})),n.forEach((t=>{const e=s.get(t);if(e&&i.get(e)&&b(e),a.has(t)){a.get(t).disconnect()}}))}))}function M(t){t.forEach((t=>{const{removedNodes:e}=t;e.forEach((e=>{const i=u.get(t.target);s.has(e)&&A(e),i.disconnect()}))}))}new MutationObserver(V);const T={childList:!0,subtree:!0},O=new WeakMap;class I extends Set{constructor(t){if(super(),!t||!t.tagName||-1===t.tagName.indexOf("-"))throw new TypeError("Illegal constructor");O.set(this,t)}add(t){if(!/^--/.exec(t)||"string"!=typeof t)throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${t} must start with '--'.`);const e=super.add(t);return O.get(this).toggleAttribute(`state${t}`,!0),e}clear(){for(let[t]of this.entries())this.delete(t);super.clear()}delete(t){const e=super.delete(t);return O.get(this).toggleAttribute(`state${t}`,!1),e}}class L{constructor(r){if(!r||!r.tagName||-1===r.tagName.indexOf("-"))throw new TypeError("Illegal constructor");const o=r.getRootNode(),a=new $;this.states=new I(r),t.set(this,r),e.set(this,a),s.set(r,this),((t,e)=>{for(let i in S){e[i]=null;let s=null;const r=S[i];Object.defineProperty(e,i,{get:()=>s,set(i){s=i,t.isConnected?t.setAttribute(r,i):d.set(t,e)}})}})(r,this),((t,e)=>{i.set(e,[]);const s=t.hasAttribute("disabled");t.toggleAttribute("internals-disabled",s),m.observe(t,g)})(r,this),Object.seal(this),A(r),o instanceof DocumentFragment&&(t=>{const e=new MutationObserver(M);e.observe(t,{childList:!0}),u.set(t,e)})(o)}static get isPolyfilled(){return!0}checkValidity(){const i=t.get(this);k(i,"Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element.");const s=e.get(this);if(!s.valid){const t=new Event("invalid",{bubbles:!1,cancelable:!0,composed:!1});i.dispatchEvent(t)}return s.valid}get form(){const e=t.get(this);let i;return k(e,"Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element."),!0===e.constructor.formAssociated&&(i=x(e)),i}get labels(){const e=t.get(this);k(e,"Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.");const i=e.getAttribute("id"),s=e.getRootNode();return s&&i&&s?s.querySelectorAll(`[for=${i}]`):[]}reportValidity(){const e=t.get(this);k(e,"Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.");const i=this.checkValidity(),s=c.get(this);if(s&&!e.constructor.formAssociated)throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element.");return!i&&s&&(e.focus(),s.focus()),i}setFormValue(e){const i=t.get(this);if(k(i,"Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element."),b(this),null==e||e instanceof FormData)null!=e&&e instanceof FormData&&e.forEach(((t,e)=>{if("string"==typeof t){const s=f(i,this);s.name=e,s.value=t}}));else if(i.getAttribute("name")){f(i,this).value=e}l.set(i,e)}setValidity(i,s,o){const a=t.get(this);if(k(a,"Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element."),!i)throw new TypeError("Failed to execute 'setValidity' on 'ElementInternals': 1 argument required, but only 0 present.");c.set(this,o);const n=e.get(this),l={};for(const t in i)l[t]=i[t];var d;0===Object.keys(l).length&&((d=n).badInput=!1,d.customError=!1,d.patternMismatch=!1,d.rangeOverflow=!1,d.rangeUnderflow=!1,d.stepMismatch=!1,d.tooLong=!1,d.tooShort=!1,d.typeMismatch=!1,d.valid=!0,d.valueMissing=!1);const h={...n,...l};delete h.valid;const{valid:u}=((t,e)=>(t.valid=C(e),Object.keys(e).forEach((i=>t[i]=e[i])),t))(n,h);if(!u&&!s)throw new DOMException("Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.");r.set(this,u?"":s),a.toggleAttribute("internals-invalid",!u),a.toggleAttribute("internals-valid",u),a.setAttribute("aria-invalid",`${!u}`)}get shadowRoot(){const e=t.get(this);return h.get(e)?h.get(e):null}get validationMessage(){const e=t.get(this);return k(e,"Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element."),r.get(this)}get validity(){const i=t.get(this);k(i,"Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element.");return e.get(this)}get willValidate(){const e=t.get(this);return k(e,"Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element."),!e.disabled&&!e.hasAttribute("disabled")}}if(window.CustomStateSet||(window.CustomStateSet=I),!window.ElementInternals){function t(...t){const e=s.apply(this,t),i=new MutationObserver(V);return h.set(this,e),i.observe(e,T),a.set(this,i),e}function e(...t){let e=r.apply(this,t);return _(this,e,"checkValidity")}function i(...t){let e=o.apply(this,t);return _(this,e,"reportValidity")}window.ElementInternals=L,Object.defineProperty(Element.prototype,"attachInternals",{get(){return()=>{if(-1===this.tagName.indexOf("-"))throw new Error("Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.");return new L(this)}}});const s=Element.prototype.attachShadow;Element.prototype.attachShadow=t;new MutationObserver(V).observe(document.documentElement,T);const r=HTMLFormElement.prototype.checkValidity;HTMLFormElement.prototype.checkValidity=e;const o=HTMLFormElement.prototype.reportValidity;HTMLFormElement.prototype.reportValidity=i}}();const ut=t=>class extends t{get skipAttributes(){return[...super.skipAttributes,"form"]}get skipProperties(){return[...super.skipProperties,"form"]}static get formAssociated(){return!0}static get properties(){return{disabled:{type:Boolean},required:{type:Boolean}}}constructor(){super(),this.attachInternals&&(this.internals=this.attachInternals())}firstUpdated(){super.firstUpdated(),this.internals&&this.native&&(this._updateAssociatedForm(),this.native.addEventListener("input",(t=>{this._updateAssociatedForm()})))}connectedCallback(){super.connectedCallback(),this._assignFormProperty()}_updateAssociatedForm(){const t=new FormData;t.append(this.name,this.value),this.internals.setFormValue(t)}get form(){return this._assignFormProperty()}get name(){return this.getAttribute("name")}get type(){return this.localName}get willValidate(){return this.internals.willValidate}_assignFormProperty(){if(this.internals&&this.internals.form)return this.internals.form;let t=this;for(;(t=t.parentElement)&&"FORM"!==t.tagName&&"NN-FORM"!==t.tagName&&"EN-FORM"!==t.tagName&&!t.hasAttribute("as-form"););return t}},pt=t=>class extends t{static get properties(){return{nativeErrorMessages:{type:Boolean,attribute:"native-error-messages"},shownValidationMessage:{type:String,attribute:!1},validator:{type:Function},validationMessages:{type:Object,attribute:"validition-messages"},validationMessagePosition:{type:String,attribute:"validation-message-position"}}}static get styles(){return[super.styles||[],a`

          span.error-message {
            color: red;
          }

          :invalid {
            background-color: pink;
            border: var(--native-validator-mixin-input-border-invalid, 1px solid #bb7777);
          }
        `]}constructor(){super(),this.validator=()=>"",this.nativeValidationKeys=["badInput","customError","patternMismatch","rangeOverflow","rangeUnderflow","stepMismatch","valueMissing","tooLong","tooShort","typeMismatch"],this.validationMessages={},this.validationMessagePosition="before",this._showPrettyError=!1}get skipProperties(){return[...super.skipProperties,"checkValidity","reportValidity","setCustomValidity"]}get validationMessageTemplate(){return I`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `}get ifValidationMessageBefore(){return"after"===this.validationMessagePosition?"":this.validationMessageTemplate}get ifValidationMessageAfter(){return"before"===this.validationMessagePosition?"":this.validationMessageTemplate}setCustomValidity(t){if(this.native)return this.native.setCustomValidity(t)}_runValidator(){let t,e;this.form&&this.form._getElementValueSource&&(t=this[this.form._getElementValueSource(this)],e=this.form.submitObject);const i=this.validator(t,e);i&&this.setCustomValidity(i)}reportValidity(){return!this.native||(this.native.validity.customError||this._runValidator(),this.shownValidationMessage="",this.nativeErrorMessages?(this._showPrettyError=!1,this.native.reportValidity()):(this._showPrettyError=!0,this.native.checkValidity()))}checkValidity(){return!this.native||(this.native.validity.customError||this._runValidator(),this._showPrettyError=!1,this.native.checkValidity())}firstUpdated(){super.firstUpdated(),this.native.oninput=t=>{this.setCustomValidity(""),this.reportValidity()},this.native.oninvalid=t=>{if(!this._showPrettyError)return;const e=t.target.validity;let i;for(const t of this.nativeValidationKeys)if(e[t]){i=t;break}const s=this.validationMessages[i];this.shownValidationMessage=s?"function"==typeof s?s(t.target.validationMessage):s:t.target.validationMessage}}};class gt extends(ut(pt(Z(tt(ct(ht(J))))))){render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="checkbox" as-checkbox value-source="checked" id="native" real-time-event="click">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}_updateAssociatedForm(){this.internals.setFormValue(this.checked?this.value:null)}}t.register("nn-input-checkbox",gt);class mt extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        :host(:last-child) {
          border-bottom: unset;
        }

        :host(:hover) {
          background-color: #eee;
        }

        li {
          list-style: none;
        }

      `]}static get properties(){return{data:{type:Object,attribute:!1},config:{type:Object,attribute:!1}}}constructor(){super(),this.config={id:"id",countryName:"name",countryCapital:"capital"}}render(){return I`
    <li>${this.data[this.config.countryName]} (Capital: ${this.data[this.config.countryCapital]})</li>
    `}get idValue(){return this.data[this.config.id]}get textValue(){return this.data[this.config.countryName]}stringToData(t){return{[this.config.countryName]:t,valid:!0}}static get PickedElement(){return bt}}t.register("ee-autocomplete-item-country",mt);class bt extends mt{static get styles(){return[a`
        :host {
          position: relative;
          display: inline-block;
          font-size: 0.9em;
        }
      `]}render(){return I`
      ${this.data[this.config.countryName]}
      <slot></slot>
    `}}t.register("ee-autocomplete-item-country-view",bt);class ft extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        :host(:last-child) {
          border-bottom: unset;
        }

        :host(:hover) {
          background-color: #eee;
        }

        li {
          list-style: none;
        }

      `]}static get properties(){return{data:{type:Object,attribute:!1},config:{type:Object,attribute:!1}}}constructor(){super(),this.config={id:"id",emailName:"name",emailAddress:"email"}}render(){return I`
    <li>${this.textValue}</li>
    `}get idValue(){return this.data[this.config.id]}get textValue(){return this._textValueGetter()}_textValueGetter(t=!1){if(t)return this.data[this.config.emailName]||this.data[this.config.emailAddress];const e=this.data[this.config.emailName],i=this.data[this.config.emailAddress];return e&&i?`${e} <${i}>`:e||(i||"")}stringToData(t){let e,i;if(!t.match("@"))return{[this.config.emailName]:t,[this.config.emailAddress]:"",valid:!1};const s=t.match(/[^@<\s]+@[^@\s>]+/g);s&&(i=s[0]);const r=t.split(/\s+/);r.length>1&&(r.pop(),e=r.join(" ").replace(/"/g,""));const o=!!i;return{[this.config.emailName]:e,[this.config.emailAddress]:i,valid:o}}static get PickedElement(){return vt}}t.register("ee-autocomplete-item-email",ft);class vt extends ft{static get styles(){return[a`
        :host {
          position: relative;
          display: inline-block;
          font-size: 0.9em;
        }
      `]}render(){return I`
      ${this._textValueGetter(!0)}
      <slot></slot>
    `}}t.register("ee-autocomplete-item-email-view",vt);class yt extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          padding: 10px;
          border-bottom: 1px solid #ddd;
        }

        :host(:last-child) {
          border-bottom: unset;
        }

        :host(:hover) {
          background-color: #eee;
        }

        li {
          list-style: none;
          text-align: left;
        }

      `]}static get properties(){return{data:{type:Object,attribute:!1},config:{type:Object,attribute:!1}}}constructor(){super(),this.config={id:"id",path:"name"}}render(){return I`
    <li>${this.data[this.config.path]}</li>
    `}get idValue(){return this.data[this.config.id]}get textValue(){return this.data[this.config.path]}stringToData(t){return{[this.config.path]:t}}static get PickedElement(){return wt}}t.register("ee-autocomplete-item-li",yt);class wt extends yt{static get styles(){return[super.styles,a`
        :host {
          display: inline-block;
        }
      `]}static get properties(){return{data:{type:Object,attribute:!1},config:{type:Object,attribute:!1}}}constructor(){super(),this.config={id:"id",path:"name"}}render(){return I`
      -${this.data[this.config.path]}-
    `}}t.register("ee-autocomplete-item-li-view",wt);class Et extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          position: relative;
        }

        #suggestions-elements {
          box-sizing: border-box;
          background-color: white;
          position: absolute;
          z-index: 1000;
          max-height: 200px;
          max-width: calc(95% - 17px);
          overflow-y: scroll;
          top: 90%;
          left: 17px;
          visibility: hidden;
        }

        #suggestions-elements[populated] {
          width: auto;
          min-width: var(--ee-autocomplete-suggestions-min-width, 400px);
          box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.2), 0 0 2px 2px rgba(0, 0, 0, 0.05);
          padding: 10px;
        }

        #suggestions-elements > *[selected], #suggestions-elements > *:focus, #suggestions-elements > *:hover  {
          background-color: #eee;
        }

        [hidden] {
          display: none !important;
        }
      `]}static get properties(){return{url:{type:String},informational:{type:Boolean},target:{type:String},targetForId:{type:String,attribute:"target-for-id"},displaySingleSuggestion:{type:Boolean,attribute:"display-single-suggestion"},picked:{type:Boolean,reflect:!0},pickedData:{type:Object},suggestions:{type:Array,attribute:!1},itemElement:{type:String,attribute:"item-element"},itemElementConfig:{type:Object,attribute:"item-element-config"},itemElementAttributes:{type:Object,attribute:"item-element-attributes"}}}constructor(){super(),this.url="",this.target=null,this.targetForId=null,this.suggestions=[],this.pickedData={},this.itemElement="ee-autocomplete-item-li",this.itemElementConfig={},this.itemElementAttributes={},this._boundInputEvent=this._inputEvent.bind(this),this._boundKeydownEvent=this._keydownEvent.bind(this)}_findTarget(t){return null===t?this.children[0]:"string"==typeof t?this.querySelector(`#${t}`):"object"==typeof t?t:null}_findTargetForId(t){if("null"!==t){if("string"==typeof t)return""===t?this.querySelector("[name]:not([no-submit])"):this.querySelector(`#${t}`);if("object"==typeof t)return t}return null}connectedCallback(){if(super.connectedCallback(),this.targetElement=this._findTarget(this.target),this.targetForId=this._findTargetForId(this.targetForId),this.targetForId){this.picked=!!this.targetForId.getAttribute("value");new MutationObserver((t=>{t.forEach((t=>{"attributes"===t.type&&"value"===t.attributeName&&(this.picked=!!this.targetForId.getAttribute("value"),this.targetForId.getAttribute("value")||(this.pickedData=null))}))})).observe(this.targetForId,{attributes:!0})}this.targetElement?(this.targetElement.addEventListener("input",this._boundInputEvent),this.targetElement.addEventListener("keydown",this._boundKeydownEvent),this.targetElement.multiInputApi&&this.targetElement.setPickedElement(this.itemElement,this.itemElementConfig,this.itemElementAttributes),this.targetElement.setAttribute("aria-autocomplete","list"),this.targetElement.setAttribute("aria-controls","suggestions"),this.targetElement.toggleAttribute("aria-activedescendant",!0),this.setAttribute("role","combobox"),this.setAttribute("aria-owns","suggestions")):console.error("Target element not found")}disconnectedCallback(){this.targetElement&&(this.targetElement.removeEventListener("input",this._boundInputEvent),this.targetElement.removeEventListener("keydown",this._boundKeydownEvent))}render(){return I`
      <slot></slot>
      <div @click="${this._picked}" id="suggestions" role="listbox" @keydown=${this._handleKeyEvents}>
        <div id="suggestions-elements"></div>
      </div>
    `}_keydownEvent(t){switch(t.key){case"Escape":this.dismissSuggestions();break;case"KeyDown":if(this.suggestions.length){this.shadowRoot.querySelector("#suggestions-elements").firstChild.focus()}}}pickFirst(){this.shadowRoot.querySelector("#suggestions-elements").querySelector("[selected]").click()}focusNext(){if(!this.suggestions.length)return;const t=this.shadowRoot.querySelector("#suggestions-elements");let e=t.querySelector("[selected]")||t.firstElementChild;this.suggestions.length>1&&(e.toggleAttribute("selected",!1),e=e.nextElementSibling||e.previousElementSibling),e&&e.focus()}_picked(t){console.log(t.currentTarget,t.target),!this.informational&&this.targetElement&&t.target.tagName.toLowerCase()===this.itemElement&&(this.targetElement.multiInputApi?this.targetElement.pickedElement(t.target.data):(this.targetElement.value=t.target.textValue,this.targetForId&&(this.targetForId.value=t.target.idValue,this.picked=!0,this.pickedData=t.target.data)),this.dismissSuggestions(),this.targetElement.focus(),this._dispatchPickedEvent())}_dispatchPickedEvent(){if(!this.picked)return;const t=new CustomEvent("input",{composed:!0,bubbles:!0,cancelable:!1,detail:{synthetic:!0,data:this.pickedData}});this.targetElement.dispatchEvent(t)}_jsonCopy(t){return JSON.parse(JSON.stringify(t))}async updated(t){if(!t.has("suggestions"))return;const e=this.shadowRoot.querySelector("#suggestions-elements");if(e.innerHTML="",!this._autocompleteInFlight)if(this.targetElement.multiInputApi&&""===this.targetElement.autocompleteValue)e.toggleAttribute("populated",!1);else{for(const t of this.suggestions){const i=document.createElement(this.itemElement);i.config={...this._jsonCopy(i.config),...this._jsonCopy(this.itemElementConfig)};for(const t of Object.keys(this.itemElementAttributes))i.setAttribute(t,this.itemElementAttributes[t]);i.data=this._jsonCopy(t),i.setAttribute("tabindex",0),e.appendChild(i)}if(1===this.suggestions.length&&!this.targetElement.multiInputApi&&"function"==typeof this.targetElement.setSelectionRange){const t=e.firstChild,i=t.textValue;if(i.toUpperCase().startsWith(this.targetElement.value.toUpperCase())){const e=this.targetElement.value;this.targetElement.value=i,this.targetElement.setSelectionRange(e.length,i.length),this.targetForId&&(this.targetForId.value=t.idValue,this.picked=!0,this.pickedData=t.data,this.displaySingleSuggestion||(this.dismissSuggestions(),this._dispatchPickedEvent()))}}if(this.suggestions.length||e.toggleAttribute("populated",!1),this.suggestions.length){e.toggleAttribute("populated",!0),e.firstChild.toggleAttribute("selected",!0);const t=this._isOutOfViewport(e);t.any&&(console.log(t),console.log(e),e.style.transform=`translateY(${this._calcTranslateY(t.top,t.bottom,e)}px) translateX(${this._calcTranslateX(t.left,t.right)}px)`),e.style.visibility="unset"}}}_calcTranslateY(t,e,i){t=-1*Number(t),e=-1*Number(e);return t+(i&&e?-1*i.offsetHeight+-1*this.targetElement.offsetHeight:0)}_calcTranslateX(t,e){return(t=-1*Number(t))+(e=-1*Number(e))}_isOutOfViewport(t){const e=t.getBoundingClientRect(),i={};return i.top=e.top<0&&e.top,i.left=e.left<0&&e.left,i.bottom=e.bottom>(window.innerHeight||document.documentElement.clientHeight)&&e.bottom-window.innerHeight,i.right=e.right>(window.innerWidth||document.documentElement.clientWidth)&&e.right-window.innerWidth,i.any=!!(i.top||i.left||i.bottom||i.right),i.all=!!(i.top&&i.left&&i.bottom&&i.right),i}toggleSuggestions(){this.suggestions.length?(this.dismissSuggestions(),this.targetElement.value=""):this.openSuggestions()}openSuggestions(){this.targetElement.value=" ",this._inputEvent({})}dismissSuggestions(){this.shadowRoot.querySelector("#suggestions").toggleAttribute("populated",!1),this.suggestions=[]}_handleKeyEvents(t){const e=t.currentTarget.getRootNode().activeElement;if(this.suggestions.length&&e.parentElement)switch(t.key){case"ArrowUp":t.preventDefault(),e.previousElementSibling?e.previousElementSibling.focus():e.parentElement.lastElementChild.focus();break;case"ArrowDown":t.preventDefault(),e.nextElementSibling?e.nextElementSibling.focus():e.parentElement.firstElementChild.focus();break;case"Tab":case"Enter":this._picked(t),t.preventDefault(),this.targetElement.focus();break;case"Escape":this.dismissSuggestions(),this.targetElement.focus()}}async _inputEvent(t){if(console.log(t,this._autocompleteInFlight),0!==t.detail&&t.detail&&t.detail.synthetic)return;const e=this.targetElement;if(!e)return;if(this.dismissSuggestions(),this._autocompleteInFlight)return void(this._attemptedAutocompleteFlight=t);this.targetForId&&(this.targetForId.value="",this.picked=!1,this.pickedData=null),this._autocompleteInFlight=!0;const i=e.autocompleteValue||e.value;if(!i)return this._autocompleteInFlight=!1,void this.dismissSuggestions();const s=this.url+i,r={method:"GET",redirect:"follow"};let o,a=!1;try{o=await fetch(s,r)}catch(t){console.log("ERROR!",t),a=!0}if(a){console.log("Network error!");const t=new CustomEvent("autocomplete-error",{detail:{type:"network"},bubbles:!0,composed:!0});this.dispatchEvent(t)}else if(o.ok){const t=await o.json();this.suggestions=t;const e=new CustomEvent("form-ok",{detail:{response:o},bubbles:!0,composed:!0});this.dispatchEvent(e)}else{console.log("Fetch error!");const t=await o.json(),e=new CustomEvent("autocomplete-error",{detail:{type:"http",response:o,errs:t},bubbles:!0,composed:!0});this.dispatchEvent(e)}if(this._autocompleteInFlight=!1,this._attemptedAutocompleteFlight){const t=this._attemptedAutocompleteFlight;this._attemptedAutocompleteFlight=!1,this._inputEvent(t)}}}t.register("ee-autocomplete",Et);class xt extends(tt(J)){static get styles(){return[a`
        :host {
          flex-grow: 1;
          flex-shrink: 1;
          box-sizing: border-box;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          padding: 3px;
          border: 1px solid transparent;
        }

        :host([selectable]:hover) {
          border: 1px solid var(--ee-cell-hover-border-color, #ddd);
          background-color: 1px solid var(--ee-cell-hover-background-color, #eee);
        }

        :host([sq]) {
          flex-grow: 0.25;
        }
        :host([sh]) {
          flex-grow: 0.5;
        }
        :host([s1]) {
          flex-grow: 1;
        }
        :host([s2]) {
          flex-grow: 2;
        }
        :host([s3]) {
          flex-grow: 3;
        }
        :host([s4]) {
          flex-grow: 4;
        }
        :host([s5]) {
          flex-grow: 5;
        }

        /*
         ::slotted(#dnd-handle) {
          cursor: pointer;
        }

        ::slotted(*) {
          cursor: pointer;
        }
        */

      `]}static get properties(){return{}}constructor(){super(),this.SOMETHING=!1}connectedCallback(){super.connectedCallback()}render(){return I`
      <slot></slot>
    `}}t.register("ee-cell",xt);const kt=I`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`;class _t extends(tt(J)){static get styles(){return[a`
        /* The base style for the ee-drawer element.*/
       :host {
          --ee-drawer-width: 300px;
          --ee-drawer-background-color: #393939;
          --ee-drawer-selected-color: white;
          display: block;
          position: fixed;
          box-sizing: border-box;
          top: 0;
          left: 0;
          z-index: 1; /* z-index is 1 by default, which should fit most scenarios. But it can be adjust by the ee-drawer parent's CSS, is needed */ 
          width: 20px; /* It is reduced to 20px width, which is enough to provide a target are for dragging on the viewport's left edge  */
          height: 100vh;
          user-select: none;
        }

        /* Take entire viewport when opened */
        :host([opened]) {
          width: 100vw;
          height: 100vh;
        }

        /* This class contains the actual drawer UI. It is full height and aligned to the :host edges, but moved horizontally -100% (left) of it's width */
        #container {
          height: 100vh;
          position: absolute;
          top: 0;
          left: 0;
          overflow-x: hidden;
          background-color: var(--ee-drawer-background-color);
          will-change: transform;
          transform: translateX(-100%);
          transition: transform 0.3s ease-out;
        }

        /* Reposition the drawer content to the original left edge alignment when opened */
        :host([opened]) #container {
          will-change: transform;
          transform: translateX(0);
        }

        /* Only add the container shadow when opened */
        :host([backdrop][opened]) #container {
          box-shadow: var(--ee-drawer-shadow, 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.14), 0 0 0 100vw rgba(0, 0, 0, 0.15))
        }

        /* The nav element styles.*/

        #nav  {
          box-sizing: border-box;
          width: 100%;
          min-width: var(--ee-drawer-width);
          height: 100%;
          padding: 30px 24px;
          background: var(--ee-drawer-background-color);
          position: relative;
          overflow: auto;
          padding-bottom: 64px;
        }

        /* This will style the drawer items. If the developer decides not to use an <a> tag, the item must have class="drawer-item"  */
        #nav ::slotted(a),
        #nav ::slotted(.drawer-item) {
          display: block;
          text-decoration: none;
          color: var(--ee-drawer-color, #ddd);
          line-height: 32px;
          padding: 0 24px;
          cursor: pointer;
          font-size: 0.9em;
        }

        #nav ::slotted(a[selected]),
        #nav ::slotted(.drawer-item[selected]) {
          color: var(--ee-drawer-selected-color);
          font-weight: bolder;
          border-left: 3px solid var(--ee-drawer-selected-color);
          background-color: rgba(255,255,255, 0.1);
        }

        #nav ::slotted(a:hover),
        #nav ::slotted(.drawer-item:hover) {
          background-color: rgba(255,255,255, 0.05);
        }

        /* A header item can be slotted with class="head". It can be a simple heading tag, or an element containing anything*/
        #nav ::slotted(.head) {
          color: var(--ee-drawer-color, white);
          box-sizing: border-box;
          width: 100%;
          border-bottom: 1px solid var(--ee-drawer-selected-color);
          padding: 6px 70% 6px 0;
          font-size: 1.15em;
          margin: 10px auto;
        }

        /* Close button styles */

        #close {
          -webkit-appearance: none;
          color: var(--ee-drawer-background-color);
          fill: var(--ee-drawer-background-color);
          position: absolute;
          right: 5px;
          z-index: 10;
          background-color: var(--ee-drawer-background-color);
          border: none;
          cursor: pointer;
          right: 0;
          height: 100%;
          box-sizing: border-box;
          padding: 0 2px;
        }

        #close svg {
          height: 20px;
          width: 20px;
        }

        #close:focus, #close:active {
          outline: none !important;
        }

        #close:active, #close:hover {
          filter: brightness(120%);
          fill: var(--ee-drawer-selected-color);
          color: var(--ee-drawer-selected-color);
        }
      `]}static get properties(){return{opened:{type:Boolean,reflect:!0},backdrop:{type:Boolean,reflect:!0},closeButton:{type:Boolean,attribute:"close-button"},closeThreshold:{type:Number},openThreshold:{type:Number}}}constructor(){super(),this.backdrop=!0,this.closeButton=!0,this.opened=!1,this.closeThreshold=.6,this.openThreshold=.6}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleOutsideClick),this.addEventListener("touchstart",this._handleDragStart),this.addEventListener("touchmove",this._handleDrag),this.addEventListener("touchend",this._handleDragEnd),this.addEventListener("mousedown",this._handleDragStart),this.addEventListener("mousemove",this._handleDrag),this.addEventListener("mouseup",this._handleDragEnd)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleOutsideClick),this.removeEventListener("touchstart",this._handleDragStart),this.removeEventListener("touchmove",this._handleDrag),this.removeEventListener("touchend",this._handleDragEnd),this.removeEventListener("mousedown",this._handleDragStart),this.removeEventListener("mousemove",this._handleDrag),this.removeEventListener("mouseup",this._handleDragEnd)}firstUpdated(){this.container=this.shadowRoot.querySelector("div#container")}render(){return I`
      <div id="container">
        ${this.closeButton?I`<button id="close" @click="${this.close}">${kt}</button>`:""}
        <nav id="nav">
          <slot></slot>
        </nav>
      </div>
    `}open(){this.opened=!0}close(){this.opened=!1}toggle(){this.opened=!this.opened}_handleOutsideClick(t){this.ignoreNextClick?this.ignoreNextClick=!1:"EE-DRAWER"===t.target.nodeName&&this.close()}_handleDragStart(t){this.dragStart="touchstart"===t.type?t.touches[0].clientX:t.clientX,this.opened||(this.style.width="100vw")}_handleDrag(t){if(void 0===this.dragStart)return;this.dragging=!0,t.preventDefault();const e=("touchmove"===t.type?t.touches[0].clientX:t.clientX)-this.dragStart,i=this.container.getBoundingClientRect().width,s=i-this.openThreshold*i,r=-1*(i-this.closeThreshold*i);return e<r?(this.close(),void this._finishDrag()):e>s?(this.open(),this.ignoreNextClick=!0,void this._finishDrag()):(requestAnimationFrame((()=>{this.container.style.transform=`translateX(calc(${this.opened?"":"-100% +"} ${e}px))`})),!1)}_handleDragEnd(t){this.dragging&&t.preventDefault(),this.dragStart=void 0,this.dragging=!1,this._finishDrag()}_finishDrag(){requestAnimationFrame((()=>{this.container.style.transform="",this.opened||(this.style.width="")}))}}t.register("ee-drawer",_t);
/**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const At=I`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`;class St extends(tt(ht(J))){static get styles(){return[super.styles,a`
        :host {
          position: fixed;
          right: 16px;
          left: initial;
          bottom: 16px;
          top: initial;
        }
      `]}static get properties(){return{icon:{type:Object},label:{type:String}}}render(){return I`
      <button data-descr=${(t=>null!=t?t:P)(this.label)} id="native">
        ${this.icon?this.icon:At}
      </button>
    `}}t.register("ee-fab",St);class $t extends(tt(J)){static get styles(){return[super.styles,a`
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

        :host(:not([no-animation])) {
          min-height: 100vh;
          overflow-x: hidden;
          -webkit-animation: fadeIn 0.3s ease-in; /* Safari 4+ */
          -moz-animation:    fadeIn 0.3s ease-in; /* Fx 5+ */
          -o-animation:      fadeIn 0.3s ease-in; /* Opera 12+ */
          animation:         fadeIn 0.3s ease-in; /* IE 10+, Fx 29+ */
        }

      `]}render(){return I`
      <slot></slot>
    `}}t.register("ee-fade-in",$t);class Ct extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: flex;
          box-sizing: border-box;
          width: 100%;
          align-items: center;
          position: relative;
          height: var(--ee-toolbar-height, 100%);
          max-height: var(--ee-toolbar-max-height, 96px);
          padding: 0 5px;
          pointer-events: none;
          font-size: var(--ee-toolbar-font-size, 20px);
        }

        :host ::slotted(*) {
          pointer-events: auto;
        }

        :host ::slotted(.icon) {
          font-size: 0;
        }

        :host ::slotted([title]) {
          display: flex;
          margin: auto 20px;
        }

        :host ::slotted([bottom-item]) {
          position: absolute;
          top: unset;
          bottom: 0;
          right: 0;
          left: 0;
        }

        :host ::slotted([top-item]) {
          position: absolute;
          top: 0;
          bottom: unset;
          right: 0;
          left: 0;
        }

        :host ::slotted([spacer]) {
          margin-left: 64px;
        }
      `]}render(){return I`
      <slot></slot>
    `}}t.register("ee-toolbar",Ct);const Vt=I`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>`,Mt=I`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`;class Tt extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          width: 100%;
        }

        div#header {
          display: flex;
          width: 100%;
          position: sticky;
          top: 0;
          right: 0;
          width: 100%;
          max-width: 100%;
          text-align: center;
        }

        :host([menu]) div[header-title],
        :host([back]) div[header-title] {
          padding-right: 46px;
        }

        :host([menu][back]) div[header-title]{
          padding-right: 92px;
        }

        div[header-title], div[middle] {
          display: block;
        }

        div[header-title] h3,
        div[header-title] h5 {
          margin-block-start: 0.2em;
          margin-block-end: 0.2em;
        }

        div[header-title] h5 {
          text-align: start;
          display: flex;
        }

        div[middle] h1, div[middle] h2,
        div[middle] h3, div[middle] h4,
        div[middle] h5, div[middle] h6 {
          margin-block-start: 0.1em;
          margin-block-end: 0.1em;
        }

        .toolbar .subtitle {
          color: var(--ee-header-secondary-color, grey);
        }
        .toolbar button.icon {
          appearance: none;
          -webkit-appearance: none;
          font-size: inherit;
          vertical-align: middle;
          background: transparent;
          border: none;
          cursor: pointer;
          -webkit-appearance: none;
          height: 40px;
          width: 40px;
          padding: 4px;
          margin: auto 3px;
          border: 1px solid transparent;
          color: var(--ee-header-color, black);
        }

        .toolbar button.icon:focus, .toolbar button.icon:hover {
          outline: 0;
          border: 1px solid var(--ee-header-lines-color, #bdbdbd);
        }

        .toolbar button.icon:active {
          outline: 0;
          border: 1px solid #bdbdbd;
          box-shadow: none
          /* animation: fadeIn 0.1s ease-in; */
        }

        .toolbar button, .toolbar button svg {
          color: var(--ee-header-color);
          fill: var(--ee-header-color);
        }

        .toolbar div.actions {
          position: absolute;
          right: 20px;
          display: flex;
        }

        ::slotted([slot=actions]) {
          display: flex
        }

        .toolbar div.actions ::slotted(*[slot="actions"]) a {
          line-height: unset
        }

        .toolbar div.controls {
          align-items: left;
        }

        .toolbar div.controls ::slotted(*[slot="actions"]) {
          z-index: var(--ee-header-actions-z-index, 2)
        }

      `]}static get properties(){return{back:{type:Boolean,reflect:!0},menu:{type:Boolean,reflect:!0},backEvent:{type:Function,attribute:"back-event"},menuEvent:{type:Function,attribute:"menu-event"},headerTitle:{type:String,attribute:"header-title"},headerSubtitle:{type:String,attribute:"header-subtitle"}}}constructor(){super(),this.headerTitle=""}menuEvent(){}backEvent(){}render(){return I`
      <div id="header">
        <ee-toolbar class="toolbar">
          <div class="controls">
            ${this.menu?I`<button class="icon" title="Menu" @click="${this._menuEvent}">${Mt}</button>`:""}
            ${this.back?I`<button class="icon" title="Back" @click="${this._backEvent}">${Vt}</button>`:""}
            <slot name="controls"></slot>
          </div>
          <div header-title>
          ${this.headerTitle?I`
                <h3>${this.headerTitle}</h3>
                <h5>${this.headerSubtitle?I`<div class="subtitle">${this.headerSubtitle}</div>`:""} <slot name="header-subtitle"></slot></h5>
            `:I`
              <slot name="header-title"></slot>
            `}
          </div>
          <div middle>
            <slot name="middle"></slot>
          </div>
          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </ee-toolbar>
        <slot name="sub-toolbar"></slot>
      </div>
    `}_menuEvent(){this.dispatchEvent(new CustomEvent("menu-clicked",{bubbles:!0,composed:!0})),this.menuEvent()}_backEvent(){this.dispatchEvent(new CustomEvent("back-clicked",{bubbles:!0,composed:!0})),this.backEvent()}}t.register("ee-header",Tt);class Ot extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 56px;
          z-index: 100;
        }

        :host nav {
          display: flex;
          width: 100%;
          height: 56px;
          background: var(--ee-navbar-background, white);
          color: var(--ee-navbar-color, black);
          fill: var(--ee-navbar-color, black);
        }

        :host nav > ::slotted(*[nav-item]) {
          margin: 0 auto;
          padding: 8px 12px;
          display: block;
          position: relative;
          opacity: 0.7;
          height: 24px;
          min-width: 80px;
          max-width: 168px;
          text-align: center;
        }

        :host nav > ::slotted(*[nav-item])::after {
          content: attr(item-label);
          position: absolute;
          top: 24px;
          left: 50%;
          line-height: 12px;
          font-size: 12px;
          transform: translateX(-50%);
          margin-top: 6px;
          padding: 6px;
          white-space: nowrap;
          text-transform: uppercase;
        }

        :host nav > ::slotted(*[selected]) {
          opacity: 1;
        }
      `]}static get properties(){return{selected:{type:String,reflect:!0},selectedAttribute:{type:String},eventBubbles:{type:Boolean}}}constructor(){super(),this.selected="",this.eventBubbles=!1,this.selectedAttribute="name"}render(){return I`
      <nav>
        <slot @slotchange="${this._manageSlotted}"></slot>
      </nav>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("clicked-slot",this._fireSelectedEvent)}_manageSlotted(t){const e=t.currentTarget.assignedNodes();for(const t of e)t.addEventListener("click",this._clickedSlotted.bind(this))}_clickedSlotted(t){console.log("slot clicked",this.selectedAttribute),this.dispatchEvent(new CustomEvent("clicked-slot",{detail:{event:t,selected:t.currentTarget.getAttribute(this.selectedAttribute)}}))}_fireSelectedEvent(t){this.dispatchEvent(new CustomEvent("selected-changed",{detail:{selected:t.detail.selected}})),this.selected=t.detail.selected}}t.register("ee-nav-bar",Ot);class It extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          position: relative;
        }

        :host([inline]) {
          display: inline-block;
        }

        :host([status="loading"]) ::slotted(*),
        :host([status="saving"]) ::slotted(*),
        :host([status="loading-error"]) ::slotted(*),
        :host([status="saving-error"]) ::slotted(*) {
          z-index: 0;
        }

        #overlay {
          display: none; /* Hide by default */
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          text-align: center;
          transition: background var(--ee-network-transition-duration, 200ms);
        }

        #overlay.overlay-loading {
          display: block;
          color: var(--ee-network-overlay-loading-color, #666);
          background-color: var(--ee-network-overlay-loading-background-color, rgba(190, 190, 190, 0.75));
          z-index: 10;
        }

        #overlay.overlay-error {
          display: block;
          cursor: pointer; /* Hint that the object is clickable */
          color: var(--ee-network-overlay-error-color, #c00);
          background-color: var(--ee-network-overlay-error-background-color, rgba(255, 0, 0, 0.25));
          z-index: 10;
        }

        #overlay #statusMessage {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
        }

        #content-wrapper.overlay-error,
        :host([status="overlay-error"]) {
          pointer-events: none;
          opacity: 0.25;
          min-height: 1.25rem; /* FIXME: find a proper value, this is made up */
        }
      `]}static get properties(){return{manageLoadingErrors:{type:Boolean,attribute:"manage-loading-errors"},manageSavingErrors:{type:Boolean,attribute:"manage-saving-errors"},retryMethod:{type:Function,attribute:!1},noReloadOnTap:{type:Boolean,attribute:"no-reload-on-tap"},status:{type:String,reflect:!0},statusMessages:{type:Object,attribute:"status-messages"},messenger:{type:Function,attribute:!1},overlayClass:{type:String,attribute:!1},response:{type:Function,attribute:!1},prefetch:{type:Function,attribute:!1}}}constructor(){super(),this.manageLoadingErrors=!1,this.manageSavingErrors=!1,this.retryMethod=null,this.noReloadOnTap=!1,this.status="loaded",this.statusMessages={loading:"Loading…",saving:"Saving…",error:"An error has occurred. Click here to try again."},this.lastInitObject=null,this.lastUrl=null,this.response=this.prefetch=()=>{}}render(){return I`
      <slot></slot>
      <div id="overlay" class="${this.overlayClass}" @click="${this._overlayClicked}">
        <div id="statusMessage">${this.statusMessages[this.status]}</div>
      </div>
    `}firstUpdated(){this._setOverlay()}_setOverlay(){switch(this.status){case"loaded":case"saved":this.overlayClass="clear";break;case"loading":case"saving":this.overlayClass="overlay-loading";break;case"loading-error":this.overlayClass=this.manageLoadingErrors?"overlay-error":"clear";break;case"saving-error":this.overlayClass=this.manageSavingErrors?"overlay-error":"clear"}}async _overlayClicked(t){if(!this.noReloadOnTap&&(t.stopPropagation(),t.preventDefault(),"loading-error"===this.status||"saving-error"===this.status))if(this.retryMethod)this.retryMethod(this.status,this.lastUrl,this.lastInitObject);else{const t=await this.fetch(this.lastUrl,this.lastInitObject);t.ok&&this.dispatchEvent(new CustomEvent("retry-successful",{detail:{url:this.lastUrl,initObject:this.lastInitObject,fetched:t},composed:!0,bubbles:!1}))}}response(){}messenger(){}async fetch(t,e={}){this.lastUrl=t,this.lastInitObject=e;const i="GET"===(e&&e.method&&e.method.toUpperCase()||"GET");e.url=t,this.status=i?"loading":"saving",this._setOverlay(),this.messenger({status:this.status,url:t,initObject:e,networkElement:this}),this.prefetch(e);try{const s=await fetch(e.url,e),r=s.clone(),o=await r.json();return s.ok?this.status=i?"loaded":"saved":this.status=i?"loading-error":"saving-error",this._setOverlay(),this.messenger({status:this.status,url:t,initObject:e,response:s,networkElement:this}),this.response(s,o,e),s}catch(s){throw this.status=i?"loading-error":"saving-error",this._setOverlay(),this.messenger({status:this.status,url:t,initObject:e,networkElement:this}),this.response(null,null,e),s}}}t.register("ee-network",It);class Lt extends(tt(J)){static get styles(){return[a`
        :host {
          box-sizing: border-box;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: center;
          width: 100%;
          border: 1px solid transparent;
          border-bottom: var(--ee-row-border-bottom, 1px solid #777);
        }

        :host(:last-child) {
          border-color: transparent;
        }

        :host([header]) {
          height: var(--ee-row-header-height, 2em);
          box-sizing: border-box;
          font-weight: bold;
          border-bottom: var(--ee-row-header-border-bottom, 2px solid #777);
        }

        :host(:hover:not([header])) {
          border: 1px solid var(--ee-row-hover-border-color, #ddd);
          background: var(--ee-row-hover-background, #eee) !important;
        }

        :host([frozen]) {
          position: sticky;
          top: 0;
          background: var(--ee-row-background, white);
        }

        :host([frozen][footer]) {
          bottom: 0;
          top: unset;
          border-top: var(--ee-row-border-bottom, 1px solid #777);
        }

        :host([size=small]) ::slotted(ee-cell) {
          flex-basis: 100%;
        }

        :host([size=medium]) ::slotted(ee-cell),
        :host([size=large]) ::slotted(ee-cell) {
          flex-basis: 0;
        }

        :host([size=medium]) ::slotted(ee-cell[extra]),
        :host([size=small]) ::slotted(ee-cell[extra])
        {
          display:none !important;
        }

        :host([size=small]) ::slotted(ee-cell[header]) {
          display: none !important;
        }

        /* Drag and Drop Styles */
        #dnd-handle, ::slotted(#dnd-handle) {
          display: none;
          max-width: 18px;
          height: 18px;
          cursor: move;
        }

        :host([header]) .handle,
        :host([header]) ::slotted(.handle) {
          pointer-events: none;
          visibility: hidden;
        }

        :host([draggable]) .handle,
        :host([draggable]) ::slotted(.handle) {
          display: block;
        }
      `]}static get properties(){return{header:{type:Boolean}}}constructor(){super()}render(){return I`
      <slot></slot>
    `}}t.register("ee-row",Lt);class Pt extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 12px;
          background-color: var(--ee-snackbar-background-color);
          color: var(--ee-snackbar-color);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          text-align: center;
          will-change: transform;
          transform: translate3d(0, 100%, 0);
          transition-property: visibility, transform;
          transition-duration: 0.2s;
          visibility: hidden;
        }

        :host([active]) {
          visibility: visible;
          transform: translate3d(0, 0, 0);
        }

        :host([theme="success"]) {
          background-color: green;
          color: white;
        }

        :host([theme="info"]) {
          background-color: gray;
          color: white;
        }

        :host([theme="error"]) {
          background-color: red;
          color: white;
        }
        @media (min-width: 460px) {
          :host {
            width: 320px;
            margin: auto;
          }
        }
      `]}render(){return I`
      ${this.message}
    `}static get properties(){return{active:{type:Boolean,reflect:!0},message:{type:String}}}_eventListener(t){const e=t.detail.theme||"info";this.setAttribute("theme",e),this.message=t.detail.message,this.show()}connectedCallback(){super.connectedCallback(),document.addEventListener("snack-bar",this.boundEventListener)}disconnectedCallback(){super.disconnectedCallBack(),document.removeEventListener("snack-bar",this.boundEventListener)}constructor(){super(),this.active=!1,this.boundEventListener=this._eventListener.bind(this),this.intervalId=null}show(){this.active=!0,this.intervalId&&clearInterval(this.intervalId),this.intervalId=setInterval((()=>{this.active=!1}),3e3)}}t.register("ee-snack-bar",Pt);class Rt extends(tt(J)){static get styles(){return[super.styles||[],a`
        :host {
          display: block;
          width: 100%;
        }

        :host([striped]) ::slotted(ee-row:nth-child(odd)) {
          background-color: var(--ee-table-striped-odd-color, white)
        }

        :host([striped]) ::slotted(ee-row:nth-child(even)) {
          background-color: var(--ee-table-striped-even-color, whitesmoke)
        }
      `]}static get properties(){return{small:{type:String},medium:{type:String}}}constructor(){super(),this.small=600,this.medium=1024}_changeRowsSize(t){const e=this.shadowRoot.querySelector("slot").assignedElements();for(const i of e)i.setAttribute("size",t)}_handleResize(){window.matchMedia(`(max-width: ${this.small}px)`).matches?this._changeRowsSize("small"):window.matchMedia(`(max-width: ${this.medium}px)`).matches?this._changeRowsSize("medium"):this._changeRowsSize("large")}firstUpdated(){super.firstUpdated(),this._handleResize()}connectedCallback(){super.connectedCallback();(window.visualViewport||window).addEventListener("resize",(()=>{this._handleResize()}))}render(){return I`
      <slot @slotchange="${this._slotChanged}"></slot>
    `}_slotChanged(){this._handleResize()}}t.register("ee-table",Rt);class Ft extends(tt(J)){static get styles(){return[super.styles,a`
        :host {
          position: relative;
          border-bottom: 1px solid var(var(--ee-tabs-lines-color, #bbb));
        }

        :host nav {
        display: flex; 
          position: var(--ee-tabs-nav-position, sticky);
          top:0;
          width: 100%;
          border-bottom: 1px solid var(--ee-tabs-lines-color, #bbb);
          height: var(--ee-tabs-height, 32px);
          z-index: var(--ee-tabs-z-index, 1);
          overflow: var(--ee-tabs-nav-overflow);
        }

        :host #contentContainer {
          height: 100%;
          padding: var(--ee-tabs-content-padding, 10px);
        }

        #contentContainer ::slotted(*) {
          display: none;
        }

        #contentContainer ::slotted([active]) {
          display: initial;
        }

        nav ::slotted(*) .icon {
          fill: var(--ee-tabs-color, black);
        }

        nav > ::slotted(*[active]) .icon {
          fill: var(--ee-tabs-active-color, black);
        }

        nav > ::slotted(*) {
          color: var(--ee-tabs-color, black);
          text-decoration: none;
          line-height: var(--ee-tabs-height, 20px);
          padding: 4px 12px;
          border: unset;
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-background-color, #bbb);
          font-size: 0.9em;
          border-radius: 0;
          width: 100%;
          text-align: center;
          background-color:  var(--ee-tabs-background-color, whitesmoke);
          cursor: default;
        }

        :host([min-width-tabs]) nav > ::slotted(*) {
          max-width: max-content;
        }

        nav > ::slotted(:last-child) {
          border-right-color: var(--ee-tabs-background-color, #bbb)
        }

        nav > ::slotted(:first-child) {
          border-left-color: var(--ee-tabs-background-color, #bbb)
        }

        nav > ::slotted([active]) {
          color: var(--ee-tabs-active-color);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          background-color: var(--ee-tabs-active-background-color, white);
          font-weight: bold;
        }

        nav > ::slotted(:focus),
        nav > ::slotted(:hover) {
          /* outline:0 ; */
          border-left: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-right: 0.5px solid var(--ee-tabs-lines-color, #bbb);
          border-bottom: 4px solid var(--ee-tabs-active-color, black);
          filter: brightness(115%)
        }

        nav > ::slotted(:active) {
          background: #cccccc;
          border-bottom: 4px solid #bdbdbd;
          box-shadow: none;
        }

        nav > ::slotted([disabled]) {
          box-shadow: none
        }

        nav > ::slotted(.icon:active) {
          background: #cccccc;
          border: unset;
          border-radius: 50%;
        }

        nav > ::slotted(.icon:hover) svg, :host > ::slotted(:hover) svg {
          fill: var(--ee-tabs-color, black);
        }
      `]}static get properties(){return{useHash:{type:Boolean,attribute:"use-hash"},passive:{type:Boolean},default:{type:String},nameAttribute:{type:String,attribute:"name-attribute"},minWidthTabs:{type:Boolean,reflect:!0,attribute:"min-width-tabs"}}}constructor(){super(),this.nameAttribute="name",this.useHash=!1,this.passive=!1}render(){return I`
    <nav>
      <slot id="tabs" @slotchange="${this._manageSlottedTabs}"></slot>
    </nav>
    <div id="contentContainer">
      <slot name="content"></slot>
    </div>
    `}_allTabs(){return this.shadowRoot.querySelector("slot#tabs").assignedElements()}_workoutHash(){let t;return this.useHash&&(t=window.location.hash?window.location.hash.substr(1):this.default?this.default:this._allTabs()[0]),t}firstUpdated(){super.firstUpdated();const t=this._workoutHash();this.select(t,!1),window.addEventListener("popstate",(t=>{const e=this._workoutHash();this.useHash&&this.select(e,!0)}))}_isActive(t){return t.hasAttribute("active")}select(t,e=!0){let i;if("string"==typeof t&&(t=this._allTabs().find((e=>e.getAttribute(this.nameAttribute)===t))),t&&(e&&(i=this.shadowRoot.querySelector('slot[name="content"]').assignedElements(),this.passive?this._clearAll(this._allTabs()):this._clearAll(this._allTabs(),i)),t.toggleAttribute("active",!0),t.active=!0,!this.passive)){const e=t.getAttribute(this.nameAttribute),s=i.find((t=>t.getAttribute(this.nameAttribute)===e));s&&(s.toggleAttribute("active",!0),s.active=!0)}}_clearAll(t,e){const i=t.find(this._isActive.bind(this));if(i&&(i.toggleAttribute("active",!1),i.active=!1),!this.passive){const t=e.find(this._isActive.bind(this));t&&(t.toggleAttribute("active",!1),t.active=!1)}}_manageSlottedTabs(t){for(const t of this._allTabs())t.addEventListener("click",(t=>{this.select.bind(this)(t.currentTarget)})),t.setAttribute("tabindex",1);!this.passive&&this.default&&this.select(this.default,!0)}}t.register("ee-tabs",Ft);class Nt extends(tt(J)){get reflectProperties(){return[...super.reflectProperties,...st]}get skipProperties(){return[...super.skipProperties,"elements","checkValidity","reportValidity","reset","submit"]}static get properties(){return{fetchingElement:{type:String,attribute:"fetching-element"},recordId:{type:String,attribute:"record-id"},setFormAfterSubmit:{type:Boolean,attribute:"set-form-after-submit"},resetFormAfterSubmit:{type:Boolean,attribute:"reset-form-after-submit"},validateOnLoad:{type:Boolean,attribute:"validate-on-load"},validateOnRender:{type:Boolean,attribute:"validate-on-render"},submitCheckboxesAsNative:{type:Boolean,attribute:"submit-checkboxes-as-native"},noAutoload:{type:Boolean,attribute:"no-autoload"},presubmit:{type:Object,attribute:!1},response:{type:Object,attribute:!1},incomingData:{type:Object,attribute:!1},dataLoaded:{type:Object,attribute:!1},extrapolateErrors:{type:Object,attribute:!1}}}constructor(){super(),this.validateOnLoad=!1,this.validateOnRender=!1,this.fetchingElement=null,this.submitCheckboxesAsNative=!1,this._boundRealtimeSubmitter=this._realTimeSubmitter.bind(this),this.attemptedFlight=!1,this.inFlightMap=new WeakMap,this.attemptedFlightMap=new WeakMap,this.submitObject={},this.setAttribute("role","form")}reportValidity(){let t=!0;for(const e of this.elements)"function"==typeof e.reportValidity&&(e.setCustomValidity(""),e.reportValidity()||(t=!1));return t}clearAllCustomValidity(t){for(const e of t)"function"==typeof e.setCustomValidity&&e.setCustomValidity("")}checkValidity(){let t=!0;for(const e of this.elements)"function"==typeof e.checkValidity&&(e.setCustomValidity(""),e.checkValidity()||(t=!1));return t}reset(){for(const t of this.elements){const e=this._getElementValueSource(t);"function"==typeof t.setCustomValidity&&t.setCustomValidity(""),this._radioElement(t)?t[e]=null!==t.getAttribute(e):this._checkboxElement(t)?t[e]=t.hasAttribute(e):t[e]=t.getAttribute(e)}}createSubmitObject(t){const e={};for(const i of t){const t=i.getAttribute("name");if(null!=t&&(void 0===e[t]&&!i.hasAttribute("no-submit")))if(this._checkboxElement(i))if(this.submitCheckboxesAsNative){const i=this.getFormElementValue(t);i&&(e[t]=i)}else e[t]=!!this.getFormElementValue(t);else"file"===i.getAttribute("type")||null!==i.getAttribute("as-file")?e[t]=i:e[t]=this.getFormElementValue(t)}return e}getFormElementValue(t){const e=[...this.elements].filter((e=>e.getAttribute("name")===t));if(e.length){if(1===e.length){const t=e[0],i=this._getElementValueSource(t);return this._checkboxElement(t)?t[i]?t.value?t.value:"on":void 0:(this._selectElement(t),t[i])}{if(e.filter((t=>!this._radioElement(t))).length)return void console.error("Duplicate name",t,"for non-radio elements");const i=e.find((t=>t[this._getElementValueSource(t)]));return i?i.value:void 0}}console.error("Trying to set",t,"but no such element in form")}setFormElementValue(t,e,i){const s=[...this.elements].find((i=>this._radioElement(i)?i.getAttribute("name")===t&&i.value===e:i.getAttribute("name")===t));if((!s||"hidden"===s.getAttribute("type"))&&i)return;const r=this._getElementValueSource(s);if(this._checkboxElement(s))s[r]=!!e;else if(this._radioElement(s)){s[r]=!0;const t=[...this.elements].filter((t=>s!==t&&this._radioElement(s)));for(const e of t)e[r]=!1}else this._selectElement(s)?e?s[r]=e:s.selectedIndex=0:"file"===s.getAttribute("type")||null!==s.getAttribute("as-file")?s.fileName=e:s[r]=e}_selectElement(t){return!(void 0===t.selectedIndex&&!t.hasAttribute("as-select"))}_checkboxElement(t){return"checkbox"===t.getAttribute("type")||!!t.hasAttribute("as-checkbox")}_radioElement(t){return"radio"===t.getAttribute("type")||!!t.hasAttribute("as-radio")}_getElementValueSource(t){return"checkbox"===t.getAttribute("type")||"radio"===t.getAttribute("type")||t.hasAttribute("as-checkbox")||t.hasAttribute("as-radio")?"checked":t.getAttribute("value-source")?t.getAttribute("value-source"):"value"}get elements(){return[...this.querySelectorAll("[name]")].filter((t=>"A"!==t.tagName))}async _allChildrenCompleted(){for(const t of this.elements)void 0!==t.updateComplete&&await t.updateComplete}_realTimeSubmitter(t){this.submit(t.target)}connectedCallback(){super.connectedCallback(),this._allChildrenCompleted().then((()=>{for(const t of this.elements){const e=null!==t.getAttribute("real-time"),i=t.getAttribute("real-time-event")||"input";e&&i&&t.addEventListener(i,this._boundRealtimeSubmitter)}}))}disconnectedCallback(){super.disconnectedCallback();for(const t of this.elements){if(null===t.getAttribute("real-time"))continue;const e=t.getAttribute("real-time-event");e&&t.removeEventListener(e,this._boundRealtimeSubmitter)}}async firstUpdated(){super.firstUpdated(),this.validateOnRender&&(await this._allChildrenCompleted(),this.reportValidity())}setFormElementValues(t){for(const e in t)this.setFormElementValue(e,t[e],!0)}setRecordObject(t){t={...t};const e={};for(const t of this.elements)e[t.getAttribute("name")]=t;for(const i of Object.keys(e))t[i]=this.getFormElementValue(i);return t}extrapolateErrors(t){return t}async presubmit(t){}async response(t,e,i){}async incomingData(t,e){}async dataLoaded(t,e){}_disableElements(t){this.__disabled=new WeakMap;for(const e of t)e.disabled||e.hasAttribute("disabled")||(e.setAttribute("disabled",!0),e.disabled=!0,this.__disabled.set(e,!0))}_enableElements(t){this.__disabled=this.__disabled||new WeakMap;for(const e of t)this.__disabled.has(e)&&(e.removeAttribute("disabled"),e.disabled=!1,this.__disabled.delete(e))}_fetchEl(t){if(t){let e;e=t;let i=!1;for(;e.parentElement;)if(e=e.parentElement,"EE-NETWORK"===e.tagName||e.classList.contains("network")){i=!0;break}return i?e:window}if(this.fetchingElement)return"string"==typeof this.fetchingElement?this.querySelector(`#${this.fetchingElement}`):this.fetchingElement;{let t=this.querySelector("ee-network");return t||(t=this.querySelector(".network")),t||window}}async _wait(t){return new Promise((e=>{setTimeout(e,t)}))}async submit(t){if(t){if(this.clearAllCustomValidity([t]),this.submitObject=this.createSubmitObject([t]),"function"==typeof t.reportValidity&&!t.reportValidity())return}else if(this.clearAllCustomValidity(this.elements),this.submitObject=this.createSubmitObject(this.elements),!this.reportValidity())return;const e=new CustomEvent("submit",{cancelable:!0,bubbles:!0,composed:!0});if(this.dispatchEvent(e),e.defaultPrevented)return;const i=t||this;if(this.inFlightMap.has(i))return void this.inFlightMap.set(i,{attempted:!0});this.inFlightMap.set(i,{attempted:!1});let s=this.getAttribute("method");s&&"PUT"!==s.toUpperCase()&&(s="POST");const r=null===s?this.recordId?"PUT":"POST":s,o=this.getAttribute("action");if(!o)throw new Error("The submitted form has no action URL set");const a={url:o+(this.recordId?`/${this.recordId}`:""),method:r,headers:{"Content-Type":this.getAttribute("enctype")||"application/json"},redirect:"follow",body:this.submitObject};if(await this.presubmit(a),t||this._disableElements(this.elements),"multipart/form-data"===a.headers["Content-Type"]){delete a.headers["Content-Type"];const t=a.body,e=new FormData;for(const i in t)if(t[i]instanceof HTMLElement){const s=t[i].files;for(const t of s)e.append(i,t)}else void 0===t[i]||null===t[i]?e.append(i,""):e.append(i,t[i]);a.body=e}let n,l,d=!1;const h="application/json"===a.headers["Content-Type"]&&"object"==typeof a.body&&null!==a.body?JSON.stringify(a.body):a.body;try{const e={...a,body:h},i=this._fetchEl(t);n=await i.fetch(a.url,e)}catch(t){console.log("ERROR!",t),d=!0}if(d){console.log("Network error!"),t||(this._enableElements(this.elements),await this._wait(0));const e=new CustomEvent("form-error",{detail:{type:"network"},bubbles:!0,composed:!0});this.dispatchEvent(e),await this.response(null,null,a)}else if(n.ok){const e=await n.json();let s;if(this.inFlightMap.has(i)&&(s=this.inFlightMap.get(i).attempted),await this.incomingData(e,"submit"),this.setFormAfterSubmit&&!s)if(t){const t=i.name;this.setFormElementValues({[t]:e[t]})}else this.setFormElementValues(e);t||(this._enableElements(this.elements),await this._wait(0)),!this.resetFormAfterSubmit||s||t||this.reset(),await this.dataLoaded(e,"submit");const r=new CustomEvent("form-ok",{detail:{response:n},bubbles:!0,composed:!0});this.dispatchEvent(r),await this.response(n,e,a)}else{let e;try{e=await n.json()}catch(t){e={}}l=this.extrapolateErrors(e)||{};const i=new CustomEvent("form-error",{detail:{type:"http",response:n,errs:l},bubbles:!0,composed:!0});if(this.dispatchEvent(i),t||(this._enableElements(this.elements),await this._wait(0)),l.errors&&l.errors.length){const t={};for(const e of this.elements)t[e.getAttribute("name")]=e;for(const e of l.errors){const i=t[e.field];i&&i.setCustomValidity&&(i.setCustomValidity(e.message),i.reportValidity())}}await this.response(n,l,a)}if(this.inFlightMap.has(i)){const e=this.inFlightMap.get(i).attempted;this.inFlightMap.delete(i),e&&this.submit(t)}}async updated(t){if(await super.updated(),!this.noAutoload&&t.has("recordId")&&void 0!==this.recordId&&null!==this.recordId)return this.preloadData()}async preloadData(){const t=this.getAttribute("action");let e;if(t){let i;await this.updateComplete,this._disableElements(this.elements);try{const s=this._fetchEl();e=await s.fetch(t+"/"+this.recordId),i=await e.json()}catch(t){console.error("WARNING: Fetching element failed to fetch"),i={}}await this.incomingData(i,"autoload"),this.setFormElementValues(i),this._enableElements(this.elements),await this._wait(0),this.validateOnLoad&&this.reportValidity(),await this.dataLoaded(i,"autoload")}}render(){return I`
      <slot></slot>
    `}}t.register("ee-form",Nt);class zt extends(ut(pt(tt(Z(ct(ht(J))))))){static get styles(){return[super.styles,a`
        :host {
          display: flex;
          height: 30px;
        }

        #native {
          margin: auto 20px;
        }
      `]}static get properties(){return{shownValue:{type:String,attribute:!1}}}firstUpdated(){super.firstUpdated(),this.shownValue=this.shadowRoot.querySelector("#native").value}render(){return I`
      <slot @slotchange="${this.slotChanged}" id="range-amount-before" name="range-amount-before"></slot>
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input @change=${this.updateShownValue} type="range" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot @slotchange="${this.slotChanged}" id="range-amount-after" name="range-amount-after"></slot>
    `}_updateSpanInSlot(t,e){if(t){const i=t.assignedElements()[0];if(i){const t=i.querySelector("span#range-amount");t&&(t.innerHTML=Number(e))}}}updateShownValue(t){let e;this.shownValue=t.srcElement.value,e=this.shadowRoot.querySelector("slot#range-amount-before"),this._updateSpanInSlot(e,this.shownValue),e=this.shadowRoot.querySelector("slot#range-amount-after"),this._updateSpanInSlot(e,this.shownValue)}slotChanged(t){this._updateSpanInSlot(t.srcElement,this.shownValue)}}t.register("ee-input-range",zt);class jt extends(ut(pt(tt(ht(J))))){get skipAttributes(){return[...super.skipAttributes,"form"]}get reflectProperties(){return[...super.reflectProperties,...ot]}static get styles(){return[super.styles||[],a`
      /*  This is necessary as a workaround to this chrome bug:
      /   https://bugs.chromium.org/p/chromium/issues/detail?id=1061240&can=2&q=status%3Aunconfirmed&colspec=ID%20Stars%20Area%20Feature%20Status%20Summary%20Modified%20OS&sort=-id 
      */
        :host([disabled]) {
          pointer-events: none;
        }
      `]}render(){return I`
      <button @click="${this._clicked}" id="native">
        <slot></slot>
      </button>
    `}_clicked(t){"submit"===this.getAttribute("type")&&(this.form.requestSubmit?this.form.requestSubmit():this.form.submit())}}t.register("nn-button",jt);class Dt extends(ut(pt(ct(ht(J))))){render(){return I`
      <input type="button" id="native">
        <slot></slot>
     `}constructor(){super()}}t.register("nn-input-button",Dt);class Bt extends(ut(pt(tt(Z(ct(ht(J))))))){render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="${this.inputType||"text"}" id="native" real-time-event="input" >
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot id="datalist-slot" name="datalist"></slot>
    `}constructor(){super(),this._boundKeyEventListener=this._eventListener.bind(this)}static get properties(){return{submitOnEnter:{type:Boolean,attribute:"submit-on-enter"}}}_eventListener(t){this.form&&13===t.keyCode&&(1===this.form.elements.length||this.submitOnEnter)&&this.form.submit()}afterSettingProperty(t,e){super.afterSettingProperty(t,e),"value"===t&&this.internals&&this.internals.setFormValue(this.value)}firstUpdated(){super.firstUpdated(),this.addEventListener("keydown",this._boundKeyEventListener);const t=this.shadowRoot.querySelector("#datalist-slot"),e=t&&t.assignedElements()[0],i=e&&e.children;if(i&&i.length){const t=document.createElement("datalist");t.setAttribute("id","_datalist"),this.setAttribute("list","_datalist");for(const e of i){const i=document.createElement("option");i.setAttribute("value",e.getAttribute("value")),t.appendChild(i)}this.shadowRoot.appendChild(t)}}}t.register("nn-input-text",Bt);t.register("nn-input-color",class extends Bt{constructor(){super(),this.inputType="color"}});t.register("nn-input-date",class extends Bt{constructor(){super(),this.inputType="date"}});t.register("nn-input-datetime-local",class extends Bt{constructor(){super(),this.inputType="datetime-local"}});t.register("nn-input-email",class extends Bt{constructor(){super(),this.inputType="email"}});class Ut extends(ut(tt(ct(ht(J))))){static get styles(){return[super.styles,a`
        /* From https://zellwk.com/blog/hide-content-accessibly/ */
        [hidden] {
          border: 0;
          clip: rect(0 0 0 0);
          height: auto; /* new - was 1px */
          margin: 0; /* new - was -1px */
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
          white-space: nowrap; /* 1 */
        }
      `]}static get properties(){return{hideNative:{type:Boolean},fileName:{type:String},manyFilesText:{type:String,attribute:"many-files-text"},title:{type:String}}}constructor(){super(),this.manyFilesText="Multiple",this.title="",this.toggleAttribute("as-file",!0)}render(){return I`
      <input type="file" id="native" @change="${this.fileNameChanged}" ?hidden=${this.hideNative} title=${this.title}>
      ${this.fileName}
    `}fileNameChanged(t){const e=this.shadowRoot.querySelector("#native"),i=e.value;e.files.length>1?(this.fileName=this.manyFilesText+` (${e.files.length})`,this.title=Array.from(e.files).map((t=>t.name)).join("\n")):1===e.files.length?(this.fileName=i.slice(i.lastIndexOf("\\")+1),this.title=this.fileName):(this.fileName="",this.title="")}}t.register("nn-input-file",Ut);t.register("nn-input-month",class extends Bt{constructor(){super(),this.inputType="month"}});t.register("nn-input-number",class extends Bt{constructor(){super(),this.inputType="number"}});t.register("nn-input-password",class extends Bt{constructor(){super(),this.inputType="password"}});class Ht extends(ut(pt(Z(tt(ct(ht(J))))))){render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input as-radio value-source="checked" @change="${this._excludeOthers}" type="radio" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}firstUpdated(){super.firstUpdated(),this.setAttribute("type","radio")}_excludeOthers(t){const e=[...this.form.children].filter((t=>t!==this&&!!t.form&&t.getAttribute("name")&&t.getAttribute("name")===this.getAttribute("name")&&("radio"===t.getAttribute("type")||null!==t.getAttribute("as-radio"))));for(const t of e){const e=t.getAttribute("value-source")||"checked";t[e]=!1}this.internals&&this.internals.setFormValue(this.checked?this.value:null)}}t.register("nn-input-radio",Ht);t.register("nn-input-range",class extends Bt{constructor(){super(),this.inputType="range"}});t.register("nn-input-search",class extends Bt{constructor(){super(),this.type="search"}});class qt extends(ut(pt(ct(ht(J))))){render(){return I`
      <input @click="${this._formSubmit}" type="submit" id="native">
    `}_formSubmit(t){this.form&&this.form.submit()}}t.register("nn-input-submit",qt);t.register("nn-input-tel",class extends Bt{constructor(){super(),this.type="tel"}});t.register("nn-input-time",class extends Bt{constructor(){super(),this.type="time"}});t.register("nn-input-url",class extends Bt{constructor(){super(),this.type="url"}});t.register("nn-input-week",class extends Bt{constructor(){super(),this.type="week"}});class Wt extends(tt(Z(ht(J)))){get reflectProperties(){return[...super.reflectProperties,...lt]}render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <meter id="native" real-time-event="input"></meter>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}}t.register("nn-meter",Wt);class Kt extends(tt(Z(ht(J)))){static get properties(){return{}}static get styles(){return[a`
      progress {
        display: block; /* default: inline-block */
        width: 100%;
        margin: auto;
        padding: 2px;
        border: 0 none;
        background: #777;
        border-radius: 14px;
        box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);
      }
      progress::-moz-progress-bar {
        border-radius: 12px;
        background: var(--nn-progress-color, #fff);
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3);
        
      }
      /* webkit */
      @media screen and (-webkit-min-device-pixel-ratio:0) {
        progress {
          height: 10px;
        }
      }
      progress::-webkit-progress-bar {
        background: transparent;
      }  
      progress::-webkit-progress-value {  
        border-radius: 12px;
        background: var(--nn-progress-color, #fff);
        box-shadow: inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 5px 0px rgba(0,0,0,0.3); 
      } 
      `]}get reflectProperties(){return[...super.reflectProperties,...dt]}render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <progress id="native" real-time-event="input"></progress>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}}t.register("nn-progress",Kt);class Xt extends(ut(pt(Z(ct(ht(J)))))){get reflectProperties(){return[...super.reflectProperties,...at]}render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div style="display: none">
        <slot id="slot" @slotchange="${this.refreshOptions}"></slot>
      </div>
      <select id="native" real-time-event="selected"></select>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}async refreshOptions(t){const e=this.shadowRoot.querySelector("#native"),i=this.shadowRoot.querySelector("#slot");if(!e||!i)return;const s=i.assignedElements();e.innerHTML="";for(const t of s)e.appendChild(t.cloneNode(!0));this.value=this.value}}t.register("nn-select",Xt);class Gt extends(tt(ut(pt(Z(ct(ht(J))))))){get reflectProperties(){return[...super.reflectProperties,...nt]}render(){return I`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <textarea name="" id="native" real-time-event="input"></textarea>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `}}t.register("nn-textarea",Gt),t.defineAll()}();
