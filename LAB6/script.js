// 1. Questions Array: Stores questions, possible options, and the correct answer
const questions = [
    {
        question: "Which HTML tag is used to embed JavaScript code?",
        options: ["<javascript>", "<js>", "<script>", "<code>"],
        answer: "<script>"
    },
    {
        question: "Which method is used to select an HTML element by its ID?",
        options: [
            "document.querySelectorAll()",
            "document.getElementById()",
            "document.getElementsByClass()",
            "document.findElement()"
        ],
        answer: "document.getElementById()"
    },
    {
        question: "Which Math function returns a pseudo-random number between 0 (inclusive) and 1 (exclusive)?",
        options: ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
        answer: "Math.random()"
    },
    {
        question: "What method prevents the browser's default action (such as opening the right-click menu)?",
        options: [
            "event.stopAction()",
            "event.preventDefault()",
            "event.cancel()",
            "event.block()"
        ],
        answer: "event.preventDefault()"
    },
    {
        question: "Where is client-side form validation performed?",
        options: [
            "On the web server",
            "In the database",
            "In the user's web browser",
            "In the CSS stylesheet"
        ],
        answer: "In the user's web browser"
    }
];

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let timerInterval = null;
const TIME_LIMIT = 15; // seconds per question

// DOM Elements
const startSection = document.getElementById("start-section");
const quizSection = document.getElementById("quiz-section");
const scoreFooter = document.getElementById("score-footer");
const questionProgress = document.getElementById("question-progress");
const timerDisplay = document.getElementById("timer");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackSection = document.getElementById("feedback-section");
const submitBtn = document.getElementById("submit-btn");
const nextBtn = document.getElementById("next-btn");
const finalScoreDisplay = document.getElementById("final-score");

// Event Listeners
document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", startQuiz);
submitBtn.addEventListener("click", () => checkAnswer(false));
nextBtn.addEventListener("click", nextQuestion);

// 2. shuffleQuestions(): Randomly shuffles the questions (Fisher-Yates algorithm)
function shuffleQuestions(array) {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// 3. startTimer(): Sets a countdown timer for answering each question
function startTimer() {
    clearInterval(timerInterval);
    let timeLeft = TIME_LIMIT;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            checkAnswer(true); // Auto-submit when time runs out
        }
    }, 1000);
}

// 4. displayQuestion(): Displays the current question and answer options
function displayQuestion() {
    selectedOption = null;
    feedbackSection.classList.add("hidden");
    feedbackSection.className = "feedback hidden";
    submitBtn.classList.remove("hidden");
    submitBtn.disabled = true;
    nextBtn.classList.add("hidden");
    optionsContainer.innerHTML = "";

    const currentQ = shuffledQuestions[currentQuestionIndex];
    questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${shuffledQuestions.length}`;
    questionText.textContent = currentQ.question;

    currentQ.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => {
            // Remove 'selected' class from all buttons
            document.querySelectorAll(".option-btn").forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            selectedOption = option;
            submitBtn.disabled = false;
        });
        optionsContainer.appendChild(button);
    });

    startTimer();
}

// 5. checkAnswer(): Checks whether the selected answer is correct and updates the score
function checkAnswer(isTimeUp = false) {
    clearInterval(timerInterval);
    const currentQ = shuffledQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll(".option-btn");

    // Disable all option buttons after answering
    optionButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === currentQ.answer) {
            btn.classList.add("correct");
        } else if (btn.textContent === selectedOption && selectedOption !== currentQ.answer) {
            btn.classList.add("incorrect");
        }
    });

    feedbackSection.classList.remove("hidden");

    if (isTimeUp && !selectedOption) {
        feedbackSection.textContent = `Time's up! The correct answer was: ${currentQ.answer}`;
        feedbackSection.classList.add("incorrect");
    } else if (selectedOption === currentQ.answer) {
        score++;
        feedbackSection.textContent = "Correct! Well done.";
        feedbackSection.classList.add("correct");
    } else {
        feedbackSection.textContent = `Incorrect! The correct answer was: ${currentQ.answer}`;
        feedbackSection.classList.add("incorrect");
    }

    submitBtn.classList.add("hidden");
    nextBtn.classList.remove("hidden");
    nextBtn.textContent = (currentQuestionIndex === shuffledQuestions.length - 1) ? "Finish Quiz" : "Next Question";
}

// 6. nextQuestion(): Moves to the next question, resetting the timer and updating the score
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        displayQuestion();
    } else {
        // Show final score in footer
        quizSection.classList.add("hidden");
        scoreFooter.classList.remove("hidden");
        finalScoreDisplay.textContent = `Your Final Score: ${score} / ${shuffledQuestions.length}`;
    }
}

// 7. startQuiz(): Starts the quiz by shuffling questions, displaying the first question, and starting the timer
function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    shuffledQuestions = shuffleQuestions(questions);

    startSection.classList.add("hidden");
    scoreFooter.classList.add("hidden");
    quizSection.classList.remove("hidden");

    displayQuestion();
}
