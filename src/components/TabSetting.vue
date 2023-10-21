<template>
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
</template>

<script>
  import common from "../mixins/common";
  import CcfoliaLog from '../classes/ccfolia_log';
  export default {
    name: "TabSetting",
    mixins: [common],
    props: {
      ccfoliaLog: {
        type: CcfoliaLog,
        default: CcfoliaLog.fromObject()
      },
      initialSelectedOutputTabs: {
        type: Array,
        default: () => []
      },
      inisitalIsHideSecretDice: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        selectedOutputTabs: this.initialSelectedOutputTabs,
        isHideSecretDice: this.inisitalIsHideSecretDice,
      }
    },
    watch: {
      initialSelectedOutputTabs: function(val) {
        this.selectedOutputTabs = val;
      },
      selectedOutputTabs: function(val) {
        this.$emit('selectOutputTabs', val);
      },
      isHideSecretDice: function(val) {
        this.$emit('changeIsHideSecretDice', val);
      }
    }
  }
</script>