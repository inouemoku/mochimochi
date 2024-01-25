<template>
  <div>
    <small>
      <div>最終更新: 2024-01-25 <el-button @click="drawer=true" type="text" size="small">履歴</el-button></div>
      <div class="mb-4">Twitter: <a href="https://twitter.com/inouemoku" target="_blank">@inouemoku</a></div>
    </small>
    <el-drawer title="履歴" :visible.sync="drawer">
      <ul style="font-size:0.9em;">
        <li>2024-01-25 選択したタブ以外も出力されてしまうのを修正</li>
        <li>2024-01-23 整形したログを整形するとダイス表示がおかしくなるのを修正</li>
        <li>2023-09-11 タブごとに行をまとめる時に他のタブも巻き込めるように変更</li>
        <li>2023-06-19 整形したログを再度読み込めるように変更</li>
        <li>2023-03-26 タブごとに行をまとめる機能を追加</li>
        <li>2022-10-26 整形しないでダウンロードする機能を追加</li>
        <li>2022-09-06 本文の順序入れ替え時にフォーム部分が反応しないように修正</li>
        <li>2022-05-30 シークレットダイスの判定を修正</li>
        <li>2022-05-20 シークレットダイスの判定を修正</li>
        <li>2022-05-07 インセイン、シノビガミに対応</li>
        <li>2022-04-26 シークレットダイスの結果を隠せるように変更</li>
        <li>2022-04-22 出力するタブを選択できるように変更</li>
        <li>2022-02-06 タブ色設定の初期色を変更</li>
        <li>2021-09-14 ヘッダーのタイトル色が変更されないのを修正</li>
        <li>2021-06-27 背景色が編集パネルに反映されるように変更</li>
        <li>2021-06-06 ダイス結果を名前で絞り込めるように変更</li>
        <li>2021-03-29 エモクロアTRPGに対応</li>
        <li>2021-03-15 リンクが効かない不具合の修正</li>
        <li>2021-03-13 本文の順序を入れ替える機能を追加</li>
        <li>2021-02-27 一行のダイス結果表記に対応</li>
        <li>2021-02-23 公開</li>
      </ul>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "Histories",
    data() {
      return {
        drawer: false,
      }
    }
  }
</script>