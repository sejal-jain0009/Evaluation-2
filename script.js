const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const prevBtn = document.querySelector('.prev-btn'); 



startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
} 

let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
     questionCount++;
     showQuestions(questionCount);

     questionNumb++;
     questionCounter(questionNumb);
}  

const optionList = document.querySelector('.option-list'); 

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag; 

    const option = document.querySelectorAll('.option'); 
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)');
    }
}  

function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct'); // Mark the selected answer as correct
        userScore++; // Increment score by 1 for a correct answer
    } else { 
        answer.classList.add('incorrect'); // Mark the selected answer as incorrect
        
        // Find the correct answer option and mark it as correct
        const options = optionList.children; // Get all option elements
        for (let i = 0; i < options.length; i++) {
            if (options[i].textContent === correctAnswer) {
                options[i].classList.add('correct'); // Add 'correct' class to the correct answer
                break; // Exit the loop once the correct answer is found
            }
        } 
    } 
    
    headerScore(); // Update the score display

    // Disable all options after an answer has been selected
    const options = optionList.children; // Get all option elements
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled'); // Add 'disabled' class to each option
    }
} 
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`; // Update the score display
} 

nextBtn.onclick = () => {
    questionCount++;
    
    // Check if the current question is the last one
    if (questionCount < questions.length) {
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
    } else {
        // If it's the last question, show the result box
        showResultBox();
    }
}  

function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active'); // Show the result box
    
    const scoreText = document.querySelector('.score-text'); // Display the score text
    scoreText.textContent = `You scored ${userScore} out of ${questions.length}`; // Show the score
    
    const circularProgress = document.querySelector('.circular-progress');
    const ProgressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = (userScore / questions.length) * 100; // Calculate the end value based on score
    let speed = 20; // Speed of the progress update

    // Ensure progressEndValue is not greater than 100
    progressEndValue = Math.min(progressEndValue, 100);

    // Set the initial state of the circular progress
    ProgressValue.textContent = `${progressStartValue}%`; // Initialize display
    circularProgress.style.background = `conic-gradient(#c40094 0deg, rgba(255, 255, 255, .1) 0deg)`; // Initialize background

    let progress = setInterval(() => {
        if (progressStartValue < progressEndValue) {
            progressStartValue++;
            // Update the progress value display
            ProgressValue.textContent = `${progressStartValue}%`;
            circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;
        } else {
            clearInterval(progress); // Stop the interval when the progress reaches the end value
        }
    }, speed);
} 


tryAgainBtn.onclick = () => {
    questionCount = 0; // Reset question count to 0
    questionNumb = 1; // Reset question number to 1
    userScore = 0; // Reset user score to 0

    // Hide the result box and show the quiz box
    resultBox.classList.remove('active');
    quizBox.classList.add('active');

    // Reset the score display
    headerScore();

    // Show the first question
    showQuestions(questionCount);
    questionCounter(questionNumb);
}; 

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const goHomeBtn = document.querySelector('.goHome-btn');

    // Add click event listener to the goHome button
    goHomeBtn.addEventListener('click', function() {
        // Redirect to quiz_type.html
        window.location.href = 'http://127.0.0.1:5500/quiz%20type.html';
    });
}); 

prevBtn.onclick = () => {
    if (questionCount > 0) { // Check if there is a previous question
        questionCount--; // Decrement question count
        showQuestions(questionCount); // Show the previous question
        questionNumb--; // Decrement question number
        questionCounter(questionNumb); // Update question counter
    }
};  

// timer
let timer;
let timeLimit = 30; // Time limit in seconds
const timerElement = document.getElementById('timer'); // Timer display element

function startTimer() {
    let timeRemaining = timeLimit; // Set the initial time remaining
    timerElement.textContent = timeRemaining; // Display the initial time

    timer = setInterval(() => {
        timeRemaining--; // Decrease time remaining by 1 second
        timerElement.textContent = timeRemaining; // Update timer display

        if (timeRemaining <= 0) { // Check if time is up
            clearInterval(timer); // Stop the timer
            freezeQuestion(); // Freeze the question
        }
    }, 1000); // Update every second
}

function freezeQuestion() {
    const options = optionList.children; // Get all option elements
    for (let i = 0; i < options.length; i++) {
        options[i].classList.add('disabled'); // Disable all options
    }
}

// Modify the continueBtn.onclick function to start the timer
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
    startTimer(); // Start the timer when the quiz starts
};

// Modify the showQuestions function to reset the timer when a new question is displayed
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag; 

    const option = document.querySelectorAll('.option'); 
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick','optionSelected(this)');
    }

    // Reset and start the timer for the new question
    clearInterval(timer); // Clear any existing timer
    startTimer(); // Start the timer for the new question
} 
