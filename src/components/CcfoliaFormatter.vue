<template>
  <div>
    <el-form ref="ccfoliaLog" :model="ccfoliaLog" class="mb-5">
      <el-form-item prop="system">
        <el-select v-model="ccfoliaLog.system">
          <el-option
            v-for="s in systems"
            :key="s.key"
            :label="s.name"
            :value="s.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="file">
        <el-upload
          drag
          action=""
          :auto-upload="false"
          :on-change="handleChangeFile"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
      </el-form-item>
      <div v-show="ccfoliaLog.rows.length > 0">
        <el-card shadow="never" class="mb-3" v-if="ccfoliaLog.system != 'other'">
          <div slot="header" class="clearfix">
            <span>ダイス結果  <el-tooltip
              effect="dark"  placement="top-start"
              content="ダイス結果だけまとめて見られます。">
              <el-button icon="el-icon-question" type="text"></el-button>
            </el-tooltip></span>
          </div>
          <el-radio-group v-model="selectedDiceResult" size="mini">
            <el-radio-button v-for="r in system.diceResults" :key="r.key" :label="r.key">{{ r.name }}</el-radio-button>
          </el-radio-group>
          <el-checkbox-group v-model="selectedDiceTabs">
            <el-checkbox label="メイン"></el-checkbox>
            <el-checkbox label="情報"></el-checkbox>
            <el-checkbox label="雑談"></el-checkbox>
            <el-checkbox v-for="(tab, index) in ccfoliaLog.tabs" :key="index" :label="tab.name"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox-group v-model="selectedNameTabs">
            <el-checkbox v-for="(aname, index) in names" :key="index" :label="aname"></el-checkbox>
          </el-checkbox-group>
          <small>計</small> {{diceRows.length}} <small>回</small>
          <div v-for="(row, index) in diceRows" :key="index">
            <div :style="`color:${row.color}`">
              [{{row.tab_name}}] {{row.name}}： <span v-html="row.body" />
            </div>
          </div>
        </el-card>
        <el-card shadow="never" class="mb-3">
          <div slot="header" class="clearfix">
            <span>ヘッダー設定  <el-tooltip
              effect="dark"  placement="top-start">
              <div slot="content">ヘッダー色とタイトルの設定ができます。<br/>色は左と真ん中が背景色、右が文字色です。</div>
              <el-button icon="el-icon-question" type="text"></el-button>
            </el-tooltip></span>
          </div>
          <el-color-picker
            v-model="ccfoliaLog.header_color1"
            :predefine="predefineColors">
          </el-color-picker>
          <el-color-picker
            v-model="ccfoliaLog.header_color2"
            :predefine="predefineColors">
          </el-color-picker>
          <el-color-picker
            v-model="ccfoliaLog.link_color"
            :predefine="predefineColors">
          </el-color-picker>
          <el-input v-model="ccfoliaLog.title" class="mb-2"></el-input>
          <div class="mb-3" :style="`background:linear-gradient(${ccfoliaLog.header_color1},${ccfoliaLog.header_color2});color:${ccfoliaLog.link_color}`">
            <div class="p-2">{{ccfoliaLog.title}}</div>
            <div class="p-2"><span v-for="dividerRow in dividerRows" :key="dividerRow.name">{{dividerRow.name}} </span></div>
          </div>
        </el-card>
        <el-card shadow="never" class="mb-3">
          <div slot="header" class="clearfix">
            <span>タブ設定  <el-tooltip
              effect="dark"  placement="top-start">
              <div slot="content">出力するタブを設定できます。<br/>雑談、情報以外のタブの色の設定ができます。<br/>左側がラインの色、右側が背景色です。</div>
              <el-button icon="el-icon-question" type="text"></el-button>
            </el-tooltip></span>
          </div>
          <small>チェックの入っているタブが出力されます。</small>
          <el-checkbox-group v-model="selectedOutputTabs">
            <el-checkbox label="メイン"></el-checkbox>
            <el-checkbox label="情報"></el-checkbox>
            <el-checkbox label="雑談"></el-checkbox>
            <el-checkbox v-for="(tab, index) in ccfoliaLog.tabs" :key="index" :label="tab.name"></el-checkbox>
          </el-checkbox-group>
          <el-checkbox v-model="isHideSecretDice" label="シークレットダイスを隠す" border size="small"></el-checkbox>
          <el-divider v-if="ccfoliaLog.tabs.length > 0"></el-divider>
          <div class="mb-2" v-if="ccfoliaLog.tabs.length > 0">色設定</div>
          <div v-for="tab in ccfoliaLog.tabs" :key="tab.name" v-show="selectedOutputTabs.includes(tab.name)">
            <el-color-picker
              v-model="tab.line_color"
              :predefine="predefineColors">
            </el-color-picker>
            <el-color-picker
              v-model="tab.background_color"
              :predefine="predefineColors">
            </el-color-picker>
            <div class="mb-3" :style="`font-size:13px;background-color:${tab.background_color};border-left:solid 2px ${tab.line_color};`">
              <div class="p-2">{{tab.name}}</div>
            </div>
          </div>
        </el-card>
        <el-card shadow="never" class="mb-4" :body-style="{height:'95vh', 'overflow-y':'scroll'}">
          <div slot="header" class="clearfix">
            <span>ログ全文  <el-tooltip
              effect="dark"  placement="top-start">
              <el-button icon="el-icon-question" type="text"></el-button>
              <div slot="content">+ボタンを押すとログに区切りを追加することができます。ヘッダーにもリンクが追加されます。<br/>行ごと掴んで順序を入れ替えることができます。<br/>磁石ボタンを押すと2回目に押した磁石ボタンまでの間にある同じタブ名の行をまとめることができます。</div>
            </el-tooltip>
            </span>
          </div>
          <draggable :options="{animation:200, handle:'.handle'}" :list="ccfoliaLog.rows">
            <div v-for="(row, index) in ccfoliaLog.rows" :key="index" class="my-1">
              <div v-if="!row.is_divider" v-show="selectedOutputTabs.includes(row.tab_name)" :style="`color:${row.color};background-color:${backgroundColor(row.tab_name)}`" class="draggable handle">
                <el-button size="mini" @click="addRow(index)">+</el-button>
                <el-button size="mini" icon="el-icon-attract" :type="attractButtonType(index)" :disabled="attractFrom && (index < attractFrom)" @click="attract(index)"></el-button>
                [{{row.tab_name}}] {{row.name}}： <span v-html="row.body" /><el-tag  v-show="row.is_secret" size="mini" type="warning">シークレットダイス</el-tag>
              </div>
              <div v-if="row.is_divider">
                <el-row :gutter="5">
                  <el-col :span="1"><el-button size="mini" @click="addRow(index)">+</el-button></el-col>
                  <el-col :span="2"><el-input v-model="row.name" size="mini" placeholder="リンク名"></el-input></el-col>
                  <el-col :span="10"><el-input v-model="row.body" size="mini" placeholder="表示名"></el-input></el-col>
                  <el-col :span="1"><el-button size="mini" @click="removeRow(index)" icon="el-icon-delete" /></el-col>
                  <el-col :span="10" class="draggable handle text-white">:</el-col>
                </el-row>
              </div>
            </div>
          </draggable>
        </el-card>
      </div>
        <el-tooltip placement="top-start">
          <div slot="content">ヘッダーやタブなど全ての設定が反映されます。</div>
          <el-button class="px-5" @click="postCcfoliaLog" type="primary" :disabled="ccfoliaLog.rows.length <= 0">整形！</el-button>
        </el-tooltip>
        <el-tooltip placement="top-start">
          <div slot="content">タブとシークレットダイスの設定だけ反映されます。</div>
          <el-button class="px-5" @click="postOriginalCcfoliaLog" type="warning" :disabled="ccfoliaLog.rows.length <= 0">整形しないでダウンロード</el-button>
        </el-tooltip>
    </el-form>
    <el-divider></el-divider>
    <small>
      <div>最終更新: 2023-09-11 <el-button @click="drawer=true" type="text" size="small">履歴</el-button></div>
      <div class="mb-4">Twitter: <a href="https://twitter.com/inouemoku" target="_blank">@inouemoku</a></div>
    </small>
    <el-drawer title="履歴" :visible.sync="drawer">
      <ul style="font-size:0.9em;">
        <li>2023-09-11 タブごとに行をまとめる時に他のタブも巻き込めるように変更</li>
        <li>2023-06-19 整形したログを再度読み込めるように変更</li>
        <li>2023-03-26 タブごとに行をまとめる機能を追加</li>
        <li>2022-10-26 整形しないでダウンロードする機能を追加</li>
        <li>2022-09-06 本文の順序入れ替え時にフォーム部分が反応しないように修正</li>
        <li>2022-05-30 シークレットダイスの判定を修正</li>
        <li>2022-05-20 シークレットダイスの判定を修正</li>
        <li>2022-05-07 インセイン、シノビガミに対応</li>
        <li>2022-04-26 シークレットダイスの結果を隠せるように変更</li>
        <li>2022-04-22 出力するタブを選択できるように変更</li>
        <li>2022-02-06 タブ色設定の初期色を変更</li>
        <li>2021-09-14 ヘッダーのタイトル色が変更されないのを修正</li>
        <li>2021-06-27 背景色が編集パネルに反映されるように変更</li>
        <li>2021-06-06 ダイス結果を名前で絞り込めるように変更</li>
        <li>2021-03-29 エモクロアTRPGに対応</li>
        <li>2021-03-15 リンクが効かない不具合の修正</li>
        <li>2021-03-13 本文の順序を入れ替える機能を追加</li>
        <li>2021-02-27 一行のダイス結果表記に対応</li>
        <li>2021-02-23 公開</li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import CcfoliaLog from '../classes/ccfolia_log';
  import LogRow from '../classes/log_row';
  
  export default {
    name: "CcfoliaFormatter",
    components: {
      draggable
    },
    data() {
      return {
        ccfoliaLog: CcfoliaLog.fromObject(),
        predefineColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
        ],
        systems: [
          { key: 'coc6', prefix: '【CoC】', name: 'クトゥルフ神話TRPG', diceText: 'Cthulhu',
            diceResults: [
              { key: 'critical', name: '決定的成功' },
              { key: 'famble', name: '致命的失敗' },
              { key: 'special', name: 'スペシャル' },
              { key: 'success', name: '成功' },
              { key: 'failed', name: '失敗' }
            ],
            diceTypes: [
              { resultKey: 'critical', name: '決定的成功', class: 'success' },
              { resultKey: 'famble', name: '致命的失敗', class: 'failed' },
              { resultKey: 'special', name: 'スペシャル', class: 'success' },
              { resultKey: 'success', name: '成功', class: 'success' },
              { resultKey: 'success', name: '部分的成功', class: 'success' },
              { resultKey: 'failed', name: '失敗', class: 'failed' },
              { resultKey: 'failed', name: '故障', class: 'failed' },
            ]
          },
          // { key: 'coc7', name: '新クトゥルフ神話TRPG' },
          { key: 'emoklore', prefix: '【エモクロア】', name: 'エモクロアTRPG', diceText: 'Emoklore',
            diceResults: [
              { key: 'catastrophe', name: 'カタストロフ' },
              { key: 'miracle', name: 'ミラクル' },
              { key: 'triple', name: 'トリプル' },
              { key: 'double', name: 'ダブル' },
              { key: 'success', name: 'シングル' },
              { key: 'failed', name: '失敗' },
              { key: 'famble', name: 'ファンブル' }
            ],
            diceTypes: [
              { resultKey: 'catastrophe', name: 'カタストロフ!', class: 'success'  },
              { resultKey: 'miracle', name: 'ミラクル!', class: 'success'  },
              { resultKey: 'triple', name: 'トリプル!', class: 'success'  },
              { resultKey: 'double', name: 'ダブル!', class: 'success'  },
              { resultKey: 'success', name: '成功!', class: 'success'  },
              { resultKey: 'failed', name: '失敗!', class: 'failed' },
              { resultKey: 'famble', name: 'ファンブル!', class: 'failed' }
            ]
          },
          { key: 'insane', prefix: '【インセイン】', name: 'インセイン', diceText: 'Insane',
            diceResults: [
              { key: 'special', name: 'スペシャル' },
              { key: 'success', name: '成功' },
              { key: 'failed', name: '失敗' },
              { key: 'famble', name: 'ファンブル' }
            ],
            diceTypes: [
              { resultKey: 'famble', name: 'ファンブル', class: 'failed' },
              { resultKey: 'special', name: 'スペシャル', class: 'success' },
              { resultKey: 'success', name: '成功', class: 'success' },
              { resultKey: 'failed', name: '失敗', class: 'failed' },
            ]
          },
          { key: 'shinobigami', prefix: '【シノビガミ】', name: 'シノビガミ', diceText: 'ShinobiGami',
            diceResults: [
              { key: 'special', name: 'スペシャル' },
              { key: 'success', name: '成功' },
              { key: 'failed', name: '失敗' },
              { key: 'famble', name: 'ファンブル' }
            ],
            diceTypes: [
              { resultKey: 'famble', name: 'ファンブル', class: 'failed' },
              { resultKey: 'special', name: 'スペシャル', class: 'success' },
              { resultKey: 'success', name: '成功', class: 'success' },
              { resultKey: 'failed', name: '失敗', class: 'failed' },
            ]
          },
          { key: 'other', prefix: '', name: 'その他', diceText: '', diceResults: [], diceTypes: []}
        ],
        system: {},
        selectedDiceResult: '',
        selectedDiceTabs: ['メイン'],
        selectedNameTabs: [],
        selectedOutputTabs: [],
        names: [],
        drawer: false,
        isHideSecretDice: false,
        attractFrom: null,
        dogs: []
      }
    },
    props: {
    },
    methods: {
      // 行を追加
      addRow(index) {
        this.ccfoliaLog.rows.splice(index, 0, LogRow.fromObject({ is_divider: true, name: '', body: '', key: this.dividerRows.length }));
      },
      // 行を削除
      removeRow(index) {
        this.ccfoliaLog.rows.splice(index, 1);
      },
      // 整形
      postCcfoliaLog(){
        const filename = this.ccfoliaLog.file.name.replace(/^(.*).html$/, '$1_整形.html');
        this.downloadBlob(this.ccfoliaLog.format(this.selectedOutputTabs, this.isHideSecretDice), filename, 'text/html');
      },
      // 元の形式でダウンロード
      postOriginalCcfoliaLog(){
        const filename = this.ccfoliaLog.file.name;
        this.downloadBlob(this.ccfoliaLog.notFormat(this.selectedOutputTabs, this.isHideSecretDice), filename, 'text/html');
      },
      // ファイルが追加された時のアクション
      handleChangeFile(file) {
        this.ccfoliaLog.file = file;
        this.system = this.systems.find(x => x.key == this.ccfoliaLog.system);
        const title = this.ccfoliaLog.file.name.replace(/^(.*).html$/, '$1').replace(/^(.*)\[all\]$/, '$1');
        this.ccfoliaLog.title = `${this.system.prefix}${title}`
        this.analyzeHtml();
      },
      // ダウンロードリンクを作成しファイルをダウンロードする
      downloadBlob(blob, fileName, fileType) {
        if (window.navigator.msSaveOrOpenBlob) {
          // for IE,Edge
          window.navigator.msSaveOrOpenBlob(blob, fileName);
        } else {
          // for chrome, firefox
          const url = URL.createObjectURL(new Blob([blob], {type: fileType}));
          const linkEl = document.createElement('a');
          linkEl.href = url;
          linkEl.setAttribute('download', fileName);
          document.body.appendChild(linkEl);
          linkEl.click();
          URL.revokeObjectURL(url);
          linkEl.parentNode.removeChild(linkEl);
        }
      },
      // ログHTMLを解析する
      analyzeHtml() {
        const fileReader = new FileReader();
        const self = this;
        fileReader.onload = function() {
          const parser = new DOMParser();
          const doc = parser.parseFromString(fileReader.result, "text/html");
          const parsererror = doc.getElementsByTagName('parsererror');
          if (parsererror.length > 0) {
            self.$message({
              type: 'error',
              message: 'ファイルの解析に失敗しました',
            });
            console.log(parsererror);
            return;
          }
          const mochi = doc.getElementsByClassName('main');
          if(mochi.length > 0) {
            self.analyzeHtmlMochiMochi(doc);
          } else {
            self.analyzeHtmlCcfolia(doc);
          }
          console.log('onload end')
        }
        fileReader.readAsText(this.ccfoliaLog.file.raw);
        if(this.system.diceTypes[0]) this.selectedDiceResult = this.system.diceTypes[0].resultKey;
      },
      // ココフォリアから出力したログを解析する
      analyzeHtmlCcfolia(doc) {
        const ptags = Array.from(doc.getElementsByTagName('p'));
        this.ccfoliaLog.rows = ptags.map((p) => {
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
        const { names, selectedNameTabs } = this.ccfoliaLog.rows.filter(x => x.dice_type != null)
          .reduce(({ names, selectedNameTabs }, x) => {
            if (!names.includes(x.name)) {
              names.push(x.name);
              selectedNameTabs.push(x.name);
            }
            return { names, selectedNameTabs };
          }, { names: [], selectedNameTabs: [] });
        this.names = names;
        this.selectedNameTabs = selectedNameTabs;
        const uniqTabs = [...new Set(this.ccfoliaLog.rows.map(x => x.tab_name))];
        const dayLine = LogRow.fromObject({
          key: 0,
          is_divider: true,
          name: '1',
          body: '1日目',
        });
        const tabs = uniqTabs.reduce((result, x) => {
          if (x != 'メイン' && x != '雑談' && x != '情報') result.push(this.tabColors(x));
          return result;
        }, []);
        this.selectedOutputTabs = uniqTabs;
        this.ccfoliaLog.rows = [dayLine].concat(this.ccfoliaLog.rows);
        this.ccfoliaLog.tabs = tabs;
      },
      // MochiMochiで整形したログを解析する
      analyzeHtmlMochiMochi(doc) {
        const header = Array.from(doc.getElementById('header').children);
        this.ccfoliaLog.title = header[0].innerText;
        const menus = Array.from(header[1].children).map((menu) => {
          return { key: menu.hash.slice(1), name: menu.innerText }
        });
        console.log(doc.getElementsByClassName('main')[0].children)
        const tags = Array.from(doc.getElementsByClassName('main')[0].children);
        const style = doc.getElementsByTagName('style')[0].innerText;
        const css = this.parseCssToObject(style)
        // ヘッダー背景色
        const headerColor = css.find(c => c.key == '#header').contents.background.match(/linear-gradient\((#.*),(#.*)\)/)
        this.ccfoliaLog.header_color1 = headerColor[1];
        this.ccfoliaLog.header_color2 = headerColor[2];
        // RGBを16進数に変換
        const rgbTo16 = function(col) {
          return "#" + col.match(/\d+/g).map(function(a){return ("0" + parseInt(a).toString(16)).slice(-2)}).join("");
        }
        this.ccfoliaLog.rows = tags.map((tag) => {
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
        const { names, selectedNameTabs } = this.ccfoliaLog.rows.filter(x => x.dice_type != null)
          .reduce(({ names, selectedNameTabs }, x) => {
            if (!names.includes(x.name)) {
              names.push(x.name);
              selectedNameTabs.push(x.name);
            }
            return { names, selectedNameTabs };
          }, { names: [], selectedNameTabs: [] });
        this.names = names;
        this.selectedNameTabs = selectedNameTabs;
        const uniqTabs = [...new Set(this.ccfoliaLog.rows.map(x => x.tab_name))].filter(e => e);
        var index = 0;
        const tabs = uniqTabs.reduce((result, x) => {
          if (x != 'メイン' && x != '雑談' && x != '情報') {
            const content = css.find(c => c.key == `.tab${index}`).contents;
            const lineColor = content['border-left'].match(/.*(#.*)/)[1]
            const backgroundColor = content['background-color']
            index = index + 1;
            result.push(this.tabColors(x, lineColor, backgroundColor));
          }
          return result;
        }, []);
        this.selectedOutputTabs = uniqTabs;
        this.ccfoliaLog.tabs = tabs;
        console.log(this.ccfoliaLog.tabs);
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
        const diceType = text.children[1].classList[1];
        if(diceType == null) return null;
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
      tabColors(name, lineColor = null, backgroundColor = null) {
        if(lineColor != null && backgroundColor != null) {
          return { name, line_color: lineColor, background_color: backgroundColor };
        }
        // KP, GM, DLを含む発言者は判定に使用しない
        const filteredRows = this.ccfoliaLog.rows.filter(x => !x.is_divider && x.tab_name === name && x.color !== '#222222' && x.color !== '#888888' && !x.name.match(/GM|KP|DL/));
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
      backgroundColor(tabName) {
        if(tabName == "メイン") return "#ffffff";
        if(tabName == "雑談") return "#f7f7f7";
        if(tabName == "情報") return "#fafafa";
        return this.ccfoliaLog.tabs.find(x => x.name == tabName).background_color;
      },
      attract(attractEnd) {
        if (this.attractFrom === attractEnd) {
          this.attractFrom = null;
          this.dogs = [];
          return;
        }
        if (this.attractFrom === null) {
          this.attractFrom = attractEnd;
          return;
        }
        if (this.ccfoliaLog.rows[this.attractFrom].tab_name != this.ccfoliaLog.rows[attractEnd].tab_name) {
          this.dogs.push(attractEnd);
          console.log(this.dogs)
          return;
        }
        const rows = this.ccfoliaLog.rows;
        const tabName = rows[this.attractFrom].tab_name;
        const dogs = this.dogs;
        for (let i = this.attractFrom + 1; i <= attractEnd; i++) {
          if (!dogs.includes(i) && rows[i].tab_name !== tabName) continue;
          rows.splice(this.attractFrom + 1, 0, rows.splice(i, 1)[0]);
          this.attractFrom++;
        }
        this.attractFrom = null;
        this.dogs = [];
      },
      attractButtonType(index) {
        if(this.attractFrom == index) return 'info';
        if(this.dogs.includes(index)) return 'warning';
        if(this.attractFrom == null || index < this.attractFrom || this.ccfoliaLog.rows[index].tab_name != this.ccfoliaLog.rows[this.attractFrom].tab_name) return null;
        return 'primary';
      }
    },
    computed: {
      dividerRows: function() {
        return this.ccfoliaLog.rows.filter(x => x.is_divider);
      },
      diceRows: function() {
        return this.ccfoliaLog.rows.filter(x => x.dice_type && x.dice_type.resultKey == this.selectedDiceResult && this.selectedDiceTabs.includes(x.tab_name) && this.selectedNameTabs.includes(x.name));
      },
    }
  };
</script>

<style>
.draggable:hover {
  cursor:-moz-grab;
  cursor:-webkit-grab;
  cursor: grab;
}
.draggable:active {
  cursor:-moz-grabbing;
  cursor:-webkit-grabbing;
  cursor: grabbing;
}
.sortable-chosen {
            opacity: 0.7;
            background-color:#dcdcdc;
        }
        .sortable-ghost {
            background-color:#dcdcdc;
        }
</style>