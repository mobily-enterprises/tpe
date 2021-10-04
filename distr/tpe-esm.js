class TpeRegistry {

  constructor (){
    this.elements = {};        
    this._definedElementsMap = {};
  }

  register (tagName, cls) {
    this.elements[tagName] = cls;
  }

  defineAll () {
    for (const k in this.elements) {
      this.define(k);
    }
  }
  
  define (elName) {
    if(this._definedElementsMap[elName]){
      throw new Error('You can only tun tpeRegistry.define() once')
    }
    customElements.define(elName, this.elements[elName]);
    this._definedElementsMap[elName] = true;
  }
}

const tpeRegistry = new TpeRegistry();

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,e=Symbol(),n=new Map;class s{constructor(t,n){if(this._$cssResult$=!0,n!==e)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t;}get styleSheet(){let e=n.get(this.cssText);return t&&void 0===e&&(n.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const o=t=>new s("string"==typeof t?t:t+"",e),r=(t,...n)=>{const o=1===t.length?t[0]:n.reduce(((e,n,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[s+1]),t[0]);return new s(o,e)},i=(e,n)=>{t?e.adoptedStyleSheets=n.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):n.forEach((t=>{const n=document.createElement("style"),s=window.litNonce;void 0!==s&&n.setAttribute("nonce",s),n.textContent=t.cssText,e.appendChild(n);}));},S=t?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const n of t.cssRules)e+=n.cssText;return o(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var s$1,e$1;const r$1={toAttribute(t,i){switch(i){case Boolean:t=t?"":null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,i){let s=t;switch(i){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t);}catch(t){s=null;}}return s}},h=(t,i)=>i!==t&&(i==i||t==t),o$1={attribute:!0,type:String,converter:r$1,reflect:!1,hasChanged:h};class n$1 extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o();}static addInitializer(t){var i;null!==(i=this.l)&&void 0!==i||(this.l=[]),this.l.push(t);}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((i,s)=>{const e=this._$Eh(s,i);void 0!==e&&(this._$Eu.set(e,s),t.push(e));})),t}static createProperty(t,i=o$1){if(i.state&&(i.attribute=!1),this.finalize(),this.elementProperties.set(t,i),!i.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e);}}static getPropertyDescriptor(t,i,s){return {get(){return this[i]},set(e){const r=this[t];this[i]=e,this.requestUpdate(t,r,s);},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||o$1}static finalize(){if(this.hasOwnProperty("finalized"))return !1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s]);}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(i){const s=[];if(Array.isArray(i)){const e=new Set(i.flat(1/0).reverse());for(const i of e)s.unshift(S(i));}else void 0!==i&&s.push(S(i));return s}static _$Eh(t,i){const s=i.attribute;return !1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Ep(),this.requestUpdate(),null===(t=this.constructor.l)||void 0===t||t.forEach((t=>t(this)));}addController(t){var i,s;(null!==(i=this._$Em)&&void 0!==i?i:this._$Em=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t));}removeController(t){var i;null===(i=this._$Em)||void 0===i||i.splice(this._$Em.indexOf(t)>>>0,1);}_$Ep(){this.constructor.elementProperties.forEach(((t,i)=>{this.hasOwnProperty(i)&&(this._$Et.set(i,this[i]),delete this[i]);}));}createRenderRoot(){var t;const s=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return i(s,this.constructor.elementStyles),s}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostConnected)||void 0===i?void 0:i.call(t)}));}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostDisconnected)||void 0===i?void 0:i.call(t)}));}attributeChangedCallback(t,i,s){this._$AK(t,s);}_$Eg(t,i,s=o$1){var e,h;const n=this.constructor._$Eh(t,s);if(void 0!==n&&!0===s.reflect){const o=(null!==(h=null===(e=s.converter)||void 0===e?void 0:e.toAttribute)&&void 0!==h?h:r$1.toAttribute)(i,s.type);this._$Ei=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$Ei=null;}}_$AK(t,i){var s,e,h;const o=this.constructor,n=o._$Eu.get(t);if(void 0!==n&&this._$Ei!==n){const t=o.getPropertyOptions(n),l=t.converter,a=null!==(h=null!==(e=null===(s=l)||void 0===s?void 0:s.fromAttribute)&&void 0!==e?e:"function"==typeof l?l:null)&&void 0!==h?h:r$1.fromAttribute;this._$Ei=n,this[n]=a(i,t.type),this._$Ei=null;}}requestUpdate(t,i,s){let e=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||h)(this[t],i)?(this._$AL.has(t)||this._$AL.set(t,i),!0===s.reflect&&this._$Ei!==t&&(void 0===this._$ES&&(this._$ES=new Map),this._$ES.set(t,s))):e=!1),!this.isUpdatePending&&e&&(this._$Ev=this._$EC());}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((t,i)=>this[i]=t)),this._$Et=void 0);let i=!1;const s=this._$AL;try{i=this.shouldUpdate(s),i?(this.willUpdate(s),null===(t=this._$Em)||void 0===t||t.forEach((t=>{var i;return null===(i=t.hostUpdate)||void 0===i?void 0:i.call(t)})),this.update(s)):this._$ET();}catch(t){throw i=!1,this._$ET(),t}i&&this._$AE(s);}willUpdate(t){}_$AE(t){var i;null===(i=this._$Em)||void 0===i||i.forEach((t=>{var i;return null===(i=t.hostUpdated)||void 0===i?void 0:i.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t);}_$ET(){this._$AL=new Map,this.isUpdatePending=!1;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return !0}update(t){void 0!==this._$ES&&(this._$ES.forEach(((t,i)=>this._$Eg(i,this[i],t))),this._$ES=void 0),this._$ET();}updated(t){}firstUpdated(t){}}n$1.finalized=!0,n$1.elementProperties=new Map,n$1.elementStyles=[],n$1.shadowRootOptions={mode:"open"},null===(s$1=globalThis.reactiveElementPolyfillSupport)||void 0===s$1||s$1.call(globalThis,{ReactiveElement:n$1}),(null!==(e$1=globalThis.reactiveElementVersions)&&void 0!==e$1?e$1:globalThis.reactiveElementVersions=[]).push("1.0.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1,i$1;const s$2=globalThis.trustedTypes,e$2=s$2?s$2.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$2=`lit$${(Math.random()+"").slice(9)}$`,n$2="?"+o$2,l=`<${n$2}>`,h$1=document,r$2=(t="")=>h$1.createComment(t),d=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,v=t=>{var i;return u(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},c=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a=/-->/g,f=/>/g,_=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,g=/'/g,m=/"/g,$=/^(?:script|style|textarea)$/i,p=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),y=p(1),T=Symbol.for("lit-noChange"),x=Symbol.for("lit-nothing"),w=new WeakMap,A=(t,i,s)=>{var e,o;const n=null!==(e=null==s?void 0:s.renderBefore)&&void 0!==e?e:i;let l=n._$litPart$;if(void 0===l){const t=null!==(o=null==s?void 0:s.renderBefore)&&void 0!==o?o:null;n._$litPart$=l=new S$1(i.insertBefore(r$2(),t),t,void 0,null!=s?s:{});}return l._$AI(t),l},C=h$1.createTreeWalker(h$1,129,null,!1),P=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=c;for(let i=0;i<s;i++){const s=t[i];let e,u,v=-1,p=0;for(;p<s.length&&(d.lastIndex=p,u=d.exec(s),null!==u);)p=d.lastIndex,d===c?"!--"===u[1]?d=a:void 0!==u[1]?d=f:void 0!==u[2]?($.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_):void 0!==u[3]&&(d=_):d===_?">"===u[0]?(d=null!=h?h:c,v=-1):void 0===u[1]?v=-2:(v=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_:'"'===u[3]?m:g):d===m||d===g?d=_:d===a||d===f?d=c:(d=_,h=void 0);const y=d===_&&t[i+1].startsWith("/>")?" ":"";r+=d===c?s+l:v>=0?(n.push(e),s.slice(0,v)+"$lit$"+s.slice(v)+o$2+y):s+o$2+(-2===v?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==e$2?e$2.createHTML(u):u,n]};class V{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,v=this.parts,[c,a]=P(t,i);if(this.el=V.createElement(c,e),C.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=C.nextNode())&&v.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$2)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$2),i=/([.?@])?(.*)/.exec(s);v.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?k:"?"===i[1]?H:"@"===i[1]?I:M});}else v.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($.test(l.tagName)){const t=l.textContent.split(o$2),i=t.length-1;if(i>0){l.textContent=s$2?s$2.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r$2()),C.nextNode(),v.push({type:2,index:++h});l.append(t[i],r$2());}}}else if(8===l.nodeType)if(l.data===n$2)v.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$2,t+1));)v.push({type:7,index:h}),t+=o$2.length-1;}h++;}}static createElement(t,i){const s=h$1.createElement("template");return s.innerHTML=t,s}}function E(t,i,s=t,e){var o,n,l,h;if(i===T)return i;let r=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=d(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=r:s._$Cu=r),void 0!==r&&(i=E(t,r._$AS(t,i.values),r,e)),i}class N{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h$1).importNode(s,!0);C.currentNode=o;let n=C.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new S$1(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L(n,this,t)),this.v.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=C.nextNode(),l++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class S$1{constructor(t,i,s,e){var o;this.type=2,this._$AH=x,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=E(this,t,i),d(t)?t===x||null==t||""===t?(this._$AH!==x&&this._$AR(),this._$AH=x):t!==this._$AH&&t!==T&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):v(t)?this.M(t):this.$(t);}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t));}$(t){this._$AH!==x&&d(this._$AH)?this._$AA.nextSibling.data=t:this.S(h$1.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=V.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new N(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t;}}_$AC(t){let i=w.get(t.strings);return void 0===i&&w.set(t.strings,i=new V(t)),i}M(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new S$1(this.A(r$2()),this.A(r$2()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class M{constructor(t,i,s,e,o){this.type=1,this._$AH=x,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=x;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=E(this,t,i,0),n=!d(t)||t!==this._$AH&&t!==T,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=E(this,e[s+l],i,l),h===T&&(h=this._$AH[l]),n||(n=!d(h)||h!==this._$AH[l]),h===x?t=x:t!==x&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.k(t);}k(t){t===x?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class k extends M{constructor(){super(...arguments),this.type=3;}k(t){this.element[this.name]=t===x?void 0:t;}}class H extends M{constructor(){super(...arguments),this.type=4;}k(t){t&&t!==x?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class I extends M{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=E(this,t,i,0))&&void 0!==s?s:x)===T)return;const e=this._$AH,o=t===x&&e!==x||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==x&&(e===x||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t);}}null===(t$1=globalThis.litHtmlPolyfillSupport)||void 0===t$1||t$1.call(globalThis,V,S$1),(null!==(i$1=globalThis.litHtmlVersions)&&void 0!==i$1?i$1:globalThis.litHtmlVersions=[]).push("2.0.0");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l$1,o$3,r$3;class n$3 extends n$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0;}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=A(i,this.renderRoot,this.renderOptions);}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!0);}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Dt)||void 0===t||t.setConnected(!1);}render(){return T}}n$3.finalized=!0,n$3._$litElement$=!0,null===(l$1=globalThis.litElementHydrateSupport)||void 0===l$1||l$1.call(globalThis,{LitElement:n$3}),null===(o$3=globalThis.litElementPolyfillSupport)||void 0===o$3||o$3.call(globalThis,{LitElement:n$3});(null!==(r$3=globalThis.litElementVersions)&&void 0!==r$3?r$3:globalThis.litElementVersions=[]).push("3.0.0");

// LabelsMixin

const LabelsMixin = (base) => {
  return class Base extends base {
// In the scoped CSS, the label content is set to keep the correct alignment and avoid overflowing text.
    static get styles () {
      return [
        super.styles || [],
        r`             
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

        `
      ]
    }

// The **label** property takes a string which is shown as the label.
// The **labelPosition** property is set with attribute label-position, used to determine if <label>
// will be rendered before or after the native input element
    static get properties () {
      return {
        label: { type: String },
        labelPosition: {
          type: String,
          attribute: 'label-position'
        }
      }
    }

    constructor () {
      super();
      // Label position is set to `before` by default
      this.labelPosition = 'before';
    }

    // This getter return the label template
    get labelTemplate () {
      return y`
        <label id="label" for="native">
          <div id="label-text">${this.label}</div>
          <slot id="label-slot" name="label"></slot>
        </label>
      `
    }

    // Note that the mixin wouldn't be able to modify the mixed in element's **render** method to include the label in the right position,
    // so _LabelsMixin_ provides the two getters below, that will only return the **labelTemplate** value if **labelPosition** is the correct value.
    // This can be use the mixed in element's render method
    get ifLabelBefore () {
      return (this.labelPosition === 'before') ? this.labelTemplate : ''
    }

    get ifLabelAfter () {
      return (this.labelPosition === 'after') ? this.labelTemplate : ''
    }
  }
};

const SyntheticValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validity: {
          type: Object,
          attribute: false
        },
        validator: { type: Object }
      }
    }

    constructor () {
      super();
      this.shownValidationMessage = '';
      this.validator = () => '';
      this.validationMessagePosition = 'before';
      this.validity = { valid: true, _customValidationMessage: '' };
    }

    setCustomValidity (m) {
      if (m === '') {
        this.validity = {
          valid: true,
          _customValidationMessage: ''
        };
        this.toggleAttribute('valid', true);
        if (m === '') this.shownValidationMessage = '';
      } else {
        this.validity = {
          valid: false,
          customError: true,
          _customValidationMessage: m
        };
        this.toggleAttribute('valid', false);
      }
    }

    reportValidity () {
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.validity.customError) {
        const ownErrorMessage = this._runValidator();
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
      }

      // Hide the error message by default
      this.shownValidationMessage = '';

      if (!this.validity.valid) {
        this.toggleAttribute('valid', false);
        this.shownValidationMessage = this.validity._customValidationMessage;
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }));
        return false
      } else {
        this.toggleAttribute('valid', true);
        return true
      }
    }

    _runValidator () {
      // Call the validator with a value. Here an element could be a checkbox,
      // a select, an simple text input, etc.
      // If the containing form has _getElementValueSource, that is used to
      // figure out what to pass to the validato (as well as _submitObject)
      let value;
      let submitObject;
      if (this.form && this.form._getElementValueSource) {
        value = this[this.form._getElementValueSource(this)];
        submitObject = this.form.submitObject;
      }
      const ownErrorMessage = this.validator(value, submitObject);
      if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
    }

    checkValidity () {
      if (!this.validity.customError) {
        const ownErrorMessage = this._runValidator();
        if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
      }

      if (!this.validity.valid) {
        this.dispatchEvent(new CustomEvent('invalid', {
          cancelable: true,
          bubbles: false,
          composed: true
        }));
        return false
      }
      return true
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    get validationMessageTemplate () {
      return y`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }
  }
};

// StyleableMixin
// ==============
//
// This mixin adds the capability to use common _<style>_ tags. Our goal is to
// reduce friction for anyone not used to custom elements, shadow DOM and
// prefers to create and style their projects using plain HTML markup.
//
// Usage is simple. Any TPE elements accepts plain CSS code added as <style
// slot="style"></style>, nested in the elements markup, like so:
//
// ```
// <nn-input-text>
//   <style slot="style">
//    #native {
//      color: blue;
//    }
//   </style>
// </nn-input-text>
// ```
//
// That allows developers to pierce the shadow DOM and override all of the
// elements styles using familiar syntax.
//

const StyleableMixin = (base) => {
  return class Base extends base {
    static get styles () {
      return []
    }

    firstUpdated () {
      super.firstUpdated();

      // Add the equivalent of
      // <slot name="style" id="style-slot"></slot>
      // To the shadow DOM
      const styleSlot = document.createElement('slot');
      styleSlot.setAttribute('name', 'style');
      styleSlot.setAttribute('id', 'style-slot');
      this.shadowRoot.appendChild(styleSlot);

      // If an element has one or more <any-tag slot="style"> in its
      // light DOM, the newly added styleSlot will have
      // them  as an assigned element.
      // Clone over all of the ones where any-tag is `style`.
      // So, any <style slot="style"> will be cloned over
      for (const styleElement of styleSlot.assignedElements()) {
        if (styleElement.tagName === 'STYLE') {
          this.shadowRoot.appendChild(styleElement);
        }
      }
    }
  }
};

class EeAutocompleteInputSpans extends SyntheticValidatorMixin(StyleableMixin(LabelsMixin(n$3))) {
  static get properties () {
    return {
      name: {
        type: String
      },
      valueAs: {
        type: String,
        attribute: 'value-as'
      },
      valueSeparator: {
        type: String,
        attribute: 'value-separator'
      },
      clearOnSetValue: {
        type: Boolean,
        attribute: 'clear-on-set-value'
      }
    }
  }

  constructor () {
    super();
    this.labelForElement = 'ni';
    this.valueAs = 'text'; // can be text, ids, json
    this.removeIcon = '<svg class="icon" height="15" viewBox="0 0 24 24" width="15"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>';
    this.itemElement = '';
    this.itemElementConfig = {};
    this.itemElementAttributes = {};
    this.valueSeparator = ',';
  }

  static get styles () {
    return [
      super.styles,
      r`

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
      `
    ]
  }

  render () {
    
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div id="list" @click="${this._listClicked}">
        <input @keydown="${this._handleKeyEvents}" rows="1" id="ta" spellcheck="false" autocomplete="off" autocapitalize="off" autocorrect="off" dir="ltr" role="combobox" aria-autocomplete="list"/>
      </div>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <input id="ni" type="hidden" name="${this.name}">
    `
  }

  connectedCallback () {
    super.connectedCallback();
    this.addEventListener('click', this.focus);
  }

  disconnectedCallback () {
    super.connectedCallback();
    this.removeEventListener('click', this.focus);
  }

  firstUpdated () {
    if (this._tempValue) {
      this.value = this._tempValue;
    }
    this._updateNativeInputValue();
  }

  focus () {
    this.shadowRoot.querySelector('#ta').focus();
  }

  _listClicked (e) {
    e.stopPropagation();
  }

  get value () {
    let r;
    let list;
    switch (this.valueAs) {
    case 'json':
      r = {};
      list = this.shadowRoot.querySelector('#list');
      for (const span of list.children) {
        if (span.id === 'ta') continue
        const idValue = span.firstChild.idValue;
        r[idValue] = span.firstChild.data;
      }
      return r
    default:
      r = [];
      list = this.shadowRoot.querySelector('#list');
      for (const span of list.children) {
        if (span.id === 'ta') continue
        if (this.valueAs === 'text') {
          // Won't push invalid spans to the final value
          if (span.getAttribute('invalid') === null) r.push(span.firstChild.textValue);
        } else {
          r.push(span.firstChild.idValue);
        }
      }
      return r.join(this.valueSeparator)
    }
  }

  set value (v) {
    const list = this.shadowRoot.querySelector('#list');

    if (!list) {
      this._tempValue = v;
      return
    }
    // Remove all children
    while ((this.clearOnSetValue || v === '' || v === null || v === undefined) && list.firstChild) {
      if (list.firstChild.id === 'ta') break
      list.removeChild(list.firstChild);
    }

    // Assign all children using pickedElement
    if (Array.isArray(v)) {
      for (const o of v) {
        this.pickedElement(o, false, true);
      }
    } else if (typeof v === 'object' && v !== null) {
      for (const k of Object.keys(v)) {
        const $o = v[k];
        this.pickedElement($o, false, true);
      }
    } else if (typeof v === 'string' && v !== '') {
      for (const s of v.split(this.valueSeparator)) {
        this.pickedElement(s, false, true);
      }
    }
    this._tempValue = null;
    // Sets the native input
    this._updateNativeInputValue();

    // Rerun validator
    this.setCustomValidity('');
    this.reportValidity();
  }

  get validationMessage () {
    return this.validity._customValidationMessage
  }

  get autocompleteValue () {
    const ta = this.shadowRoot.querySelector('#ta');
    if (ta) return ta.value
    return ''
  }

  /* END OF CONSTRAINTS API */

  // Run this when there are no suggestions and the user hits Tab or Enter in #ta
  // This will run pickElement with a STRING, which will get the element to
  // work out a data structure based on the string
  _pickCurrentValue () {
    if (this.valueAs === 'text') {
      this.pickedElement(this.shadowRoot.querySelector('#ta').value, true);
    }
  }

  _askToRemove (e) {
    const target = e.currentTarget;
    this._removeItem(target.parentElement);
  }

  _updateNativeInputValue () {
    const ni = this.shadowRoot.querySelector('#ni');
    ni.value = this.value;
  }

  _removeItem (target, which = 'previous') {
    // Focus previous item before deleting target. If it's the first/only, select the input
    const previous = target.previousElementSibling || target.nextElementSibling;
    previous.focus();
    target.remove();
    this._updateNativeInputValue();
    // Rerun validator
    this.setCustomValidity('');
    this.reportValidity();
  }

  _createRemoveBtn () {
    const el = document.createElement('button');
    el.innerHTML = this.removeIcon;
    el.onclick = this._askToRemove.bind(this);
    el.classList.add('remove');
    return el
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget;

    switch (e.key) {
    case 'ArrowLeft':
      if (target.previousElementSibling) {
        e.preventDefault();
        target.previousElementSibling.focus();
      }
      break

    case 'ArrowRight':
      if (target.id !== 'ta') {
        e.preventDefault();
        target.nextElementSibling
          ? target.nextElementSibling.focus()
          : target.parentElement.firstElementChild.focus();
      }
      break

    case 'ArrowDown':
      if (this.parentElement.suggestions.length) {
        e.preventDefault();
        this.parentElement.focusNext();
      }
      break
    case 'Backspace':
    case 'Delete':
      if (target.id === 'ta' && target.parentElement.children.length > 1 && !target.value) {
        this._removeItem(target.previousElementSibling);
      } else if (target.id !== 'ta') {
        this._removeItem(target);
      }
      break
    case 'Tab':
    case 'Enter':
      if (!this.autocompleteValue) break
      if (!this.parentElement.suggestions.length) {
        e.preventDefault();
        this._pickCurrentValue();
      } else {
        e.preventDefault();
        this.parentElement.pickFirst();
      }
    }
  }

  /* API */
  get multiInputApi () { return true }

  pickedElement (data, force = false, skipValidation = false) {
    const parentEl = document.createElement(this.itemElement);
    const el = new parentEl.constructor.PickedElement();

    el.config = { ...el.config, ...this.itemElementConfig };
    for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k]);

    // Convert string into data if necessary
    if (typeof data === 'string') {
      if (!data.length) return
      data = parentEl.stringToData(data);
      if (!data.valid) {
        el.toggleAttribute('invalid', true);
        if (!force) return
      }
    }
    el.data = data;

    const list = this.shadowRoot.querySelector('#list');
    const span = document.createElement('span');
    // -1 means that it will not in the list of tabs, but
    // it will be focusable (spans aren't by default)
    span.setAttribute('tabindex', -1);
    const ta = this.shadowRoot.querySelector('#ta');
    const removeBtn = this._createRemoveBtn();

    span.onkeydown = this._handleKeyEvents.bind(this);
    // Span will be not in the list of tabs
    // Necessary since this is a button and it IS
    // in tab list by default
    removeBtn.setAttribute('tabindex', -1);
    span.appendChild(el);
    span.appendChild(removeBtn);

    list.insertBefore(span, ta);
    ta.value = '';

    this._updateNativeInputValue();

    // Rerun validator
    if (!skipValidation) {
      this.setCustomValidity('');
      this.reportValidity();
    }
  }

  setPickedElement (itemElement, itemElementConfig, itemElementAttributes) {
    this.itemElement = itemElement;
    this.itemElementConfig = itemElementConfig;
    this.itemElementAttributes = itemElementAttributes;
  }
}

tpeRegistry.register('ee-autocomplete-input-spans', EeAutocompleteInputSpans);

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
const element = ['accessKey', 'accessKeyLabel', 'contentEditable', 'isContentEditable', 'contextMenu ', 'dataset', 'dir', 'draggable', 'dropzone', 'hidden', 'inert', 'innerText', 'itemScope ', 'itemType', 'itemId ', 'itemRef', 'itemProp', 'itemValue ', 'lang', 'noModule', 'nonce', 'offsetHeight', 'offsetLeft', 'offsetParent', 'offsetTop', 'offsetWidth', 'properties', 'spellcheck', 'tabIndex', 'title', 'translate', 'attachInternals', 'blur', 'click', 'focus', 'forceSpellCheck', 'style'];

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement
const formElement = ['length', 'name', 'method', 'target', 'action', 'encoding', 'enctype', 'acceptCharset', 'autocomplete', 'noValidate', 'requestAutocomplete', 'submit', 'checkValidity', 'reportValidity', 'reset', 'elements'];

// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
const inputElement = ['form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'name', 'type', 'disabled', 'autofocus', 'required', 'value', 'checkValidity', 'validity', 'validationMessage', 'willValidate', 'checked', 'defaultChecked', 'indeterminate', 'alt', 'height', 'src', 'width', 'accept', 'allowdirs ', 'files', 'webkitdirectory ', 'webkitEntries ', 'autocomplete', 'max', 'maxLength', 'min', 'minLength', 'pattern', 'placeholder', 'readOnly', 'size', 'selectionStart', 'selectionEnd', 'selectionDirection', 'defaultValue', 'dirName', 'accessKey', 'list', 'multiple', 'files', 'labels', 'step', 'valueAsDate', 'valueAsNumber', 'autocapitalize ', 'inputmode', 'align ', 'useMap ', 'blur', 'click', 'focus', 'select', 'setSelectionRange', 'setRangeText', 'setCustomValidity', 'reportValidity', 'stepDown', 'stepUp'];

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
const buttonElement = ['accessKey', 'autofocus', 'disabled', 'form', 'formAction', 'formEnctype', 'formMethod', 'formNoValidate', 'formTarget', 'labels', 'menu ', 'name', 'tabIndex', 'type', 'willValidate', 'validationMessage', 'validity', 'value', 'checkValidity', 'reportValidity', 'setCustomValidity'];

// FROM https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement
const selectElement = ['autofocus', 'disabled', 'labels', 'length', 'multiple', 'name', 'options', 'required', 'selectedIndex', 'selectedOptions', 'size', 'type', 'validationMessage', 'validity', 'value', 'willValidate', 'add', 'blur', 'focus', 'item', 'namedItem', 'remove', 'checkValidity', 'reportValidity', 'setCustomValidity', 'form'];

// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
const textareaElement = ['type', 'value', 'textLength', 'defaultValue', 'placeholder', 'rows', 'cols', 'autofocus', 'name', 'disabled', 'labels', 'maxLength', 'accessKey', 'readOnly', 'required', 'tabIndex', 'selectionStart', 'selectionEnd', 'selectionDirection', 'validity', 'willValidate', 'validationMessage', 'autocomplete ', 'autocapitalize ', 'inputMode ', 'wrap', 'blur', 'focus', 'select', 'setRangeText', 'setSelectionRange', 'checkValidity', 'reportValidity', 'setCustomValidity', 'form'];

// From https://developer.mozilla.org/en-US/docs/Web/API/HTMLMeterElement
const meterElement = ['high', 'low', 'max', 'min', 'optimum', 'value', 'labels'];

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLProgressElement
const progressElement = ['max', 'position', 'value', 'labels'];

// NativeReflectorMixin

const NativeReflectorMixin = (base) => {
  return class Base extends base { // eslint-disable-line

// The firstUpdated method is used to perform one-time work after the element's
// template has been created. In this case, it will need to:
//
// 1) Find the native element (marked with `id="native"`)
// 3) Start reflection of attributes and properties
//
    firstUpdated () {
      /* Find the native element */
      this.native = this.shadowRoot.querySelector('#native');

      /* Reflect all attributes and properties */
      /*  - all properties are reflected except some (listed in skipAttributes) */
      /*  - only elected properties are reflected (listed in reflectProperties) */
      this._reflectAttributesAndProperties();
    }

    get reflectProperties () {
      return element
    }

    get skipProperties () {
      return ['style']
    }

    get skipAttributes () {
      return ['id', 'style', 'class']
    }

    afterSettingProperty () {}

    getAttribute (attr) {
      if (!this.native || this.skipAttributes.indexOf(attr) !== -1) {
        return super.getAttribute(attr)
      }

      return this.native.getAttribute(attr)

      /*
      const nativeAttribute = this.native.getAttribute(attr)
      if (nativeAttribute !== null) return nativeAttribute

      // This shouldn't really happen, but it's here as a fallback
      // TODO: Maybe delete it and always return the native's value regardless
      return super.getAttribute(attr)
      */
    }

    setAttribute (attr, value) {
      // Set the attribute
      super.setAttribute(attr, value);

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, value);
    }

    removeAttribute (attr) {
      // Set the attribute
      super.removeAttribute(attr);

      // Skip the ones in the skipAttributes list
      if (this.skipAttributes.indexOf(attr) !== -1) return

      // Assign the same attribute to the contained native
      // element, taking care of the 'nn' syntax
      //
      this._setSubAttr(attr, null);
    }

    _setSubAttr (subAttr, attrValue) {
      const tokens = subAttr.split('::');

      // Safeguard: if this.native is not yet set, it means that
      // an attribute was set BEFORE the element was rendered. If that
      // is the case, simply give up. _reflectAttributesAndProperties() will
      // be run afterwards to sync things up anyway
      if (!this.native) return

      // No :: found, simply change attribute in `native`
      if (tokens.length === 1) {
        (attrValue === null)
          ? this.native.removeAttribute(subAttr)
          : this.native.setAttribute(subAttr, attrValue);

      // Yes, :: is there: assign the attribute to the element with the
      // corresponding ID
      } else if (tokens.length === 2) {
        const dstElement = this.shadowRoot.querySelector(`#${tokens[0]}`);
        if (dstElement) {
          attrValue === null
            ? dstElement.removeAttribute(tokens[1])
            : dstElement.setAttribute(tokens[1], attrValue);
        }
      }
    }

    _reflectAttributesAndProperties () {
      // STEP #1: ATTRIBUTES FIRST

      // Assign all starting attribute to the destination element
      for (const attributeObject of this.attributes) {
        const attr = attributeObject.name;

        if (this.skipAttributes.indexOf(attr) !== -1) continue
        this._setSubAttr(attr, super.getAttribute(attr));
      }

      // Observe changes in attribute from the source element, and reflect
      // them to the destination element
      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes') {
            const attr = mutation.attributeName;

            // Don't reflect forbidden attributes
            if (this.skipAttributes.indexOf(attr) !== -1) return

            // Don't reflect attributes with ::
            if (attr.indexOf('::') !== -1) return

            // Check if the value has changed. If it hasn't, there is no
            // point in re-assigning it, especially since the observer
            // might have been triggered by this very mixin
            const newValue = this.native.getAttribute(attr);
            const thisValue = super.getAttribute(attr);
            if (newValue === thisValue) return

            // Assign the new value
            (newValue === null)
              ? super.removeAttribute(attr)
              : super.setAttribute(attr, newValue);
          }
        });
      });
      thisObserver.observe(this.native, { attributes: true });

      // STEP #2: METHODS (as bound functions) AND PROPERTIES (as getters/setters)

      const uniqProps = [...new Set(this.reflectProperties)];
      const proto = Object.getPrototypeOf(this);

      if (!proto._alreadyReflecting) {
        uniqProps.forEach(prop => {
          if (this.skipProperties.indexOf(prop) !== -1) return
          Object.defineProperty(Object.getPrototypeOf(this), prop, {
            get: function () {
              const dst = this.native;
              if (!this.native) return undefined
              if (typeof dst[prop] === 'function') return dst[prop].bind(dst)
              else return dst[prop]
            },
            set: function (newValue) {
              const dst = this.native;

              // It IS possile that this.native isn't set yet, since the
              // property observer is on the prototype. So, you could have
              // one nn-input-box without a value assigned (and the observer is
              // installed for prototype) and then another one with a property
              // assigned at creation (observer is set, but this.native is not yet set)
              // If that is the case, it will assign the object's prop. Then,
              // when firstUpdated() runs, it will forward-assign this value to
              // this.native
              if (!dst) {
                if (typeof newValue !== 'undefined') {
                  Object.defineProperty(this, prop, { value: newValue, configurable: true, writable: true });
                }
                return
              }

              if (typeof this.beforeSettingProperty === 'function') {
                this.beforeSettingProperty(prop, newValue);
              }
              if (typeof dst[prop] === 'function') return
              const oldValue = dst[prop];

              // Set the new value
              dst[prop] = newValue;

              // This is required by litElement since it won't
              // create a setter if there is already one
              this.requestUpdate(prop, oldValue);

              if (typeof this.afterSettingProperty === 'function') {
                this.afterSettingProperty(prop, newValue);
              }
            },
            configurable: true,
            enumerable: true
          });
        });
        proto._alreadyReflecting = true;
      }

      // Assign existing properties, in case the setter had already been triggered
      // BEFORE firstUpdated() (in which case, the setter would have assigned
      // OBJECT properties, without reflection)
      uniqProps.forEach(prop => {
        if (this.skipProperties.indexOf(prop) !== -1) return

        let propValue;
        if (Object.prototype.hasOwnProperty.call(this, prop)) {
          propValue = this[prop];
          delete this[prop];
          this[prop] = propValue;
        }
      });
    }
  }
};

const InputMixin = (base) => {
  return class Base extends base {
    get skipAttributes () {
      return [...super.skipAttributes, 'type']
    }

    get reflectProperties () {
      return [...super.reflectProperties, ...inputElement]
    }
  }
};

