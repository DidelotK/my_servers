export const getResource = () => {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve('Success');
    } else {
      reject('Failure');
    }
  })
};
