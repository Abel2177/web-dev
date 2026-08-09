const makeCounter = () => {
  let count = 0;
  return () => ++count;
};
