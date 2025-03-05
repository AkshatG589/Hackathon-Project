const questions = [

    {

        question: "What is the most common herb used in tea?",
        answers: ["Mint", "Rosemary", "Lavender", "Sage"],
        correct: 0
    },
    {
        question: "Which herb is known for its calming properties?",
        answers: ["Chamomile", "Thyme", "Basil", "Oregano"],
        correct: 0
    },
    {
        question: "What herb is commonly used for cooking Italian dishes?",
        answers: ["Parsley", "Cilantro", "Basil", "Oregano"],
        correct: 2
    },
    {
        question: "Which herb is best for improving memory?",
        answers: ["Basil", "Ginseng", "Rosemary", "Mint"],
        correct: 2
    },
    {
        question: "Which herb is used to treat digestive issues?",
        answers: ["Ginger", "Sage", "Thyme", "Lavender"],
        correct: 0
    },
    // Add remaining questions similarly...
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const scoreContainer = document.getElementById('score-container');
const resultMessage = document.getElementById('result-message');
const scoreDisplay = document.getElementById('score');

// Load the current question and answers
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;

    // Clear previous answers
    answersElement.innerHTML = '';

    // Create radio buttons for each answer
    question.answers.forEach((answer, index) => {
        const answerLabel = document.createElement('label');
        const answerInput = document.createElement('input');
        answerInput.type = 'radio';
        answerInput.name = 'answer';
        answerInput.classList = 'me-3';
        answerInput.value = index;
        answerInput.onclick = () => handleAnswer(index);

        answerLabel.appendChild(answerInput);
        answerLabel.appendChild(document.createTextNode(answer));

        answersElement.appendChild(answerLabel);
    });

    // Show/hide previous and next buttons
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';

    // Ensure opacity is reset and apply GSAP animation
    questionElement.style.opacity = 0; // reset opacity to 0
    gsap.to(questionElement, { opacity: 1, duration: 1 }); // fade in to 1 over 1 second
}

// Handle the answer selection
function handleAnswer(answerIndex) {
    userAnswers[currentQuestionIndex] = answerIndex;
}

// Show the final score
function showScore() {
    score = userAnswers.filter((answer, index) => answer === questions[index].correct).length;
    scoreDisplay.textContent = score;

    // Show result message based on the score
    if (score === questions.length) {
        resultMessage.textContent = "Excellent! You know your herbs!";
    } else if (score >= questions.length / 2) {
        resultMessage.textContent = "Good job! Keep learning more about herbs!";
    } else {
        resultMessage.textContent = "Don't worry, try again to master your herbal knowledge!";
    }

    // Hide the quiz section and show the result section
    document.getElementById('quiz-container').style.display = 'none';
    scoreContainer.style.display = 'block'; // Show the score container

    // Animate the score container's appearance with GSAP
    gsap.fromTo("#score-container",
        { opacity: 0, scale: 0.5 }, // Initial state
        { opacity: 1, scale: 1, duration: 1 } // Final state with fade-in and scale-up
    );
}
//to restart 
document.getElementById("Restart").addEventListener("click", () => {
    // alert("hello")
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    scoreContainer.style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';

    loadQuestion();
})
// Handle previous button click
prevButton.onclick = () => {
    currentQuestionIndex--;
    loadQuestion();
    gsap.from("#question-container", { opacity: 0, duration: 1 });
};

// Handle next button click
nextButton.onclick = () => {
    currentQuestionIndex++;
    loadQuestion();
    gsap.from("#question-container", { opacity: 0, duration: 1 });
};

// Handle submit button click
submitButton.onclick = () => {
    showScore(); // Show score and result message
};

// Load the first question
loadQuestion()
    ;
