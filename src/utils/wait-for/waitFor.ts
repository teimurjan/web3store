const waitFor = (delay: number) =>
  new Promise(resolve => setTimeout(resolve, delay));

export default waitFor;
