export class AsyncArray extends Array {
    serialMap(fn) {
      return this.reduce((acc, el, i) => {
        return acc.then((newArr) => fn(el, i, this).then((transformedEl) => {
          return [...newArr, transformedEl]
        }))
      }, Promise.resolve([])).then((rawArray) => new AsyncArray(...rawArray))
    }
  }
  

  