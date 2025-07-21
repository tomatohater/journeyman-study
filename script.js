// Example data structure for chapters and questions
const chapters = {
    "Chapter 1: Basics": [
        { question: "What is HTML?", answer: "HyperText Markup Language" },
        { question: "What does CSS stand for?", answer: "Cascading Style Sheets" }
    ],
    "Chapter 2: Advanced": [
        { question: "What is Flexbox?", answer: "A CSS layout module" },
        { question: "What does DOM stand for?", answer: "Document Object Model" }
    ]
    // Add more chapters and questions as needed
};

const chapterSelect = document.getElementById('chapter-select');
const flashcard = document.getElementById('flashcard');
const questionText = document.getElementById('question-text');
const answerText = document.getElementById('answer-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const counter = document.getElementById('counter');

let currentChapter = '';
let shuffledQuestions = [];
let currentIndex = 0;

// Populate dropdown
for (let chapter in chapters) {
    let option = document.createElement('option');
    option.value = chapter;
    option.textContent = chapter;
    chapterSelect.appendChild(option);
}

// Shuffle helper
function shuffle(array) {
    return array
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}

// Display current question
function showQuestion(index) {
    const qa = shuffledQuestions[index];
    questionText.textContent = qa.question;
    answerText.textContent = qa.answer;
    counter.textContent = `Question ${index + 1} out of ${shuffledQuestions.length}`;
    // Always show question/front first
    flashcard.querySelector('.front').style.display = '';
    flashcard.querySelector('.back').style.display = 'none';
}

// When chapter changes
chapterSelect.addEventListener('change', () => {
    currentChapter = chapterSelect.value;
    shuffledQuestions = shuffle(chapters[currentChapter].slice());
    currentIndex = 0;
    showQuestion(currentIndex);
});

// Navigation
prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        showQuestion(currentIndex);
    }
});
nextBtn.addEventListener('click', () => {
    if (currentIndex < shuffledQuestions.length - 1) {
        currentIndex++;
        showQuestion(currentIndex);
    }
});

// Flip card (show answer)
flashcard.addEventListener('click', () => {
    const front = flashcard.querySelector('.front');
    const back = flashcard.querySelector('.back');
    if (front.style.display !== 'none') {
        front.style.display = 'none';
        back.style.display = 'block';
    } else {
        front.style.display = 'block';
        back.style.display = 'none';
    }
});

// Initialize with first chapter
if (chapterSelect.options.length > 0) {
    chapterSelect.selectedIndex = 0;
    chapterSelect.dispatchEvent(new Event('change'));
}
