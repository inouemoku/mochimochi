<template>
  <el-card shadow="never" class="mb-3" v-if="visible">
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
</template>

<script>
  import CcfoliaLog from '../classes/ccfolia_log';

  export default {
    name: "DiceResult",
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      system: {
        type: Object,
        default: () => {}
      },
      names: {
        type: Array,
        default: () => []
      },
      initialSelectedNameTabs: {
        type: Array,
        default: () => []
      },
      ccfoliaLog: {
        type: CcfoliaLog,
        default: CcfoliaLog.fromObject()
      },
    },
    data() {
      return {
        selectedDiceResult: '',
        selectedDiceTabs: ['メイン'],
        selectedNameTabs: [],
      }
    },
    computed: {
      diceRows: function() {
        return this.ccfoliaLog.rows.filter(x => x.dice_type && x.dice_type.resultKey == this.selectedDiceResult && this.isIncludeSelectedDiceTabs(x.tab_name) && this.selectedNameTabs.includes(x.name));
      }
    },
    watch: {
      system() {
        if(this.system.diceTypes != null && this.system.diceTypes[0]) this.selectedDiceResult = this.system.diceTypes[0].resultKey;
      },
      initialSelectedNameTabs(val) {
        this.selectedNameTabs = val;
      }
    },
    methods: {
      isIncludeSelectedDiceTabs(originalTabName) {
        let tabName = originalTabName;
        if(tabName == 'main') tabName = 'メイン';
        if(tabName == 'info') tabName = '情報';
        if(tabName == 'other') tabName = '雑談';
        return this.selectedDiceTabs.includes(tabName);
      }

    }
  }
</script>