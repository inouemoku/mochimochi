<template>
  <div>
    <el-form ref="ccfoliaLog" :model="ccfoliaLog" class="mb-5">
      <system-form
        @select="selectSystem"
      />
      <div v-show="ccfoliaLog.rows.length > 0">
        <dice-result
          :visible="ccfoliaLog.system != 'other'"
          :system="system"
          :names="names"
          :initialSelectedNameTabs="selectedNameTabs"
          :ccfoliaLog="ccfoliaLog"
        />
        <header-setting
          ref="headerSetting"
          :initialHeaderColor1="ccfoliaLog.header_color1"
          :initialHeaderColor2="ccfoliaLog.header_color2"
          :initialLinkColor="ccfoliaLog.link_color"
          :dividerRows="dividerRows"
          @changeHeaderColor1="changeHeaderColor1"
          @changeHeaderColor2="changeHeaderColor2"
          @changeLinkColor="changeLinkColor"
          @changeTitle="changeTitle"
        />
        <tab-setting
          :ccfoliaLog="ccfoliaLog"
          :initialSelectedOutputTabs="selectedOutputTabs"
          :inisitalIsHideSecretDice="isHideSecretDice"
          @changeIsHideSecretDice="changeIsHideSecretDice"
          @changeSelectedOutputTabs="changeSelectedOutputTabs"
        />
        <log-editor
          :initialCcfoliaLog="ccfoliaLog"
          :selectedOutputTabs="selectedOutputTabs"
          :dividerRows="dividerRows"
          @changeCcfoliaLog="changeCcfoliaLog"
        />
        <log-seconds
          ref="logSeconds"
          :initialCcfoliaLog="ccfoliaLogSecond"
          @addSelected="addSelected"
        ></log-seconds>
      </div>
      <el-form-item prop="file">
        <el-upload
          drag
          action=""
          :auto-upload="false"
          :on-change="handleChangeFile"
          :file-list="fileList"
          >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
        </el-upload>
        <div v-show="ccfoliaLog.rows.length > 0">もう一度ファイルを読み込むとログを追加できます。</div>
      </el-form-item>
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
    <histories></histories>
  </div>
</template>

