<template>
  <el-form-item prop="system">
    <el-select v-model="selectedSystem" style="width:250px">
      <el-option
        v-for="s in systems"
        :key="s.key"
        :label="s.name"
        :value="s.key">
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
  import common from "../mixins/common";
  export default {
    name: "SystemForm",
    mixins: [common],
    props: {
      initialSystem: {
        type: String,
        default: "coc6"
      }
    },
    data() {
      return {
        selectedSystem: this.initialSystem,
      }
    },
    watch: {
      selectedSystem: function(val) {
        this.$emit('select', val);
      }
    }
  }
</script>