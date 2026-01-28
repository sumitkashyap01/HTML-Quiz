import { apiDifficulty } from "./app.js";

const currentState = {
  state: "",
};

const homepage = document.querySelector(".start-screen");
const diff = document.querySelector(".difficulty-screen");
const quizpage = document.querySelector(".Quiz-page");
const result = document.querySelector(".result-page");

const title = document.querySelector(".q-title");
const option1 = document.querySelector(".option1");
const option2 = document.querySelector(".option2");
const option3 = document.querySelector(".option3");
const option4 = document.querySelector(".option4");

const render = () => {
  homepage.style.display = "none";
  diff.style.display = "none";
  quizpage.style.display = "none";
  result.style.display = "none";

  if (currentState.state == diff) {
    diff.style.display = "flex";
  }

  if (currentState.state == quizpage) {
    quizpage.style.display = "grid";
  }
  if (currentState.state == result) {
    result.style.display = "flex";
  }

  if (currentState.state == homepage) {
    homepage.style.display = "flex";
  }
};

const homebtn = document.querySelector(".btn1");
homebtn.addEventListener("click", () => {
  currentState.state = diff;
  render();
});

let data;
let question1;
let question2;
let question3;
let question4;
let question5;

const diffOptions = document.querySelectorAll(".diff");
diffOptions.forEach((d) => {
  d.addEventListener("click", async () => {
    console.log(d.textContent);
    data = await apiDifficulty(d.textContent);
    currentState.state = quizpage;

    title.textContent = data[0].question;
    console.log(data[0].answers.answer_a);

    option1.textContent = data[0].answers.answer_a;
    option2.textContent = data[0].answers.answer_b;
    option3.textContent = data[0].answers.answer_c;
    option4.textContent = data[0].answers.answer_d;
    document.querySelector(".question-no").textContent = 1;
    document.querySelector(".score-no").textContent = 0;
    render();
  });
});

  let score = 0;

const qCycle = (qno) => {
  option1.style.backgroundColor = "#246eb9";
  option2.style.backgroundColor = "#246eb9";
  option3.style.backgroundColor = "#246eb9";
  option4.style.backgroundColor = "#246eb9";

  title.textContent = data[qno].question;
  console.log(data[qno].answers.answer_a);

  option1.textContent = data[qno].answers.answer_a;
  option2.textContent = data[qno].answers.answer_b;
  option3.textContent = data[qno].answers.answer_c;
  option4.textContent = data[qno].answers.answer_d;

  document.querySelector(".question-no").textContent = qno + 1;
  document.querySelector(".score-no").textContent = score;


  if (qno == 5) {
    currentState.state = result;
    document.querySelector(".scored").textContent = score;
    if (score == 1 || score == 0) {
      document.querySelector(".conclusion").textContent =
        "Terrible!!! You suck";
    }
    if (score == 2 || score == 3) {
      document.querySelector(".conclusion").textContent =
        "Nice try but still room for improvement";
    }
    if (score == 4) {
      document.querySelector(".conclusion").textContent =
        "Great! You are html pro";
    }
    if (score == 5) {
      document.querySelector(".conclusion").textContent =
        "PERFECT!!! You sit among html gods.";
    }
    render();
  }
};

let no = 0;

const answerKeys = [
  "answer_a_correct",
  "answer_b_correct",
  "answer_c_correct",
  "answer_d_correct",
];

const options = document.querySelectorAll(".option");
options.forEach((o, index) => {
  o.addEventListener("click", () => {
    const clickedKey = answerKeys[index];
    if (data[no].correct_answers[clickedKey] === "true") {
      score++;
    }

    if (data[no].correct_answers.answer_a_correct === "true") {
      option1.style.backgroundColor = "#4CAF50";
      option2.style.backgroundColor = "#E53935";
      option3.style.backgroundColor = "#E53935";
      option4.style.backgroundColor = "#E53935";
    }
    if (data[no].correct_answers.answer_b_correct === "true") {
      option1.style.backgroundColor = "#E53935";
      option2.style.backgroundColor = "#4CAF50";
      option3.style.backgroundColor = "#E53935";
      option4.style.backgroundColor = "#E53935";
    }
    if (data[no].correct_answers.answer_c_correct === "true") {
      option1.style.backgroundColor = "#E53935";
      option2.style.backgroundColor = "#E53935";
      option3.style.backgroundColor = "#4CAF50";
      option4.style.backgroundColor = "#E53935";
    }
    if (data[no].correct_answers.answer_d_correct === "true") {
      option1.style.backgroundColor = "#E53935";
      option2.style.backgroundColor = "#E53935";
      option3.style.backgroundColor = "#E53935";
      option4.style.backgroundColor = "#4CAF50";
    }
    document.querySelector(".score-no").textContent = score;

    no = no + 1;
    setTimeout(() => qCycle(no), 2300);
  });
});

document.querySelector(".result-btn").addEventListener("click", () => {
  currentState.state = homepage;
  render();
});
