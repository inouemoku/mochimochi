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
        { key: 'coc6', prefix: '【CoC】', name: 'クトゥルフ神話TRPG(6版)', diceText: 'Cthulhu',
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
        { key: 'coc7', prefix: '【CoC】', name: '新クトゥルフ神話TRPG(7版)', diceText: 'Cthulhu7th',
          diceResults: [
            { key: 'critical', name: 'クリティカル' },
            { key: 'famble', name: 'ファンブル' },
            { key: 'extreme_success', name: 'イクストリーム成功' },
            { key: 'hard_success', name: 'ハード成功' },
            { key: 'regular_success', name: 'レギュラー成功' },
            { key: 'success', name: '成功' },
            { key: 'failed', name: '失敗' },
          ],
          diceTypes: [
            { resultKey: 'critical', name: 'クリティカル', class: 'success' },
            { resultKey: 'famble', name: 'ファンブル', class: 'failed' },
            { resultKey: 'extreme_success', name: 'イクストリーム成功', class: 'success' },
            { resultKey: 'hard_success', name: 'ハード成功', class: 'success' },
            { resultKey: 'regular_success', name: 'レギュラー成功', class: 'success' },
            { resultKey: 'success', name: '成功', class: 'success' },
            { resultKey: 'success', name: '部分的成功', class: 'success' },
            { resultKey: 'failed', name: '失敗', class: 'failed' },
            { resultKey: 'failed', name: '故障', class: 'failed' },
          ]
        },
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
  },
}