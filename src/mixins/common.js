export default {
  data() {
    return {
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
      ],
      systems: [
        { key: 'coc6', prefix: '【CoC】', name: 'クトゥルフ神話TRPG', diceText: 'Cthulhu',
          diceResults: [
            { key: 'critical', name: '決定的成功' },
            { key: 'famble', name: '致命的失敗' },
            { key: 'special', name: 'スペシャル' },
            { key: 'success', name: '成功' },
            { key: 'failed', name: '失敗' }
          ],
          diceTypes: [
            { resultKey: 'critical', name: '決定的成功', class: 'success' },
            { resultKey: 'famble', name: '致命的失敗', class: 'failed' },
            { resultKey: 'special', name: 'スペシャル', class: 'success' },
            { resultKey: 'success', name: '成功', class: 'success' },
            { resultKey: 'success', name: '部分的成功', class: 'success' },
            { resultKey: 'failed', name: '失敗', class: 'failed' },
            { resultKey: 'failed', name: '故障', class: 'failed' },
          ]
        },
        // { key: 'coc7', name: '新クトゥルフ神話TRPG' },
        { key: 'emoklore', prefix: '【エモクロア】', name: 'エモクロアTRPG', diceText: 'Emoklore',
          diceResults: [
            { key: 'catastrophe', name: 'カタストロフ' },
            { key: 'miracle', name: 'ミラクル' },
            { key: 'triple', name: 'トリプル' },
            { key: 'double', name: 'ダブル' },
            { key: 'success', name: 'シングル' },
            { key: 'failed', name: '失敗' },
            { key: 'famble', name: 'ファンブル' }
          ],
          diceTypes: [
            { resultKey: 'catastrophe', name: 'カタストロフ!', class: 'success'  },
            { resultKey: 'miracle', name: 'ミラクル!', class: 'success'  },
            { resultKey: 'triple', name: 'トリプル!', class: 'success'  },
            { resultKey: 'double', name: 'ダブル!', class: 'success'  },
            { resultKey: 'success', name: '成功!', class: 'success'  },
            { resultKey: 'failed', name: '失敗!', class: 'failed' },
            { resultKey: 'famble', name: 'ファンブル!', class: 'failed' }
          ]
        },
        { key: 'insane', prefix: '【インセイン】', name: 'インセイン', diceText: 'Insane',
          diceResults: [
            { key: 'special', name: 'スペシャル' },
            { key: 'success', name: '成功' },
            { key: 'failed', name: '失敗' },
            { key: 'famble', name: 'ファンブル' }
          ],
          diceTypes: [
            { resultKey: 'famble', name: 'ファンブル', class: 'failed' },
            { resultKey: 'special', name: 'スペシャル', class: 'success' },
            { resultKey: 'success', name: '成功', class: 'success' },
            { resultKey: 'failed', name: '失敗', class: 'failed' },
          ]
        },
        { key: 'shinobigami', prefix: '【シノビガミ】', name: 'シノビガミ', diceText: 'ShinobiGami',
          diceResults: [
            { key: 'special', name: 'スペシャル' },
            { key: 'success', name: '成功' },
            { key: 'failed', name: '失敗' },
            { key: 'famble', name: 'ファンブル' }
          ],
          diceTypes: [
            { resultKey: 'famble', name: 'ファンブル', class: 'failed' },
            { resultKey: 'special', name: 'スペシャル', class: 'success' },
            { resultKey: 'success', name: '成功', class: 'success' },
            { resultKey: 'failed', name: '失敗', class: 'failed' },
          ]
        },
        { key: 'other', prefix: '', name: 'その他', diceText: '', diceResults: [], diceTypes: []}
      ],
    }
  }
}