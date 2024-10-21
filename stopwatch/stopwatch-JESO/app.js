// // Common Variables
// let stopwatchInterval, countdownInterval;
// let stopwatchRunning = false, countdownRunning = false;

// // Stopwatch Functionality
// const stopwatchDisplay = document.getElementById('stopwatch-display');
// let stopwatchStartTime = 0, stopwatchElapsedTime = 0;

// document.getElementById('start-stopwatch').addEventListener('click', () => {
//   if (stopwatchRunning) {
//     clearInterval(stopwatchInterval);
//     stopwatchRunning = false;
//     document.getElementById('start-stopwatch').textContent = 'Start';
//   } else {
//     stopwatchStartTime = Date.now() - stopwatchElapsedTime;
//     stopwatchInterval = setInterval(() => {
//       stopwatchElapsedTime = Date.now() - stopwatchStartTime;
//       stopwatchDisplay.textContent = formatTime(stopwatchElapsedTime);
//     }, 10);
//     stopwatchRunning = true;
//     document.getElementById('start-stopwatch').textContent = 'Stop';
//   }
// });

// document.getElementById('reset-stopwatch').addEventListener('click', () => {
//   clearInterval(stopwatchInterval);
//   stopwatchRunning = false;
//   stopwatchElapsedTime = 0;
//   stopwatchDisplay.textContent = '00:00:00.000';
//   document.getElementById('start-stopwatch').textContent = 'Start';
// });

// // Countdown Functionality
// const countdownDisplay = document.getElementById('countdown-display');
// let countdownTime = 0, countdownRemainingTime = 0;

// document.getElementById('start-countdown').addEventListener('click', () => {
//   const inputSeconds = parseInt(document.getElementById('countdown-input').value) * 1000;
//   if (inputSeconds > 0) {
//     countdownTime = inputSeconds;
//     if (!countdownRunning) {
//       countdownRemainingTime = countdownTime;
//       countdownInterval = setInterval(() => {
//         countdownRemainingTime -= 10;
//         countdownDisplay.textContent = formatTime(countdownRemainingTime);
//         if (countdownRemainingTime <= 0) {
//           clearInterval(countdownInterval);
//         }
//       }, 10);
//       countdownRunning = true;
//       document.getElementById('start-countdown').textContent = 'Stop';
//     } else {
//       clearInterval(countdownInterval);
//       countdownRunning = false;
//       document.getElementById('start-countdown').textContent = 'Start';
//     }
//   }
// });

// document.getElementById('reset-countdown').addEventListener('click', () => {
//   clearInterval(countdownInterval);
//   countdownRunning = false;
//   countdownDisplay.textContent = '00:00:00.000';
//   document.getElementById('countdown-input').value = '';
//   document.getElementById('start-countdown').textContent = 'Start';
// });

// // Format Time Helper Function
// function formatTime(time) {
//   let milliseconds = Math.floor((time % 1000) / 10);
//   let seconds = Math.floor((time / 1000) % 60);
//   let minutes = Math.floor((time / (1000 * 60)) % 60);
//   let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  
//   return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
// }

// function pad(num, size = 2) {
//   return ('000' + num).slice(-size);
// }

// Countdown Functionality
let countdownTime = 0, countdownRemainingTime = 0;
let countdownRunning = false;
let countdownInterval;

const countdownDisplay = document.getElementById('countdown-display');
const setCountdownButton = document.getElementById('set-countdown');
const startCountdownButton = document.getElementById('start-countdown');
const resetCountdownButton = document.getElementById('reset-countdown');

// Event listener to set the countdown
setCountdownButton.addEventListener('click', () => {
  const hours = parseInt(document.getElementById('input-hours').value) || 0;
  const minutes = parseInt(document.getElementById('input-minutes').value) || 0;
  const seconds = parseInt(document.getElementById('input-seconds').value) || 0;

  // Convert input hours, minutes, and seconds to milliseconds
  countdownTime = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
  
  // Set the remaining time to the countdown time
  countdownRemainingTime = countdownTime;

  // Display the formatted countdown
  countdownDisplay.textContent = formatTime(countdownRemainingTime);
});

// Event listener to start or stop the countdown
startCountdownButton.addEventListener('click', () => {
  if (countdownRunning) {
    clearInterval(countdownInterval);
    countdownRunning = false;
    startCountdownButton.textContent = 'Start';
  } else {
    countdownInterval = setInterval(() => {
      countdownRemainingTime -= 10;
      if (countdownRemainingTime <= 0) {
        clearInterval(countdownInterval);
        countdownDisplay.textContent = '00:00:00.000';
        countdownRunning = false;
        startCountdownButton.textContent = 'Start';
        return;
      }
      countdownDisplay.textContent = formatTime(countdownRemainingTime);
    }, 10);
    
    countdownRunning = true;
    startCountdownButton.textContent = 'Stop';
  }
});

// Event listener to reset the countdown
resetCountdownButton.addEventListener('click', () => {
  clearInterval(countdownInterval);
  countdownRunning = false;
  countdownDisplay.textContent = '00:00:00.000';
  startCountdownButton.textContent = 'Start';
  countdownRemainingTime = 0;

  // Clear input fields
  document.getElementById('input-hours').value = '';
  document.getElementById('input-minutes').value = '';
  document.getElementById('input-seconds').value = '';
});

// Format Time Helper Function
function formatTime(time) {
  let milliseconds = Math.floor((time % 1000) / 10);
  let seconds = Math.floor((time / 1000) % 60);
  let minutes = Math.floor((time / (1000 * 60)) % 60);
  let hours = Math.floor((time / (1000 * 60 * 60)) % 24);
  
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(num, size = 2) {
  return ('000' + num).slice(-size);
}
