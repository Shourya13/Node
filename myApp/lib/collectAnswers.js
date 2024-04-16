const readline = require("readline");
const events = require("events");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = (questions, done) => {
  const answers = [];

  const [firstQuestion] = questions;

  const emitter = new events.EventEmitter();

  const questionAnswered = (answer) => {
    emitter.emit("answer", answer);

    answers.push(answer);
    if (answers.length < questions.length) {
      rl.question(questions[answers.length], questionAnswered);
    } else {
      emitter.emit("complete", answer);
      done(answers);
    }
  };

  rl.question(firstQuestion, questionAnswered);

  return emitter;
};
