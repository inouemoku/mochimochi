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
        <el-card shadow="never" class="mb-3">
          <div slot="header" class="clearfix">
            <span>ダイス結果  <el-popover
              trigger="hover"
              content="ダイス結果だけまとめて見られます。">
              <el-button slot="reference" icon="el-icon-question" type="text"></el-button>
            </el-popover></span>
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
          <div v-for="(row, index) in diceRows" :key="index">
            <div :style="`color:${row.color}`">
              [{{row.tab_name}}] {{row.name}}： <span v-html="row.body" />
            </div>
          </div>
        </el-card>
        <el-card shadow="never" class="mb-3">
          <div slot="header" class="clearfix">
            <span>ヘッダー設定  <el-popover
              trigger="hover"
              content="ヘッダー色とタイトルの設定ができます。色は左と真ん中が背景色、右が文字色です。">
              <el-button slot="reference" icon="el-icon-question" type="text"></el-button>
            </el-popover></span>
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
        <el-card shadow="never" class="mb-3" v-show="ccfoliaLog.tabs.length > 0">
          <div slot="header" class="clearfix">
            <span>タブ色設定  <el-popover
              trigger="hover"
              content="雑談、情報以外のタブの色の設定ができます。左側がラインの色、右側が背景色です。">
              <el-button slot="reference" icon="el-icon-question" type="text"></el-button>
            </el-popover></span>
          </div>
          <div v-for="tab in ccfoliaLog.tabs" :key="tab.name">
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
        <el-card shadow="never" class="mb-4" :body-style="{height:'500px', 'overflow-y':'scroll'}">
          <div slot="header" class="clearfix">
            <span>ログ全文  <el-popover
              trigger="hover"
              content="+ボタンを押すとログに区切りを追加することができます。ヘッダーにもリンクが追加されます。">
              <el-button slot="reference" icon="el-icon-question" type="text"></el-button>
            </el-popover></span>
          </div>
          <div v-for="(row, index) in ccfoliaLog.rows" :key="index" class="my-1">
            <div v-if="!row.is_divider" :style="`color:${row.color}`">
              <el-button size="mini" @click="addRow(index)">+</el-button> [{{row.tab_name}}] {{row.name}}： <span v-html="row.body" />
            </div>
            <div v-if="row.is_divider">
              <el-row :gutter="5">
                <el-col :span="1"><el-button size="mini" @click="addRow(index)">+</el-button></el-col>
                <el-col :span="2"><el-input v-model="row.name" size="mini" placeholder="リンク名"></el-input></el-col>
                <el-col :span="10"><el-input v-model="row.body" size="mini" placeholder="表示名"></el-input></el-col>
                <el-col :span="1"><el-button size="mini" @click="removeRow(index)" icon="el-icon-delete" /></el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </div>
        <el-button class="px-5" @click="postCcfoliaLog" type="primary" :disabled="ccfoliaLog.rows.length <= 0">整形！</el-button>
    </el-form>
    <el-divider></el-divider>
    <small>
      <div>最終更新: 2021-02-27 <el-button @click="drawer=true" type="text" size="small">履歴</el-button></div>
      <div class="mb-4">Twitter: <a href="https://twitter.com/inouemoku" target="_blank">@inouemoku</a></div>
    </small>
    <el-drawer title="履歴" :visible.sync="drawer">
      <ul style="font-size:0.9em;">
        <li>2021-02-23 公開</li>
        <li>2021-02-27 一行のダイス結果表記に対応</li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
  import CcfoliaLog from '../classes/ccfolia_log';
  import LogRow from '../classes/log_row';
  
  export default {
    name: "CcfoliaFormatter",
    components: {
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
        ],
        system: {},
        selectedDiceResult: '',
        selectedDiceTabs: ['メイン'],
        drawer: false,
      }
    },
    props: {
    },
    methods: {
      // 行を追加
      addRow(index) {
        this.ccfoliaLog.rows.splice(index, 0, LogRow.fromObject({ is_divider: true, name: '', body: '' }));
      },
      // 行を削除
      removeRow(index) {
        this.ccfoliaLog.rows.splice(index, 1);
      },
      // 整形
      postCcfoliaLog(){
        const filename = this.ccfoliaLog.file.name.replace(/^(.*).html$/, '$1_整形.html');
        this.downloadBlob(this.ccfoliaLog.format(), filename, 'text/html');
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
      analyzeHtml() {
        const fileReader = new FileReader();
        const self = this;
        fileReader.onload = function(e){
          console.log(e);
          const parser = new DOMParser();
          const doc = parser.parseFromString(fileReader.result, "text/html");
          // parseに失敗した場合中断
          const parsererror = doc.getElementsByTagName('parsererror');
          if(parsererror.length > 0) {
            self.$message({
              type: 'error',
              message: 'ファイルの解析に失敗しました',
            });
            console.log(parsererror);
            return;
          }
          const ptags = doc.getElementsByTagName('p')
          self.ccfoliaLog.rows = Array.prototype.slice.call(ptags).map((p) => {
            const { isOneline, diceType } = self.diceType(p.children[2].innerHTML);
            const row = {
              color: p.outerHTML.match(/<p style="color:(.*);">/)[1],
              tab_name: p.children[0].innerText.replace(/^ \[(.*)\]/, '$1'),
              name: p.children[1].innerText,
              body: p.children[2].innerHTML,
              dice_type: diceType,
              is_oneline: isOneline,
            };
            return LogRow.fromObject(row);
          });
          const uniqTabs = [...new Set(self.ccfoliaLog.rows.map(x => x.tab_name))];
          const dayLine = LogRow.fromObject({
            is_divider: true,
            name: '1',
            body: '1日目',
          });
          self.ccfoliaLog.rows = [dayLine].concat(self.ccfoliaLog.rows);
          const tabs = uniqTabs.reduce((result, x) => {
            if(x != 'メイン' && x != '雑談' && x != '情報') result.push({name: x, line_color: '#aaa', background_color: '#f7f7f7' });
            return result;
          }, []);
          self.ccfoliaLog.tabs = tabs;
        }
        fileReader.readAsText(this.ccfoliaLog.file.raw);
        this.selectedDiceResult = this.system.diceTypes[0].resultKey;
      },
      diceType(body) {
        const isOneline = !(body.match(`.*${this.system.diceText} :.*＞.*`));
        if(isOneline) {
          const regO = new RegExp(`.*＞ (${this.system.diceTypes.map(x => x.name).join('|')})`)
          const rowO = body.match(regO);
          if(rowO) return {isOneline: true, diceType: this.system.diceTypes.find(d => d.name == rowO[1])};
          return { isOneline: true, diceType: null };
        }
        const reg = new RegExp(`.*${this.system.diceText} :.*＞ (${this.system.diceTypes.map(x => x.name).join('|')})`)
        const row = body.match(reg);
        if(row) return { isOneLlne: false, diceType: this.system.diceTypes.find(d => d.name == row[1])};
        return { isOneline: false, diceType: null }
      },
    },
    computed: {
      dividerRows: function() {
        return this.ccfoliaLog.rows.filter(x => x.is_divider);
      },
      diceRows: function() {
        return this.ccfoliaLog.rows.filter(x => x.dice_type && x.dice_type.resultKey == this.selectedDiceResult && this.selectedDiceTabs.includes(x.tab_name));
      },
    }
  };
</script>