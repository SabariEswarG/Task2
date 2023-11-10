const questions = [
    {
        question: "Who received the nobel prize for peace in 2023 ?",
        options: ["Nelson Mandella", "Narendra Modi", "Narges Mohammadi", "Aung San Suu Kyi"],
        answer: "Narges Mohammadi",
    },
    {
        question: "Who gave the Theory of Relativity??",
        options: ["Issac Newton", "Galileo Galilei", "Oppenheimer", "Albert Einsten"],
        answer: "Albert Einsten",
    },
    {
        question: "which Captian won all the ICC trophies in Cricket? ",
        options: ["Ricky Ponting", "MS Dhoni", "Virat Kohli", "Eoin Morgan"],
        answer: "MS Dhoni",
    },
    {
        question: "Which is a reserved word in the Java programming language?",
        options: ["method", "Native", "Reference", "Array"],
        answer: "Native",
    },
    {
        question: "fidel castro was the president of which country?",
        options: ["Cuba", "Bolivia", "Columbia", "Argentina"],
        answer: "Cuba",
    },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const resultContainer = document.getElementById("result-container");
const resultText = document.getElementById("result-text");
const resultGif = document.getElementById("result-gif");
const timerDisplay = document.getElementById("timer-display");

function loadQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = "";
    
    question.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", checkAnswer);
        optionsContainer.appendChild(button);
    });
    startTimer();

    const questionNumberText = document.createElement("p");
    questionNumberText.textContent = `Question ${currentQuestion + 1} out of ${questions.length}`;
    optionsContainer.appendChild(questionNumberText);
}
function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer
            showResult();
        }
    }, 1000); // Update the timer display every second
}

function checkAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    questionText.style.display = "none";
    optionsContainer.style.display = "none";
    resultContainer.style.display = "block";

    resultText.textContent = `You scored ${score} out of ${questions.length}`;

    if (score >= questions.length / 2) {
        resultText.textContent += ". You are a winner!";
        resultGif.src = "winner.png"; 
    } else {
        resultText.textContent += ". You lost!";
        resultGif.src = "loser.png"; 
    }
    timerDisplay.style.display = "none";
}

loadQuestion();
