const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScore');
let finalScore = document.querySelector('#finalScore');
const mostRecentScore = document.querySelector('#mostRecentScore');*

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGH_SCORES = 5;

final.score.innerText = mostRecentScore

username.addEventListener('keyup', () => {
  saveScore.disabled = !username.value
})

saveHighScore = e => {
  e.preventDefault()
  
  const score = {
    score: mostRecentScore,
    name: username.value
  }
  
  highScores.push(score)
  
  highScores.sort((a,b) => {
    return b.score - a.score
  })
  
  highScores.splice(5)
  
  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('/index.html')
}
