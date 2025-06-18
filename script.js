// タイマー変数
let time = 25 * 60; // 25分（秒）
let isRunning = false;
let isWorkSession = true;
let sessionCount = 0;
let timerInterval;

// タイマー表示を更新
function updateTimer() {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// タイマー開始
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      if (time > 0) {
        time--;
        updateTimer();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        // ベル音再生
        const bell = document.getElementById('bell');
        bell.play().catch(e => console.error('音声エラー:', e));
        // チェックマークアニメーション
        const checkmark = document.getElementById('checkmark');
        checkmark.classList.remove('hidden');
        checkmark.classList.add('show');
        setTimeout(() => checkmark.classList.add('hidden'), 1000);
        // セッション更新
        sessionCount++;
        document.getElementById('session-count').textContent = `セッション: ${sessionCount}`;
        isWorkSession = !isWorkSession;
        time = isWorkSession ? 25 * 60 : 5 * 60; // 作業25分、休憩5分
        updateTimer();
      }
    }, 1000);
  }
}

// タイマー停止
function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

// タイマーリセット
function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  time = 25 * 60;
  isWorkSession = true;
  sessionCount = 0;
  document.getElementById('session-count').textContent = `セッション: ${sessionCount}`;
  updateTimer();
}

// 初期表示
updateTimer();
