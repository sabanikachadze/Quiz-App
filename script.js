const questions = [
  {
    question:"Name OF World's Most Powerfull Computer",
    answers:[
      {text:"summit",correct:false},
      {text:"sierra",correct:false},
      {text:"Fugaku",correct:true},
      {text:"HPC5",correct:false}
    ]
  },
  {
    question:"Which one is World's First Web Site",
    answers:[
      {text:"Fermilab",correct:false},
      {text:"Cybergrass",correct:false},
      {text:"HUJI",correct:false},
      {text:"CERN",correct:true}
    ]
  },
  {
    question:"When was the first AI Created?",
    answers:[
      {text:"1956",correct:true},
      {text:"1980",correct:false},
      {text:"2012",correct:false},
      {text:"1964",correct:false}
    ]
  },
  {
    question:"Is This Quiz good",
    answers:[
      {text:"NO",correct:false},
      {text:"NO",correct:false},
      {text:"Yes",correct:true},
      {text:"NO",correct:false}
    ]
  }
]

const qeustionElement = document.querySelector(".question");
const asnwerbuttons = document.getElementById("question-List");
const nextButton = document.querySelector(".next-btn");

let currentQuestionIndex = 0 ; 
let score = 0 ;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion(){
  resetState()
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1 ;
  qeustionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button")
      button.innerHTML = answer.text
      button.classList.add("btn");
      asnwerbuttons.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct
      }
      button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
  nextButton.style.display = "none";
  while(asnwerbuttons.firstChild){
    asnwerbuttons.removeChild(asnwerbuttons.firstChild)
  }
}
function selectAnswer(e){
  const selectedBtn = e.target
  const isCorrect = selectedBtn.dataset.correct === "true"
  if(isCorrect){
    selectedBtn.classList.add("correct")
    score++
  }else{
    selectedBtn.classList.add("incorrect")
  }
  Array.from(asnwerbuttons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct")
    }
    button.disabled = true
  })
  nextButton.style.display = "block"
}

function showScore(){
  resetState();
  qeustionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
  nextButton.innerHTML = "Play Again"
  nextButton.style.display = "block"
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz()
