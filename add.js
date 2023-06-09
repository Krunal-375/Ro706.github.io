const option1 = document.getElementById("option1"),
      option2 = document.getElementById("option2"),
      option3 = document.getElementById("option3"),
      audio = document.getElementById("myAudio"),
      audio2 = document.getElementById("myAudio2");
      winAudio = document.getElementById("winAudio");
      looseAudio = document.getElementById("loosAdio");
var answer = 0;
var score = 0;
var time = 60;
var timer;

function togglePlayAgainButton() {
  var button = document.getElementById("play-again");
  if (time <= 0) {
    button.style.display = "block";
    
  } else {
    button.style.display = "none";
  }
}

function generate_equation(){ 
  var num1 = Math.floor(Math.random() * 13),
      num2 = Math.floor(Math.random() * 13),
      dummyAnswer1 = Math.floor(Math.random() * 13),
      dummyAnswer2 = Math.floor(Math.random() * 13),
      allAnswers = [],
      switchAnswers = [];

  answer = eval(num1 + num2);
  
  document.getElementById("num1").innerHTML = num1; 
  document.getElementById("num2").innerHTML = num2; 

  allAnswers = [answer, dummyAnswer1, dummyAnswer2];

  for (i = allAnswers.length; i--;){
    switchAnswers.push(allAnswers.splice(Math.floor(Math.random() * (i + 1)), 1)[0]);
  };

  option1.innerHTML = switchAnswers[0];
  option2.innerHTML = switchAnswers[1];
  option3.innerHTML = switchAnswers[2]; 
};
function startTimer() {
  timer = setInterval(function() {
    time--;
    if (time == 0) {
      clearInterval(timer);
      document.querySelector('.answer-options').style.pointerEvents = 'none';
      sessionStorage.setItem("score", score);
      location.href='result.html';
      if(score > 10){
        winAudio.play();
      }
      else{
        loosAudio.play();
      }
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
      });
    }
    
    document.getElementById("time-remaining").innerHTML = time;
    if (time == 0) {
      clearInterval(timer);
      document.getElementById("play-again").style.display = "block";
      option1.removeEventListener("click", checkAnswer);
      option2.removeEventListener("click", checkAnswer);
      option3.removeEventListener("click", checkAnswer);
    }
  }, 1000);
}

option1.addEventListener("click", function(){
    if(option1.innerHTML == answer){
      correct.innerHTML = "Correct";
      audio2.play();
      incorrect.innerHTML = "";
      score+=4;
      generate_equation();
    }
    else{
      correct.innerHTML = "";
      incorrect.innerHTML = "Incorrect";
      audio.play();
      score-=1;
    }
});

option2.addEventListener("click", function(){
    if(option2.innerHTML == answer){
      correct.innerHTML = "Correct";
      audio2.play();
      incorrect.innerHTML = "";
      score += 4;
      generate_equation();
    }
    else{
      correct.innerHTML = "";
      incorrect.innerHTML = "Incorrect";
      audio.play();
      score-=1;
    }
});

option3.addEventListener("click", function(){
    if(option3.innerHTML == answer){
      correct.innerHTML = "Correct";
      audio2.play();
      incorrect.innerHTML = "";
      score+=4;
      generate_equation();
    }
    else{
      correct.innerHTML = "";
      incorrect.innerHTML = "Incorrect";
      audio.play();
      score-=1;
    }
    document.getElementById("Score: ").innerHTML = "Score: " + score;
});

generate_equation()

function checkAnswer() {
  
  const selectedOption = document.querySelector("input[type=radio]:checked");
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === currentQuestion.answer) {
      score++;
      document.getElementById("Score: ").innerHTML = "Score: " + score;
    }
  }
}

window.onload = function() {
  startTimer();
  generate_equation();
  option1.addEventListener("click", checkAnswer);
  option2.addEventListener("click", checkAnswer);
  option3.addEventListener("click", checkAnswer);
};
window.addEventListener("load", function() {
  togglePlayAgainButton();
});
document.getElementById("Score: ").innerHTML = "Score: " + score;
