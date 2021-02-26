export default class LogRow {
  /**
   * コンストラクタ
   * @param {Object} log_row
   */
  constructor(log_row = null) {
    this._key        = this.paramFromObject(log_row, 'key');
    this._color      = this.paramFromObject(log_row, 'color');
    this._tab_name   = this.paramFromObject(log_row, 'tab_name');
    this._name       = this.paramFromObject(log_row, 'name');
    this._body       = this.paramFromObject(log_row, 'body');
    this._is_divider = this.paramFromObject(log_row, 'is_divider');
    this._dice_type  = this.paramFromObject(log_row, 'dice_type');
    this._is_oneline = this.paramFromObject(log_row, 'is_oneline');
  }

  paramFromObject(log_row, param, initValue = null) {
    return (log_row == null || log_row[param] == null) ? initValue : log_row[param]
  }

  format(tabs) {
    if(this.is_divider) {
      return `
    <h2 id="key${this.key}" class="day">${this.body}</h2><hr class="day-line">
`
    }
      const diceText = this.dice_type ? this.dice_type.class : '';
      let body = '';
      if(this.is_oneline) {
        body = this.body.replace(/(.*)\((.*)\)(.*)＞ (.*)/, `$1<br>\n<span class="dice ${diceText}">($2)$3＞ $4</span>`);
      } else {
        body = this.body.replace(/(.*)\nCthulhu : (.*)/, `$1<br>\n<span class="dice ${diceText}">Cthulhu :$2\n</span>`);
      }
      return `
      <div class="${this.class_name(tabs)}" style="color:${this.color};">
        <span class="name-field"><span class="name"><span>${this.name}</span> :</span></span>
        <span class="text">${body}</span>
      </div>
`
  }

  class_name(tabs) {
    if(this.tab_name == 'メイン' || this.tab_name == null || this.tab_name == '') return '';
    if(this.tab_name == '雑談') return 'other';
    if(this.tab_name == '情報') return 'info';
    console.log(tabs)
    return `secret tab${tabs.findIndex(x => x.name == this.tab_name)}`
  }
  
  /**
   * ObjectからLogRowクラスへ変換する
   * @param {Object} obj ログ行オブジェクト
   * @returns {LogRow} ログ行
   */
  static fromObject(obj = null) {
    return new LogRow(obj)
  }

  /**
   * key
   * @returns {string}
   */
  get key() { return this._key; }

  set key(value) { this._key = value; }

  /**
   * カラーコード
   * @returns {string}
   */
  get color() { return this._color; }

  set color(value) { this._color = value; }

  /**
   * タブ名
   * @returns {string}
   */
  get tab_name() { return this._tab_name; }

  set tab_name(value) { this._tab_name = value; }

  /**
   * 発言者名
   * @returns {string}
   */
  get name() { return this._name; }

  set name(value) { this._name = value; }

  /**
   * 本文
   * @returns {string}
   */
  get body() { return this._body; }

  set body(value) { this._body = value; }

  /**
   * 区切り行フラグ
   * @returns {boolean}
   */
  get is_divider() { return this._is_divider; }

  set is_divider(value) { this._is_divider = value; }

  /**
   * ダイス結果
   * @returns {string}
   */
  get dice_type() { return this._dice_type; }

  set dice_type(value) { this._dice_type = value; }

  /**
   * ダイス結果が一行か
   * @returns {boolean}
   */
  get is_oneline() { return this._is_oneline; }

  set is_oneline(value) { this._is_oneline = value; }
}