(function () {

    const refMap = new WeakMap();
    const validityMap = new WeakMap();
    const hiddenInputMap = new WeakMap();
    const internalsMap = new WeakMap();
    const validationMessageMap = new WeakMap();
    const formsMap = new WeakMap();
    const shadowHostsMap = new WeakMap();
    const formElementsMap = new WeakMap();
    const refValueMap = new WeakMap();
    const upgradeMap = new WeakMap();
    const shadowRootMap = new WeakMap();
    const validationAnchorMap = new WeakMap();
    const documentFragmentMap = new WeakMap();
    const onSubmitMap = new WeakMap();

    const observerConfig$1 = { attributes: true, attributeFilter: ['disabled'] };
    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            const target = mutation.target;
            if (target.constructor['formAssociated']) {
                const isDisabled = target.hasAttribute('disabled');
                target.toggleAttribute('internals-disabled', isDisabled);
                if (target.formDisabledCallback) {
                    target.formDisabledCallback.apply(target, [target.hasAttribute('disabled')]);
                }
            }
        }
    });
    const removeHiddenInputs = (internals) => {
        const hiddenInputs = hiddenInputMap.get(internals);
        hiddenInputs.forEach(hiddenInput => {
            hiddenInput.remove();
        });
        hiddenInputMap.set(internals, []);
    };
    const createHiddenInput = (ref, internals) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = ref.getAttribute('name');
        ref.after(input);
        hiddenInputMap.get(internals).push(input);
        return input;
    };
    const initRef = (ref, internals) => {
        hiddenInputMap.set(internals, []);
        const isDisabled = ref.hasAttribute('disabled');
        ref.toggleAttribute('internals-disabled', isDisabled);
        observer.observe(ref, observerConfig$1);
    };
    const initLabels = (ref, labels) => {
        if (labels.length) {
            Array.from(labels).forEach(label => label.addEventListener('click', ref.focus.bind(ref)));
            let firstLabelId = labels[0].id;
            if (!labels[0].id) {
                firstLabelId = `${labels[0].htmlFor}_Label`;
                labels[0].id = firstLabelId;
            }
            ref.setAttribute('aria-labelledby', firstLabelId);
        }
    };
    const formSubmitCallback = (event) => {
        const form = event.target;
        const elements = formElementsMap.get(form);
        if (elements.size) {
            const nodes = Array.from(elements);
            const validityList = nodes
                .reverse()
                .map(node => {
                const internals = internalsMap.get(node);
                return internals.reportValidity();
            });
            if (validityList.includes(false)) {
                event.stopImmediatePropagation();
                event.stopPropagation();
                event.preventDefault();
            }
            else if (onSubmitMap.get(form)) {
                const callback = onSubmitMap.get(form);
                const canceled = callback.call(form, event);
                if (canceled === false) {
                    event.preventDefault();
                }
            }
        }
    };
    const formResetCallback = (event) => {
        const elements = formElementsMap.get(event.target);
        if (elements && elements.size) {
            elements.forEach(element => {
                if (element.constructor.formAssociated && element.formResetCallback) {
                    element.formResetCallback.apply(element);
                }
            });
        }
    };
    const initForm = (ref, form, internals) => {
        if (form) {
            if (form.onsubmit) {
                onSubmitMap.set(form, form.onsubmit.bind(form));
                form.onsubmit = null;
            }
            const formElements = formElementsMap.get(form);
            if (formElements) {
                formElements.add(ref);
            }
            else {
                const initSet = new Set();
                initSet.add(ref);
                formElementsMap.set(form, initSet);
                form.addEventListener('submit', formSubmitCallback);
                form.addEventListener('reset', formResetCallback);
            }
            formsMap.set(form, { ref, internals });
            if (ref.constructor['formAssociated'] && ref.formAssociatedCallback) {
                setTimeout(() => {
                    ref.formAssociatedCallback.apply(ref, [form]);
                }, 0);
            }
        }
    };
    const findParentForm = (elem) => {
        let parent = elem.parentNode;
        if (parent && parent.tagName !== 'FORM') {
            parent = findParentForm(parent);
        }
        else if (!parent && elem.toString() === '[object ShadowRoot]') {
            parent = findParentForm(elem.host);
        }
        return parent;
    };
    const throwIfNotFormAssociated = (ref, message, ErrorType = DOMException) => {
        if (!ref.constructor['formAssociated']) {
            throw new ErrorType(message);
        }
    };
    const overrideFormMethod = (form, returnValue, method) => {
        const elements = formElementsMap.get(form);
        if (elements && elements.size) {
            elements.forEach(element => {
                const internals = internalsMap.get(element);
                const valid = internals[method]();
                if (!valid) {
                    returnValue = false;
                }
            });
        }
        return returnValue;
    };
    const upgradeInternals = (ref) => {
        if (ref.constructor['formAssociated']) {
            const internals = internalsMap.get(ref);
            const { labels, form } = internals;
            initLabels(ref, labels);
            initForm(ref, form, internals);
        }
    };

    const aom = {
        ariaAtomic: 'aria-atomic',
        ariaAutoComplete: 'aria-autocomplete',
        ariaBusy: 'aria-busy',
        ariaChecked: 'aria-checked',
        ariaColCount: 'aria-colcount',
        ariaColIndex: 'aria-colindex',
        ariaColSpan: 'aria-colspan',
        ariaCurrent: 'aria-current',
        ariaDisabled: 'aria-disabled',
        ariaExpanded: 'aria-expanded',
        ariaHasPopup: 'aria-haspopup',
        ariaHidden: 'aria-hidden',
        ariaKeyShortcuts: 'aria-keyshortcuts',
        ariaLabel: 'aria-label',
        ariaLevel: 'aria-level',
        ariaLive: 'aria-live',
        ariaModal: 'aria-modal',
        ariaMultiLine: 'aria-multiline',
        ariaMultiSelectable: 'aria-multiselectable',
        ariaOrientation: 'aria-orientation',
        ariaPlaceholder: 'aria-placeholder',
        ariaPosInSet: 'aria-posinset',
        ariaPressed: 'aria-pressed',
        ariaReadOnly: 'aria-readonly',
        ariaRelevant: 'aria-relevant',
        ariaRequired: 'aria-required',
        ariaRoleDescription: 'aria-roledescription',
        ariaRowCount: 'aria-rowcount',
        ariaRowIndex: 'aria-rowindex',
        ariaRowSpan: 'aria-rowspan',
        ariaSelected: 'aria-selected',
        ariaSort: 'aria-sort',
        ariaValueMax: 'aria-valuemax',
        ariaValueMin: 'aria-valuemin',
        ariaValueNow: 'aria-valuenow',
        ariaValueText: 'aria-valuetext'
    };
    const initAom = (ref, internals) => {
        for (let key in aom) {
            internals[key] = null;
            let closureValue = null;
            const attributeName = aom[key];
            Object.defineProperty(internals, key, {
                get() {
                    return closureValue;
                },
                set(value) {
                    closureValue = value;
                    if (ref.isConnected) {
                        ref.setAttribute(attributeName, value);
                    }
                    else {
                        upgradeMap.set(ref, internals);
                    }
                }
            });
        }
    };

    class ValidityState {
        constructor() {
            this.badInput = false;
            this.customError = false;
            this.patternMismatch = false;
            this.rangeOverflow = false;
            this.rangeUnderflow = false;
            this.stepMismatch = false;
            this.tooLong = false;
            this.tooShort = false;
            this.typeMismatch = false;
            this.valid = true;
            this.valueMissing = false;
            Object.seal(this);
        }
    }
    const setValid = (validityObject) => {
        validityObject.badInput = false;
        validityObject.customError = false;
        validityObject.patternMismatch = false;
        validityObject.rangeOverflow = false;
        validityObject.rangeUnderflow = false;
        validityObject.stepMismatch = false;
        validityObject.tooLong = false;
        validityObject.tooShort = false;
        validityObject.typeMismatch = false;
        validityObject.valid = true;
        validityObject.valueMissing = false;
        return validityObject;
    };
    const reconcileValidty = (validityObject, newState) => {
        validityObject.valid = isValid(newState);
        Object.keys(newState).forEach(key => validityObject[key] = newState[key]);
        return validityObject;
    };
    const isValid = (validityState) => {
        let valid = true;
        for (let key in validityState) {
            if (key !== 'valid' && validityState[key] !== false) {
                valid = false;
            }
        }
        return valid;
    };

    function observerCallback(mutationList) {
        mutationList.forEach(mutationRecord => {
            const { addedNodes, removedNodes } = mutationRecord;
            const added = Array.from(addedNodes);
            const removed = Array.from(removedNodes);
            added.forEach(node => {
                if (internalsMap.has(node) && node.constructor['formAssociated']) {
                    const internals = internalsMap.get(node);
                    const { form } = internals;
                    initForm(node, form, internals);
                    initLabels(node, internals.labels);
                }
                if (upgradeMap.has(node)) {
                    const internals = upgradeMap.get(node);
                    const aomKeys = Object.keys(aom);
                    aomKeys
                        .filter(key => internals[key] !== null)
                        .forEach(key => {
                        node.setAttribute(aom[key], internals[key]);
                    });
                    upgradeMap.delete(node);
                }
            });
            removed.forEach(node => {
                const internals = internalsMap.get(node);
                if (internals && hiddenInputMap.get(internals)) {
                    removeHiddenInputs(internals);
                }
                if (shadowHostsMap.has(node)) {
                    const observer = shadowHostsMap.get(node);
                    observer.disconnect();
                }
            });
        });
    }
    function fragmentObserverCallback(mutationList) {
        mutationList.forEach(mutation => {
            const { removedNodes } = mutation;
            removedNodes.forEach(node => {
                const observer = documentFragmentMap.get(mutation.target);
                if (internalsMap.has(node)) {
                    upgradeInternals(node);
                }
                observer.disconnect();
            });
        });
    }
    const deferUpgrade = (fragment) => {
        const observer = new MutationObserver(fragmentObserverCallback);
        observer.observe(fragment, { childList: true });
        documentFragmentMap.set(fragment, observer);
    };
    new MutationObserver(observerCallback);
    const observerConfig = {
        childList: true,
        subtree: true
    };

    const customStateMap = new WeakMap();
    class CustomStateSet extends Set {
        constructor(ref) {
            super();
            if (!ref || !ref.tagName || ref.tagName.indexOf('-') === -1) {
                throw new TypeError('Illegal constructor');
            }
            customStateMap.set(this, ref);
        }
        add(state) {
            if (!/^--/.exec(state) || typeof state !== 'string') {
                throw new DOMException(`Failed to execute 'add' on 'CustomStateSet': The specified value ${state} must start with '--'.`);
            }
            const result = super.add(state);
            const ref = customStateMap.get(this);
            ref.toggleAttribute(`state${state}`, true);
            return result;
        }
        clear() {
            for (let [entry] of this.entries()) {
                this.delete(entry);
            }
            super.clear();
        }
        delete(state) {
            const result = super.delete(state);
            const ref = customStateMap.get(this);
            ref.toggleAttribute(`state${state}`, false);
            return result;
        }
    }

    class ElementInternals {
        constructor(ref) {
            if (!ref || !ref.tagName || ref.tagName.indexOf('-') === -1) {
                throw new TypeError('Illegal constructor');
            }
            const rootNode = ref.getRootNode();
            const validity = new ValidityState();
            this.states = new CustomStateSet(ref);
            refMap.set(this, ref);
            validityMap.set(this, validity);
            internalsMap.set(ref, this);
            initAom(ref, this);
            initRef(ref, this);
            Object.seal(this);
            upgradeInternals(ref);
            if (rootNode instanceof DocumentFragment) {
                deferUpgrade(rootNode);
            }
        }
        static get isPolyfilled() {
            return true;
        }
        checkValidity() {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to execute 'checkValidity' on 'ElementInternals': The target element is not a form-associated custom element.`);
            const validity = validityMap.get(this);
            if (!validity.valid) {
                const validityEvent = new Event('invalid', {
                    bubbles: false,
                    cancelable: true,
                    composed: false
                });
                ref.dispatchEvent(validityEvent);
            }
            return validity.valid;
        }
        get form() {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to read the 'form' property from 'ElementInternals': The target element is not a form-associated custom element.`);
            let form;
            if (ref.constructor['formAssociated'] === true) {
                form = findParentForm(ref);
            }
            return form;
        }
        get labels() {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to read the 'labels' property from 'ElementInternals': The target element is not a form-associated custom element.`);
            const id = ref.getAttribute('id');
            const hostRoot = ref.getRootNode();
            if (hostRoot && id) {
                return hostRoot ? hostRoot.querySelectorAll(`[for=${id}]`) : [];
            }
            return [];
        }
        reportValidity() {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to execute 'reportValidity' on 'ElementInternals': The target element is not a form-associated custom element.`);
            const valid = this.checkValidity();
            const anchor = validationAnchorMap.get(this);
            if (anchor && !ref.constructor['formAssociated']) {
                throw new DOMException(`Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element.`);
            }
            if (!valid && anchor) {
                ref.focus();
                anchor.focus();
            }
            return valid;
        }
        setFormValue(value) {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to execute 'setFormValue' on 'ElementInternals': The target element is not a form-associated custom element.`);
            removeHiddenInputs(this);
            if (value != null && !(value instanceof FormData)) {
                if (ref.getAttribute('name')) {
                    const hiddenInput = createHiddenInput(ref, this);
                    hiddenInput.value = value;
                }
            }
            else if (value != null && value instanceof FormData) {
                value.forEach((formDataValue, formDataKey) => {
                    if (typeof formDataValue === 'string') {
                        const hiddenInput = createHiddenInput(ref, this);
                        hiddenInput.name = formDataKey;
                        hiddenInput.value = formDataValue;
                    }
                });
            }
            refValueMap.set(ref, value);
        }
        setValidity(validityChanges, validationMessage, anchor) {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to execute 'setValidity' on 'ElementInternals': The target element is not a form-associated custom element.`);
            if (!validityChanges) {
                throw new TypeError('Failed to execute \'setValidity\' on \'ElementInternals\': 1 argument required, but only 0 present.');
            }
            validationAnchorMap.set(this, anchor);
            const validity = validityMap.get(this);
            const validityChangesObj = {};
            for (const key in validityChanges) {
                validityChangesObj[key] = validityChanges[key];
            }
            if (Object.keys(validityChangesObj).length === 0) {
                setValid(validity);
            }
            const check = { ...validity, ...validityChangesObj };
            delete check.valid;
            const { valid } = reconcileValidty(validity, check);
            if (!valid && !validationMessage) {
                throw new DOMException(`Failed to execute 'setValidity' on 'ElementInternals': The second argument should not be empty if one or more flags in the first argument are true.`);
            }
            validationMessageMap.set(this, valid ? '' : validationMessage);
            ref.toggleAttribute('internals-invalid', !valid);
            ref.toggleAttribute('internals-valid', valid);
            ref.setAttribute('aria-invalid', `${!valid}`);
        }
        get shadowRoot() {
            const ref = refMap.get(this);
            const shadowRoot = shadowRootMap.get(ref);
            if (shadowRoot) {
                return shadowRootMap.get(ref);
            }
            return null;
        }
        get validationMessage() {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to read the 'validationMessage' property from 'ElementInternals': The target element is not a form-associated custom element.`);
            return validationMessageMap.get(this);
        }
        get validity() {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to read the 'validity' property from 'ElementInternals': The target element is not a form-associated custom element.`);
            const validity = validityMap.get(this);
            return validity;
        }
        get willValidate() {
            const ref = refMap.get(this);
            throwIfNotFormAssociated(ref, `Failed to read the 'willValidate' property from 'ElementInternals': The target element is not a form-associated custom element.`);
            if (ref.disabled || ref.hasAttribute('disabled')) {
                return false;
            }
            return true;
        }
    }
    if (!window.CustomStateSet) {
        window.CustomStateSet = CustomStateSet;
    }
    if (!window.ElementInternals) {
        window.ElementInternals = ElementInternals;
        function attachShadowObserver(...args) {
            const shadowRoot = attachShadow.apply(this, args);
            const observer = new MutationObserver(observerCallback);
            shadowRootMap.set(this, shadowRoot);
            observer.observe(shadowRoot, observerConfig);
            shadowHostsMap.set(this, observer);
            return shadowRoot;
        }
        function checkValidityOverride(...args) {
            let returnValue = checkValidity.apply(this, args);
            return overrideFormMethod(this, returnValue, 'checkValidity');
        }
        function reportValidityOverride(...args) {
            let returnValue = reportValidity.apply(this, args);
            return overrideFormMethod(this, returnValue, 'reportValidity');
        }
        Object.defineProperty(Element.prototype, 'attachInternals', {
            get() {
                return () => {
                    if (this.tagName.indexOf('-') === -1) {
                        throw new Error(`Failed to execute 'attachInternals' on 'HTMLElement': Unable to attach ElementInternals to non-custom elements.`);
                    }
                    return new ElementInternals(this);
                };
            }
        });
        const attachShadow = Element.prototype.attachShadow;
        Element.prototype.attachShadow = attachShadowObserver;
        const documentObserver = new MutationObserver(observerCallback);
        documentObserver.observe(document.documentElement, observerConfig);
        const checkValidity = HTMLFormElement.prototype.checkValidity;
        HTMLFormElement.prototype.checkValidity = checkValidityOverride;
        const reportValidity = HTMLFormElement.prototype.reportValidity;
        HTMLFormElement.prototype.reportValidity = reportValidityOverride;
    }

}());

// FormElementMixin
// ================
//

