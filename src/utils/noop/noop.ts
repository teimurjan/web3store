const noop = () => {};

noop.async = async () => {};
noop.returns =
  <T>(value: T) =>
  () =>
    value;
noop.asyncReturns =
  <T>(value: T) =>
  async () =>
    value;

export default noop;
