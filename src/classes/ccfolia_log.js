// title
import LogRow from "./log_row";
export default class CcfoliaLog {
  /**
   * コンストラクタ
   * @param {Object} ccfolia_log
   */
  constructor(ccfolia_log = null) {
    this._file          = this.paramFromObject(ccfolia_log, 'file');
    this._system        = this.paramFromObject(ccfolia_log, 'system', 'coc6');
    this._header_color1 = this.paramFromObject(ccfolia_log, 'header_color1', "#000");
    this._header_color2 = this.paramFromObject(ccfolia_log, 'header_color2', "#2E9BB1");
    this._link_color    = this.paramFromObject(ccfolia_log, 'link_color', "#fff");
    this._title         = this.paramFromObject(ccfolia_log, 'title', '【CoC】タイトル');
    this._tabs          = this.paramFromObject(ccfolia_log, 'tabs', []);
    this._doc           = '';
    if(ccfolia_log) {
      this._rows = ccfolia_log['rows'].map(x => LogRow.fromObject(x));
    } else {
      this._rows = [];
    }
  }

  paramFromObject(ccfolia_log, param, initValue = null) {
    return (ccfolia_log == null || ccfolia_log[param] == null) ? initValue : ccfolia_log[param]
  }
  
  /**
   * ObjectからCcfoliaLogクラスへ変換する
   * @param {Object} obj ココフォリアログオブジェクト
   * @returns {CcfoliaLog} ココフォリアログ
   */
  static fromObject(obj = null) {
    return new CcfoliaLog(obj)
  }

  /**
   * 整形結果
   * @returns {string}
   */
  get doc() { return this._doc; }

  set doc(value) { this._doc = value; }

  /**
   * ファイル
   * @returns {string}
   */
  get file() { return this._file; }

  set file(value) { this._file = value; }

  /**
   * システム
   * @returns {string}
   */
  get system() { return this._system; }

  set system(value) { this._system = value; }

  /**
   * ヘッダー背景色1
   * @returns {string}
   */
  get header_color1() { return this._header_color1; }

  set header_color1(value) { this._header_color1 = value; }

  /**
   * ヘッダー背景色2
   * @returns {string}
   */
  get header_color2() { return this._header_color2; }

  set header_color2(value) { this._header_color2 = value; }

  /**
   * リンク文字色
   * @returns {string}
   */
  get link_color() { return this._link_color; }

  set link_color(value) { this._link_color = value; }

  /**
   * タイトル
   * @returns {string}
   */
  get title() { return this._title; }

  set title(value) { this._title = value; }

  /**
   * タブ
   * @returns {array}
   */
  get tabs() { return this._tabs; }

  set tabs(value) { this._tabs = value; }

  /**
   * 行
   * @returns {array}
   */
  get rows() { return this._rows; }

  set rows(value) { this._rows = value; }


  format(selectedOutputTabs) {
    const dividers = this.rows.filter(x => x.is_divider);
    const menu_array = dividers.map((x) => `      <a href="#key${x.key}">${x.name}</a>`).join("\n");
    let tab_styles = '';
    if(this.tabs) {
      tab_styles = this.tabs.reduce((result, tab, index) => {
        result += `
  .tab${index} {
    background-color: ${tab.background_color};
    border-left:solid 2px ${tab.line_color};
  }
`
        return result;
      }, '');
    }
    return `
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>${this.title}</title>
  </head>
  <header id="header">
    <h1>${this.title}</h1>
    <div class="menu">
${menu_array}
    </div>
  </header>
  <body>
    <div class="main">
${this.rows.map(x => x.format(this.system, this.tabs, selectedOutputTabs)).join("\n")}
    </div>
  </body>
</html>
<style type="text/css">
  * {
    margin: 0px;
    padding: 0px;
    font-family: sans-serif;
  }
  #header {
    background: linear-gradient(${this.header_color1},${this.header_color2});
    position: fixed;
    width: 100%;
    padding:10px;
    opacity: 0.8;
  }
  #header a {
    color: ${this.link_color};
    text-decoration: none;
    font-size: 14px;
  }
  #header a:hover{
    text-decoration: underline;
  }
  h1 {
    font-size: 18px;
    color:${this.link_color};
    font-weight:normal
  }
  h2 {
    font-size: 16px;
    text-align: center;
  }
  .menu {
    padding-left: 10px;
  }
  /* ダイスロール結果 */
  .dice {
    font-weight: bold;
    color: #555;
  }
  .dice.success {
    color: #2196f3;
  }
  .dice.failed {
    color: #f50057;
  }
  .main {
    padding: 10px 1em 100px;
    padding-bottom: 100px;
    font-size: 14px;
  }
  .main div {
    padding-top: 5px;
    padding-bottom: 5px;
  }
  /* 情報タブ */
  .info {
    background-color: #fafafa;
    border-left:solid 2px #bbb;    
  }
  /* 雑談タブ */
  .other {
    font-size: 12px;
    margin-left: 50px;
    padding-left: 10px;
    padding-right: 10px;
    background-color: #f7f7f7;
    border-left:solid 1px #aaa;
  }
  /* 秘話 */
  .secret {
    font-size: 13px;
    margin-left:50px;
    padding-left:10px;
    padding-right: 10px;
  }
${tab_styles}
  .name-field {
    display: inline-block;
    font-weight: bold;
    padding-right:5px;
    vertical-align: top;
  }
  .text {
    display: block;
    word-break: break-word;
  }
  .day-line {
    height: 1px;
    background-color: #999999;
    border: none;
    margin: 10px 20px;
  }
  .day {
    padding-top: 100px;
  }
  @media (min-width: 947px) {
    /* 横幅が947px以上の場合に適用するスタイル */
    .name-field {
      text-align: right;
      width: 120px;
    }
    .text {
      display: inline-block;
      width: 800px;
      vertical-align: top;
    }
    .secret {
      margin-left: 100px;
    }
  }
</style>
`
  }
}