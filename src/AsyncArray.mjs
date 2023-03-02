export class AsyncArray extends Array {
  serialMap(transformFn) {
    return this.reduce((acc, el, index, asyncArray) => {
      return acc.then((accAsyncArray) => {
        return transformFn(el, index, asyncArray).then(result => {
          accAsyncArray.push(result)
          return accAsyncArray;
        })
      })
    }, Promise.resolve(new AsyncArray()))
  }
}
