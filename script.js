var startBtn = document.getElementById("start-btn");
// var nextBtn = document.getElementById('next-btn');
// var restartBtn = document.getElementById('restart-btn');
var questionContainer = document.getElementById("question-container");
var questionTextEl = document.getElementById('question');
var answerTextEl = document.getElementById('answer-buttons');
var h1, p, div, userInput, label;
let timeLimit;

var timerElement = document.getElementById('timerDisplay');
var scoreDisplay = document.getElementById('scoreDisplay');
var submitBtn = document.createElement('button');

let randomQuestions, questionNum

let score = 0;
var userName = '';


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

var timer;

function updateTimer(){
    timerElement.innerHTML = timeLimit
    if (timeLimit <= 0) {
        clearInterval(timer);
        console.log(timer)
        console.log(timeLimit)
        // restartBtn.classList.remove('hide'); 
        // nextBtn.classList.add('hide');
        timerDisplay.innerText = '0:00';
        endGame();
    }
    timeLimit--;
    return
}

function startQuiz() {
    questionContainer.classList.remove("hide");
    // nextBtn.classList.remove("hide");
    startBtn.classList.add("hide");
    // restartBtn.classList.add("hide");
    timerDisplay.classList.remove("hide");
    scoreDisplay.classList.remove("hide");
    timeLimit = 30;
    timer = setInterval(updateTimer, 1000);
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
    clearStatusClass(document.body)
    // nextBtn.classList.add('hide')
    while (answerTextEl.firstChild){
        answerTextEl.removeChild
        (answerTextEl.firstChild)
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target
    var correct = selectedBtn.dataset.correct
    setStatusClass(document.body, correct)
    // Array.from(answerTextEl.children).forEach(button => {
    //     setStatusClass(button, button.dataset.correct)
    // })
    if (randomQuestions.length > questionNum) {
        // nextBtn.classList.remove('hide')
    } else {
        // restartBtn.classList.remove('hide')
        endGame();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        score++
        scoreDisplay.innerText = score;
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        timeLimit = timeLimit-10;
        if (timeLimit <= 0) {
            timeLimit = 0
        }
        console.log(timeLimit)
    }
    questionNum++
    setTimeout(function(){
        setNextQuestion();
     }, 1000);
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function endGame() {
    console.log('endgame')
    clearInterval(timer);
    questionContainer.setAttribute('class', 'hide');

    h1 = document.createElement('h1');
    h1.innerHTML = 'Quiz is over!';

    p = document.createElement('p');
    p.innerHTML = 'Your score: ' + score;

    label = document.createElement('div');
    label.innerHTML = '<label for="submit">Enter your initials:</label>'

    userInput = document.createElement('div');
    userInput.innerHTML = '<input type="text" id ="submit">';
    userInput.setAttribute('class', 'bottom-margin');

    submitBtn.innerHTML = 'Submit';
    div = document.getElementById('mainDiv');

    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(label);
    div.appendChild(userInput);
    div.appendChild(submitBtn);

    submitBtn.addEventListener('click', function() {
        userName = document.getElementById('submit').value;
        getHighscores();
    })
}

function getHighscores() {
    p.remove()
    label.remove()
    userInput.remove()
    submitBtn.remove()

    h1.innerHTML = 'Highscores';
    var list = document.createElement('ul');
    let scores;
    var storedList = JSON.parse(localStorage.getItem('allScores'))
    if (storedList !== null) {
        scores = storedList;
    } else {
        scores = {}    
    }
    scores[userName] = score;
    savedScores(scores);
    for (let player in scores) {
        var listItems = document.createElement('li');
        listItems.innerHTML = player +':'+ scores[player];
        list.appendChild(listItems);
    }
    div.appendChild(list);
    console.log(storedList);
    console.log(scores)
    
}

function savedScores (obj) {
    localStorage.setItem('allScores', JSON.stringify(obj));
}

startBtn.addEventListener('click', startQuiz);


// restartBtn.addEventListener('click', startQuiz);
// nextBtn.addEventListener('click', () => {
//     questionNum++
//     setNextQuestion()
// })
