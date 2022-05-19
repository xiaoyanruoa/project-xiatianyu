const trueFn = () => true;

// eslint-disable-next-line func-names
export default function (emitsArray) {
  const emitsObject = {};

  emitsArray.forEach((val) => {
    emitsObject[val] = trueFn;
  });

  return emitsObject;
}
