<template>
  <div id="app">
    <div class="container-fluid">
      <h3 class="m-3">ココフォリアログ整形ツール</h3>
      <div class="row">
        <div class="col-md-12">
          <ccfolia-formatter />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CcfoliaFormatter from './components/CcfoliaFormatter.vue'

export default {
  name: 'App',
  components: {
    CcfoliaFormatter
  }
}
</script>
