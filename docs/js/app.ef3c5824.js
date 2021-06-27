(function(e){function t(t){for(var o,s,c=t[0],r=t[1],l=t[2],u=0,f=[];u<c.length;u++)s=c[u],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(o in r)Object.prototype.hasOwnProperty.call(r,o)&&(e[o]=r[o]);d&&d(t);while(f.length)f.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,c=1;c<n.length;c++){var r=n[c];0!==a[r]&&(o=!1)}o&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var o={},a={app:0},i=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)s.d(n,o,function(t){return e[t]}.bind(null,o));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],r=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var d=r;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0211":function(e,t,n){"use strict";n("061c")},"061c":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var o=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container-fluid"},[n("h3",{staticClass:"my-3"},[e._v("MochiMochi - ココフォリアログ整形ツール")]),e._m(0),n("div",{staticClass:"row mt-3"},[n("div",{staticClass:"col-md-12"},[n("ccfolia-formatter")],1)])])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("small",[e._v(" 自分用に作ったログ整形ツールです。ココフォリアのログファイルを読み込ませて整形！ボタンを押すとダウンロードできます。"),n("br"),e._v(" システムに「その他」以外を選択した場合は、ダイス結果も見られます。 ")])}],s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-form",{ref:"ccfoliaLog",staticClass:"mb-5",attrs:{model:e.ccfoliaLog}},[n("el-form-item",{attrs:{prop:"system"}},[n("el-select",{model:{value:e.ccfoliaLog.system,callback:function(t){e.$set(e.ccfoliaLog,"system",t)},expression:"ccfoliaLog.system"}},e._l(e.systems,(function(e){return n("el-option",{key:e.key,attrs:{label:e.name,value:e.key}})})),1)],1),n("el-form-item",{attrs:{prop:"file"}},[n("el-upload",{attrs:{drag:"",action:"","auto-upload":!1,"on-change":e.handleChangeFile}},[n("i",{staticClass:"el-icon-upload"}),n("div",{staticClass:"el-upload__text"},[e._v("Drop file here or "),n("em",[e._v("click to upload")])])])],1),n("div",{directives:[{name:"show",rawName:"v-show",value:e.ccfoliaLog.rows.length>0,expression:"ccfoliaLog.rows.length > 0"}]},["other"!=e.ccfoliaLog.system?n("el-card",{staticClass:"mb-3",attrs:{shadow:"never"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("ダイス結果 "),n("el-tooltip",{attrs:{effect:"dark",placement:"top-start",content:"ダイス結果だけまとめて見られます。"}},[n("el-button",{attrs:{icon:"el-icon-question",type:"text"}})],1)],1)]),n("el-radio-group",{attrs:{size:"mini"},model:{value:e.selectedDiceResult,callback:function(t){e.selectedDiceResult=t},expression:"selectedDiceResult"}},e._l(e.system.diceResults,(function(t){return n("el-radio-button",{key:t.key,attrs:{label:t.key}},[e._v(e._s(t.name))])})),1),n("el-checkbox-group",{model:{value:e.selectedDiceTabs,callback:function(t){e.selectedDiceTabs=t},expression:"selectedDiceTabs"}},[n("el-checkbox",{attrs:{label:"メイン"}}),n("el-checkbox",{attrs:{label:"情報"}}),n("el-checkbox",{attrs:{label:"雑談"}}),e._l(e.ccfoliaLog.tabs,(function(e,t){return n("el-checkbox",{key:t,attrs:{label:e.name}})}))],2),n("el-checkbox-group",{model:{value:e.selectedNameTabs,callback:function(t){e.selectedNameTabs=t},expression:"selectedNameTabs"}},e._l(e.names,(function(e,t){return n("el-checkbox",{key:t,attrs:{label:e}})})),1),n("small",[e._v("計")]),e._v(" "+e._s(e.diceRows.length)+" "),n("small",[e._v("回")]),e._l(e.diceRows,(function(t,o){return n("div",{key:o},[n("div",{style:"color:"+t.color},[e._v(" ["+e._s(t.tab_name)+"] "+e._s(t.name)+"： "),n("span",{domProps:{innerHTML:e._s(t.body)}})])])}))],2):e._e(),n("el-card",{staticClass:"mb-3",attrs:{shadow:"never"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("ヘッダー設定 "),n("el-tooltip",{attrs:{effect:"dark",placement:"top-start"}},[n("div",{attrs:{slot:"content"},slot:"content"},[e._v("ヘッダー色とタイトルの設定ができます。"),n("br"),e._v("色は左と真ん中が背景色、右が文字色です。")]),n("el-button",{attrs:{icon:"el-icon-question",type:"text"}})],1)],1)]),n("el-color-picker",{attrs:{predefine:e.predefineColors},model:{value:e.ccfoliaLog.header_color1,callback:function(t){e.$set(e.ccfoliaLog,"header_color1",t)},expression:"ccfoliaLog.header_color1"}}),n("el-color-picker",{attrs:{predefine:e.predefineColors},model:{value:e.ccfoliaLog.header_color2,callback:function(t){e.$set(e.ccfoliaLog,"header_color2",t)},expression:"ccfoliaLog.header_color2"}}),n("el-color-picker",{attrs:{predefine:e.predefineColors},model:{value:e.ccfoliaLog.link_color,callback:function(t){e.$set(e.ccfoliaLog,"link_color",t)},expression:"ccfoliaLog.link_color"}}),n("el-input",{staticClass:"mb-2",model:{value:e.ccfoliaLog.title,callback:function(t){e.$set(e.ccfoliaLog,"title",t)},expression:"ccfoliaLog.title"}}),n("div",{staticClass:"mb-3",style:"background:linear-gradient("+e.ccfoliaLog.header_color1+","+e.ccfoliaLog.header_color2+");color:"+e.ccfoliaLog.link_color},[n("div",{staticClass:"p-2"},[e._v(e._s(e.ccfoliaLog.title))]),n("div",{staticClass:"p-2"},e._l(e.dividerRows,(function(t){return n("span",{key:t.name},[e._v(e._s(t.name)+" ")])})),0)])],1),n("el-card",{directives:[{name:"show",rawName:"v-show",value:e.ccfoliaLog.tabs.length>0,expression:"ccfoliaLog.tabs.length > 0"}],staticClass:"mb-3",attrs:{shadow:"never"}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("タブ色設定 "),n("el-tooltip",{attrs:{effect:"dark",placement:"top-start"}},[n("div",{attrs:{slot:"content"},slot:"content"},[e._v("雑談、情報以外のタブの色の設定ができます。"),n("br"),e._v("左側がラインの色、右側が背景色です。")]),n("el-button",{attrs:{icon:"el-icon-question",type:"text"}})],1)],1)]),e._l(e.ccfoliaLog.tabs,(function(t){return n("div",{key:t.name},[n("el-color-picker",{attrs:{predefine:e.predefineColors},model:{value:t.line_color,callback:function(n){e.$set(t,"line_color",n)},expression:"tab.line_color"}}),n("el-color-picker",{attrs:{predefine:e.predefineColors},model:{value:t.background_color,callback:function(n){e.$set(t,"background_color",n)},expression:"tab.background_color"}}),n("div",{staticClass:"mb-3",style:"font-size:13px;background-color:"+t.background_color+";border-left:solid 2px "+t.line_color+";"},[n("div",{staticClass:"p-2"},[e._v(e._s(t.name))])])],1)}))],2),n("el-card",{staticClass:"mb-4",attrs:{shadow:"never","body-style":{height:"95vh","overflow-y":"scroll"}}},[n("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[n("span",[e._v("ログ全文 "),n("el-tooltip",{attrs:{effect:"dark",placement:"top-start"}},[n("el-button",{attrs:{icon:"el-icon-question",type:"text"}}),n("div",{attrs:{slot:"content"},slot:"content"},[e._v("+ボタンを押すとログに区切りを追加することができます。ヘッダーにもリンクが追加されます。"),n("br"),e._v("行ごと掴んで順序を入れ替えることができます。")])],1)],1)]),n("draggable",{attrs:{options:{animation:200},list:e.ccfoliaLog.rows}},e._l(e.ccfoliaLog.rows,(function(t,o){return n("div",{key:o,staticClass:"my-1"},[t.is_divider?e._e():n("div",{staticClass:"draggable",style:"color:"+t.color+";background-color:"+e.backgroundColor(t.tab_name)},[n("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.addRow(o)}}},[e._v("+")]),e._v(" ["+e._s(t.tab_name)+"] "+e._s(t.name)+"： "),n("span",{domProps:{innerHTML:e._s(t.body)}})],1),t.is_divider?n("div",[n("el-row",{attrs:{gutter:5}},[n("el-col",{attrs:{span:1}},[n("el-button",{attrs:{size:"mini"},on:{click:function(t){return e.addRow(o)}}},[e._v("+")])],1),n("el-col",{attrs:{span:2}},[n("el-input",{attrs:{size:"mini",placeholder:"リンク名"},model:{value:t.name,callback:function(n){e.$set(t,"name",n)},expression:"row.name"}})],1),n("el-col",{attrs:{span:10}},[n("el-input",{attrs:{size:"mini",placeholder:"表示名"},model:{value:t.body,callback:function(n){e.$set(t,"body",n)},expression:"row.body"}})],1),n("el-col",{attrs:{span:1}},[n("el-button",{attrs:{size:"mini",icon:"el-icon-delete"},on:{click:function(t){return e.removeRow(o)}}})],1)],1)],1):e._e()])})),0)],1)],1),n("el-button",{staticClass:"px-5",attrs:{type:"primary",disabled:e.ccfoliaLog.rows.length<=0},on:{click:e.postCcfoliaLog}},[e._v("整形！")])],1),n("el-divider"),n("small",[n("div",[e._v("最終更新: 2021-06-27 "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(t){e.drawer=!0}}},[e._v("履歴")])],1),e._m(0)]),n("el-drawer",{attrs:{title:"履歴",visible:e.drawer},on:{"update:visible":function(t){e.drawer=t}}},[n("ul",{staticStyle:{"font-size":"0.9em"}},[n("li",[e._v("2021-02-23 公開")]),n("li",[e._v("2021-02-27 一行のダイス結果表記に対応")]),n("li",[e._v("2021-03-13 本文の順序を入れ替える機能を追加")]),n("li",[e._v("2021-03-15 リンクが効かない不具合の修正")]),n("li",[e._v("2021-03-29 エモクロアTRPGに対応")]),n("li",[e._v("2021-06-06 ダイス結果を名前で絞り込めるように変更")]),n("li",[e._v("2021-06-27 背景色が編集パネルに反映されるように変更")])])])],1)},c=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"mb-4"},[e._v("Twitter: "),n("a",{attrs:{href:"https://twitter.com/inouemoku",target:"_blank"}},[e._v("@inouemoku")])])}],r=n("2909"),l=(n("a434"),n("5319"),n("ac1f"),n("b0c0"),n("7db0"),n("99af"),n("2b3d"),n("d3b7"),n("3ca3"),n("ddb0"),n("d81d"),n("fb6a"),n("466d"),n("6062"),n("4de4"),n("13d5"),n("4d63"),n("25f0"),n("a15b"),n("caad"),n("2532"),n("b76a")),d=n.n(l),u=n("d4ec"),f=n("bee2"),m=(n("c740"),function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(u["a"])(this,e),this._key=this.paramFromObject(t,"key"),this._color=this.paramFromObject(t,"color"),this._tab_name=this.paramFromObject(t,"tab_name"),this._name=this.paramFromObject(t,"name"),this._body=this.paramFromObject(t,"body"),this._is_divider=this.paramFromObject(t,"is_divider"),this._dice_type=this.paramFromObject(t,"dice_type"),this._is_oneline=this.paramFromObject(t,"is_oneline")}return Object(f["a"])(e,[{key:"paramFromObject",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return null==e||null==e[t]?n:e[t]}},{key:"format",value:function(e,t){if(this.is_divider)return'\n    <h2 id="key'.concat(this.key,'" class="day">').concat(this.body,'</h2><hr class="day-line">\n');var n=this.dice_type?this.dice_type.class:"",o=this.body;if("coc6"==e&&(o=this.is_oneline?this.body.replace(/(.*)\((.*)\)(.*)＞ (.*)/,'$1<br>\n<span class="dice '.concat(n,'">($2)$3＞ $4</span>')):this.body.replace(/(.*)\nCthulhu : (.*)/,'$1<br>\n<span class="dice '.concat(n,'">Cthulhu :$2\n</span>'))),"emoklore"==e){var a=/(.*)\((.*)\) ＞ \((.*)\) ＞ (.*)/;o=a.test(this.body)?this.body.replace(a,'$1<br>\n<span class="dice '.concat(n,'">($2) ＞ ($3) ＞ $4</span>')):this.body.replace(/(.*)\((.*)\)(.*)＞ (.*)/,'$1<br>\n<span class="dice '.concat(n,'">($2)$3＞ $4</span>'))}return'\n      <div class="'.concat(this.class_name(t),'" style="color:').concat(this.color,';">\n        <span class="name-field"><span class="name"><span>').concat(this.name,'</span> :</span></span>\n        <span class="text">').concat(o,"</span>\n      </div>\n")}},{key:"class_name",value:function(e){var t=this;return"メイン"==this.tab_name||null==this.tab_name||""==this.tab_name?"":"雑談"==this.tab_name?"other":"情報"==this.tab_name?"info":(console.log(e),"secret tab".concat(e.findIndex((function(e){return e.name==t.tab_name}))))}},{key:"key",get:function(){return this._key},set:function(e){this._key=e}},{key:"color",get:function(){return this._color},set:function(e){this._color=e}},{key:"tab_name",get:function(){return this._tab_name},set:function(e){this._tab_name=e}},{key:"name",get:function(){return this._name},set:function(e){this._name=e}},{key:"body",get:function(){return this._body},set:function(e){this._body=e}},{key:"is_divider",get:function(){return this._is_divider},set:function(e){this._is_divider=e}},{key:"dice_type",get:function(){return this._dice_type},set:function(e){this._dice_type=e}},{key:"is_oneline",get:function(){return this._is_oneline},set:function(e){this._is_oneline=e}}],[{key:"fromObject",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new e(t)}}]),e}()),p=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;Object(u["a"])(this,e),this._file=this.paramFromObject(t,"file"),this._system=this.paramFromObject(t,"system","coc6"),this._header_color1=this.paramFromObject(t,"header_color1","#000"),this._header_color2=this.paramFromObject(t,"header_color2","#2E9BB1"),this._link_color=this.paramFromObject(t,"link_color","#fff"),this._title=this.paramFromObject(t,"title","【CoC】タイトル"),this._tabs=this.paramFromObject(t,"tabs",[]),this._doc="",this._rows=t?t["rows"].map((function(e){return m.fromObject(e)})):[]}return Object(f["a"])(e,[{key:"paramFromObject",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;return null==e||null==e[t]?n:e[t]}},{key:"doc",get:function(){return this._doc},set:function(e){this._doc=e}},{key:"file",get:function(){return this._file},set:function(e){this._file=e}},{key:"system",get:function(){return this._system},set:function(e){this._system=e}},{key:"header_color1",get:function(){return this._header_color1},set:function(e){this._header_color1=e}},{key:"header_color2",get:function(){return this._header_color2},set:function(e){this._header_color2=e}},{key:"link_color",get:function(){return this._link_color},set:function(e){this._link_color=e}},{key:"title",get:function(){return this._title},set:function(e){this._title=e}},{key:"tabs",get:function(){return this._tabs},set:function(e){this._tabs=e}},{key:"rows",get:function(){return this._rows},set:function(e){this._rows=e}},{key:"format",value:function(){var e=this,t=this.rows.filter((function(e){return e.is_divider})),n=t.map((function(e){return'      <a href="#key'.concat(e.key,'">').concat(e.name,"</a>")})).join("\n"),o="";return this.tabs&&(o=this.tabs.reduce((function(e,t,n){return e+="\n  .tab".concat(n," {\n    background-color: ").concat(t.background_color,";\n    border-left:solid 2px ").concat(t.line_color,";\n  }\n"),e}),"")),'\n<!DOCTYPE html>\n<html lang="ja">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <meta http-equiv="X-UA-Compatible" content="ie=edge" />\n    <title>'.concat(this.title,'</title>\n  </head>\n  <header id="header">\n    <h1>').concat(this.title,'</h1>\n    <div class="menu">\n').concat(n,'\n    </div>\n  </header>\n  <body>\n    <div class="main">\n').concat(this.rows.map((function(t){return t.format(e.system,e.tabs)})).join("\n"),'\n    </div>\n  </body>\n</html>\n<style type="text/css">\n  * {\n    margin: 0px;\n    padding: 0px;\n    font-family: sans-serif;\n  }\n  #header {\n    background: linear-gradient(').concat(this.header_color1,",").concat(this.header_color2,");\n    position: fixed;\n    width: 100%;\n    padding:10px;\n    opacity: 0.8;\n  }\n  #header a {\n    color: ").concat(this.link_color,";\n    text-decoration: none;\n    font-size: 14px;\n  }\n  #header a:hover{\n    text-decoration: underline;\n  }\n  h1 {\n    font-size: 18px;\n    color:#fff;\n    font-weight:normal\n  }\n  h2 {\n    font-size: 16px;\n    text-align: center;\n  }\n  .menu {\n    padding-left: 10px;\n  }\n  /* ダイスロール結果 */\n  .dice {\n    font-weight: bold;\n    color: #555;\n  }\n  .dice.success {\n    color: #2196f3;\n  }\n  .dice.failed {\n    color: #f50057;\n  }\n  .main {\n    padding: 10px 1em 100px;\n    padding-bottom: 100px;\n    font-size: 14px;\n  }\n  .main div {\n    padding-top: 5px;\n    padding-bottom: 5px;\n  }\n  /* 情報タブ */\n  .info {\n    background-color: #fafafa;\n    border-left:solid 2px #bbb;    \n  }\n  /* 雑談タブ */\n  .other {\n    font-size: 12px;\n    margin-left: 50px;\n    padding-left: 10px;\n    padding-right: 10px;\n    background-color: #f7f7f7;\n    border-left:solid 1px #aaa;\n  }\n  /* 秘話 */\n  .secret {\n    font-size: 13px;\n    margin-left:50px;\n    padding-left:10px;\n    padding-right: 10px;\n  }\n").concat(o,"\n  .name-field {\n    display: inline-block;\n    font-weight: bold;\n    padding-right:5px;\n    vertical-align: top;\n  }\n  .text {\n    display: block;\n    word-break: break-word;\n  }\n  .day-line {\n    height: 1px;\n    background-color: #999999;\n    border: none;\n    margin: 10px 20px;\n  }\n  .day {\n    padding-top: 100px;\n  }\n  @media (min-width: 947px) {\n    /* 横幅が947px以上の場合に適用するスタイル */\n    .name-field {\n      text-align: right;\n      width: 120px;\n    }\n    .text {\n      display: inline-block;\n      width: 800px;\n      vertical-align: top;\n    }\n    .secret {\n      margin-left: 100px;\n    }\n  }\n</style>\n")}}],[{key:"fromObject",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return new e(t)}}]),e}(),h={name:"CcfoliaFormatter",components:{draggable:d.a},data:function(){return{ccfoliaLog:p.fromObject(),predefineColors:["#ff4500","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585"],systems:[{key:"coc6",prefix:"【CoC】",name:"クトゥルフ神話TRPG",diceText:"Cthulhu",diceResults:[{key:"critical",name:"決定的成功"},{key:"famble",name:"致命的失敗"},{key:"special",name:"スペシャル"},{key:"success",name:"成功"},{key:"failed",name:"失敗"}],diceTypes:[{resultKey:"critical",name:"決定的成功",class:"success"},{resultKey:"famble",name:"致命的失敗",class:"failed"},{resultKey:"special",name:"スペシャル",class:"success"},{resultKey:"success",name:"成功",class:"success"},{resultKey:"success",name:"部分的成功",class:"success"},{resultKey:"failed",name:"失敗",class:"failed"},{resultKey:"failed",name:"故障",class:"failed"}]},{key:"emoklore",prefix:"【エモクロア】",name:"エモクロアTRPG",diceText:"Emoklore",diceResults:[{key:"catastrophe",name:"カタストロフ"},{key:"miracle",name:"ミラクル"},{key:"triple",name:"トリプル"},{key:"double",name:"ダブル"},{key:"success",name:"シングル"},{key:"failed",name:"失敗"},{key:"famble",name:"ファンブル"}],diceTypes:[{resultKey:"catastrophe",name:"カタストロフ!",class:"success"},{resultKey:"miracle",name:"ミラクル!",class:"success"},{resultKey:"triple",name:"トリプル!",class:"success"},{resultKey:"double",name:"ダブル!",class:"success"},{resultKey:"success",name:"成功!",class:"success"},{resultKey:"failed",name:"失敗!",class:"failed"},{resultKey:"famble",name:"ファンブル!",class:"failed"}]},{key:"other",prefix:"",name:"その他",diceText:"",diceResults:[],diceTypes:[]}],system:{},selectedDiceResult:"",selectedDiceTabs:["メイン"],selectedNameTabs:[],names:[],drawer:!1}},props:{},methods:{addRow:function(e){this.ccfoliaLog.rows.splice(e,0,m.fromObject({is_divider:!0,name:"",body:"",key:this.dividerRows.length}))},removeRow:function(e){this.ccfoliaLog.rows.splice(e,1)},postCcfoliaLog:function(){var e=this.ccfoliaLog.file.name.replace(/^(.*).html$/,"$1_整形.html");this.downloadBlob(this.ccfoliaLog.format(),e,"text/html")},handleChangeFile:function(e){var t=this;this.ccfoliaLog.file=e,this.system=this.systems.find((function(e){return e.key==t.ccfoliaLog.system}));var n=this.ccfoliaLog.file.name.replace(/^(.*).html$/,"$1").replace(/^(.*)\[all\]$/,"$1");this.ccfoliaLog.title="".concat(this.system.prefix).concat(n),this.analyzeHtml()},downloadBlob:function(e,t,n){if(window.navigator.msSaveOrOpenBlob)window.navigator.msSaveOrOpenBlob(e,t);else{var o=URL.createObjectURL(new Blob([e],{type:n})),a=document.createElement("a");a.href=o,a.setAttribute("download",t),document.body.appendChild(a),a.click(),URL.revokeObjectURL(o),a.parentNode.removeChild(a)}},analyzeHtml:function(){var e=new FileReader,t=this;e.onload=function(n){console.log(n);var o=new DOMParser,a=o.parseFromString(e.result,"text/html"),i=a.getElementsByTagName("parsererror");if(i.length>0)return t.$message({type:"error",message:"ファイルの解析に失敗しました"}),void console.log(i);var s=a.getElementsByTagName("p");t.ccfoliaLog.rows=Array.prototype.slice.call(s).map((function(e){var n=t.diceType(e.children[2].innerHTML),o=n.isOneline,a=n.diceType,i={color:e.outerHTML.match(/<p style="color:(.*);">/)[1],tab_name:e.children[0].innerText.replace(/^ \[(.*)\]/,"$1"),name:e.children[1].innerText,body:e.children[2].innerHTML,dice_type:a,is_oneline:o};return m.fromObject(i)})),t.names=Object(r["a"])(new Set(t.ccfoliaLog.rows.filter((function(e){return null!=e.dice_type})).map((function(e){return e.name})))),t.selectedNameTabs=t.names;var c=Object(r["a"])(new Set(t.ccfoliaLog.rows.map((function(e){return e.tab_name})))),l=m.fromObject({key:0,is_divider:!0,name:"1",body:"1日目"});t.ccfoliaLog.rows=[l].concat(t.ccfoliaLog.rows);var d=c.reduce((function(e,t){return"メイン"!=t&&"雑談"!=t&&"情報"!=t&&e.push({name:t,line_color:"#aaa",background_color:"#f7f7f7"}),e}),[]);t.ccfoliaLog.tabs=d},e.readAsText(this.ccfoliaLog.file.raw),this.system.diceTypes[0]&&(this.selectedDiceResult=this.system.diceTypes[0].resultKey)},diceType:function(e){var t=!e.match(".*".concat(this.system.diceText," :.*＞.*"));if(t){var n=new RegExp(".*＞ (".concat(this.system.diceTypes.map((function(e){return e.name})).join("|"),")")),o=e.match(n);return o?{isOneline:!0,diceType:this.system.diceTypes.find((function(e){return e.name==o[1]}))}:{isOneline:!0,diceType:null}}var a=new RegExp(".*".concat(this.system.diceText," :.*＞ (").concat(this.system.diceTypes.map((function(e){return e.name})).join("|"),")")),i=e.match(a);return i?{isOneLlne:!1,diceType:this.system.diceTypes.find((function(e){return e.name==i[1]}))}:{isOneline:!1,diceType:null}},backgroundColor:function(e){return"メイン"==e?"#ffffff":"雑談"==e?"#f7f7f7":"情報"==e?"#fafafa":this.ccfoliaLog.tabs.find((function(t){return t.name==e})).background_color}},computed:{dividerRows:function(){return this.ccfoliaLog.rows.filter((function(e){return e.is_divider}))},diceRows:function(){var e=this;return this.ccfoliaLog.rows.filter((function(t){return t.dice_type&&t.dice_type.resultKey==e.selectedDiceResult&&e.selectedDiceTabs.includes(t.tab_name)&&e.selectedNameTabs.includes(t.name)}))}}},b=h,_=(n("0211"),n("2877")),y=Object(_["a"])(b,s,c,!1,null,null,null),v=y.exports,g={name:"App",components:{CcfoliaFormatter:v}},k=g,x=Object(_["a"])(k,a,i,!1,null,null,null),w=x.exports,L=n("5c96"),O=n.n(L),T=n("c3ff"),C=n.n(T),j=n("4897"),$=n.n(j);n("0fae"),n("e05f"),n("f9e3"),n("2dd8");$.a.use(C.a),o["default"].use(O.a),o["default"].config.productionTip=!0,new o["default"]({render:function(e){return e(w)}}).$mount("#app")}});
//# sourceMappingURL=app.ef3c5824.js.map