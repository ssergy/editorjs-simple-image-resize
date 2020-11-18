!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SimpleImage=t():e.SimpleImage=t()}(window,function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){function i(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a,s;n(1).toString();var c=function(){function e(t){var n=this,i=t.data,r=(t.config,t.api);!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),o(this,"initializeImageResize",function(e){n.disableImageSettingsTools(),a=e.clientX,s=parseInt(document.defaultView.getComputedStyle(n.nodes.imageHolder).width,10),n.triggerImageResizeEvents(),e.preventDefault()}),o(this,"startResize",function(e){var t=n.nodes.image.naturalWidth,i=n.nodes.image.naturalHeight,r=s+e.clientX-a,o=i/t,c="".concat(r,"px"),l="".concat(Math.round(r*o),"px");n.nodes.imageHolder.style.width=c,n.nodes.imageHolder.style.height=l,n.nodes.image.setAttribute("width",c),n.nodes.image.setAttribute("height",l)}),o(this,"stopResize",function(){window.document.removeEventListener("mousemove",n.startResize,!1)}),this.api=r,this.blockIndex=this.api.blocks.getCurrentBlockIndex()+1,this.CSS={baseClass:this.api.styles.block,loading:this.api.styles.loader,input:this.api.styles.input,settingsButton:this.api.styles.settingsButton,settingsButtonActive:this.api.styles.settingsButtonActive,wrapper:"cdx-simple-image",imageHolder:"cdx-simple-image__picture",caption:"cdx-simple-image__caption",resizeEnabled:"cdx-simple-image__resize",resizePoint:"resize-point"},this.nodes={wrapper:null,imageHolder:null,image:null,caption:null,width:null,height:null,resizeElementPointer:null},this.data={url:i.url||"",caption:i.caption||"",withBorder:void 0!==i.withBorder&&i.withBorder,withBackground:void 0!==i.withBackground&&i.withBackground,stretched:void 0!==i.stretched&&i.stretched,width:void 0!==i.width?i.width:"100%",height:void 0!==i.height?i.height:"100%"},this.settings=[{name:"withBorder",icon:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z"/></svg>'},{name:"stretched",icon:'<svg width="17" height="10" viewBox="0 0 17 10" xmlns="http://www.w3.org/2000/svg"><path d="M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z"/></svg>'},{name:"withBackground",icon:'<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z"/></svg>'}]}var t,n,c;return t=e,c=[{key:"sanitize",get:function(){return{url:{},withBorder:{},withBackground:{},stretched:{},caption:{br:!0}}}},{key:"pasteConfig",get:function(){return{patterns:{image:/https?:\/\/\S+\.(gif|jpe?g|tiff|png)$/i},tags:["img"],files:{mimeTypes:["image/*"]}}}}],(n=[{key:"render",value:function(){var e=this,t=this._make("div",[this.CSS.baseClass,this.CSS.wrapper]),n=this._make("div",this.CSS.loading),i=this._make("div",[this.CSS.imageHolder,this.CSS.resizeEnabled],{width:this.data.width,height:this.data.height}),r=this._make("img","",{width:this.data.width,height:this.data.height}),o=this._make("div",this.CSS.resizePoint),a=this._make("div",[this.CSS.input,this.CSS.caption],{contentEditable:"true",innerHTML:this.data.caption||""});return a.dataset.placeholder="Enter a caption",t.appendChild(n),this.data.url&&(r.src=this.data.url),r.onload=function(){t.classList.remove(e.CSS.loading),i.appendChild(r),i.appendChild(o),t.appendChild(i),t.appendChild(a),n.remove(),e._acceptTuneView()},r.onerror=function(e){console.log("Failed to load an image",e)},this.nodes.imageHolder=i,this.nodes.wrapper=t,this.nodes.image=r,this.nodes.caption=a,this.nodes.resizeElementPointer=o,this.nodes.resizeElementPointer.addEventListener("mousedown",this.initializeImageResize),t}},{key:"disableImageSettingsTools",value:function(){var e=this;Object.keys(this.data).forEach(function(t){e.data[t]&&e._toggleTune(t)})}},{key:"save",value:function(e){var t=e.querySelector("img"),n=e.querySelector("."+this.CSS.input);return t?Object.assign(this.data,{url:t.src,caption:n.innerHTML,width:"".concat(t.width,"px"),height:"".concat(t.height,"px")}):this.data}},{key:"onDropHandler",value:function(e){var t=new FileReader;return t.readAsDataURL(e),new Promise(function(n){t.onload=function(t){n({url:t.target.result,caption:e.name})}})}},{key:"onPaste",value:function(e){var t=this;switch(e.type){case"tag":var n=e.detail.data;this.data={url:n.src};break;case"pattern":var i=e.detail.data;this.data={url:i};break;case"file":var r=e.detail.file;this.onDropHandler(r).then(function(e){t.data=e})}}},{key:"renderSettings",value:function(){var e=this,t=document.createElement("div");return this.settings.forEach(function(n){var i=document.createElement("div");i.classList.add(e.CSS.settingsButton),i.innerHTML=n.icon,i.addEventListener("click",function(){e._toggleTune(n.name),i.classList.toggle(e.CSS.settingsButtonActive)}),i.classList.toggle(e.CSS.settingsButtonActive,e.data[n.name]),t.appendChild(i)}),t}},{key:"_make",value:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=document.createElement(e);Array.isArray(n)?(t=o.classList).add.apply(t,i(n)):n&&o.classList.add(n);for(var a in r)o[a]=r[a],"width"===a&&("IMG"===o.tagName?o.setAttribute("width",r.width):o.style.width=r.width),"height"===a&&("IMG"===o.tagName?o.setAttribute("height",r.height):o.style.height=r.height);return o}},{key:"_toggleTune",value:function(e){this.data[e]=!this.data[e],this._acceptTuneView()}},{key:"triggerImageResizeEvents",value:function(){window.document.addEventListener("mousemove",this.startResize,!1),window.document.addEventListener("mouseup",this.stopResize,!1)}},{key:"_acceptTuneView",value:function(){var e=this;this.settings.forEach(function(t){e.nodes.imageHolder.classList.toggle(e.CSS.imageHolder+"--"+t.name.replace(/([A-Z])/g,function(e){return"-".concat(e[0].toLowerCase())}),!!e.data[t.name]),"stretched"===t.name&&e.api.blocks.stretchBlock(e.blockIndex,!!e.data.stretched)})}},{key:"data",get:function(){return this._data},set:function(e){this._data=Object.assign({},this.data,e),this.nodes.image&&(this.nodes.image.src=this.data.url),this.nodes.caption&&(this.nodes.caption.innerHTML=this.data.caption)}}])&&r(t.prototype,n),c&&r(t,c),e}();e.exports=c},function(e,t,n){var i=n(2);"string"==typeof i&&(i=[[e.i,i,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(4)(i,r);i.locals&&(e.exports=i.locals)},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,".cdx-simple-image {}\n\n.cdx-simple-image .cdx-loader {\n  min-height: 200px;\n}\n\n.cdx-simple-image .cdx-input {\n  margin-top: 10px;\n}\n\n.cdx-simple-image img {\n  max-width: 100%;\n  vertical-align: bottom;\n  height: auto;\n}\n\n.cdx-simple-image__caption[contentEditable=true][data-placeholder]:empty::before {\n  position: absolute;\n  content: attr(data-placeholder);\n  color: #707684;\n  font-weight: normal;\n  opacity: 0;\n }\n\n.cdx-simple-image__caption[contentEditable=true][data-placeholder]:empty::before {\n  opacity: 1;\n}\n\n.cdx-simple-image__caption[contentEditable=true][data-placeholder]:empty:focus::before {\n  opacity: 0;\n}\n\n\n.cdx-simple-image__picture--with-background {\n  background: #eff2f5;\n  padding: 10px;\n}\n\n.cdx-simple-image__picture--with-background img {\n  display: block;\n  max-width: 60%;\n  margin: 0 auto;\n}\n\n.cdx-simple-image__picture--with-border {\n  border: 1px solid #e8e8eb;\n  padding: 1px;\n}\n\n.cdx-simple-image__picture--stretched img {\n  max-width: none;\n  width: 100%;\n}\n\n.cdx-simple-image__picture {\n  position: relative;\n  border: 2px solid transparent;\n}\n .cdx-simple-image__resize:hover, .cdx-simple-image__picture:active {\n  border: 2px solid rgb(23, 90,226);\n}\n\n.cdx-simple-image__picture .resize-point {\n  visibility: hidden;\n}\n\n.cdx-simple-image__picture:hover .resize-point, .cdx-simple-image__picture:active .resize-point {\n  visibility: visible;\n  width: 10px;\n  height: 10px;\n  position: absolute;\n  background: rgb(23, 90,226);\n  right: 0;\n  bottom: 0;\n  cursor: se-resize;\n}\n",""])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map(function(t){var n=function(e,t){var n=e[1]||"",i=e[3];if(!i)return n;if(t&&"function"==typeof btoa){var r=(a=i,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),o=i.sources.map(function(e){return"/*# sourceURL="+i.sourceRoot+e+" */"});return[n].concat(o).concat([r]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n}).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<e.length;r++){var a=e[r];"number"==typeof a[0]&&i[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}},function(e,t,n){var i,r,o={},a=(i=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=i.apply(this,arguments)),r}),s=function(e){var t={};return function(e){if("function"==typeof e)return e();if(void 0===t[e]){var n=function(e){return document.querySelector(e)}.call(this,e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}}(),c=null,l=0,d=[],u=n(5);function h(e,t){for(var n=0;n<e.length;n++){var i=e[n],r=o[i.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++)r.parts[a](i.parts[a]);for(;a<i.parts.length;a++)r.parts.push(b(i.parts[a],t))}else{var s=[];for(a=0;a<i.parts.length;a++)s.push(b(i.parts[a],t));o[i.id]={id:i.id,refs:1,parts:s}}}}function p(e,t){for(var n=[],i={},r=0;r<e.length;r++){var o=e[r],a=t.base?o[0]+t.base:o[0],s={css:o[1],media:o[2],sourceMap:o[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}function f(e,t){var n=s(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var i=d[d.length-1];if("top"===e.insertAt)i?i.nextSibling?n.insertBefore(t,i.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),d.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=s(e.insertInto+" "+e.insertAt.before);n.insertBefore(t,r)}}function g(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=d.indexOf(e);t>=0&&d.splice(t,1)}function m(e){var t=document.createElement("style");return void 0===e.attrs.type&&(e.attrs.type="text/css"),v(t,e.attrs),f(e,t),t}function v(e,t){Object.keys(t).forEach(function(n){e.setAttribute(n,t[n])})}function b(e,t){var n,i,r,o;if(t.transform&&e.css){if(!(o=t.transform(e.css)))return function(){};e.css=o}if(t.singleton){var a=l++;n=c||(c=m(t)),i=x.bind(null,n,a,!1),r=x.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",v(t,e.attrs),f(e,t),t}(t),i=function(e,t,n){var i=n.css,r=n.sourceMap,o=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||o)&&(i=u(i));r&&(i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var a=new Blob([i],{type:"text/css"}),s=e.href;e.href=URL.createObjectURL(a),s&&URL.revokeObjectURL(s)}.bind(null,n,t),r=function(){g(n),n.href&&URL.revokeObjectURL(n.href)}):(n=m(t),i=function(e,t){var n=t.css,i=t.media;i&&e.setAttribute("media",i);if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,n),r=function(){g(n)});return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=a()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=p(e,t);return h(n,t),function(e){for(var i=[],r=0;r<n.length;r++){var a=n[r];(s=o[a.id]).refs--,i.push(s)}e&&h(p(e,t),t);for(r=0;r<i.length;r++){var s;if(0===(s=i[r]).refs){for(var c=0;c<s.parts.length;c++)s.parts[c]();delete o[s.id]}}}};var w,y=(w=[],function(e,t){return w[e]=t,w.filter(Boolean).join("\n")});function x(e,t,n,i){var r=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=y(t,r);else{var o=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,i=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,function(e,t){var r,o=t.trim().replace(/^"(.*)"$/,function(e,t){return t}).replace(/^'(.*)'$/,function(e,t){return t});return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(o)?e:(r=0===o.indexOf("//")?o:0===o.indexOf("/")?n+o:i+o.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")})}}])});