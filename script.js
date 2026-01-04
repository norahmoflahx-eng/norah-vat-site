const quiz = quizzes[localStorage.getItem("quizIndex")];
let current = 0;
let answers = Array(quiz.questions.length).fill(null);
let finished = false;

function render() {
  const q = quiz.questions[current];
  let html = `<div class="card"><h3>${q.q}</h3>`;

  q.options.forEach((opt, idx) => {
    let className = "option";

    if (finished) {
      if (idx === q.answer) {
        className += " correct";
      } else if (answers[current] === idx && idx !== q.answer) {
        className += " wrong";
      }
    } else if (answers[current] === idx) {
      className += " selected";
    }

    html += `
      <div class="${className}" onclick="select(${idx})">
        ${opt}
      </div>`;
  });

  if (finished) {
    html += `
      <div class="explain">
        <strong>الشرح:</strong><br>${q.explanation}
      </div>`;
  }

  html += `</div>`;
  document.getElementById("quiz").innerHTML = html;
}

function select(idx) {
  if (finished) return;
  answers[current] = idx;
  render();
}

function next() {
  if (current < quiz.questions.length - 1) {
    current++;
    render();
  }
}

function prev() {
  if (current > 0) {
    current--;
    render();
  }
}

function finish() {
  finished = true;
  render();
}

render();