const FormElementMixin = (base) => {
  return class Base extends base {
    get skipAttributes () {
      return [
        ...super.skipAttributes, 'form'
      ]
    }

    get skipProperties () {
      return [...super.skipProperties, 'form']
    }

    /**
     * Returning `true` for the formAssociated property allows the element to be
     * detected and participate as a form control element in native forms. It is
     * also necessary to add the lifecycle hooks related to that behavior.
    */
    static get formAssociated () { return true }

    static get properties () {
      return {
        disabled: { type: Boolean },
        required: { type: Boolean }
      }
    }

    constructor () {
      super();
      // Check if the `attachInternals` method is available and call it to enable
      // the ElementInternals API.
      if (this.attachInternals) {
        this.internals = this.attachInternals();
      }
    }

    firstUpdated () {
      super.firstUpdated();
      if (this.internals && this.native) {
        // Update form with current value on firstUpdate
        this._updateAssociatedForm();
        this.native.addEventListener('input', (e) => {
          // Update form value at every input change
          this._updateAssociatedForm();
        });
      }
    }

    connectedCallback () {
      super.connectedCallback();
      this._assignFormProperty();
    }

    _updateAssociatedForm () {
      const data = new FormData();
      data.append(this.name, this.value);
      this.internals.setFormValue(data);
    }

    // From [web.dev article](https://web.dev/more-capable-form-controls/):
    // The following properties and methods aren't strictly required,
    // but browser-level form controls provide them. Providing them helps
    // ensure consistency with browser-provided controls.
    get form () { return this._assignFormProperty() }
    get name () { return this.getAttribute('name') }
    get type () { return this.localName }

    // These validity related callbacks are optional, and are already
    // implemented in the NativeValidatorMixin, so we are not going to use the
    // ElementInternals API methods, except for **willValidate**.
    //
    //
    get willValidate () { return this.internals.willValidate }
    // get validity () { return this.internals.validity }
    // get validationMessage () { return this.internals.validationMessage }
    // checkValidity () { console.log('check validity called'); return this.internals.checkValidity() }
    // reportValidity () { console.log('report validity called'); return this.internals.reportValidity() }

    _assignFormProperty () {
      // if (this.tagName === 'NN-FORM' || this.tagName === 'EN-FORM') return
      if (this.internals && this.internals.form) {
        return this.internals.form
      }
      let el = this;
      while ((el = el.parentElement) && (el.tagName !== 'FORM' && el.tagName !== 'NN-FORM' && el.tagName !== 'EN-FORM' && !el.hasAttribute('as-form'))) { } // eslint-disable-line no-empty
      return el
    }
  }
};

const NativeValidatorMixin = (base) => {
  return class Base extends base {
    static get properties () {
      return {
        nativeErrorMessages: {
          type: Boolean,
          attribute: 'native-error-messages'
        },
        shownValidationMessage: {
          type: String,
          attribute: false
        },
        validator: { type: Function },
        validationMessages: {
          type: Object,
          attribute: 'validition-messages'
        },
        validationMessagePosition: {
          type: String,
          attribute: 'validation-message-position'
        }
      }
    }

    static get styles () {
      return [
        super.styles || [],
        r`

          span.error-message {
            color: red;
          }

          :invalid {
            background-color: pink;
            border: var(--native-validator-mixin-input-border-invalid, 1px solid #bb7777);
          }
        `
      ]
    }

    constructor () {
      super();
      this.validator = () => '';
      this.nativeValidationKeys = [
        'badInput',
        'customError',
        'patternMismatch',
        'rangeOverflow',
        'rangeUnderflow',
        'stepMismatch',
        'valueMissing',
        'tooLong',
        'tooShort',
        'typeMismatch'
      ];
      this.validationMessages = {};
      this.validationMessagePosition = 'before';
      this._showPrettyError = false;
    }

    get skipProperties () {
      return [...super.skipProperties, 'checkValidity', 'reportValidity', 'setCustomValidity']
    }

    get validationMessageTemplate () {
      return y`
        <span class="error-message">
          ${this.shownValidationMessage}
        </span>
      `
    }

    get ifValidationMessageBefore () {
      if (this.validationMessagePosition === 'after') return ''
      return this.validationMessageTemplate
    }

    get ifValidationMessageAfter () {
      if (this.validationMessagePosition === 'before') return ''
      return this.validationMessageTemplate
    }

    setCustomValidity (m) {
      if (!this.native) return
      return this.native.setCustomValidity(m)
    }

    _runValidator () {
      // Call the validator with a value. Here an element could be a checkbox,
      // a select, an simple text input, etc.
      // If the containing form has _getElementValueSource, that is used to
      // figure out what to pass to the validato (as well as _submitObject)
      let value;
      let submitObject;
      if (this.form && this.form._getElementValueSource) {
        value = this[this.form._getElementValueSource(this)];
        submitObject = this.form.submitObject;
      }
      const ownErrorMessage = this.validator(value, submitObject);
      if (ownErrorMessage) this.setCustomValidity(ownErrorMessage);
    }

    reportValidity () {
      if (!this.native) return true

      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.native.validity.customError) {
        this._runValidator();
      }

      // Hide the fancy error message by default
      this.shownValidationMessage = '';

      // Run reportValidity which will display the native
      // error messages.
      // Suppress the pretty error messages
      if (this.nativeErrorMessages) {
        this._showPrettyError = false;
        return this.native.reportValidity()
      } else {
        // Since pretty errors will be shown, it will actually
        // return checkValidity() which will not show the
        // error messages
        this._showPrettyError = true;
        return this.native.checkValidity()
      }
    }

    checkValidity () {
      if (!this.native) return true
      // Run custom validator. Note that custom validator
      // will only ever run on filed without an existing customError.
      if (!this.native.validity.customError) {
        this._runValidator();
      }

      this._showPrettyError = false;
      return this.native.checkValidity()
    }

    firstUpdated () {
      super.firstUpdated();
      this.native.oninput = (e) => {
        this.setCustomValidity('');
        this.reportValidity();
      };

      this.native.oninvalid = (e) => {
        // No pretty error to be shown (probably running checkValidity())
        if (!this._showPrettyError) return

        const validity = e.target.validity;

        // Find which one flag in validity is raised
        let found;
        for (const k of this.nativeValidationKeys) {
          if (validity[k]) {
            found = k;
            break
          }
        }

        // Assign shownValidationMessage
        // Allow translating with specific function
        const translator = this.validationMessages[found];
        if (translator) {
          this.shownValidationMessage = (typeof translator === 'function')
            ? translator(e.target.validationMessage)
            : translator;
        } else {
          this.shownValidationMessage = e.target.validationMessage;
        }
      };
    }
  }
};

class NnInputCheckbox extends FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(n$3)))))) {
  render () {
    
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="checkbox" as-checkbox value-source="checked" id="native" real-time-event="click">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  _updateAssociatedForm () {
    this.internals.setFormValue(this.checked ? this.value : null);
  }
}
tpeRegistry.register('nn-input-checkbox', NnInputCheckbox);

class EeAutocompleteItemCountry extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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

      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      countryName: 'name',
      countryCapital: 'capital'
    };
  }

  render () {
    
    return y`
    <li>${this.data[this.config.countryName]} (Capital: ${this.data[this.config.countryCapital]})</li>
    `
  }

  /* API */

  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this.data[this.config.countryName]
  }

  stringToData (string) {
    return {
      [this.config.countryName]: string,
      valid: true
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemCountryView
  }
}
tpeRegistry.register('ee-autocomplete-item-country', EeAutocompleteItemCountry);

class EeAutocompleteItemCountryView extends EeAutocompleteItemCountry {
  static get styles () {
    return [
      r`
        :host {
          position: relative;
          display: inline-block;
          font-size: 0.9em;
        }
      `
    ]
  }

  render () {
    
    return y`
      ${this.data[this.config.countryName]}
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-autocomplete-item-country-view', EeAutocompleteItemCountryView);

class EeAutocompleteItemEmail extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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

      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      emailName: 'name',
      emailAddress: 'email'
    };
  }

  render () {
    
    return y`
    <li>${this.textValue}</li>
    `
  }

  /* API */
  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this._textValueGetter()
  }

  _textValueGetter (short = false) {
    if (short) return this.data[this.config.emailName] || this.data[this.config.emailAddress]
    const name = this.data[this.config.emailName];
    const address = this.data[this.config.emailAddress];
    if (name && address) return `${name} <${address}>`
    else if (name) return name
    else if (address) return address
    else return ''
  }

  stringToData (string) {
    let emailName;
    let emailAddress;

    if (!string.match('@')) {
      return {
        [this.config.emailName]: string,
        [this.config.emailAddress]: '',
        valid: false
      }
    }

    const emails = string.match(/[^@<\s]+@[^@\s>]+/g);
    if (emails) {
      emailAddress = emails[0];
    }

    const names = string.split(/\s+/);

    if (names.length > 1) {
      names.pop();
      emailName = names.join(' ').replace(/"/g, '');
    }

    const valid = !!emailAddress;

    return {
      [this.config.emailName]: emailName,
      [this.config.emailAddress]: emailAddress,
      valid: valid
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemEmailView
  }
}
tpeRegistry.register('ee-autocomplete-item-email', EeAutocompleteItemEmail);

class EeAutocompleteItemEmailView extends EeAutocompleteItemEmail {
  static get styles () {
    return [
      r`
        :host {
          position: relative;
          display: inline-block;
          font-size: 0.9em;
        }
      `
    ]
  }

  render () {
    
    return y`
      ${this._textValueGetter(true)}
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-autocomplete-item-email-view', EeAutocompleteItemEmailView);

class EeAutocompleteItemLi extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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

      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      path: 'name'
    };
  }

  render () {
    
    return y`
    <li>${this.data[this.config.path]}</li>
    `
  }

  /* API */

  get idValue () {
    return this.data[this.config.id]
  }

  get textValue () {
    return this.data[this.config.path]
  }

  stringToData (string) {
    return {
      [this.config.path]: string
    }
  }

  static get PickedElement () {
    return EeAutocompleteItemLiView
  }
}
tpeRegistry.register('ee-autocomplete-item-li', EeAutocompleteItemLi);

class EeAutocompleteItemLiView extends EeAutocompleteItemLi {
  static get styles () {
    return [
      super.styles,
      r`
        :host {
          display: inline-block;
        }
      `
    ]
  }

  static get properties () {
    return {
      data: {
        type: Object,
        attribute: false
      },
      config: {
        type: Object,
        attribute: false
      }
    }
  }

  constructor () {
    super();
    this.config = {
      id: 'id',
      path: 'name'
    };
  }

  render () {
    
    return y`
      -${this.data[this.config.path]}-
    `
  }
}
tpeRegistry.register('ee-autocomplete-item-li-view', EeAutocompleteItemLiView);

class EeAutocomplete extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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
      `
    ]
  }

  static get properties () {
    return {
      url: {
        type: String
      },
      informational: {
        type: Boolean
      },
      target: {
        type: String
      },
      targetForId: {
        type: String,
        attribute: 'target-for-id'
      },
      displaySingleSuggestion: {
        type: Boolean, attribute: 'display-single-suggestion'
      },
      picked: {
        type: Boolean,
        reflect: true
      },
      pickedData: {
        type: Object
      },
      suggestions: {
        type: Array,
        attribute: false
      },
      itemElement: {
        type: String,
        attribute: 'item-element'
      },
      itemElementConfig: {
        type: Object,
        attribute: 'item-element-config'
      },
      itemElementAttributes: {
        type: Object,
        attribute: 'item-element-attributes'
      }
    }
  }

  constructor () {
    super();
    this.url = '';
    this.target = null;
    this.targetForId = null;
    this.suggestions = [];
    this.pickedData = {};
    this.itemElement = 'ee-autocomplete-item-li';
    this.itemElementConfig = {};
    this.itemElementAttributes = {};

    this._boundInputEvent = this._inputEvent.bind(this);
    this._boundKeydownEvent = this._keydownEvent.bind(this);
  }

  // If if's not set, return the first child
  // If it's set:
  //   If it's a string, return the #element
  //   If it's an object, return it directly (assumption that it's an element)
  _findTarget (target) {
    if (target !== null) {
      if (typeof target === 'string') return this.querySelector(`#${target}`)
      else if (typeof target === 'object') return target
    } else {
      return this.children[0]
    }
    return null
  }

  // If if's not set, don't do anything
  // If it's set:
  //   If it's an empty string, look for the first [name] element without no-submit,
  //   If it's a string, return the #element
  //   If it's an object, return it  directly (assumption that it's an element)
  _findTargetForId (target) {
    if (target !== 'null') {
      if (typeof target === 'string') {
        return target === ''
          ? this.querySelector('[name]:not([no-submit])')
          : this.querySelector(`#${target}`)
      } else if (typeof target === 'object') return target
    }
    return null
  }

  connectedCallback () {
    super.connectedCallback();

    this.targetElement = this._findTarget(this.target);
    this.targetForId = this._findTargetForId(this.targetForId);

    // The target for Id is the true source of the value
    // in case of ID submission. So, two things must happen:
    // 1) If it has a value already (it might have been set by a data load before the autocomplete), then picked is true
    // 2) Its value needs to be observed, so that if a value is set at any point, picked becomes true
    if (this.targetForId) {
      this.picked = !!this.targetForId.getAttribute('value');

      const thisObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'value') {
            this.picked = !!this.targetForId.getAttribute('value');
            if (!this.targetForId.getAttribute('value')) {
              this.pickedData = null;
            }
          }
        });
      });
      thisObserver.observe(this.targetForId, { attributes: true });
    }

    if (!this.targetElement) {
      console.error('Target element not found');
      return
    }

    this.targetElement.addEventListener('input', this._boundInputEvent);
    this.targetElement.addEventListener('keydown', this._boundKeydownEvent);

    // API USE: If the target input element implements multiInputApi,
    // then set the basic parameters for all
    // picked items (element name, config and attributes)
    if (this.targetElement.multiInputApi) {
      this.targetElement.setPickedElement(this.itemElement, this.itemElementConfig, this.itemElementAttributes);
    }

    // Setup ARIA attributes on target
    this.targetElement.setAttribute('aria-autocomplete', 'list');
    this.targetElement.setAttribute('aria-controls', 'suggestions');
    this.targetElement.toggleAttribute('aria-activedescendant', true);
    // Setup ARIA attributes on ee-autocomplete
    this.setAttribute('role', 'combobox');
    this.setAttribute('aria-owns', 'suggestions');
  }

  disconnectedCallback () {
    if (!this.targetElement) return

    this.targetElement.removeEventListener('input', this._boundInputEvent);
    this.targetElement.removeEventListener('keydown', this._boundKeydownEvent);
  }

  render () {
    
    return y`
      <slot></slot>
      <div @click="${this._picked}" id="suggestions" role="listbox" @keydown=${this._handleKeyEvents}>
        <div id="suggestions-elements"></div>
      </div>
    `
  }

  _keydownEvent (e) {
    switch (e.key) {
    case 'Escape':
      this.dismissSuggestions();
      break
    case 'KeyDown':
      if (this.suggestions.length) {
        const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');
        suggestionsDiv.firstChild.focus();
      }
    }
  }

  pickFirst () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');
    suggestionsDiv.querySelector('[selected]').click();
  }

  focusNext () {
    if (!this.suggestions.length) return
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');
    let selected = suggestionsDiv.querySelector('[selected]') || suggestionsDiv.firstElementChild;
    if (this.suggestions.length > 1) {
      selected.toggleAttribute('selected', false);
      selected = selected.nextElementSibling || selected.previousElementSibling;
    }
    if (selected) selected.focus();
  }

  _picked (e) {
    console.log(e.currentTarget, e.target);
    if (this.informational || !this.targetElement || e.target.tagName.toLowerCase() !== this.itemElement) return

    if (this.targetElement.multiInputApi) {
      this.targetElement.pickedElement(e.target.data);
    } else {
      this.targetElement.value = e.target.textValue;
      if (this.targetForId) {
        this.targetForId.value = e.target.idValue;
        this.picked = true;
        this.pickedData = e.target.data;
      }
    }
    this.dismissSuggestions();
    this.targetElement.focus();

    // Dispatch input event since input happened
    this._dispatchPickedEvent();
  }

  _dispatchPickedEvent () {
    if (!this.picked) return
    const inputEvent = new CustomEvent('input', { composed: true, bubbles: true, cancelable: false, detail: { synthetic: true, data: this.pickedData } });
    this.targetElement.dispatchEvent(inputEvent);
  }

  _jsonCopy (o) {
    return JSON.parse(JSON.stringify(o))
  }

  async updated (cp) {
    if (!cp.has('suggestions')) return

    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions-elements');

    // while (suggestionsDiv.firstChild) { suggestionsDiv.removeChild(suggestionsDiv.firstChild) }
    suggestionsDiv.innerHTML = '';

    if (this._autocompleteInFlight) return

    if (this.targetElement.multiInputApi) {
      if (this.targetElement.autocompleteValue === '') {
        suggestionsDiv.toggleAttribute('populated', false);
        return
      }
    }

    for (const suggestion of this.suggestions) {
      const el = document.createElement(this.itemElement);
      el.config = { ...this._jsonCopy(el.config), ...this._jsonCopy(this.itemElementConfig) };
      for (const k of Object.keys(this.itemElementAttributes)) el.setAttribute(k, this.itemElementAttributes[k]);
      el.data = this._jsonCopy(suggestion);
      // el.onkeydown = this._handleKeyEvents.bind(this)
      // Make span focusable AND in the tab list
      el.setAttribute('tabindex', 0);
      suggestionsDiv.appendChild(el);
    }

    // Only 1 response and it's a plain text input? Autocomplete if text fully matches
    // beginning of the only result
    if (
      this.suggestions.length === 1 &&
      !this.targetElement.multiInputApi &&
      typeof this.targetElement.setSelectionRange === 'function'
    ) {
      const firstOption = suggestionsDiv.firstChild;
      const textValue = firstOption.textValue;
      if (textValue.toUpperCase().startsWith(this.targetElement.value.toUpperCase())) {
        const oldValue = this.targetElement.value;
        this.targetElement.value = textValue;
        this.targetElement.setSelectionRange(oldValue.length, textValue.length);
        if (this.targetForId) {
          this.targetForId.value = firstOption.idValue;
          this.picked = true;
          this.pickedData = firstOption.data;
          if (!this.displaySingleSuggestion) {
            this.dismissSuggestions();
            this._dispatchPickedEvent();
          }
        }
      }
    }

    if (!this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', false);
    }

    if (this.suggestions.length) {
      suggestionsDiv.toggleAttribute('populated', true);
      suggestionsDiv.firstChild.toggleAttribute('selected', true);
      const bounding = this._isOutOfViewport(suggestionsDiv);
      if (bounding.any) {
        console.log(bounding);
        console.log(suggestionsDiv);
        suggestionsDiv.style.transform = `translateY(${this._calcTranslateY(bounding.top, bounding.bottom, suggestionsDiv)}px) translateX(${this._calcTranslateX(bounding.left, bounding.right)}px)`;
      }
      suggestionsDiv.style.visibility = 'unset';
    }
  }

  _calcTranslateY (top, bottom, el) {
    top = Number(top) * -1;
    bottom = Number(bottom) * -1;
    const inputOffset = el && bottom ? el.offsetHeight * -1 + this.targetElement.offsetHeight * -1 : 0;
    return top + inputOffset
  }

  _calcTranslateX (left, right) {
    left = Number(left) * -1;
    right = Number(right) * -1;
    return left + right
  }

  _isOutOfViewport (elem) {
    // Get element's bounding
    const bounding = elem.getBoundingClientRect();

    // Check if it's out of the viewport on each side
    const out = {};
    out.top = bounding.top < 0 ? bounding.top : false;
    out.left = bounding.left < 0 ? bounding.left : false;
    out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight) ? bounding.bottom - window.innerHeight : false;
    out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth) ? bounding.right - window.innerWidth : false;
    out.any = !!(out.top || out.left || out.bottom || out.right);
    out.all = !!(out.top && out.left && out.bottom && out.right);
    return out
  }

  toggleSuggestions () {
    if (this.suggestions.length) {
      this.dismissSuggestions();
      this.targetElement.value = '';
    } else {
      this.openSuggestions();
    }
  }

  openSuggestions () {
    this.targetElement.value = ' ';
    this._inputEvent({});
  }

  dismissSuggestions () {
    const suggestionsDiv = this.shadowRoot.querySelector('#suggestions');
    suggestionsDiv.toggleAttribute('populated', false);
    this.suggestions = [];
  }

  _handleKeyEvents (e) {
    const target = e.currentTarget.getRootNode().activeElement;

    if (!this.suggestions.length || !target.parentElement) return

    switch (e.key) {
    case 'ArrowUp':
      e.preventDefault();
      target.previousElementSibling
        ? target.previousElementSibling.focus()
        : target.parentElement.lastElementChild.focus();
      break
    case 'ArrowDown':
      e.preventDefault();
      target.nextElementSibling
        ? target.nextElementSibling.focus()
        : target.parentElement.firstElementChild.focus();
      break
    case 'Tab':
    case 'Enter':
      this._picked(e);
      e.preventDefault();
      this.targetElement.focus();
      break
    case 'Escape':
      this.dismissSuggestions();
      this.targetElement.focus();
      break
    }
  }

  async _inputEvent (e) {
    console.log(e, this._autocompleteInFlight);
    // This is a synthetic event triggered by autocomplete itself
    // once a selection was made: ignore
    if (e.detail !== 0 && e.detail && e.detail.synthetic) return

    // Nothing can nor should happen without a target
    const target = this.targetElement;
    if (!target) return

    // There is more input: a new query will be made,
    // so the list is now stale
    this.dismissSuggestions();

    // If the target element is not valid, don't take off at all
    // TAKEN OUT as autocomplete might be necessary to actually make
    // it valid
    // if (!target.validity.valid) {
    //  this.suggestions = []
    //  return
    // }

    // Check if it's inflight. If so, queue up an autocomplete
    // with the same 'e'
    if (this._autocompleteInFlight) {
      this._attemptedAutocompleteFlight = e;
      return
    }

    if (this.targetForId) {
      this.targetForId.value = '';
      this.picked = false;
      this.pickedData = null;
    }

    // IN FLIGHT!
    this._autocompleteInFlight = true;

    // Set the url, which will also depend on recordId
    const value = target.autocompleteValue || target.value;

    // No input: do not run a wide search
    if (!value) {
      this._autocompleteInFlight = false;
      this.dismissSuggestions();
      return
    }

    const url = this.url + value;

    const fetchOptions = {
      method: 'GET',
      redirect: 'follow' // manual, *follow, error
    };

    // Attempt the submission
    let networkError = false;
    let response;
    try {
      response = await fetch(url, fetchOptions);
    } catch (e) {
      console.log('ERROR!', e);
      networkError = true;
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!');

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'network' }, bubbles: true, composed: true });
      this.dispatchEvent(event);

    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      console.log('Fetch error!');

      const errs = await response.json();
      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('autocomplete-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true });
      this.dispatchEvent(event);

    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json();

      this.suggestions = v;

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true });
      this.dispatchEvent(event);
    }

    this._autocompleteInFlight = false;
    if (this._attemptedAutocompleteFlight) {
      const oldE = this._attemptedAutocompleteFlight;
      this._attemptedAutocompleteFlight = false;
      this._inputEvent(oldE);
    }
  }
}
tpeRegistry.register('ee-autocomplete', EeAutocomplete);

