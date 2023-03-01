export class AsyncArray extends Array {
    serialMap(fn) {
        return this.reduce((promise, el, idx) => {
            return promise.then((iterationVal) => fn(el, idx, this).then(fnResult => [...iterationVal, fnResult]));
        }, Promise.resolve([])).then((result) => new AsyncArray(...result));
    }
}