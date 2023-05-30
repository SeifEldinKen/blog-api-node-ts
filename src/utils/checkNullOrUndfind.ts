const checkNullOrUndefined = <T>(val: T) => {
  if (val === null || val === undefined) {
    throw new Error('Expected "val" to be defined, but rec');
  }
};

export { checkNullOrUndefined };