<script>
  import SystemForm from './SystemForm.vue';
  import DiceResult from './DiceResult.vue';
  import HeaderSetting from './HeaderSetting.vue';
  import TabSetting from './TabSetting.vue';
  import LogEditor from './LogEditor.vue';
  import LogSeconds from './LogSeconds.vue';
  import Histories from './Histories.vue';
  import CcfoliaLog from '../classes/ccfolia_log';
  import analyze from '../mixins/analyze';
  import common from '../mixins/common';
  
  export default {
    name: "CcfoliaFormatter",
    mixins: [analyze, common],
    components: {
      SystemForm, DiceResult, HeaderSetting, TabSetting, LogEditor, LogSeconds, Histories,
        
    },
    data() {
      return {
        ccfoliaLog: CcfoliaLog.fromObject(),
        ccfoliaLogSecond: CcfoliaLog.fromObject(),
        system: {},
        selectedNameTabs: [],
        selectedNameTabsSecond: [],
        selectedOutputTabs: [],
        selectedOutputTabsSecond: [],
        names: [],
        namesSecond: [],
        isHideSecretDice: false,
        filename: '',
        visibleSecondsDialog: false,
        fileList: [],
      }
    },
    props: {
    },
    methods: {
      // システムを選択
      selectSystem(val) {
        this.ccfoliaLog.system = val;
      },
      // ヘッダー色1を変更
      changeHeaderColor1(val) {
        this.ccfoliaLog.header_color1 = val;
      },
      // ヘッダー色2を変更
      changeHeaderColor2(val) {
        this.ccfoliaLog.header_color2 = val;
      },
      // リンク色を変更
      changeLinkColor(val) {
        this.ccfoliaLog.link_color = val;
      },
      // タイトルを変更
      changeTitle(val) {
        this.ccfoliaLog.title = val;
      },
      // シークレットダイスを隠すかどうかを変更
      changeIsHideSecretDice(val) {
        this.isHideSecretDice = val;
      },
      // 出力するタブを変更
      changeSelectedOutputTabs(val) {
        this.selectedOutputTabs = val;
      },
      // ログを変更
      changeCcfoliaLog(val) {
        this.ccfoliaLog = val;
      },
      // 整形
      postCcfoliaLog(){
        this.downloadBlob(this.ccfoliaLog.format(this.selectedOutputTabs, this.isHideSecretDice), this.filename.replace(/^(.*).html$/, '$1_整形.html'), 'text/html');
      },
      // 元の形式でダウンロード
      postOriginalCcfoliaLog(){
        this.downloadBlob(this.ccfoliaLog.notFormat(this.selectedOutputTabs, this.isHideSecretDice), this.filename, 'text/html');
      },
      // ファイルが追加された時のアクション
      handleChangeFile(file) {
        this.fileList = [];
        if (this.ccfoliaLog.rows.length == 0) {
          this.handleChangeFileFirst(file);
        } else {
          this.handleChangeFileSeconds(file);
        }
      },
      // 初めてファイルが追加された時のアクション
      handleChangeFileFirst(file) {
        this.ccfoliaLog.file = file;
        this.system = this.systems.find(x => x.key == this.ccfoliaLog.system);
        const title = this.ccfoliaLog.file.name.replace(/^(.*).html$/, '$1').replace(/^(.*)\[all\]$/, '$1');
        this.$refs.headerSetting.title = `${this.system.prefix}${title}`;
        this.filename = this.ccfoliaLog.file.name;
        this.analyzeHtmlFirst();
      },
      // おかわりファイルが追加された時のアクション
      handleChangeFileSeconds(file) {
        this.resetSeconds();
        this.ccfoliaLogSecond.file = file;
        this.analyzeHtmlSeconds();
        this.$refs.logSeconds.visible = true;
      },
      // おかわり用変数のリセット
      resetSeconds() {
        this.ccfoliaLogSecond = CcfoliaLog.fromObject();
        this.selectedNameTabsSecond = [];
        this.selectedOutputTabsSecond = [];
        this.namesSecond = [];
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
      // 初回用ログHTMLを解析する
      analyzeHtmlFirst() {
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
          const { ccfoliaLog, names, selectedNameTabs, uniqTabs } = mochi.length > 0
            ? self.analyzeHtmlMochiMochi(doc)
            : self.analyzeHtmlCcfolia(doc);
          
          self.ccfoliaLog = ccfoliaLog;
          self.names = names;
          self.selectedNameTabs = selectedNameTabs;
          self.selectedOutputTabs = uniqTabs;
          console.log('onload end')
        }
        fileReader.readAsText(this.ccfoliaLog.file.raw);
      },
      // おかわり用ログHTMLを解析する
      analyzeHtmlSeconds() {
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
          const { ccfoliaLog, names, selectedNameTabs, uniqTabs } = mochi.length > 0
            ? self.analyzeHtmlMochiMochi(doc)
            : self.analyzeHtmlCcfolia(doc);
          
          self.ccfoliaLogSecond = ccfoliaLog;
          self.namesSecond = names;
          self.selectedNameTabsSecond = selectedNameTabs;
          self.selectedOutputTabsSecond = uniqTabs;
          console.log('onload end')
        }
        fileReader.readAsText(this.ccfoliaLogSecond.file.raw);
      },
      // おかわりを追加
      addSelected(indexes) {
        const fromIndex = indexes[0];
        const toIndex = indexes[1];
        console.log(this.names, this.namesSecond)
        this.names = this.concatSeconds(this.names, this.namesSecond);
        this.selectedNameTabs = this.concatSeconds(this.selectedNameTabs, this.selectedNameTabsSecond);
        this.selectedOutputTabs = this.concatSeconds(this.selectedOutputTabs, this.selectedOutputTabsSecond);
        const tabsSecond = this.ccfoliaLogSecond.tabs.filter(x => !this.ccfoliaLog.tabs.some(y => y.name == x.name))
        this.ccfoliaLog.tabs = this.ccfoliaLog.tabs.concat(tabsSecond)
        const filteredRows = this.ccfoliaLogSecond.rows.filter((_x, i) => fromIndex <= i && i <= toIndex);
        this.ccfoliaLog.rows = this.ccfoliaLog.rows.concat(filteredRows);
      },
      concatSeconds(originalArray, secondArray) {
        const second = secondArray.filter(x => !originalArray.some(y => y == x))
        return originalArray.concat(second);
      }
    },
    computed: {
      dividerRows: function() {
        return this.ccfoliaLog.rows.filter(x => x.is_divider);
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