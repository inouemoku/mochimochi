<template>
  <div>
    <el-dialog title="ログの追加" :visible.sync="visible" width="80%" :close-on-click-modal="false" top="10vh">
      <div style="height:60vh; overflow-y:scroll;">
        <div v-for="(row, index) in ccfoliaLog.rows" :key="index" class="my-1">
          <div v-if="!row.is_divider" :style="`color:${row.color};background-color:${backgroundColor(index)}`">
            <el-button size="mini" icon="el-icon-magic-stick" :type="addButtonType(index)" @click="select(index)"></el-button>
            [{{row.tab_name}}] {{row.name}}： <span v-html="row.body" /><el-tag v-show="row.is_secret" size="mini" type="warning">シークレットダイス</el-tag>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">キャンセル</el-button>
        <el-button type="primary" :disabled="beforeIndex == null" @click="clickAddButton">選択範囲をログの末尾に追加する</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import common from "../mixins/common";
  import CcfoliaLog from '../classes/ccfolia_log';
  export default {
    name: "LogSeconds",
    mixins: [common],
    components: {
    },
    props: {
      initialCcfoliaLog: {
        type: CcfoliaLog,
        default: CcfoliaLog.fromObject()
      },
    },
    data() {
      return {
        ccfoliaLog: this.initialCcfoliaLog,
        visible: false,
        fromIndex: null,
        toIndex: null,
        beforeIndex: null,
      }
    },
    methods: {
      // リセットする
      reset() {
        this.fromIndex = null;
        this.toIndex = null;
        this.beforeIndex = null;
      },
      // 範囲選択ボタンをクリック
      select(index) {
        const beforeIndex = this.beforeIndex;
        this.beforeIndex = index;
        this.fromIndex = (beforeIndex == null || index < beforeIndex) ? index : beforeIndex;
        this.toIndex   = (beforeIndex == null || beforeIndex < index) ? index : beforeIndex;
      },
      // ボタンタイプを返す
      addButtonType(index) {
        if (this.fromIndex == index || this.toIndex == index) return 'primary';
        return null;
      },
      // 行の背景色を返す
      backgroundColor(index) {
        if (this.fromIndex == null && this.toIndex == null) return '';
        if (this.fromIndex <= index && index <= this.toIndex) return '#f3f9ff';
        return '';
      },
      clickAddButton() {
        this.addSelected();
        this.visible = false;
      },
      // 選択範囲をログの末尾に追加する
      addSelected() {
        this.$emit('addSelected', [this.fromIndex, this.toIndex]);
      },
    },
    watch: {
      initialCcfoliaLog: function(val) {
        this.ccfoliaLog = val;
      },
      visible() {
        this.reset();
      }
    },
  }
</script>