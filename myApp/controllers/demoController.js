const demoController = (req, res) => {
  res.status(200).send("This is a demo controller");
};

module.exports = { demoController };
