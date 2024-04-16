const collectAnswers = require("../lib/collectAnswers");

const questions = [
  "what is your name ?",
  "Where do you live ?",
  "What game you like ? ",
];

const answerEvents = collectAnswers(questions, (answers) => {
  console.log("Thanks for answering");
  console.log(answers);
  process.exit();
});

answerEvents.on("answer", (answer) =>
  console.log(`question answered: ${answer}`)
);
