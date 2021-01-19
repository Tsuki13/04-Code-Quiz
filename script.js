var startBtn = document.getElementById("start-btn");
var nextBtn = document.getElementById('next-btn');
var restartBtn = document.getElementById('restart-btn');
var questionContainer = document.getElementById("question-container");
var questionTextEl = document.getElementById('question');
var answerTextEl = document.getElementById('answer-buttons');
let time = 1 * 60;

var timerElement = document.getElementById('timerDisplay');
var scoreDisplay = document.getElementById('scoreDisplay');

let randomQuestions, questionNum

let score = 0;

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    questionNum++
    setNextQuestion()
})

var timer = setInterval(updateTimer, 1000);

function updateTimer(){
    var minutes = Math.floor(time/60);
    let seconds = time % 60;
    timerElement.innerHTML = minutes+ ':' +seconds;
    time --;
    if (time == -2) {
        alert('You are out of time');
        clearInterval(timer);
        restartBtn.classList.remove('hide'); 
        timerDisplay.innerText = '0:00';
    }
    return
}

function startQuiz() {
    var nextBtn = document.getElementById("next-btn");
    questionContainer.classList.remove("hide");
    nextBtn.classList.remove("hide");
    startBtn.classList.add("hide");
    restartBtn.classList.add("hide");
    timerDisplay.classList.remove("hide");
    scoreDisplay.classList.remove("hide");
    randomQuestions = myQuestions.sort(() => Math.random() - .5);
    questionNum = 0;
    setNextQuestion();
    console.log("I was clicked")
}

function setNextQuestion () {
    resetState()
    showQuestion(randomQuestions[questionNum]);
}

function showQuestion(question) {
    questionTextEl.innerText = question.question
    question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
        button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerTextEl.appendChild(button)
    });
}

function resetState() {
    nextBtn.classList.add('hide')
    while (answerTextEl.firstChild){
        answerTextEl.removeChild
        (answerTextEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerTextEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (randomQuestions.length > questionNum + 1) {
        nextBtn.classList.remove('hide')
    } else {
        restartBtn.classList.remove('hide')
    }
    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}
// starting on code to confirm answers on click
// var verifyAnswer = (myQuestions, answers) => {
//     if (myQuestions[answers] === true) {
//         return score = score++;
//     } else time = time--;
//     console.log(verifyAnswer)
// }
// myQuestions.forEach((question) => {

// })




var myQuestions = [
    {
    question: 'Which is the best description of a variable?',
    answers: [
        {text: 'Identifies a portion of a string.', correct: false},
        {text: 'A method to join strings.', correct: false},
        {text: 'Allows you to make a decision based on a condition.', correct: false},
        {text: 'Allows you to store information so it can be reused throughout the program', correct: true}
    ]
    },
    {
     question: 'Which is the best description of concatenation?',
     answers: [
        {text: 'Identifies a portion of a string.', correct: false},
        {text: 'A method to join strings.', correct: true},
        {text: 'Allows you to make a decision based on a condition.', correct: false},
        {text: 'Allows you to store information so it can be reused throughout the program', correct: false}
     ]  
    },
    {
    question: 'Which is the best description of an if statement?',
    answers: [
        {text: 'Identifies a portion of a string.', correct: false},
        {text: 'A method to join strings.', correct: false},
        {text: 'Allows you to make a decision based on a condition.', correct: true},
        {text: 'Allows you to store information so it can be reused throughout the program', correct: false}
    ]
    },
    {
    question: 'what does the "typeof(3);" expression return?',
    answers: [
        {text: 'undefined', correct: false},
        {text: 'string', correct: false},
        {text: 'number', correct: true},
        {text: 'boolean', correct: false}
    ]
    },
    {
    question: 'what does the "typeof(3) === typeof(4.32);" expression return?',
    answers: [
        {text: 'undefined', correct: false},
        {text: 'false', correct: false},
        {text: 'true', correct: true},
        {text: 'null', correct: false}
    ]
    }
]
