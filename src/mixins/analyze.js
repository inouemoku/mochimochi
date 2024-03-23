import CcfoliaLog from '../classes/ccfolia_log';
import LogRow from '../classes/log_row';
export default {
  methods: {
    // ココフォリアから出力したログを解析する
    analyzeHtmlCcfolia(doc) {
      let ccfoliaLog = CcfoliaLog.fromObject();
      const ptags = Array.from(doc.getElementsByTagName('p'));
      ccfoliaLog.rows = ptags.map((p) => {
        const { isOneline, diceType, isSecret } = this.diceType(p.children[2].innerHTML);
        const row = {
          color: p.outerHTML.match(/<p style="color:(.*);">/)[1],
          tab_name: p.children[0].innerText.replace(/^ \[(.*)\]/, '$1'),
          name: p.children[1].innerText,
          body: p.children[2].innerHTML,
          dice_type: diceType,
          is_oneline: isOneline,
          is_secret: isSecret,
        };
        return LogRow.fromObject(row);
      });
      const { names, selectedNameTabs } = ccfoliaLog.rows.filter(x => x.dice_type != null)
        .reduce(({ names, selectedNameTabs }, x) => {
          if (!names.includes(x.name)) {
            names.push(x.name);
            selectedNameTabs.push(x.name);
          }
          return { names, selectedNameTabs };
        }, { names: [], selectedNameTabs: [] });
      const uniqTabs = [...new Set(ccfoliaLog.rows.map(x => x.tab_name))];
      const dayLine = LogRow.fromObject({
        key: 0,
        is_divider: true,
        name: '1',
        body: '1日目',
      });
      const tabs = uniqTabs.reduce((result, x) => {
        if (x != 'メイン' && x != '雑談' && x != '情報') result.push(this.tabColors(ccfoliaLog.rows, x));
        return result;
      }, []);
      ccfoliaLog.rows = [dayLine].concat(ccfoliaLog.rows);
      ccfoliaLog.tabs = tabs;
      return { ccfoliaLog, names, selectedNameTabs, uniqTabs }
    },
    // MochiMochiで整形したログを解析する
    analyzeHtmlMochiMochi(doc) {
      let ccfoliaLog = CcfoliaLog.fromObject();
      const header = Array.from(doc.getElementById('header').children);
      ccfoliaLog.title = header[0].innerText;
      const menus = Array.from(header[1].children).map((menu) => {
        return { key: menu.hash.slice(1), name: menu.innerText }
      });
      const tags = Array.from(doc.getElementsByClassName('main')[0].children);
      const style = doc.getElementsByTagName('style')[0].innerText;
      const css = this.parseCssToObject(style)
      // ヘッダー背景色
      const headerColor = css.find(c => c.key == '#header').contents.background.match(/linear-gradient\((#.*),(#.*)\)/)
      ccfoliaLog.header_color1 = headerColor[1];
      ccfoliaLog.header_color2 = headerColor[2];
      // RGBを16進数に変換
      const rgbTo16 = function(col) {
        return "#" + col.match(/\d+/g).map(function(a){return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
      }
      ccfoliaLog.rows = tags.map((tag) => {
        if(tag.className == "day-line") return;
        if(tag.className == "day") {
          const key = tag.id.slice(3);
          const dayLine = LogRow.fromObject({
            key: key,
            is_divider: true,
            name: menus.find(m => m.key.slice(3) == key).name,
            body: tag.innerText,
          });
          return dayLine;
        }
        const diceTypeM =  this.diceTypeMochi(tag.children[1]);
        console.log('diceTypeM',diceTypeM)
        const body = diceTypeM == null ? tag.children[1].innerHTML : this.htmlSpecialChars(`${tag.children[1].innerText}`);
        const { isOneline, diceType, isSecret } = this.diceType(body);
        const row = {
          color: rgbTo16(tag.style.color),
          tab_name: this.tabNameMochi(tag),
          name: tag.children[0].children[0].innerText.slice(0, -2),
          body: body,
          dice_type: diceType,
          is_oneline: isOneline,
          is_secret: isSecret,
        };
        return LogRow.fromObject(row);
      }).filter(e => e);
      const { names, selectedNameTabs } = ccfoliaLog.rows.filter(x => x.dice_type != null)
        .reduce(({ names, selectedNameTabs }, x) => {
          if (!names.includes(x.name)) {
            names.push(x.name);
            selectedNameTabs.push(x.name);
          }
          return { names, selectedNameTabs };
        }, { names: [], selectedNameTabs: [] });
      const uniqTabs = [...new Set(ccfoliaLog.rows.map(x => x.tab_name))].filter(e => e);
      var index = 0;
      const tabs = uniqTabs.reduce((result, x) => {
        if (x != 'メイン' && x != '雑談' && x != '情報') {
          const content = css.find(c => c.key == `.tab${index}`).contents;
          const lineColor = content['border-left'].match(/.*(#.*)/)[1]
          const backgroundColor = content['background-color']
          index = index + 1;
          result.push(this.tabColors(ccfoliaLog.rows, x, lineColor, backgroundColor));
        }
        return result;
      }, []);
      ccfoliaLog.tabs = tabs;
      return { ccfoliaLog, names, selectedNameTabs, uniqTabs }
    },
    htmlSpecialChars(unsafeText){
      var text = document.createTextNode(unsafeText);
      var p = document.createElement('p');
      p.appendChild(text);
      return p.innerHTML;
    },
    // タブ名を抽出する
    tabNameMochi(tag) {
      if(tag.attributes['tab-name'] != null) return tag.attributes['tab-name'].nodeValue
      if(tag.classList[0] == null) return 'メイン';
      if(tag.classList[0] == 'info') return '情報';
      if(tag.classList[0] == 'other') return '雑談';
      if(tag.classList[0] == 'secret') return tag.classList[1];
    },
    // ダイスタイプを取得する
    diceTypeMochi(text) {
      if(text.children[1] == null) return null;
      if(text.children[1].nodeName == 'BR') return null;
      const diceType = text.children[1].classList[1];
      if(diceType == null) return 'dice';
      return diceType;
    },
    // CSSの文字列をオブジェクトに変換する
    parseCssToObject(inputString) {
      var resultObject = [];
    
      // ブロックを正規表現で抽出
      var blocks = inputString.match(/(.*){([^{}]+)}/g);
    
      if (blocks) {
        blocks.forEach(block => {
          const regex = /(.*)\s*{([^}]*)}/;
          const match = block.match(regex);
          
          if (match) {
            const key = match[1].trim();
            const content = match[2].trim();

            // 中身をオブジェクトに変換
            var contentObject = {};
            content.split(";").forEach(function (property) {
              property = property.replace(/\r?\n? /g, '');
              var parts = property.split(":");
              if(parts[0].length == 0) return;
              var key = parts[0].trim();
              var value = parts[1].trim();
              contentObject[key] = value;
            });
    
            resultObject.push({key, contents: contentObject});
          }
        });
      }
    
      return resultObject;
    },
    // タブの色を決める
    tabColors(rows, name, lineColor = null, backgroundColor = null) {
      if(lineColor != null && backgroundColor != null) {
        return { name, line_color: lineColor, background_color: backgroundColor };
      }
      // KP, GM, DLを含む発言者は判定に使用しない
      const filteredRows = rows.filter(x => !x.is_divider && x.tab_name === name && x.color !== '#222222' && x.color !== '#888888' && !x.name.match(/GM|KP|DL/));
      console.log(filteredRows)
      if (filteredRows.length === 0) {
        return { name, line_color: '#aaa', background_color: '#f7f7f7' };
      }
      const uniqueRow = filteredRows.reduce((acc, cur) => {
        if (!acc || acc.color === cur.color) {
          return cur;
        }
        return acc;
      }, null);
      return { name, line_color: uniqueRow.color, background_color: this.convertToPaleColorSharp(uniqueRow.color, 0.05) };
    },
    compositeColor(code, alpha) {
      const colorCode = parseInt(code, 16) * alpha + 255 * (1 - alpha);
      return Math.floor(colorCode).toString(16);
    },
    convertToPaleColor(colorCode, alpha) {
      // colorCodeは`#`を除いた16進数とします。
      const codes = [colorCode.slice(0, 2), colorCode.slice(2, 4), colorCode.slice(4, 6)];
      return codes.map(code => this.compositeColor(code, alpha)).join("");
    },
    convertToPaleColorSharp(colorCodeSharp, alpha) {
      const colorCode = colorCodeSharp.slice(1);
      return '#' + this.convertToPaleColor(colorCode, alpha);
    },
    diceType(body) {
      const { system } = this;
      const isSecret = /\n\s*[sS]/.test(body);
      const isOneline = !/.*${system.diceText} :.*＞.*/.test(body);
      const isDiceRoll = body.match(/(.*)\((.*)\)(.*)＞ (.*)/);
      if (isOneline) {
        console.log(body)
        console.log(isDiceRoll)
        const regO = new RegExp(`.*＞ (${system.diceTypes.map(x => x.name).join('|')})`)
        const rowO = body.match(regO);
        if (rowO) {
          const diceType = system.diceTypes.find(d => d.name === rowO[1]);
          return { isOneline: true, diceType, isSecret };
        }
        if (isDiceRoll) return { isOneline: true, diceType: null, isSecret };
        return { isOneline: true, diceType: null, isSecret: false };
      }
      const reg = new RegExp(`.*${system.diceText} :.*＞ (${system.diceTypes.map(x => x.name).join('|')})`)
      const row = body.match(reg);
      if (row) {
        const diceType = system.diceTypes.find(d => d.name === row[1]);
        return { isOneLlne: false, diceType, isSecret };
      }
      if (isDiceRoll) return { isOneline: false, diceType: null, isSecret };
      return { isOneline: false, diceType: null, isSecret: false };
    },
  }
}