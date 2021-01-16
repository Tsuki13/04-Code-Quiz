var startBtn = document.getElementById("start-btn");
var questionContainer = document.getElementById("question-container");
var questionTextEl = document.getElementById('question');
var answerTextEl = document.getElementById('answer-buttons');

var randomQuestions, questionNum

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    var nextBtn = document.getElementById("next-btn");
    questionContainer.classList.remove("hide");
    nextBtn.classList.remove("hide");
    startBtn.classList.add("hide");
    randomQuestions = myQuestions.sort(() => Math.random() - .5);
    questionNum = 0;
    setNextQuestion()
    
    console.log("I was clicked")
}

function setNextQuestion () {
    showQuestion(randomQuestions[questionNum]);
}

function showQuestion(question) {
    questionTextEl.innerText = question.question 
 }

function selectAnswer() {

}

var myQuestions = [
    {
    question: 'Which is the best description of a variable?',
    answers: [
        {text: 'Identifies a portion of a string.', correct: false},
        {text: 'A method to join strings.', correct: false},
        {text: 'Allows you to make a decision based on a condition.', correct: false},
        {text: 'Allows you to store information so it can be reused throughout the program', correct: true}
    ]
    }
]
