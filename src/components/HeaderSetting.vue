<template>
  <el-card shadow="never" class="mb-3">
    <div slot="header" class="clearfix">
      <span>ヘッダー設定  <el-tooltip
        effect="dark"  placement="top-start">
        <div slot="content">ヘッダー色とタイトルの設定ができます。<br/>色は左と真ん中が背景色、右が文字色です。</div>
        <el-button icon="el-icon-question" type="text"></el-button>
      </el-tooltip></span>
    </div>
    <el-color-picker
      v-model="headerColor1"
      :predefine="predefineColors">
    </el-color-picker>
    <el-color-picker
      v-model="headerColor2"
      :predefine="predefineColors">
    </el-color-picker>
    <el-color-picker
      v-model="linkColor"
      :predefine="predefineColors">
    </el-color-picker>
    <el-input v-model="title" class="mb-2"></el-input>
    <div class="mb-3" :style="`background:linear-gradient(${headerColor1},${headerColor2});color:${linkColor}`">
      <div class="p-2">{{title}}</div>
      <div class="p-2"><span v-for="dividerRow in dividerRows" :key="dividerRow.name">{{dividerRow.name}} </span></div>
    </div>
  </el-card>
</template>

<script>
  import common from "../mixins/common.js"

  export default {
    name: "DiceResult",
    mixins: [common],
    props: {
      initialHeaderColor1: {
        type: String,
        default: ""
      },
      initialHeaderColor2: {
        type: String,
        default: ""
      },
      initialLinkColor: {
        type: String,
        default: ""
      },
      dividerRows: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        headerColor1: this.initialHeaderColor1,
        headerColor2: this.initialHeaderColor2,
        linkColor: this.initialLinkColor,
        title: '',
      }
    },
    watch: {
      headerColor1(val) {
        this.$emit('changeHeaderColor1', val);
      },
      headerColor2(val) {
        this.$emit('changeHeaderColor2', val);
      },
      linkColor(val) {
        this.$emit('changeLinkColor', val);
      },
      title(val) {
        this.$emit('changeTitle', val);
      }
    }
  }
</script>