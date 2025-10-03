let currentQuestionIndex = 0;
let selectedQuestions = [];
let correctAnswers = 0;
let totalQuestions = 6;

function startQuiz() {
  // Select 6 random questions from the dataset
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  selectedQuestions = shuffled.slice(0, totalQuestions);
  
  currentQuestionIndex = 0;
  correctAnswers = 0;
  
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= selectedQuestions.length) {
    showResults();
    return;
  }
  
  const current = selectedQuestions[currentQuestionIndex];
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('answer');
  const resultEl = document.getElementById('result');
  const avatarEl = document.getElementById('clairAvatar');
  
  // Show Clair asking the question
  questionEl.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}: ${current.question}`;
  answerEl.value = '';
  resultEl.textContent = '';
  avatarEl.src = 'clair-neutral.jpg';
  answerEl.focus();
}

function submitAnswer() {
  const answerEl = document.getElementById('answer');
  const userAnswer = answerEl.value.trim().toLowerCase();
  
  if (!userAnswer) {
    showFeedback("Please enter an answer!", false, 'clair-skeptical.jpg');
    return;
  }
  
  const current = selectedQuestions[currentQuestionIndex];
  const isCorrect = current.answers.some(ans => ans.toLowerCase() === userAnswer);
  
  if (isCorrect) {
    correctAnswers++;
    showFeedback("Correct! Well done! 🎉", true, current.reaction);
  } else {
    showFeedback(`Not quite! The answer was: ${current.answers[0]}`, false, 'clair-skeptical.jpg');
  }
  
  // Move to next question after a delay
  setTimeout(() => {
    currentQuestionIndex++;
    showQuestion();
  }, 2000);
}

function showFeedback(message, isCorrect, reactionImage) {
  const resultEl = document.getElementById('result');
  const avatarEl = document.getElementById('clairAvatar');
  const spinnerEl = document.getElementById('spinner');
  
  // Show spinner briefly for "thinking" effect
  spinnerEl.style.display = 'block';
  
  setTimeout(() => {
    spinnerEl.style.display = 'none';
    resultEl.textContent = message;
    resultEl.style.color = isCorrect ? '#10b981' : '#ef4444';
    avatarEl.src = reactionImage;
  }, 500);
}

function showResults() {
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('answer');
  const resultEl = document.getElementById('result');
  const avatarEl = document.getElementById('clairAvatar');
  const buttonEl = document.querySelector('button');
  
  const percentage = (correctAnswers / totalQuestions) * 100;
  const passed = correctAnswers >= 4; // Need 4 out of 6 to pass
  
  answerEl.style.display = 'none';
  
  if (passed) {
    questionEl.textContent = `Congratulations! You passed! 🎊`;
    resultEl.innerHTML = `You got ${correctAnswers} out of ${totalQuestions} correct!<br><br>You've earned the right to move to the next level!`;
    resultEl.style.color = '#10b981';
    avatarEl.src = 'clair-smile.jpg';
    buttonEl.textContent = 'Next Level →';
    buttonEl.onclick = () => {
      alert('Moving to Level 3! (This would link to the next challenge)');
      location.reload(); // For demo purposes, restart quiz
    };
  } else {
    questionEl.textContent = `Not quite there yet...`;
    resultEl.innerHTML = `You got ${correctAnswers} out of ${totalQuestions} correct.<br><br>You need at least 4 correct answers to pass.<br>Try again!`;
    resultEl.style.color = '#ef4444';
    avatarEl.src = 'clair-skeptical.jpg';
    buttonEl.textContent = 'Try Again';
    buttonEl.onclick = () => location.reload();
  }
}

// Allow Enter key to submit
document.addEventListener('DOMContentLoaded', () => {
  const answerEl = document.getElementById('answer');
  if (answerEl) {
    answerEl.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitAnswer();
      }
    });
  }
});