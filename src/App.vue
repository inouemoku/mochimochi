<template>
  <div id="app">
    <div class="container-fluid">
      <h3 class="my-3">MochiMochi - ココフォリアログ整形ツール</h3>
      <small>
        自分用に作ったログ整形ツールです。ココフォリアのログファイルを読み込ませて整形！ボタンを押すとダウンロードできます。<br>
        システムに「その他」以外を選択した場合は、ダイス結果も見られます。
      </small>
      <div class="row mt-3">
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
