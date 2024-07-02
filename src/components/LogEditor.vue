<template>
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
          <el-button size="mini" @click="removeRowConfirm(index, `[${row.tab_name}] ${row.name}： ${row.body}`)" icon="el-icon-delete" />
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
    <el-dialog
      :visible.sync="visibleRemoveRow">
      <div class="mb-3">{{ removeText }}</div>
      <span>を削除しますか？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visibleRemoveRow = false">キャンセル</el-button>
        <el-button type="danger" @click="removeRow(removeIndex)">削除する</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
  import draggable from 'vuedraggable';
  import common from "../mixins/common";
  import CcfoliaLog from '../classes/ccfolia_log';
  import LogRow from '../classes/log_row';
  export default {
    name: "TabSetting",
    mixins: [common],
    components: {
      draggable,
    },
    props: {
      initialCcfoliaLog: {
        type: CcfoliaLog,
        default: CcfoliaLog.fromObject()
      },
      selectedOutputTabs: {
        type: Array,
        default: () => []
      },
      dividerRows: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        ccfoliaLog: this.initialCcfoliaLog,
        attractFrom: null,
        dogs: [],
        visibleRemoveRow: false,
        removeIndex: null,
        removeText: null,
      }
    },
    methods: {
      // 行を追加
      addRow(index) {
        this.ccfoliaLog.rows.splice(index, 0, LogRow.fromObject({ is_divider: true, name: '', body: '', key: this.dividerRows.length }));
      },
      // 行を削除
      removeRow(index) {
        this.ccfoliaLog.rows.splice(index, 1);
        this.visibleRemoveRow = false;
      },
      // 行削除確認モーダルを表示
      removeRowConfirm(index, text) {
        this.removeIndex = index;
        this.removeText = text;
        this.visibleRemoveRow = true;
      },
      // 結合
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
        if(this.dogs.includes(attractEnd)) {
          this.dogs = this.dogs.filter(x => x != attractEnd)
          return;
        }
        if (this.ccfoliaLog.rows[this.attractFrom].tab_name != this.ccfoliaLog.rows[attractEnd].tab_name) {
          this.dogs.push(attractEnd);
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
      // 結合ボタンのタイプ
      attractButtonType(index) {
        if(this.attractFrom == index) return 'info';
        if(this.dogs.includes(index)) return 'warning';
        if(this.attractFrom == null || index < this.attractFrom || this.ccfoliaLog.rows[index].tab_name != this.ccfoliaLog.rows[this.attractFrom].tab_name) return null;
        return 'primary';
      },
      // 行の背景色
      backgroundColor(tabName) {
        if(tabName == "メイン" || tabName == 'main') return "#ffffff";
        if(tabName == "雑談" || tabName == 'other') return "#f7f7f7";
        if(tabName == "情報" || tabName == 'info') return "#fafafa";
        return this.ccfoliaLog.tabs.find(x => x.name == tabName).background_color;
      },
    },
    watch: {
      initialCcfoliaLog: function(val) {
        this.ccfoliaLog = val;
      },
      ccfoliaLog: function(val) {
        this.$emit('changeCcFoliaLog', val);
      },
    },
  }
</script>