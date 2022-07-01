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
const SCORE_PER_QUESTION = 100;
const MAX_QUESTIONS = 4;




let questions = [
    {
        question: 'Quels sont mes 2eme et 3eme prénoms?',
        answers: [
            { text: 'Mario, Luigi', correct: false },
            { text: 'Jean, Bob', correct: false },
            { text: 'Arthur, René', correct: false },
            { text: 'Antoine, Jérémy', correct: true }
        ]
    },
    {
        question: 'Quel est le truc le lus débile que j\'ai fait bourré? (simple là)',
        answers: [
            { text: 'Faire des roulades dans monjardin en parlant anglais à quelq\'un qui ne comprend pas l\'anglais', correct: false },
            { text: 'Courir tout nu dans la rue', correct: false },
            { text: 'Perdre l\'intégralité de mes affaires', correct: true },
            { text: 'Courir tout nu dans la rue', correct: false },
        ],
    },
    {
        question: 'Combien de gosse je voudrais?',
        answers: [
            { text: '0', correct: true },
            { text: 'Aucun', correct: true },
            { text: 'Non vraiment c\'est horrible je veux pas d\'enfant', correct: true },
            { text: 'Nombre de fois où le mouvement \'All life matters\' a été pertinent', correct: true },
            { text: '5 (indice c\'est pas la bonne réponse)', correct: true },
        ]
    },
    {
        question: 'Pourquoi je suis roux?',
        answers: [
            { text: 'Ma mère a couché avec le facteur', correct: false },
            { text: 'Les forces toutes puissantes ont voulu punir ma mère pour avoir bu pendant la grossesse', correct: false },
            { text: 'Accident avec un bg sur le bateau en Tunésie pendant que mon père dormais', correct: false },
            { text: 'Je suis un endant de Satan envoyé sur Terre pour établir le chaos', correct: true },
            { text: 'Mutation génétique banale j\'ai vraiment rien de spécial', correct: true },
        ]
    },
    {
        question: 'Quel est ma race de chien de rêve?',
        answers: [
            {text: 'Husky', correct: true,},
            {text: 'Labrador', correct: false },
            {text: 'Berger Australien', correct: true },
            {text: 'Jack Russel', correct: false},
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
        question: 'What\s the one thing I want to do on my Bucket List rn ?',  
        answers: [
            {text: 'U', correct: true, },
            {text: 'You', correct: true, },
            {text: 'Also you', correct: true, },
            {text: 'W', correct: true, },
            {text: 'Skydiving', correct: false, },
            {text: 'Maybe you', correct: false, },
        ]
    },
    {
        question: 'Qu\'est-ce que je voulais être étant petit ?',
        answers: [
            {text: 'Pompier', correct: false,},
            {text: 'Astronaut', correct: false },
            {text: 'Paléontologue', correct: true },
            {text: 'Aussi intelligent que mon frère', correct: false},
            {text: 'Heureux', correct: false},
        ]
    },
    {
        question: 'Ma couleur préférée ?',
        answers: [
            {text: 'Violet 🟣', correct: false,},
            {text: 'Rouge 🔴', correct: false },
             {text: 'Bordeaux🍷', correct: true},
            {text: 'Orange is the new Black 🟠⚫', correct: false },
        ]
    },
    {
        question: 'Quelle a été la plus grosse influence dans ma vie?',
        answers: [
            {text: 'Smash', correct: true,},
            {text: 'Mon père', correct: false },
            {text: 'Mon grand grand frère', correct: false },
            {text: 'Le fait que je sois roux', correct: true},
        ]
    },
    {
        question: 'Une des choses que je trouve le plus sexy sur un corps féminin?',
        answers: [
            {text: 'Boobiiiizz', correct: true,},
            {text: 'LE CUL LAUL', correct: true },
            {text: 'Le regard', correct: true },
            {text: 'Les paumettes de dos', correct: true},
        ]
    },
    {
        question: 'Qu\'est-ce qui me saoul le plus ?',
        answers: [
            {text: 'Les bruits de bouche', correct: true,},
            {text: 'Les enfants qui font du bruit', correct: false },
            {text: 'La prof d\'anglais', correct: false },
            {text: 'Navi dans OOT', correct: false},
        ]
    },
    {
        question: 'Quel est mon pire traumatisme ?',
        
        answers: [
            {text: 'Poussin', correct: true,},
            {text: 'Don du sang', correct: false },
            {text: 'Mon père', correct: false },
            {text: 'Voir un cadavre brûlé', correct: false},
        ]
    },
    {
        question: 'Quel a été mon nom de DJ ado?',
        answers: [
            {text: 'DJ Tobbbo', correct: false,},
            {text: 'DJ Titi', correct: false },
            {text: 'DJ Tobias', correct: false },
            {text: 'DJ Tailler', correct: true},
        ]
    },
    {
        question: 'Laquelle de ces choses je ne sais PAS faire ?',
        answers: [
            {text: 'Compter en binaire', correct: true,},
            {text: 'Parler français', correct: false },
            {text: 'Choisir un film', correct: true },
            {text: 'Rester concentré plus de 30 min', correct: false},
        ]
    },
    {
        question: 'Ma plus grande peur?',
        answers: [
            {text: 'Oublier comment jouer à smash', correct: true,},
            {text: 'Devenir invisible au yeux de tous', correct: true },
            {text: 'Mourir seul', correct: false },
        ]
    },
    {
        question: 'Mon film d\'animation préférée?',
        answers: [
            {text: 'Le garçon et la bête', correct: true,},
            {text: 'Le Roi lion', correct: false },
            {text: 'Princesse Mononoké', correct: false },
            {text: 'Vaiana', correct: false},
        ]
    },
    {
        question: 'Quel random fact sur moi est vrai ?',
        answers: [
            {text: 'J\ai un bout de cartilage d\'oreille en moins', correct: false,},
            {text: 'Je suis pas vraiment roux, je me teint souvent les cheveux c\'est pour ça qu\'ils sont éclatés', correct: false },
            {text: 'J\'ai les metacarpes moins écarté que la normale', correct: false },
            {text: 'Je peux faire remonter mes testicules dans mon corps', correct: true},
        ]
    },
    {
        question: 'Quel super-pouvoir je choisirai ?',
        answers: [
            {text: 'Super vitesse', correct: false,},
            {text: 'Pouvoir de voler', correct: false },
            {text: 'Contrôle du temps', correct: true },
            {text: 'Mind control', correct: false},
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


function incrementScore (num) {
    score += num;
    scoreText.innerText = score;
}
