export default class LogRow {
  /**
   * コンストラクタ
   * @param {Object} log_row
   */
  constructor(log_row = null) {
    this._key        = this.paramFromObject(log_row, 'key');
    this._color      = this.paramFromObject(log_row, 'color');
    this._tab_name   = this.paramFromObject(log_row, 'tab_name');
    this._tab_type   = this.paramFromObject(log_row, 'tab_type');
    this._name       = this.paramFromObject(log_row, 'name');
    this._body       = this.paramFromObject(log_row, 'body');
    this._is_divider = this.paramFromObject(log_row, 'is_divider');
    this._dice_type  = this.paramFromObject(log_row, 'dice_type');
    this._is_oneline = this.paramFromObject(log_row, 'is_oneline');
    this._is_secret  = this.paramFromObject(log_row, 'is_secret');
  }

  paramFromObject(log_row, param, initValue = null) {
    return (log_row == null || log_row[param] == null) ? initValue : log_row[param]
  }

  format(system, tabs, selectedOutputTabs, isHideSecretDice) {
    if(this.is_divider) {
      return `    <h2 id="key${this.key}" class="day">${this.body}</h2><hr class="day-line">
`
    }
    // 出力選択されていないタブの行は飛ばす
    if(!selectedOutputTabs.includes(this.replaced_tab_name)) return '';

    const body = this.formatBySystem(system, isHideSecretDice);
    return `      <div class="${this.class_name(tabs)}" style="color:${this.color};" tab-name="${this.htmlSpecialChars(this.tab_name)}">
        <span class="name-field"><span class="name"><span>${this.name}</span> :</span></span>
        <span class="text">${body}</span>
      </div>
`
  }

  htmlSpecialChars(unsafeText){
    var text = document.createTextNode(unsafeText);
    var p = document.createElement('p');
    p.appendChild(text);
    return p.innerHTML;
  }

  notFormat(selectedOutputTabs, isHideSecretDice) {
    // 出力選択されていないタブの行は飛ばす
    if(!selectedOutputTabs.includes(this.replaced_tab_name)) return '';
    const body = (isHideSecretDice && this.is_secret) ? 'シークレットダイス' : this.body;
    
    return `    <p style="color:${this.color};">
      <span> [${this.tab_name}]</span>
      <span>${this.name}</span> :
      <span>${body}</span>
    </p>
    
`
  }

  formatBySystem(system, isHideSecretDice) {
    if(isHideSecretDice && this.is_secret) return 'シークレットダイス';
    const diceText = this.dice_type ? this.dice_type.class : '';
    if(system == "coc6") {
      if(this.is_oneline) {
        return this.body.replace(/(.*)\((.*)\)(.*)＞ (.*)/, `$1<br>\n<span class="dice ${diceText}">($2)$3＞ $4</span>`);
      } else {
        return this.body.replace(/(.*)\nCthulhu : (.*)/, `$1<br>\n<span class="dice ${diceText}">Cthulhu :$2\n</span>`);
      }
    }
    if(system == "emoklore" || system == "insane" || system == "shinobigami") {
      const dareq = /(.*)\((.*)\) ＞ \((.*)\) ＞ (.*)/;
      if(dareq.test(this.body)) {
        return this.body.replace(dareq, `$1<br>\n<span class="dice ${diceText}">($2) ＞ ($3) ＞ $4</span>`);
      } else {
        return this.body.replace(/(.*)\((.*)\)(.*)＞ (.*)/, `$1<br>\n<span class="dice ${diceText}">($2)$3＞ $4</span>`);
      }
    }
    return this.body;
  }

  class_name(tabs) {
    if(this.tab_name == 'メイン' || this.tab_name == 'main' || this.tab_name == null || this.tab_name == '') return '';
    if(this.tab_name == '雑談' || this.tab_name == 'other') return 'other';
    if(this.tab_name == '情報' || this.tab_name == 'info') return 'info';
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
   * 置換したタブ名
   * @returns {string}
   */
  get replaced_tab_name() {
    if(this._tab_name == 'main') return 'メイン';
    if(this._tab_name == 'info') return '情報';
    if(this._tab_name == 'other') return '雑談';
    return this._tab_name;
  }

  /**
   * タブタイプ
   * @returns {string}
   */
  get tab_type() { return this._tab_type; }

  set tab_type(value) { this._tab_type = value; }

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

  /**
   * ダイス結果が一行か
   * @returns {boolean}
   */
  get is_secret() { return this._is_secret; }

  set is_secret(value) { this._is_secret = value; }
}
