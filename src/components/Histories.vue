<template>
  <div>
    <small>
      <div>最終更新: {{ histories[0].date }} <el-button @click="drawer=true" type="text" size="small">履歴</el-button></div>
      <div class="mb-4">Twitter: <a href="https://twitter.com/inouemoku" target="_blank">@inouemoku</a></div>
    </small>
    <el-drawer title="履歴" :visible.sync="drawer">
      <ul style="font-size:0.8em;" v-for="history in histories" :key="history.index">
        <li>{{ history.date }} {{ history.text }}</li>
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
        histories: [
          { date: '2024-07-12', text: 'タブ設定で選択していないタブが出力される不具合修正' },
          { date: '2024-07-03', text: 'タブ名の変更に対応' },
          { date: '2024-04-29', text: 'ヘッダーの内容が反映されない不具合修正' },
          { date: '2024-03-25', text: '新クトゥルフ神話TRPG(7版)に対応' },
          { date: '2024-03-23', text: '行を削除できるように変更' },
          { date: '2024-03-23', text: 'ログを追加で読み込めるように変更' },
          { date: '2024-01-27', text: '整形したログを読み込んだ時に複数の改行があると消去されてしまうのを修正' },
          { date: '2024-01-26', text: 'タイトルが反映されないのを修正' },
          { date: '2024-01-25', text: '選択したタブ以外も出力されてしまうのを修正' },
          { date: '2024-01-23', text: '整形したログを整形するとダイス表示がおかしくなるのを修正' },
          { date: '2023-09-11', text: 'タブごとに行をまとめる時に他のタブも巻き込めるように変更' },
          { date: '2023-06-19', text: '整形したログを再度読み込めるように変更' },
          { date: '2023-03-26', text: 'タブごとに行をまとめる機能を追加' },
          { date: '2022-10-26', text: '整形しないでダウンロードする機能を追加' },
          { date: '2022-09-06', text: '本文の順序入れ替え時にフォーム部分が反応しないように修正' },
          { date: '2022-05-30', text: 'シークレットダイスの判定を修正' },
          { date: '2022-05-20', text: 'シークレットダイスの判定を修正' },
          { date: '2022-05-07', text: 'インセイン、シノビガミに対応' },
          { date: '2022-04-26', text: 'シークレットダイスの結果を隠せるように変更' },
          { date: '2022-04-22', text: '出力するタブを選択できるように変更' },
          { date: '2022-02-06', text: 'タブ色設定の初期色を変更' },
          { date: '2021-09-14', text: 'ヘッダーのタイトル色が変更されないのを修正' },
          { date: '2021-06-27', text: '背景色が編集パネルに反映されるように変更' },
          { date: '2021-06-06', text: 'ダイス結果を名前で絞り込めるように変更' },
          { date: '2021-03-29', text: 'エモクロアTRPGに対応' },
          { date: '2021-03-15', text: 'リンクが効かない不具合の修正' },
          { date: '2021-03-13', text: '本文の順序を入れ替える機能を追加' },
          { date: '2021-02-27', text: '一行のダイス結果表記に対応' },
          { date: '2021-02-23', text: '公開' }
        ]
      }
    }
  }
</script>