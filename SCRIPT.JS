const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "High Transfer Machine Language", correct: false },
            { text: "Hyper Tool Multi Language", correct: false },
            { text: "Home Text Markup Language", correct: false }
        ]
    },
    {
        question: "Which language is used to style a website?",
        answers: [
            { text: "HTML", correct: false },
            { text: "Python", correct: false },
            { text: "CSS", correct: true },
            { text: "Java", correct: false }
        ]
    },
    {
        question: "Which language adds functionality to a website?",
        answers: [
            { text: "CSS", correct: false },
            { text: "JavaScript", correct: true },
            { text: "HTML", correct: false },
            { text: "SQL", correct: false }
        ]
    },
    {
        question: "Which HTML tag creates a hyperlink?",
        answers: [
            { text: "<a>", correct: true },
            { text: "<img>", correct: false },
            { text: "<link>", correct: false },
            { text: "<h1>", correct: false }
        ]
    },
    {
        question: "Which CSS property changes text color?",
        answers: [
            { text: "font-size", correct: false },
            { text: "background", correct: false },
            { text: "color", correct: true },
            { text: "margin", correct: false }
        ]
    },
    {
        question: "Who created JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
            { text: "Netscape", correct: true },
            { text: "Apple", correct: false }
        ]
    },
    {
        question: "Which symbol selects an ID in CSS?",
        answers: [
            { text: ".", correct: false },
            { text: "#", correct: true },
            { text: "*", correct: false },
            { text: "&", correct: false }
        ]
    },
    {
        question: "Which keyword declares a variable in JavaScript?",
        answers: [
            { text: "var", correct: true },
            { text: "style", correct: false },
            { text: "loop", correct: false },
            { text: "break", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".btn");
const nextButton = document.getElementById("next-btn");

const progressElement = document.getElementById("progress");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

let currentQuestion = 0;
let score = 0;

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    nextButton.innerHTML = "Next →";

    showQuestion();
}

function resetButtons() {

    nextButton.style.display = "none";

    answerButtons.forEach(button => {

        button.disabled = false;

        button.classList.remove("correct");
        button.classList.remove("incorrect");

        button.style.display = "block";

    });

}

function updateProgress() {

    progressElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent =
        `Score: ${score}`;

    let percent = ((currentQuestion) / questions.length) * 100;

    progressBar.style.width = percent + "%";
}

function showQuestion() {

    resetButtons();

    updateProgress();

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    answerButtons.forEach((button, index) => {

        button.textContent = current.answers[index].text;

    });

}

answerButtons.forEach((button, index) => {

    button.addEventListener("click", () => {

        const current = questions[currentQuestion];

        if (current.answers[index].correct) {

            button.classList.add("correct");

            score++;

            scoreElement.textContent = `Score: ${score}`;

        } else {

            button.classList.add("incorrect");

        }

        answerButtons.forEach((btn, i) => {

            if (current.answers[i].correct) {

                btn.classList.add("correct");

            }

            btn.disabled = true;

        });

        nextButton.style.display = "block";

    });

});

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showScore();

    }

});

function showScore() {

    progressBar.style.width = "100%";

    let percentage = Math.round((score / questions.length) * 100);

    let grade = "";

    if (percentage >= 90) {

        grade = "A+";

    } else if (percentage >= 80) {

        grade = "A";

    } else if (percentage >= 70) {

        grade = "B";

    } else if (percentage >= 60) {

        grade = "C";

    } else {

        grade = "F";

    }

    questionElement.innerHTML = `
        🎉 Quiz Completed!<br><br>
        <strong>Your Score:</strong> ${score} / ${questions.length}<br><br>
        <strong>Percentage:</strong> ${percentage}%<br><br>
        <strong>Grade:</strong> ${grade}
    `;

    answerButtons.forEach(button => {

        button.style.display = "none";

    });

    progressElement.textContent = "Quiz Finished";
    scoreElement.textContent = `Final Score: ${score}`;

    nextButton.innerHTML = "🔄 Play Again";
    nextButton.style.display = "block";

    nextButton.onclick = () => {

        answerButtons.forEach(button => {

            button.style.display = "block";

        });

        nextButton.onclick = null;

        startQuiz();

    };

}

startQuiz();