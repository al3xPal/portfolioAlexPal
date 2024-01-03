const quizData = [
    {
        question: 'What is the largest desert in the world?',
        options: ['Sahara Desert', 'Arctic Desert', 'Antarctic Desert', 'Gobi Desert'],
        answer: 'Antarctic Desert',
    },
    {
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['William Shakespeare', 'Jane Austen', 'Charles Dickens', 'Homer'],
      answer: 'William Shakespeare',
    },
    {
        question: 'Which planet is known as the Blue Planet?',
        options: ['Earth', 'Uranus', 'Neptune', 'Saturn'],
        answer: 'Earth',
    },
    {
        question: 'In which year did the United States declare its independence?',
        options: ['1776', '1789', '1801', '1812'],
        answer: '1776',
    },
    {
      question: 'Who was the first woman to win a Nobel Prize?',
      options: ['Marie Curie', 'Rosalind Franklin', 'Jane Goodall', 'Mother Teresa'],
      answer: 'Marie Curie',
    },
    {
      question: 'What is the capital of Japan?',
      options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
      answer: 'Tokyo',
    },
    {
      question: 'Which element has the chemical symbol "H"?',
      options: ['Hydrogen', 'Helium', 'Oxygen', 'Carbon'],
      answer: 'Hydrogen',
    },
    {
      question: 'Which ocean is the deepest?',
      options: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean', 'Southern Ocean'],
      answer: 'Pacific Ocean',
    },
    {
      question: 'What is the currency of Brazil?',
      options: ['Euro', 'Dollar', 'Pound', 'Real'],
      answer: 'Real',
    },
    {
      question: 'Which gas makes up the majority of the Earth\'s atmosphere?',
      options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
      answer: 'Nitrogen',
    },
  ];
  
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
  
      radio.addEventListener('click', function () {
        showAnswer(questionData.answer);
      });
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer(answer) {
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      displayQuestion();
      resultContainer.innerHTML = ''; 
    } else {
      displayResult();
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer(correctAnswer) {
    resultContainer.innerHTML = `Correct Answer: ${correctAnswer}`;
  }
  
  submitButton.addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      checkAnswer(selectedOption.value);
      selectedOption.checked = false;
    }
  });
  
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', function () {
    showAnswer(quizData[currentQuestion].answer);
  });
  
  displayQuestion();