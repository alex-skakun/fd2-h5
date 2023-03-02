export function _async(fn) {
  return function (...fnArgs) {
    const generator = fn(...fnArgs);
    function next(value, error) {
      let result;
      try {
        result = error ? generator.throw(value) : generator.next(value);
      } catch (err) {
        return Promise.reject(err);
      }
      if (result.done) {
        return Promise.resolve(result.value);
      }
      return Promise.resolve(result.value).then(
        (val) => next(val, false),
        (err) => next(err, true)
      );
    }
    return next(undefined, false);
  };
}


