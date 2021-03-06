const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScore');
let finalScore = document.querySelector('#finalScore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore

username.addEventListener('keyup', () => {
  saveScore.disabled = !username.value
})

saveHighScore = e => {
  e.preventDefault()
  
  const score = {
    score: mostRecentScore,
    name: username.value
  }
  
  if (score.score >= 1000) {
    highScores.push(score)
  
    highScores.sort((a, b) => {
      return b.score - a.score
    })
  
    highScores.splice(5)
  
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/congrats.html')
  }
  else {
    highScores.push(score)
  
    highScores.sort((a, b) => {
      return b.score - a.score
    })
    highScores.splice(5)
  
    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/index.html')
  }
}