class EeCell extends StyleableMixin(n$3) {
  static get styles () {
    return [
      r`
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

      `
    ]
  }

  static get properties () {
    return {
    }
  }

  constructor () {
    super();
    this.SOMETHING = false;
  }

  connectedCallback () {
    super.connectedCallback();
  }

  render () {
    
    return y`
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-cell', EeCell);

const chevronLeft = y`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>`;

class EeDrawer extends StyleableMixin(n$3) {
  static get styles () {
    return [
      r`
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
      `
    ]
  }

  static get properties () {
    return {
      opened: { type: Boolean, reflect: true },
      backdrop: { type: Boolean, reflect: true },
      closeButton: { type: Boolean, attribute: 'close-button' },
      closeThreshold: { type: Number },
      openThreshold: { type: Number }
    }
  }

  constructor () {
    super();
    this.backdrop = true;
    this.closeButton = true;
    this.opened = false;
    // These properties allow the developer to decide how far the user needs to drag in order to trigger open and close events. Values between 0 and 1.
    this.closeThreshold = 0.6;
    this.openThreshold = 0.6;
  }

  connectedCallback () {
    super.connectedCallback();
    this.addEventListener('click', this._handleOutsideClick);
    // Add listeners for the events to handle dragging the drawer. Touchevents must be added, besides the fact the mouse events are emulated in mobile devices
    // When these listeners are not added, scrolling behavior from the browser takes over and prevents emulated mouse events from firing.
    // To make sure behavior is consistent, the handlers must call event.preventDefault() which will avoid scrolling and duplicate emulated events
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent
    this.addEventListener('touchstart', this._handleDragStart);
    this.addEventListener('touchmove', this._handleDrag);
    this.addEventListener('touchend', this._handleDragEnd);
    // These are also needed to support dragging in desktop
    this.addEventListener('mousedown', this._handleDragStart);
    this.addEventListener('mousemove', this._handleDrag);
    this.addEventListener('mouseup', this._handleDragEnd);
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    this.removeEventListener('click', this._handleOutsideClick);
    this.removeEventListener('touchstart', this._handleDragStart);
    this.removeEventListener('touchmove', this._handleDrag);
    this.removeEventListener('touchend', this._handleDragEnd);
    // These are also needed to support dragging in desktop
    this.removeEventListener('mousedown', this._handleDragStart);
    this.removeEventListener('mousemove', this._handleDrag);
    this.removeEventListener('mouseup', this._handleDragEnd);
  }

  firstUpdated () {
    this.container = this.shadowRoot.querySelector('div#container');
  }

  render () {
    
    return y`
      <div id="container">
        ${this.closeButton ? y`<button id="close" @click="${this.close}">${chevronLeft}</button>` : ''}
        <nav id="nav">
          <slot></slot>
        </nav>
      </div>
    `
  }

  open () {
    this.opened = true;
  }

  close () {
    this.opened = false;
  }

  toggle () {
    this.opened = !this.opened;
  }

  _handleOutsideClick (e) {
    // This flag can be set to avoid closing the drawer after finishing a drag, which triggers a click
    if (this.ignoreNextClick) {
      this.ignoreNextClick = false;
      return
    }

    if (e.target.nodeName === 'EE-DRAWER') this.close();
  }

  _handleDragStart (e) {
    // save starting point reference
    this.dragStart = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    // Force ee-drawer to be full viewport width during the event
    if (!this.opened) this.style.width = '100vw';
  }

  _handleDrag (e) {
    // ignore event if there wasn't a dragStart immediatelly before
    if (this.dragStart === undefined) return
    // Set this flag so it's possible to know if there's an ongoing drag
    this.dragging = true;

    // Always call preventDefault when in a touch enabled device, to avoid duplicate simulated mouse events afterwards
    e.preventDefault();

    // Now, we need to compare the current pointer/touch position with the position at the start of the drag. We calculate the offset and get the width of the drawer.
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const offset = x - this.dragStart;
    const w = this.container.getBoundingClientRect().width;

    // Determine the movement tolerance before triggering open or close during dragging.
    const openTrigger = (w - this.openThreshold * w);
    const closeTrigger = -1 * (w - this.closeThreshold * w);

    // Check if user dragged far enough for either closing or opening the drawer, call _finishDrag to cleanup
    if (offset < closeTrigger) {
      this.close();
      this._finishDrag();
      return
    } else if (offset > openTrigger) {
      this.open();
      // Necessary for mouse events, because calling preventDefault in mouseup handler does not cancel the click event after
      this.ignoreNextClick = true;
      this._finishDrag();
      return
    }

    // if still within trigering range, update drawer position smoothly, using requestAnimationFrame
    requestAnimationFrame(() => {
      this.container.style.transform = `translateX(calc(${this.opened ? '' : '-100% +'} ${offset}px))`;
    });
    return false
  }

  _handleDragEnd (e) {
    // If this event follows a touchmove/mousemove event, call preventDefault. It is necessary to prevent the click event from firing, as it is next the Event order:
    // https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent#Event_order
    if (this.dragging) e.preventDefault();
    this.dragStart = undefined;
    this.dragging = false;
    this._finishDrag();
  }

  _finishDrag () {
    // This will clear flags and inline styles after the drag is done
    requestAnimationFrame(() => {
      this.container.style.transform = '';
      if (!this.opened) this.style.width = '';
    });
  }
}
tpeRegistry.register('ee-drawer', EeDrawer);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2,i$2;const s$3=globalThis.trustedTypes,e$3=s$3?s$3.createPolicy("lit-html",{createHTML:t=>t}):void 0,o$4=`lit$${(Math.random()+"").slice(9)}$`,n$4="?"+o$4,l$2=`<${n$4}>`,h$2=document,r$4=(t="")=>h$2.createComment(t),d$1=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u$1=Array.isArray,c$1=t=>{var i;return u$1(t)||"function"==typeof(null===(i=t)||void 0===i?void 0:i[Symbol.iterator])},v$1=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,a$1=/-->/g,f$1=/>/g,_$1=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,g$1=/'/g,m$1=/"/g,$$1=/^(?:script|style|textarea)$/i,T$1=Symbol.for("lit-noChange"),x$1=Symbol.for("lit-nothing"),w$1=new WeakMap,C$1=h$2.createTreeWalker(h$2,129,null,!1),P$1=(t,i)=>{const s=t.length-1,n=[];let h,r=2===i?"<svg>":"",d=v$1;for(let i=0;i<s;i++){const s=t[i];let e,u,c=-1,p=0;for(;p<s.length&&(d.lastIndex=p,u=d.exec(s),null!==u);)p=d.lastIndex,d===v$1?"!--"===u[1]?d=a$1:void 0!==u[1]?d=f$1:void 0!==u[2]?($$1.test(u[2])&&(h=RegExp("</"+u[2],"g")),d=_$1):void 0!==u[3]&&(d=_$1):d===_$1?">"===u[0]?(d=null!=h?h:v$1,c=-1):void 0===u[1]?c=-2:(c=d.lastIndex-u[2].length,e=u[1],d=void 0===u[3]?_$1:'"'===u[3]?m$1:g$1):d===m$1||d===g$1?d=_$1:d===a$1||d===f$1?d=v$1:(d=_$1,h=void 0);const y=d===_$1&&t[i+1].startsWith("/>")?" ":"";r+=d===v$1?s+l$2:c>=0?(n.push(e),s.slice(0,c)+"$lit$"+s.slice(c)+o$4+y):s+o$4+(-2===c?(n.push(void 0),i):y);}const u=r+(t[s]||"<?>")+(2===i?"</svg>":"");return [void 0!==e$3?e$3.createHTML(u):u,n]};class V$1{constructor({strings:t,_$litType$:i},e){let l;this.parts=[];let h=0,d=0;const u=t.length-1,c=this.parts,[v,a]=P$1(t,i);if(this.el=V$1.createElement(v,e),C$1.currentNode=this.el.content,2===i){const t=this.el.content,i=t.firstChild;i.remove(),t.append(...i.childNodes);}for(;null!==(l=C$1.nextNode())&&c.length<u;){if(1===l.nodeType){if(l.hasAttributes()){const t=[];for(const i of l.getAttributeNames())if(i.endsWith("$lit$")||i.startsWith(o$4)){const s=a[d++];if(t.push(i),void 0!==s){const t=l.getAttribute(s.toLowerCase()+"$lit$").split(o$4),i=/([.?@])?(.*)/.exec(s);c.push({type:1,index:h,name:i[2],strings:t,ctor:"."===i[1]?k$1:"?"===i[1]?H$1:"@"===i[1]?I$1:M$1});}else c.push({type:6,index:h});}for(const i of t)l.removeAttribute(i);}if($$1.test(l.tagName)){const t=l.textContent.split(o$4),i=t.length-1;if(i>0){l.textContent=s$3?s$3.emptyScript:"";for(let s=0;s<i;s++)l.append(t[s],r$4()),C$1.nextNode(),c.push({type:2,index:++h});l.append(t[i],r$4());}}}else if(8===l.nodeType)if(l.data===n$4)c.push({type:2,index:h});else {let t=-1;for(;-1!==(t=l.data.indexOf(o$4,t+1));)c.push({type:7,index:h}),t+=o$4.length-1;}h++;}}static createElement(t,i){const s=h$2.createElement("template");return s.innerHTML=t,s}}function E$1(t,i,s=t,e){var o,n,l,h;if(i===T$1)return i;let r=void 0!==e?null===(o=s._$Cl)||void 0===o?void 0:o[e]:s._$Cu;const u=d$1(i)?void 0:i._$litDirective$;return (null==r?void 0:r.constructor)!==u&&(null===(n=null==r?void 0:r._$AO)||void 0===n||n.call(r,!1),void 0===u?r=void 0:(r=new u(t),r._$AT(t,s,e)),void 0!==e?(null!==(l=(h=s)._$Cl)&&void 0!==l?l:h._$Cl=[])[e]=r:s._$Cu=r),void 0!==r&&(i=E$1(t,r._$AS(t,i.values),r,e)),i}class N$1{constructor(t,i){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var i;const{el:{content:s},parts:e}=this._$AD,o=(null!==(i=null==t?void 0:t.creationScope)&&void 0!==i?i:h$2).importNode(s,!0);C$1.currentNode=o;let n=C$1.nextNode(),l=0,r=0,d=e[0];for(;void 0!==d;){if(l===d.index){let i;2===d.type?i=new S$2(n,n.nextSibling,this,t):1===d.type?i=new d.ctor(n,d.name,d.strings,this,t):6===d.type&&(i=new L$1(n,this,t)),this.v.push(i),d=e[++r];}l!==(null==d?void 0:d.index)&&(n=C$1.nextNode(),l++);}return o}m(t){let i=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class S$2{constructor(t,i,s,e){var o;this.type=2,this._$AH=x$1,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cg=null===(o=null==e?void 0:e.isConnected)||void 0===o||o;}get _$AU(){var t,i;return null!==(i=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==i?i:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=E$1(this,t,i),d$1(t)?t===x$1||null==t||""===t?(this._$AH!==x$1&&this._$AR(),this._$AH=x$1):t!==this._$AH&&t!==T$1&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.S(t):c$1(t)?this.M(t):this.$(t);}A(t,i=this._$AB){return this._$AA.parentNode.insertBefore(t,i)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t));}$(t){this._$AH!==x$1&&d$1(this._$AH)?this._$AA.nextSibling.data=t:this.S(h$2.createTextNode(t)),this._$AH=t;}T(t){var i;const{values:s,_$litType$:e}=t,o="number"==typeof e?this._$AC(t):(void 0===e.el&&(e.el=V$1.createElement(e.h,this.options)),e);if((null===(i=this._$AH)||void 0===i?void 0:i._$AD)===o)this._$AH.m(s);else {const t=new N$1(o,this),i=t.p(this.options);t.m(s),this.S(i),this._$AH=t;}}_$AC(t){let i=w$1.get(t.strings);return void 0===i&&w$1.set(t.strings,i=new V$1(t)),i}M(t){u$1(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const o of t)e===i.length?i.push(s=new S$2(this.A(r$4()),this.A(r$4()),this,this.options)):s=i[e],s._$AI(o),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,i){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,i);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i;}}setConnected(t){var i;void 0===this._$AM&&(this._$Cg=t,null===(i=this._$AP)||void 0===i||i.call(this,t));}}class M$1{constructor(t,i,s,e,o){this.type=1,this._$AH=x$1,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=x$1;}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,i=this,s,e){const o=this.strings;let n=!1;if(void 0===o)t=E$1(this,t,i,0),n=!d$1(t)||t!==this._$AH&&t!==T$1,n&&(this._$AH=t);else {const e=t;let l,h;for(t=o[0],l=0;l<o.length-1;l++)h=E$1(this,e[s+l],i,l),h===T$1&&(h=this._$AH[l]),n||(n=!d$1(h)||h!==this._$AH[l]),h===x$1?t=x$1:t!==x$1&&(t+=(null!=h?h:"")+o[l+1]),this._$AH[l]=h;}n&&!e&&this.k(t);}k(t){t===x$1?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"");}}class k$1 extends M$1{constructor(){super(...arguments),this.type=3;}k(t){this.element[this.name]=t===x$1?void 0:t;}}class H$1 extends M$1{constructor(){super(...arguments),this.type=4;}k(t){t&&t!==x$1?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name);}}class I$1 extends M$1{constructor(t,i,s,e,o){super(t,i,s,e,o),this.type=5;}_$AI(t,i=this){var s;if((t=null!==(s=E$1(this,t,i,0))&&void 0!==s?s:x$1)===T$1)return;const e=this._$AH,o=t===x$1&&e!==x$1||t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive,n=t!==x$1&&(e===x$1||o);o&&this.element.removeEventListener(this.name,this,e),n&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){var i,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t);}}class L$1{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){E$1(this,t);}}null===(t$2=globalThis.litHtmlPlatformSupport)||void 0===t$2||t$2.call(globalThis,V$1,S$2),(null!==(i$2=globalThis.litHtmlVersions)&&void 0!==i$2?i$2:globalThis.litHtmlVersions=[]).push("2.0.0-rc.5");

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const l$3=l=>null!=l?l:x$1;

const plusIcon = y`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>`;

class EeFab extends StyleableMixin(NativeReflectorMixin(n$3)) {
  static get styles () {
    return [
      super.styles,
      r`
        :host {
          position: fixed;
          right: 16px;
          left: initial;
          bottom: 16px;
          top: initial;
        }
      `
    ]
  }

  static get properties () {
    return {
      icon: { type: Object },
      label: { type: String }
    }
  }

  render () {
    
    return y`
      <button data-descr=${l$3(this.label)} id="native">
        ${this.icon ? this.icon : plusIcon}
      </button>
    `
  }
}
tpeRegistry.register('ee-fab', EeFab);

class EeFadeIn extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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

      `
    ]
  }

  render () {
    
    return y`
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-fade-in', EeFadeIn);

class EeToolbar extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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
      `
    ]
  }

  render () {
    
    return y`
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-toolbar', EeToolbar);

const arrowback = y`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>`;
const menu = y`<svg class="icon" height="24" viewBox="0 0 24 24" width="24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>`;

class EeHeader extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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

      `
    ]
  }

  static get properties () {
    return {
      // Users can set these attributes to get built-in basic controls and title text.
      // Otherwise, they can user their own with slot="controls" and slot="header-title"
      back: { type: Boolean, reflect: true },
      menu: { type: Boolean, reflect: true },
      backEvent: { type: Function, attribute: 'back-event' },
      menuEvent: { type: Function, attribute: 'menu-event' },
      headerTitle: { type: String, attribute: 'header-title' },
      headerSubtitle: { type: String, attribute: 'header-subtitle' }
    }
  }

  constructor () {
    super();
    this.headerTitle = '';
  }

  menuEvent () {}

  backEvent () {}

  render () {
    
    return y`
      <div id="header">
        <ee-toolbar class="toolbar">
          <div class="controls">
            ${this.menu ? y`<button class="icon" title="Menu" @click="${this._menuEvent}">${menu}</button>` : ''}
            ${this.back ? y`<button class="icon" title="Back" @click="${this._backEvent}">${arrowback}</button>` : ''}
            <slot name="controls"></slot>
          </div>
          <div header-title>
          ${this.headerTitle
            ? y`
                <h3>${this.headerTitle}</h3>
                <h5>${this.headerSubtitle ? y`<div class="subtitle">${this.headerSubtitle}</div>` : ''} <slot name="header-subtitle"></slot></h5>
            `
            : y`
              <slot name="header-title"></slot>
            `
          }
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
    `
  }

  _menuEvent () {
    this.dispatchEvent(new CustomEvent('menu-clicked', { bubbles: true, composed: true }));
    this.menuEvent();
  }

  _backEvent () {
    this.dispatchEvent(new CustomEvent('back-clicked', { bubbles: true, composed: true }));
    this.backEvent();
  }
}
tpeRegistry.register('ee-header', EeHeader);

class EeNavBar extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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
      `
    ]
  }

  static get properties () {
    return {
      selected: { type: String, reflect: true },
      selectedAttribute: { type: String },
      eventBubbles: { type: Boolean }
    }
  }

  constructor () {
    super();
    this.selected = '';
    this.eventBubbles = false;
    this.selectedAttribute = 'name';
  }

  render () {
    
    return y`
      <nav>
        <slot @slotchange="${this._manageSlotted}"></slot>
      </nav>
    `
  }

  connectedCallback () {
    super.connectedCallback();
    // Listen to local clicked-slot event
    this.addEventListener('clicked-slot', this._fireSelectedEvent);
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlotted (e) {
    const slot = e.currentTarget;
    const slotted = slot.assignedNodes();
    for (const element of slotted) {
      element.addEventListener('click', this._clickedSlotted.bind(this));
    }
  }

  // Each tab runs this and fires a clicked-slot event, which carries the selected value, It gets the value from the name attribute of the slotted "tab"
  _clickedSlotted (e) {
    console.log('slot clicked', this.selectedAttribute);
    this.dispatchEvent(new CustomEvent('clicked-slot', { detail: { event: e, selected: e.currentTarget.getAttribute(this.selectedAttribute) } }));
  }

  // This function runs when the host element receives a clicked-slot event from it's children. It sets the selected property and fires a 'selected-changed' event with that value.
  _fireSelectedEvent (e) {
    this.dispatchEvent(new CustomEvent('selected-changed', { detail: { selected: e.detail.selected } }));
    this.selected = e.detail.selected;
  }
}
tpeRegistry.register('ee-nav-bar', EeNavBar);

