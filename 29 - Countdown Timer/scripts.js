let countdown
const timerDisplay = document.querySelector('.display__time-left')
const endTime = document.querySelector('.display__end-time')
const buttons = document.querySelectorAll('[data-time]')

function timer (seconds) {
  clearInterval(countdown)

  const now = Date.now()
  const then = now + (seconds * 1000)
  displayTimeLeft(seconds)
  displayEndTime(then)
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000)
    if (secondsLeft < 0) {
      clearInterval(countdown)
      return
    }
    displayTimeLeft(secondsLeft)
  }, 1000)
}

function displayTimeLeft (seconds) {
  const minutes = formatTimeString(Math.floor(seconds / 60))
  const remainderSeconds = formatTimeString(seconds % 60)
  const display = `${minutes}:${remainderSeconds}`
  timerDisplay.textContent = display
  document.title = display
}

function displayEndTime (timestamp) {
  const end = new Date(timestamp)
  const hours = formatTimeString(end.getHours())
  const minutes = formatTimeString(end.getMinutes())
  endTime.textContent = `Be Back At ${hours}:${minutes}`
}

function formatTimeString (number) {
  return number.toString().padStart(2, '0')
}

function startTimer () {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

buttons.forEach((button) => button.addEventListener('click', startTimer))
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const seconds = parseInt(this.minutes.value) * 60
  timer(seconds)
  this.reset()
})
