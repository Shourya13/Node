let counter = 0;

const inc = () => {
  ++counter;
};

const dec = () => {
  --counter;
};

const getCount = () => {
  return counter;
};

module.exports = {
  inc,
  dec,
  getCount,
};