class EeNetwork extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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
      `
    ]
  }

  static get properties () {
    return {
      manageLoadingErrors: {
        type: Boolean,
        attribute: 'manage-loading-errors'
      },
      manageSavingErrors: {
        type: Boolean,
        attribute: 'manage-saving-errors'
      },
      retryMethod: {
        type: Function,
        attribute: false
      },
      noReloadOnTap: {
        type: Boolean,
        attribute: 'no-reload-on-tap'
      },
      status: {
        type: String,
        reflect: true
      },
      statusMessages: {
        type: Object,
        attribute: 'status-messages'
      },
      messenger: {
        type: Function,
        attribute: false
      },
      overlayClass: {
        type: String,
        attribute: false
      },
      response: { type: Function, attribute: false },
      prefetch: { type: Function, attribute: false }
    }
  }

  constructor () {
    super();
    this.manageLoadingErrors = false;
    this.manageSavingErrors = false;
    this.retryMethod = null;
    this.noReloadOnTap = false;
    this.status = 'loaded';
    this.statusMessages = {
      loading: 'Loading\u2026', // &hellip; equivalent
      saving: 'Saving\u2026', // &hellip; equivalent
      error: 'An error has occurred. Click here to try again.'
    };

    this.lastInitObject = null;
    this.lastUrl = null;
    this.response = this.prefetch = () => {};
  }

  render () {
    
    return y`
      <slot></slot>
      <div id="overlay" class="${this.overlayClass}" @click="${this._overlayClicked}">
        <div id="statusMessage">${this.statusMessages[this.status]}</div>
      </div>
    `
  }

  firstUpdated () {
    this._setOverlay();
  }

  _setOverlay () {
    switch (this.status) {
    case 'loaded':
    case 'saved':
      this.overlayClass = 'clear';
      break
    case 'loading':
    case 'saving':
      this.overlayClass = 'overlay-loading';
      break
    case 'loading-error':
      this.overlayClass = this.manageLoadingErrors ? 'overlay-error' : 'clear';
      break
    case 'saving-error':
      this.overlayClass = this.manageSavingErrors ? 'overlay-error' : 'clear';
      break
    }
  }

  /*
    TODO DOCUMENTATION:
    // EVENT LISTENING WAY. With @retry-successful="${this._refetched.bind(this)}" in ee-network
    async _retrySuccessful (e) {
      this[this.localDataProperty] = await e.detail.fetched.json()
    }

    // REFETCH WAY. WITH .retryMethod="${this._retry.bind(this)}" in ee-network
    async _retry (status, url, initObject) {
      const job = await this.fetch(url, initObject)
      this.job = await job.json()
    }
 */

  async _overlayClicked (e) {
    if (this.noReloadOnTap) return

    // Stop the event here
    e.stopPropagation();
    e.preventDefault();

    // If the status is 'error', try to reload
    if (this.status === 'loading-error' || this.status === 'saving-error') {
      if (!this.retryMethod) {
        const fetched = await this.fetch(this.lastUrl, this.lastInitObject);
        if (fetched.ok) {
          this.dispatchEvent(new CustomEvent('retry-successful', {
            detail: {
              url: this.lastUrl,
              initObject: this.lastInitObject,
              fetched
            },
            composed: true,
            bubbles: false
          }));
        }
      }
      else this.retryMethod(this.status, this.lastUrl, this.lastInitObject);
    }
  }

  response () {}

  messenger () {}

  async fetch (url, initObject = {}) {
    this.lastUrl = url;
    this.lastInitObject = initObject;

    // Work out manageErrors, which will only ever
    // applu to GET
    const fetchMethod = (initObject && initObject.method && initObject.method.toUpperCase()) || 'GET';
    const isGet = fetchMethod === 'GET';
    initObject.url = url;

    this.status = isGet ? 'loading' : 'saving';
    this._setOverlay();
    this.messenger({
      status: this.status,
      url,
      initObject,
      networkElement: this
    });
    this.prefetch(initObject);

    try {
      const response = await fetch(initObject.url, initObject);

      // console.log('Cloning the response and waiting for the text...')
      // Wait for the _actual_ data to get here
      const r2 = response.clone();
      const v = await r2.json();

      if (response.ok) {
        this.status = isGet ? 'loaded' : 'saved';
      } else {
        this.status = isGet ? 'loading-error' : 'saving-error';
      }
      this._setOverlay();
      this.messenger({
        status: this.status,
        url,
        initObject,
        response,
        networkElement: this
      });
      // Response hook
      this.response(response, v, initObject);

      return response
    } catch (e) {
      this.status = isGet ? 'loading-error' : 'saving-error';
      this._setOverlay();
      this.messenger({
        status: this.status,
        url,
        initObject,
        networkElement: this
      });
      this.response(null, null, initObject);
      throw (e)
    }
  }
}
tpeRegistry.register('ee-network', EeNetwork);

class EeRow extends StyleableMixin(n$3) {
  
  static get styles () {
    return [
      r`
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
      `
    ]
  }


  static get properties () {
    return {
      header: { type: Boolean }
    }
  }

  constructor () {
    super();
  }

  render () {
    
    return y`
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-row', EeRow);

