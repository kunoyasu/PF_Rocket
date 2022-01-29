// ストップボタン
const stopButton = document.querySelector('#stop')
// 開始時のモーダル
const startDialog = document.getElementById('startModal')
const startButton = document.getElementById('start')
// 結果時のモーダル
const resultDialog = document.getElementById('resultModal')
const resultTitle = document.getElementById('resultModalLabel')
const resultBody = document.getElementById('resultBody')
const modalWrapper = document.getElementById('modal-wrapper')

const fadeIn = document.getElementById('fade')
var result = document.getElementById('result')
var startTime
var intervalId

var elapsedTime
var diff

// ロード時にモーダル表示
window.onload = () => {
  document.getElementById('astronaut').style.visibility = 'hidden'
  startDialog.ariaModal = 'true'
  startDialog.role = 'dialog'
  startDialog.style = 'display: block;'
  startDialog.classList.add('show')
}

// モーダルの表示の設定
const modal = function () {
  resultDialog.ariaModal = 'true'
  resultDialog.role = 'dialog'
  resultDialog.style = 'display: block;'
  resultDialog.classList.add('show')
  resultDialog.setAttribute('aria-hidden', 'true')
}

// スタート押下時
startButton.addEventListener('click', function () {
  startTime = Date.now()
  startDialog.remove()
  modalWrapper.style.visibility = 'hidden'

  picChange()
})

// STOP押下時
stopButton.addEventListener('click', function () {
  clearInterval(intervalId)

  // 結果の浮き出し文字制御
  fadeIn.innerText = '発射成功'
  fadeIn.classList.add('blur')

  modalWrapper.style.visibility = 'visible'

  elapsedTime = (Date.now() - startTime) / 1000
  result.textContent = elapsedTime.toFixed(3)
  diff = elapsedTime - 5.0

  if (diff > -0.5 && diff < 0.5) {
    fadeIn.innerText = '発射成功'
    resultTitle.innerText = 'やったな！発射成功だ！！挑戦してくれてありがとうな！！'
    resultBody.innerHTML =
      '天才的な時間感覚の持ち主だな！君のおかげでロケットは発射成功したぞ！！またいつでも挑戦してくれよな！！'
  } else if (diff > -1.0 && diff < 1.0) {
    fadeIn.innerText = '発射失敗'
    resultTitle.innerText = '打ち上げ失敗だ！'
    resultBody.innerHTML =
      '残念！ロケットは打ち上げに失敗したぞ、またチャレンジしてくれよな！次こそは、絶っ対に成功させような！！'
  } else {
    fadeIn.innerText = '大爆発〜'
    resultTitle.innerText = '大爆発してしまったぞ！'
    resultBody.innerHTML =
      'あれれ。そうか、、、寝てたのか。。うん、惜しくもないぞ！とりあえず、もう一回チャレンジしてみてくれよな！！'
  }
  // 結果モーダル出力
  setTimeout(modal, 3000)
})

function picChange() {
  var elapsedTime

  stop = elapsedTime = Math.floor((Date.now() - startTime) / 1000)
  const fireImg = ['./images/fire1.png', './images/fire2.png', './images/fire3.png']
  const peopleImg = ['./images/people1.png', './images/people2.png', './images/people3.png']

  if (elapsedTime < 1) {
    //画像選択
    fire.src = fireImg[0]
    people.src = peopleImg[0]
  } else if (2 <= elapsedTime < 3) {
    fire.src = fireImg[1]
    people.src = peopleImg[1]
    document.body.style.backgroundColor = '#FF9933'
  }
  if (3 <= elapsedTime) {
    document.getElementById('astronaut').style.visibility = 'visible'
    fire.src = fireImg[2]
    people.src = peopleImg[2]
    document.body.style.backgroundColor = '#000033'
  }
  intervalId = setTimeout('picChange()', 1000)
}

// setIntervalメソッドの繰り返し処理を解除する関数
function stopInterval() {
  clearInterval(intervalId)
}

function tweet() {
  var resultTitle = fadeIn.innerText
  const dataText =
    resultTitle +
    '!!\nきみの記録は' +
    this.elapsedTime +
    '秒だ！' +
    '目標とのタイム差は' +
    Math.abs(diff).toFixed(3) +
    '秒だったぞ！また挑戦してくれよな！！'
  const dataUrl = 'https://zealous-heyrovsky-308820.netlify.app/'
  const dataVia = 'kunoyasu'
  const dataHashtags = 'ロケット' + '&hashtags=個人開発' + '&hashtags=クソアプリ'

  window.open(
    'https://twitter.com/intent/tweet?&text=' +
      dataText +
      '%0a&' +
      '&url=' +
      dataUrl +
      '%0a&' +
      '&via=' +
      dataVia +
      '&hashtags=' +
      dataHashtags
  )
}
