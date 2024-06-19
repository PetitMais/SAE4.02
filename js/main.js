// DOM => Document Object Model

const els = {
    welcomeScreen: null,
    questionScreen: null,
    endScreen: null,
    welcomeBtn: null,
    answers: null,
    endBtn: null,
    answersContainer: null
};

let questionIndex = 0;

const questions = [
    {
      question: "Quelle qualité est la plus importante pour toi ?",
      answers: [
        { title: "Courage", house: "gryffondor" },
        { title: "Sens de la justice", house: "hufflepuff" },
        { title: "Ambition", house: "slytherin" },
        { title: "Sagesse", house: "ravenclaw" }
      ]
    },
    {
      question: "Quelle est ta matière préférée à Poudlard ?",
      answers: [
        { title: "Potions", house: "slytherin" },
        { title: "Soins aux créatures magiques", house: "hufflepuff" },
        { title: "Métamorphose", house: "ravenclaw" },
        { title: "Défense contre les forces du Mal", house: "gryffondor" }
      ]
    },
    {
      question: "Quel est ton animal préféré parmi ceux-ci ?",
      answers: [
        { title: "Hibou", house: "ravenclaw" },
        { title: "Serpent", house: "slytherin" },
        { title: "Lion", house: "gryffondor" },
        { title: "Blaireau", house: "hufflepuff" }
      ]
    },
    {
      question: "Quelle est ta réaction face à l'injustice ?",
      answers: [
        { title: "Je cherche à protéger ceux qui sont lésés", house: "hufflepuff" },
        { title: "Je cherche à en tirer profit", house: "slytherin" },
        { title: "Je me bats pour ce qui est juste", house: "gryffondor" },
        { title: "Je cherche à comprendre les raisons", house: "ravenclaw" }
      ]
    },
    {
      question: "Quelle qualité apprécies-tu le plus chez un ami ?",
      answers: [
        { title: "Sensibilité", house: "hufflepuff" },
        { title: "Ruse", house: "slytherin" },
        { title: "Intelligence", house: "ravenclaw" },
        { title: "Loyauté", house: "gryffondor" }
      ]
    },
    {
      question: "Quel métier magique te fascine le plus ?",
      answers: [
        { title: "Soigneur de créatures magiques", house: "hufflepuff" },
        { title: "Professeur", house: "ravenclaw" },
        { title: "Mangemort", house: "slytherin" },
        { title: "Auror", house: "gryffondor" }
      ]
    },
    {
      question: "Quel est ton sortilège préféré parmi ceux-ci ?",
      answers: [
        { title: "Expecto Patronum", house: "ravenclaw" },
        { title: "Accio", house: "hufflepuff" },
        { title: "Imperium", house: "slytherin" },
        { title: "Expelliarmus", house: "gryffondor" }
      ]
    },
    {
      question: "Quel est ton endroit préféré à Poudlard ?",
      answers: [
        { title: "Les cachots", house: "slytherin" },
        { title: "Le jardin de Poudlard", house: "hufflepuff" },
        { title: "La salle commune de Gryffondor", house: "gryffondor" },
        { title: "La tour d'astronomie", house: "ravenclaw" }
      ]
    },
    {
      question: "Qu'est-ce qui t'attire le plus dans la magie ?",
      answers: [
        { title: "Son mystère et sa complexité", house: "ravenclaw" },
        { title: "Sa capacité à apporter du réconfort", house: "hufflepuff" },
        { title: "Son aspect héroïque", house: "gryffondor" },
        { title: "Son pouvoir et son influence", house: "slytherin" }
      ]
    },
    {
      question: "Quelle est ta réaction face à une difficulté ?",
      answers: [
        { title: "Je cherche à comprendre le problème en profondeur", house: "ravenclaw" },
        { title: "Je fonce sans hésiter", house: "gryffondor" },
        { title: "Je fais appel à l'entraide et à la solidarité", house: "hufflepuff" },
        { title: "Je réfléchis à la meilleure stratégie", house: "slytherin" }
      ]
    }
  ];
  

const recordedAnswers = [];


const init = () => {
    console.log('Page has loaded');

    els.welcomeScreen = document.querySelector('.welcome-screen');
    els.questionScreen = document.querySelector('.question-screen');
    els.endScreen = document.querySelector('.end-screen');
    els.welcomeBtn = els.welcomeScreen.querySelector('button');
    els.endBtn = els.endScreen.querySelector('button');
    els.answersContainer = els.questionScreen.querySelector('ul');

    els.welcomeBtn.addEventListener('click', () => {
        displayScreen('question');
        displayQuestion(questionIndex);
    });
    els.endBtn.addEventListener('click', () => {
        displayScreen('welcome');
        questionIndex = 0;
    });

    els.answersContainer.addEventListener('click', ({ target }) => {
        if (target.tagName !== 'LI') {
            return;
        }
        const house = target.getAttribute('data-house');
        recordedAnswers.push(house);

        questionIndex++;

        if (questionIndex >= questions.length) {
            calculateScore();
            displayScreen('end');
        } else {
            displayQuestion(questionIndex);
        }
    });

};

const calculateScore = () => {
    const house = recordedAnswers.sort((a, b) => {
        return recordedAnswers.filter(answer => answer === a).length - 
        recordedAnswers.filter(answer => answer === b).length 
    }).pop();
    // console.log('house', house);

    const houseInFrench = {
        slytherin: 'Serpentard',
        hufflepuff: 'Pouffe-Souffle',
        ravenclaw: 'Serdaigle',
        gryffondor: 'Griffondor'
    };

    els.endScreen.querySelector('span').textContent = houseInFrench[house];
};

const displayQuestion = (index) => {

    const currentQuestion = questions[index];

    const questionEl = els.questionScreen.querySelector('h2');

    const answerEls = currentQuestion.answers.map((answer) => {
        const liEl = document.createElement('li');
        liEl.textContent = answer.title;
        liEl.setAttribute('data-house', answer.house);
        return liEl;
    });

    questionEl.textContent = currentQuestion.question;
    els.answersContainer.textContent = '';
    els.answersContainer.append(...answerEls);
};

const displayScreen = (screenName) => {
    // console.log('screenName', screenName);
    els.welcomeScreen.style.display = 'none';
    els.questionScreen.style.display = 'none';
    els.endScreen.style.display = 'none';

    const screen = els[screenName + 'Screen'];
    // console.log('screen', screen);
    screen.style.display = 'flex';
};


window.addEventListener('load', init);