class EeSnackBar extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
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
      `
    ]
  }

  render () {
    
    return y`
      ${this.message}
    `
  }

  static get properties () {
    return {
      active: { type: Boolean, reflect: true },
      message: { type: String }
    }
  }

  _eventListener (e) {
    const theme = e.detail.theme || 'info';
    this.setAttribute('theme', theme);
    this.message = e.detail.message;
    this.show();
  }

  connectedCallback () {
    super.connectedCallback();
    document.addEventListener('snack-bar', this.boundEventListener);
  }

  disconnectedCallback () {
    super.disconnectedCallBack();
    document.removeEventListener('snack-bar', this.boundEventListener);
  }

  constructor () {
    super();
    this.active = false;
    this.boundEventListener = this._eventListener.bind(this);
    this.intervalId = null;
  }

  show () {
    this.active = true;
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => { this.active = false; }, 3000);
  }
}

tpeRegistry.register('ee-snack-bar', EeSnackBar);

// https://css-tricks.com/snippets/css/a-guide-to-flexbox/
// https://dev.to/drews256/ridiculously-easy-row-and-column-layouts-with-flexbox-1k01

// https://github.com/Victor-Bernabe/lit-media-query/blob/master/lit-media-query.js

// eslint-disable-next-line new-cap
class EeTable extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles || [],
      r`
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
      `
    ]
  }

  static get properties () {
    return {
      small: {
        type: String
      },
      medium: {
        type: String
      }
    }
  }

  constructor () {
    super();
    this.small = 600;
    this.medium = 1024;
  }

  _changeRowsSize (size) {
    const rows = this.shadowRoot.querySelector('slot').assignedElements();
    for (const row of rows) row.setAttribute('size', size);
  }

  _handleResize () {
    if (window.matchMedia(`(max-width: ${this.small}px)`).matches) {
      this._changeRowsSize('small');
    } else if (window.matchMedia(`(max-width: ${this.medium}px)`).matches) {
      this._changeRowsSize('medium');
    } else {
      this._changeRowsSize('large');
    }
  }

  firstUpdated () {
    super.firstUpdated();
    this._handleResize();
  }

  connectedCallback () {
    super.connectedCallback();

    // Check if Visual Viewport API is supported
    const listenObject = window.visualViewport || window;
    listenObject.addEventListener('resize', () => {
      this._handleResize();
    });
  }

  render () {
    
    return y`
      <slot @slotchange="${this._slotChanged}"></slot>
    `
  }

  _slotChanged () {
    this._handleResize();
    // this._updateDragDrop()
  }
}
tpeRegistry.register('ee-table', EeTable);

class EeTabs extends StyleableMixin(n$3) {
  static get styles () {
    return [
      super.styles,
      r`
        :host {
          position: relative;
          border-bottom: 1px solid var(var(--ee-tabs-lines-color, #bbb));
        }

        :host nav {
        display: flex; 
          position: var(--ee-tabs-nav-position, sticky);
          top: var(--ee-tabs-nav-top, 0);
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
      `
    ]
  }

  static get properties () {
    return {
      useHash: { type: Boolean, attribute: 'use-hash' },
      passive: { type: Boolean },
      default: { type: String },
      nameAttribute: { type: String, attribute: 'name-attribute' },
      minWidthTabs: { type: Boolean, reflect: true, attribute: 'min-width-tabs' }
    }
  }

  constructor () {
    super();
    this.nameAttribute = 'name';
    this.useHash = false;
    this.passive = false;
  }

  /** Tabs usage
   * add elements within the ee-tabs tags to create tabs.
   * Tab elements must have an name attribute, or you can set a custom value to 'active-attribute'. Index support will be added soon
   */
  render () {
    
    return y`
    <nav>
      <slot id="tabs" @slotchange="${this._manageSlottedTabs}"></slot>
    </nav>
    <div id="contentContainer">
      <slot name="content"></slot>
    </div>
    `
  }

  _allTabs () {
    return this.shadowRoot.querySelector('slot#tabs').assignedElements()
  }

  _workoutHash () {
    let tab;
    if (this.useHash) {
      if (window.location.hash) tab = window.location.hash.substr(1);
      else if (this.default) tab = this.default;
      else tab = this._allTabs()[0];
    }
    return tab
  }

  firstUpdated () {
    super.firstUpdated();

    const tab = this._workoutHash();
    this.select(tab, false);

    window.addEventListener('popstate', e => {
      const tab = this._workoutHash();
      if (this.useHash) {
        this.select(tab, true);
      }
    });
  }

  _isActive (el) {
    return el.hasAttribute('active')
  }

  select (tab, clearAll = true) {
    let pages;

    // Find the tab. If it can't be found, end of story
    if (typeof tab === 'string') {
      tab = this._allTabs().find(i => i.getAttribute(this.nameAttribute) === tab);
    }
    if (!tab) return

    // If clearAll was passed, clear selection of tabs and (if !passive) pages
    if (clearAll) {
      pages = this.shadowRoot.querySelector('slot[name="content"]').assignedElements();

      if (!this.passive) {
        this._clearAll(this._allTabs(), pages);
      } else {
        this._clearAll(this._allTabs());
      }
    }

    // Activate the tab
    tab.toggleAttribute('active', true);
    tab.active = true;

    // If !passive, activate the corresponding page
    if (!this.passive) {
      const name = tab.getAttribute(this.nameAttribute);
      const activePage = pages.find(el => el.getAttribute(this.nameAttribute) === name);
      if (activePage) {
        activePage.toggleAttribute('active', true);
        activePage.active = true;
      }
    }
  }

  // Clear the seletecAttribute from the current active tab and page
  _clearAll (tabs, pages) {
    //
    const currentTab = tabs.find(this._isActive.bind(this));
    if (currentTab) {
      currentTab.toggleAttribute('active', false);
      currentTab.active = false;
    }

    if (!this.passive) {
      const currentPage = pages.find(this._isActive.bind(this));
      if (currentPage) {
        currentPage.toggleAttribute('active', false);
        currentPage.active = false;
      }
    }
  }

  // This adds a click event listener to all slotted children (the tabs)
  _manageSlottedTabs (e) {
    for (const element of this._allTabs()) {
      element.addEventListener('click', (e) => { this.select.bind(this)(e.currentTarget); });
      element.setAttribute('tabindex', 1);
    }

    if (!this.passive && this.default) {
      this.select(this.default, true);
    }
  }
}
tpeRegistry.register('ee-tabs', EeTabs);

// # en-form

/* globals customElements CustomEvent */
class EnForm extends StyleableMixin(n$3) {
  get reflectProperties () {
    return [...super.reflectProperties, ...formElement]
  }

  get skipProperties () {
    return [...super.skipProperties, 'elements', 'checkValidity', 'reportValidity', 'reset', 'submit']
  }

  static get properties () {
    return {

      fetchingElement: {
        type: String,
        attribute: 'fetching-element'
      },

      recordId: {
        type: String,
        attribute: 'record-id'
      },

      setFormAfterSubmit: {
        type: Boolean,
        attribute: 'set-form-after-submit'
      },

      resetFormAfterSubmit: {
        type: Boolean,
        attribute: 'reset-form-after-submit'
      },

      validateOnLoad: {
        type: Boolean,
        attribute: 'validate-on-load'
      },

      validateOnRender: {
        type: Boolean,
        attribute: 'validate-on-render'
      },

      submitCheckboxesAsNative: {
        type: Boolean,
        attribute: 'submit-checkboxes-as-native'

      },
      noAutoload: {
        type: Boolean,
        attribute: 'no-autoload'
      },

      // This will allow users to redefine methods declaratively
      presubmit: { type: Object, attribute: false },
      response: { type: Object, attribute: false },
      incomingData: { type: Object, attribute: false },
      dataLoaded: { type: Object, attribute: false },
      extrapolateErrors: { type: Object, attribute: false }

    }
  }

  constructor () {
    super();
    this.validateOnLoad = false;
    this.validateOnRender = false;
    this.fetchingElement = null;
    this.submitCheckboxesAsNative = false;
    this._boundRealtimeSubmitter = this._realTimeSubmitter.bind(this);
    this.attemptedFlight = false;
    this.inFlightMap = new WeakMap();
    this.attemptedFlightMap = new WeakMap();
    this.submitObject = {};
    // Set WAI-ARIA Role attribute as form
    this.setAttribute('role', 'form');
  }

  /**
   * These methods were originally part of nn-form
   */

  reportValidity () {
    // Check validity in form
    let valid = true;

    for (const el of this.elements) {
      if (typeof el.reportValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('');
        if (!el.reportValidity()) {
          valid = false;
        }
      }
    }
    return valid
  }

  clearAllCustomValidity (elements) {
    for (const el of elements) {
      if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');
    }
  }

  checkValidity () {
    // Check validity in form
    let valid = true;

    for (const el of this.elements) {
      if (typeof el.checkValidity === 'function') {
        // Native element may have customValidity set
        // by a server response. Clear any existing custom
        // errors and report validity
        el.setCustomValidity('');
        if (!el.checkValidity()) {
          valid = false;
        }
      }
    }
    return valid
  }

  reset () {
    // TODO: Adjust this for radios in a nice sensible way
    for (const el of this.elements) {
      const valueSource = this._getElementValueSource(el);

      // Reset validity, so that error messages are also reset
      if (typeof el.setCustomValidity === 'function') el.setCustomValidity('');

      if (this._radioElement(el)) {
        el[valueSource] = el.getAttribute(valueSource) !== null;
      } else if (this._checkboxElement(el)) {
        el[valueSource] = el.hasAttribute(valueSource);
      } else {
        el[valueSource] = el.getAttribute(valueSource);
      }
    }
  }

  createSubmitObject (elements) {
    const r = {};
    for (const el of elements) {
      const elName = el.getAttribute('name');
      // Every submit element MUST have a name set
      if (typeof elName === 'undefined' || elName === null) continue

      // Radio will only happen once thanks to checking for undefined
      if (typeof r[elName] !== 'undefined') continue
      if (el.hasAttribute('no-submit')) continue
      // Checkboxes are special: they might be handled as native ones,
      // (NOTHING set if unchecked, and their value set if checked) or
      // as booleans (true for checked, or false for unchecked)
      if (this._checkboxElement(el)) {
        if (this.submitCheckboxesAsNative) {
          // As native checkboxes.
          const val = this.getFormElementValue(elName);
          if (val) r[elName] = val;
        } else {
          // As more app-friendly boolean value
          r[elName] = !!this.getFormElementValue(elName);
        }
      // For "file" types (uploads), it will
      } else if (el.getAttribute('type') === 'file' || el.getAttribute('as-file') !== null) {
        r[elName] = el;
      } else {
        r[elName] = this.getFormElementValue(elName);
      }
    }
    return r
  }

  getFormElementValue (elName) {
    const elements = [...this.elements].filter(el => el.getAttribute('name') === elName);

    if (!elements.length) {
      console.error('Trying to set', elName, 'but no such element in form');
      return
    }

    if (elements.length === 1) {
      const el = elements[0];

      const valueSource = this._getElementValueSource(el);
      if (this._checkboxElement(el)) {
        return el[valueSource]
          ? (el.value ? el.value : 'on')
          : undefined
      } else if (this._selectElement(el)) {
        return el[valueSource]
      } else {
        return el[valueSource]
      }
    } else {
      const nonRadio = elements.filter(el => !this._radioElement(el));
      if (nonRadio.length) {
        console.error('Duplicate name', elName, 'for non-radio elements');
        return
      }

      const checked = elements.find(el => {
        const valueSource = this._getElementValueSource(el);
        return el[valueSource]
      });
      if (checked) return checked.value
      else return undefined
    }
  }

  setFormElementValue (elName, value, skipHiddenElements) {
    const el = [...this.elements].find(el => {
      if (this._radioElement(el)) {
        return el.getAttribute('name') === elName && el.value === value
      } else {
        return el.getAttribute('name') === elName
      }
    });

    // Don't do anything if the element wasn't found OR if the type was hidden
    // (which 99.9% of the time is set by the form)
    if ((!el || (el.getAttribute('type') === 'hidden')) && skipHiddenElements) return
    // Get the original value
    const valueSource = this._getElementValueSource(el);

    // CHECKBOXES
    if (this._checkboxElement(el)) {
      el[valueSource] = !!value;

    // RADIO
    // Radio elements
    } else if (this._radioElement(el)) {
      el[valueSource] = true;
      const others = [...this.elements].filter(e =>
        el !== e &&
        this._radioElement(el)
      );
      for (const other of others) other[valueSource] = false;

    // SELECT
    // Selectable elements (with prop selectedIndex)
    } else if (this._selectElement(el)) {
      if (!value) el.selectedIndex = 0;
      else el[valueSource] = value;
    // FILE INPUT
    } else if (el.getAttribute('type') === 'file' || el.getAttribute('as-file') !== null) {
      el.fileName = value;
    // Any other case
    } else {
      el[valueSource] = value;
    }
  }

  _selectElement (el) {
    if (typeof el.selectedIndex !== 'undefined' || el.hasAttribute('as-select')) return true
    return false
  }

  _checkboxElement (el) {
    if (el.getAttribute('type') === 'checkbox') return true
    if (el.hasAttribute('as-checkbox')) return true
    return false
  }

  _radioElement (el) {
    if (el.getAttribute('type') === 'radio') return true
    if (el.hasAttribute('as-radio')) return true
    return false
  }

  _getElementValueSource (el) {
    if (
      el.getAttribute('type') === 'checkbox' ||
      el.getAttribute('type') === 'radio' ||
      el.hasAttribute('as-checkbox') ||
      el.hasAttribute('as-radio')
    ) return 'checked'

    if (el.getAttribute('value-source')) return el.getAttribute('value-source')
    return 'value'
  }

  get elements () {
    // A tags (links) can have "name", filter them out
    return [...this.querySelectorAll('[name]')].filter(el => el.tagName !== 'A')
  }

  /**
   * These methods were originally part of nn-form
   * (END)
   */

  async _allChildrenCompleted () {
    // Wait for all children to be ready to rock and roll
    for (const el of this.elements) {
      // TODO: What about React, Vue, etc.? Uniform API across element libraries?
      if (typeof el.updateComplete !== 'undefined') {
        await el.updateComplete;
      }
    }
  }

  _realTimeSubmitter (e) {
    this.submit(e.target);
  }

  connectedCallback () {
    super.connectedCallback();
    this._allChildrenCompleted().then(() => {
      for (const el of this.elements) {
        const realTime = el.getAttribute('real-time') !== null;
        const realTimeEvent = el.getAttribute('real-time-event') || 'input';
        if (!realTime || !realTimeEvent) continue
        el.addEventListener(realTimeEvent, this._boundRealtimeSubmitter);
      }
    });
  }

  disconnectedCallback () {
    super.disconnectedCallback();
    for (const el of this.elements) {
      const realTime = el.getAttribute('real-time');
      if (realTime === null) continue
      const realTimeEvent = el.getAttribute('real-time-event');
      if (!realTimeEvent) continue

      el.removeEventListener(realTimeEvent, this._boundRealtimeSubmitter);
    }
  }

  async firstUpdated () {
    super.firstUpdated();

    if (this.validateOnRender) {
      await this._allChildrenCompleted();
      // Check validity
      this.reportValidity();
    }
  }

  setFormElementValues (o) {
    for (const k in o) {
      this.setFormElementValue(k, o[k], true);
    }
  }

  setRecordObject (o) {
    o = { ...o };
    const elHash = {};
    for (const el of this.elements) elHash[el.getAttribute('name')] = el;

    for (const k of Object.keys(elHash)) {
      o[k] = this.getFormElementValue(k);
    }
    return o
  }

  extrapolateErrors (o) {
    return o
  }

  async presubmit (fetchOptions) {}

  async response (response, errs, fetchOptions) {} // If (response !== null and response.ok), it worked

  async incomingData (o, op) {} // op can be 'autoload' or 'submit'

  async dataLoaded (o, op) {} // op can be 'autoload' or 'submit'

  // Disabled here is set (and checked) with both the attribute and the property
  // 'disabled' since an element might be disabled in the html, but might
  // not have had a chance to render yet (in which case, for non-native elemtns,
  // it would mean that the property is not yet there, since the reflector hasn't
  // yet run)
  _disableElements (elements) {
    this.__disabled = new WeakMap();
    for (const el of elements) {
      if (!el.disabled && !el.hasAttribute('disabled')) {
        el.setAttribute('disabled', true);
        el.disabled = true;
        this.__disabled.set(el, true);
      }
    }
  }

  _enableElements (elements) {
    this.__disabled = this.__disabled || new WeakMap();
    for (const el of elements) {
      if (this.__disabled.has(el)) {
        el.removeAttribute('disabled');
        el.disabled = false;
        this.__disabled.delete(el);
      }
    }
  }

  _fetchEl (specificElement) {
    // Tries to figure out what the fetching element is.
    // if fetching-element was passed, then it's either considered an ID
    // or the element itself.
    // Otherwise it will look for an ee-network or with an element with class
    // .network. Finally, it will use `window`
    if (specificElement) {
      let pEl;
      pEl = specificElement;
      let found = false;
      while (pEl.parentElement) {
        pEl = pEl.parentElement;
        if (pEl.tagName === 'EE-NETWORK' || pEl.classList.contains('network')) {
          found = true;
          break
        }
      }
      return found ? pEl : window
    } else {
      if (this.fetchingElement) {
        if (typeof this.fetchingElement === 'string') return this.querySelector(`#${this.fetchingElement}`)
        else return this.fetchingElement
      } else {
        let maybeNetwork = this.querySelector('ee-network');
        if (!maybeNetwork) maybeNetwork = this.querySelector('.network');
        return maybeNetwork || window
      }
    }
  }

  async _wait (ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    })
  }

  async submit (specificElement) {
    // Clear all custom validities if they are set
    // Native elements will NEED this, or any invalid state
    // will persist even if validation passes
    // Then, make up submit object and check whether reportValidity returns
    // false (which basically means "abort")
    if (specificElement) {
      this.clearAllCustomValidity([specificElement]);
      this.submitObject = this.createSubmitObject([specificElement]);
      if (typeof specificElement.reportValidity === 'function' && !specificElement.reportValidity()) return
    } else {
      this.clearAllCustomValidity(this.elements);
      this.submitObject = this.createSubmitObject(this.elements);
      if (!this.reportValidity()) return
    }

    // Give users the ability to listen to @submit and then Allow for a presubmit hook
    const submitEvent = new CustomEvent('submit', { cancelable: true, bubbles: true, composed: true });
    this.dispatchEvent(submitEvent);
    if (submitEvent.defaultPrevented) return

    // inFlightMap is a map of all connections, using the specificElement
    // as key (or "window" if there is no specific element)
    const mapIndex = specificElement || this;

    // The connection is ongoing: add a "specificElement" to the attempted
    // field, and simply return.
    // Towards the end, this function will check that "attempted" which,
    // if set, means that the form needs to be resubmitted with that
    // specificElement
    if (this.inFlightMap.has(mapIndex)) {
      this.inFlightMap.set(mapIndex, { attempted: true });
      return
    }
    this.inFlightMap.set(mapIndex, { attempted: false });

    // The element's method can only be null, POST or PUT.
    // If not null, and not "PUT", it's set to "POST"
    let elementMethod = this.getAttribute('method');
    if (elementMethod && elementMethod.toUpperCase() !== 'PUT') {
      elementMethod = 'POST';
    }

    // The 'method' attribute will have priority no matter what.
    // If `method` is not set, then it will depend on recordId (PUT if present,
    // POST if not)
    const method = elementMethod === null
      ? this.recordId ? 'PUT' : 'POST'
      : elementMethod;

    // Set the url, which will also depend on recordId
    const action = this.getAttribute('action');
    if (!action) throw new Error('The submitted form has no action URL set')
    const url = action + (this.recordId ? `/${this.recordId}` : '');

    const fetchOptions = {
      url,
      method,
      headers: { 'Content-Type': this.getAttribute('enctype') || 'application/json' },
      redirect: 'follow', // manual, *follow, error
      body: this.submitObject // body data type must match "Content-Type" header
    };

    // HOOK: Allow devs to customise the request about to be sent to the server
    await this.presubmit(fetchOptions);

    // Disable the elements
    if (!specificElement) this._disableElements(this.elements);

    // Delete the multipart/form-data header if it was set, since
    // the browser will set it (with the right boundary parameter)
    // https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
    // https://stackoverflow.com/questions/35192841/fetch-post-with-multipart-form-data
    //
    // ALSO turn body into a FormData object, with all values appended.
    // Note that for files. createSubmitObject will assign the element itself
    // as the value.
    if (fetchOptions.headers['Content-Type'] === 'multipart/form-data') {
      delete fetchOptions.headers['Content-Type'];

      const body = fetchOptions.body;
      const formData = new FormData();

      for (const k in body) {
        if (body[k] instanceof HTMLElement) {
          const filesInEl = body[k].files;
          for (const f of filesInEl) formData.append(k, f);
        } else {
          if (typeof body[k] === 'undefined' || body[k] === null) formData.append(k, '');
          else formData.append(k, body[k]);
        }
      }
      fetchOptions.body = formData;
    }

    // Attempt the submission
    let networkError = false;
    let response;
    let errs;
    const body =
      fetchOptions.headers['Content-Type'] === 'application/json' &&
      typeof fetchOptions.body === 'object' &&
      fetchOptions.body !== null
        ? JSON.stringify(fetchOptions.body)
        : fetchOptions.body;
    try {
      // fetch() wants a stingified body
      const fo = { ...fetchOptions, ...{ body: body } };
      const el = this._fetchEl(specificElement);
      response = await el.fetch(fetchOptions.url, fo);
    } catch (e) {
      console.log('ERROR!', e);
      networkError = true;
    }

    // CASE #1: network error.
    if (networkError) {
      console.log('Network error!');

      // Re-enable the elements
      if (!specificElement) {
        this._enableElements(this.elements);
        await this._wait(0);
      }

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'network' }, bubbles: true, composed: true });
      this.dispatchEvent(event);

      // Response hook
      await this.response(null, null, fetchOptions);
    //
    // CASE #2: HTTP error.
    // Invalidate the problem fields
    } else if (!response.ok) {
      //
      // Try and get the errors object from the reponse's json
      let originalErrs;
      try {
        originalErrs = await response.json();
      } catch (e) {
        originalErrs = {};
      }
      errs = this.extrapolateErrors(originalErrs) || {};

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-error', { detail: { type: 'http', response, errs }, bubbles: true, composed: true });
      this.dispatchEvent(event);

      // Re-enable the elements
      // This must happen before setCustomValidity() and reportValidity()
      if (!specificElement) {
        this._enableElements(this.elements);
        await this._wait(0);
      }

      // Set error messages
      if (errs.errors && errs.errors.length) {
        const elHash = {};
        for (const el of this.elements) {
          elHash[el.getAttribute('name')] = el;
        }
        for (const err of errs.errors) {
          const el = elHash[err.field];
          if (el && el.setCustomValidity) {
            el.setCustomValidity(err.message);
            el.reportValidity();
          }
        }
      }

      // Response hook
      await this.response(response, errs, fetchOptions);
    // CASE #3: NO error. Set fields to their
    // new values
    } else {
      // Convert the result to JSON
      const v = await response.json();

      let attempted;
      if (this.inFlightMap.has(mapIndex)) {
        attempted = this.inFlightMap.get(mapIndex).attempted;
      }

      await this.incomingData(v, 'submit');

      // HOOK Set the form values, in case the server processed some values
      // Note: this is only ever called if set-form-after-submit was
      // passed to the form.
      if (this.setFormAfterSubmit) {
        // Won't overwrite fields if another attempt is queued
        if (!attempted) {
          if (!specificElement) {
            this.setFormElementValues(v);
          } else {
            const name = mapIndex.name;
            this.setFormElementValues({ [name]: v[name] });
          }
        }
      }

      // Re-enable the elements
      if (!specificElement) {
        this._enableElements(this.elements);
        await this._wait(0);
      }

      // Maybe reset the form if it was so required
      if (this.resetFormAfterSubmit && !attempted && !specificElement) this.reset();

      await this.dataLoaded(v, 'submit');

      // Emit event to make it possible to tell the user via UI about the problem
      const event = new CustomEvent('form-ok', { detail: { response }, bubbles: true, composed: true });
      this.dispatchEvent(event);

      // Response hook
      await this.response(response, v, fetchOptions);
    }

    if (this.inFlightMap.has(mapIndex)) {
      const attempted = this.inFlightMap.get(mapIndex).attempted;
      this.inFlightMap.delete(mapIndex);
      if (attempted) {
        this.submit(specificElement);
      }
    }
  }

  async updated (changedProperties) {
    // The 'await' here has the side effect of waiting for the next tick,
    // which means that children elements will have a chance to render
    await super.updated();

    // If no-autoload is set to true, or there is no autoload or no recordId,
    // simply give up: nothing to do
    if (this.noAutoload || !changedProperties.has('recordId')) return

    // Record ID must be "something"
    if (typeof this.recordId === 'undefined' || this.recordId === null) return

    return this.preloadData()
  }

  async preloadData () {
    // Work out the action's URL, adding the record ID  at the end
    // (It will be a get)
    // If there is a result, fetch the element values
    const action = this.getAttribute('action');
    let response;
    if (action) {
      // This will make sure that the element is actually visible
      // before doing the fetch
      await this.updateComplete;

      // Disable elements
      this._disableElements(this.elements);

      // Fetch the data and trasform it to json
      let v;
      try {
        const el = this._fetchEl();
        response = await el.fetch(action + '/' + this.recordId);
        v = await response.json();
      } catch (e) {
        console.error('WARNING: Fetching element failed to fetch');
        v = {};
      }

      await this.incomingData(v, 'autoload');

      // Set values
      this.setFormElementValues(v);

      // Re-enabled all disabled fields
      this._enableElements(this.elements);
      await this._wait(0);

      // Run reportValidity if validateOnLoad is on
      if (this.validateOnLoad) {
        this.reportValidity();
      }

      // Run hook
      await this.dataLoaded(v, 'autoload');
    }
  }

  render () {
    
    return y`
      <slot></slot>
    `
  }
}
tpeRegistry.register('ee-form', EnForm);

