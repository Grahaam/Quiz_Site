'use strict';

const questionElement = document.querySelector('#question');
const progressText = document.querySelector('#progressText');
const progressBarFull = document.querySelector('#progressBarFull');
const scoreText = document.querySelector('#score');
const choices = document.querySelectorAll('.choice-container');
const answerButtonsElement = document.querySelector('#answer-btn');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';




let questions = [
    {
        question: 'What is the name of the main character in the game?',
        answers: [
            { text: 'Mario', correct: true },
            { text: 'Luigi', correct: false },
            { text: 'Peach', correct: false },
            { text: 'Toad', correct: false }
        ]
    },
    {
        question: 'Can you jump on the ground?',
        answers: [
            { text: 'Yes', correct: true },
            { text: 'No', correct: false },
        ],
    },
    {
        question: 'How many lives does the game have?',
        answers: [
            { text: '1', correct: true },
            { text: '2', correct: true },
            { text: '3', correct: true },
            { text: '4', correct: true },
            { text: '5', correct: true },
        ]
    },
    {
        question: 'Why is the game called Super Mario?',
        answers: [
            { text: 'Because it is a game about Mario', correct: true },
            { text: 'Because it is a game about Mario and Luigi', correct: false },
            { text: 'Because it is a game about Mario and Peach', correct: false },
            { text: 'Because it is a game about Mario and Toad', correct: false },
            { text: 'Because it is a game about Mario and Yoshi', correct: false },
        ]
    },
    {
        question: 'Would you rather die as a ghost or a human?',
        answers: [
            {text: 'Ghost', correct: true,},
            {text: 'Human', correct: false },
            {text: 'Both', correct: false },
            {text: 'None', correct: true},
        ]
    },
    {
        question: 'What is love?',
        answers: [
            {text: 'Baby don\'t hurt', correct: true,},
            {text: 'Don\'t hurt me', correct: false },
            {text: 'No more', correct: false },
            {text: 'TIN TIN TIN TINTITNTIN', correct: true},
        ]
    },
    {
        question: 'Whose nose is red?',  
        answers: [
            {text: 'Mario', correct: true, },
            {text: 'Luigi', correct: false, },
            {text: 'Peach', correct: false, },
            {text: 'Toad', correct: false, },
            {text: 'Yoshi', correct: false, },
            {text: 'Bowser', correct: false, },
        ]
    },
]


let shuffledQuestions, shuffledAnswers, currentQuestionIndex;

startQuiz();

function startQuiz () {
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionCounter= 0;
    score = 0;
    setNextQuestion();
}

function setNextQuestion () {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


function selectAnswer() {
    
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
  

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.setAttribute('disabled', 'disabled');
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1 && currentQuestionIndex + 1 < MAX_QUESTIONS) {
        currentQuestionIndex++;
        progressBarFull.style.width = `${((currentQuestionIndex) / MAX_QUESTIONS)*100}%`
        setTimeout(() => {
            setNextQuestion();
        }, 1500);
        
    } else {
        localStorage.setItem('mostRecentScore', score);
        //Go to the end page
        setTimeout(() => {
            return window.location.assign('/end.html');
        },1500);
    }

}

function showQuestion(question) {
    questionElement.innerText = question.question;
    progressText.innerText = `Question ${currentQuestionIndex} / ${MAX_QUESTIONS}`
    let prefixCount = 0;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        const prefix = document.createElement('p');
        prefix.innerText = alphabet[prefixCount];
        const text = document.createElement('p');
        text.innerText = answer.text;

        button.classList.add('choice-container');
        prefix.classList.add('choice-prefix');
        text.classList.add('choice-text');

        button.appendChild(prefix);
        button.appendChild(text);
        

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        prefixCount++;
        button.addEventListener('click', () => {
            if (button.dataset.correct) {
                incrementScore(SCORE_PER_QUESTION);
            };
            selectAnswer();
        });
        answerButtonsElement.appendChild(button);
    });
    choices.forEach(element => {
        if (element.style.height > '250px') {
        element.style.fontSize = '2rem';
        element.style.height = '250px';
        }
    });
}

function resetState () {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function setStatusClass (element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

function clearStatusClass (element) {
    element.classList.remove('correct');
    element.classList.remove('incorrect');
}



const SCORE_PER_QUESTION = 100;
const MAX_QUESTIONS = 4;



function incrementScore (num) {
    score += num;
    scoreText.innerText = score;
}