class EnInputRange extends FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(n$3)))))) {
  static get styles () {
    return [
      super.styles,
      r`
        :host {
          display: flex;
          height: 30px;
        }

        #native {
          margin: auto 20px;
        }
      `
    ]
  }

  static get properties () {
    return {
      shownValue: {
        type: String,
        attribute: false
      }
    }
  }

  firstUpdated () {
    super.firstUpdated();
    this.shownValue = this.shadowRoot.querySelector('#native').value;
  }

  render () {
    
    return y`
      <slot @slotchange="${this.slotChanged}" id="range-amount-before" name="range-amount-before"></slot>
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input @change=${this.updateShownValue} type="range" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot @slotchange="${this.slotChanged}" id="range-amount-after" name="range-amount-after"></slot>
    `
  }

  _updateSpanInSlot (slot, value) {
    if (slot) {
      const slotContents = slot.assignedElements()[0];
      if (slotContents) {
        const amountSpan = slotContents.querySelector('span#range-amount');
        if (amountSpan) {
          amountSpan.innerHTML = Number(value);
        }
      }
    }
  }

  updateShownValue (e) {
    let slot;
    this.shownValue = e.srcElement.value;

    slot = this.shadowRoot.querySelector('slot#range-amount-before');
    this._updateSpanInSlot(slot, this.shownValue);

    slot = this.shadowRoot.querySelector('slot#range-amount-after');
    this._updateSpanInSlot(slot, this.shownValue);
  }

  slotChanged (e) {
    this._updateSpanInSlot(e.srcElement, this.shownValue);
  }
}
tpeRegistry.register('ee-input-range', EnInputRange);

class NnButton extends FormElementMixin(NativeValidatorMixin(StyleableMixin(NativeReflectorMixin(n$3)))) {
  get skipAttributes () {
    return [...super.skipAttributes, 'form']
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...buttonElement]
  }

  static get styles () {
    return [
      super.styles || [],
      r`
      /*  This is necessary as a workaround to this chrome bug:
      /   https://bugs.chromium.org/p/chromium/issues/detail?id=1061240&can=2&q=status%3Aunconfirmed&colspec=ID%20Stars%20Area%20Feature%20Status%20Summary%20Modified%20OS&sort=-id 
      */
        :host([disabled]) {
          pointer-events: none;
        }
      `
    ]
  }

  render () {
    
    return y`
      <button @click="${this._clicked}" id="native">
        <slot></slot>
      </button>
    `
  }

  _clicked (e) {
    // trigger submit on the parent form. Use requestSubmit if available
    if (this.getAttribute('type') === 'submit') {
      this.form.requestSubmit ? this.form.requestSubmit() : this.form.submit();
    }
  }
}
tpeRegistry.register('nn-button', NnButton);

class NnInputButton extends FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(n$3)))) {
  render () {
    return y`
      <input type="button" id="native">
        <slot></slot>
     `
  }

  constructor () {
    super();
  }
  
}
tpeRegistry.register('nn-input-button', NnInputButton);

// This element is a thin wrap to `<input type=text`>.

class NnInputText extends FormElementMixin(NativeValidatorMixin(StyleableMixin(LabelsMixin(InputMixin(NativeReflectorMixin(n$3)))))) {
  render () {
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input type="${this.inputType || 'text'}" id="native" real-time-event="input" >
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
      <slot id="datalist-slot" name="datalist"></slot>
    `
  }

  constructor () {
    super();
    this._boundKeyEventListener = this._eventListener.bind(this);
  }

  static get properties () {
    return {
      submitOnEnter: { type: Boolean, attribute: 'submit-on-enter' }
    }
  }

  // Submit on enter with forms with only one element
  _eventListener (e) {
    if (this.form && e.keyCode === 13 && (this.form.elements.length === 1 || this.submitOnEnter)) {
      this.form.submit();
    }
  }

  afterSettingProperty (prop, newValue) {
    super.afterSettingProperty(prop, newValue);
    // Update the form parent value if `prop` is `value`
    if (prop === 'value' && this.internals) {
      this.internals.setFormValue(this.value);
    }
  }

  firstUpdated () {
    super.firstUpdated();

    this.addEventListener('keydown', this._boundKeyEventListener);

    const slot = this.shadowRoot.querySelector('#datalist-slot');
    const slotFirstAssignedElement = slot && slot.assignedElements()[0];
    const datalistOptions = slotFirstAssignedElement && slotFirstAssignedElement.children;
    if (datalistOptions && datalistOptions.length) {
      const datalistElement = document.createElement('datalist');
      datalistElement.setAttribute('id', '_datalist');
      this.setAttribute('list', '_datalist');
      for (const el of datalistOptions) {
        const optionElement = document.createElement('option');
        optionElement.setAttribute('value', el.getAttribute('value'));
        datalistElement.appendChild(optionElement);
      }
      this.shadowRoot.appendChild(datalistElement);
    }
  }
}
tpeRegistry.register('nn-input-text', NnInputText);

class NnInputColor extends NnInputText {
  constructor () {
    super();
    this.inputType ='color';
  }
}
tpeRegistry.register('nn-input-color', NnInputColor);

class NnInputDate extends NnInputText {
  constructor () {
    super();
    this.inputType ='date';
  }
}
tpeRegistry.register('nn-input-date', NnInputDate);

class NnInputDateTimeLocal extends NnInputText {
  constructor () {
    super();
    this.inputType ='datetime-local';
  }
}
tpeRegistry.register('nn-input-datetime-local', NnInputDateTimeLocal);

class NnInputEmail extends NnInputText {
  constructor () {
    super();
    this.inputType ='email';
  }
}
tpeRegistry.register('nn-input-email', NnInputEmail);

class NnInputFile extends FormElementMixin(StyleableMixin(InputMixin(NativeReflectorMixin(n$3)))) {
  static get styles () {
    return [
      super.styles,
      r`
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
      `
    ]
  }

  static get properties () {
    return {
      hideNative: { type: Boolean },
      fileName: { type: String },
      manyFilesText: {
        type: String,
        attribute: 'many-files-text'
      },
      title: { type: String }
    }
  }

  constructor () {
    super();
    this.manyFilesText = 'Multiple';
    this.title = '';
    this.toggleAttribute('as-file', true);
  }

  render () {
    
    // From https://stackoverflow.com/a/25825731/829771
    return y`
      <input type="file" id="native" @change="${this.fileNameChanged}" ?hidden=${this.hideNative} title=${this.title}>
      ${this.fileName}
    `
  }

  fileNameChanged (e) {
    const native = this.shadowRoot.querySelector('#native');
    const v = native.value;
    if (native.files.length > 1) {
      this.fileName = this.manyFilesText + ` (${native.files.length})`;
      this.title = Array.from(native.files).map(file => file.name).join('\n');
    } else if (native.files.length === 1) { 
      this.fileName = v.slice(v.lastIndexOf('\\') + 1);
      this.title = this.fileName;
    } else {
      this.fileName = '';
      this.title = '';
    }
  }
}
tpeRegistry.register('nn-input-file', NnInputFile);

class NnInputMonth extends NnInputText {
  constructor () {
    super();
    this.inputType ='month';
  }
}
tpeRegistry.register('nn-input-month', NnInputMonth);

class NnInputNumber extends NnInputText {
  constructor () {
    super();
    this.inputType ='number';
  }
}
tpeRegistry.register('nn-input-number', NnInputNumber);

class NnInputPassword extends NnInputText {
  constructor () {
    super();
    this.inputType ='password';
  }
}
tpeRegistry.register('nn-input-password', NnInputPassword);

class NnInputRadio extends FormElementMixin(NativeValidatorMixin(LabelsMixin(StyleableMixin(InputMixin(NativeReflectorMixin(n$3)))))) {
  render () {
    
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <input as-radio value-source="checked" @change="${this._excludeOthers}" type="radio" id="native" real-time-event="input">
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  // _updateAssociatedForm () {}
  firstUpdated () {
    super.firstUpdated();
    this.setAttribute('type', 'radio');
  }

  _excludeOthers (e) {
    // Uncheck all other radio elements in the same form, with the same name, marked as `as-radio` or with type="radio"
    const others = [...this.form.children].filter(el =>
      el !== this &&
      !!el.form &&
      el.getAttribute('name') &&
      el.getAttribute('name') === this.getAttribute('name') &&
      (el.getAttribute('type') === 'radio' || el.getAttribute('as-radio') !== null)
    );
    for (const el of others) {
      const prop = el.getAttribute('value-source') || 'checked';
      el[prop] = false;
    }

    if (this.internals) {
      this.internals.setFormValue(this.checked ? this.value : null);
    }
  }
}
tpeRegistry.register('nn-input-radio', NnInputRadio);

class NnInputRange extends NnInputText {
  constructor () {
    super();
    this.inputType ='range';
  }
}
tpeRegistry.register('nn-input-range', NnInputRange);

class NnInputSearch extends NnInputText {
  constructor () {
    super();
    this.type= 'search';
  }
}
tpeRegistry.register('nn-input-search', NnInputSearch);

class NnInputSubmit extends FormElementMixin(NativeValidatorMixin(InputMixin(NativeReflectorMixin(n$3)))) {
  render () {
    
    return y`
      <input @click="${this._formSubmit}" type="submit" id="native">
    `
  }

  _formSubmit (e) {
    if (this.form) {
      this.form.submit();
    }
  }
}
tpeRegistry.register('nn-input-submit', NnInputSubmit);

class NnInputTel extends NnInputText {
  constructor () {
    super();
    this.type= 'tel';
  }
}
tpeRegistry.register('nn-input-tel', NnInputTel);

class NnInputTime extends NnInputText {
  constructor () {
    super();
    this.type= 'time';
  }
}
tpeRegistry.register('nn-input-time', NnInputTime);

class NnInputUrl extends NnInputText {
  constructor () {
    super();
    this.type= 'url';
  }
}
tpeRegistry.register('nn-input-url', NnInputUrl);

class NnInputWeek extends NnInputText {
  constructor () {
    super();
    this.type= 'week';
  }
}
tpeRegistry.register('nn-input-week', NnInputWeek);

class NnMeter extends StyleableMixin(LabelsMixin(NativeReflectorMixin(n$3))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...meterElement]
  }

  render () {
    
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <meter id="native" real-time-event="input"></meter>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-meter', NnMeter);

class NnProgress extends StyleableMixin(LabelsMixin(NativeReflectorMixin(n$3))) {
  static get properties () {
    return {
    }
  }

  static get styles () {
    return [
      r`
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
      `
    ]
  }

  get reflectProperties () {
    return [...super.reflectProperties, ...progressElement]
  }

  render () {
    
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <progress id="native" real-time-event="input"></progress>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}
tpeRegistry.register('nn-progress', NnProgress);

class NnSelect extends FormElementMixin(NativeValidatorMixin(LabelsMixin(InputMixin(NativeReflectorMixin(n$3))))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...selectElement]
  }

  render () {
    
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <div style="display: none">
        <slot id="slot" @slotchange="${this.refreshOptions}"></slot>
      </div>
      <select id="native" real-time-event="selected"></select>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }

  async refreshOptions (e) {
    const select = this.shadowRoot.querySelector('#native');
    const slot = this.shadowRoot.querySelector('#slot');
    if (!select || !slot) return

    const options = slot.assignedElements();
    select.innerHTML = '';
    // while (select.firstChild) {
    //   if (!select.lastChild.value) break
    //   select.removeChild(select.lastElementChild)
    // }
    for (const option of options) {
      select.appendChild(option.cloneNode(true));
    }

    // The element's value depends on what it can contain. For example
    // the first selected option will be the element's value.
    // The assign will ensure that the value is updated as a property
    // This will trigger the setter, which will in turn trigger
    // `afterSettingProperty` (which is used for example by
    // AddHasValueAttributeMixin to set the has-value property)
    //
    this.value = this.value; // eslint-disable-line
  }
}
tpeRegistry.register('nn-select', NnSelect);

class NnTextarea extends StyleableMixin(FormElementMixin(NativeValidatorMixin(LabelsMixin(InputMixin(NativeReflectorMixin(n$3)))))) {
  get reflectProperties () {
    return [...super.reflectProperties, ...textareaElement]
  }

  render () {
    
    return y`
      ${this.ifLabelBefore}
      ${this.ifValidationMessageBefore}
      <textarea name="" id="native" real-time-event="input"></textarea>
      ${this.ifValidationMessageAfter}
      ${this.ifLabelAfter}
    `
  }
}

tpeRegistry.register('nn-textarea', NnTextarea);

// Importing this file will import tpe AND will define all elements
tpeRegistry.defineAll();
