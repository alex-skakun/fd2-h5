export class AsyncArray extends Array {

    serialMap(fn) {
        return this.reduce((acc, el, id) => {
            return acc.then(result => {
                return fn(el, id, this).then(transformResult => {
                    result[id] = transformResult;
                    return result;
                });
            });
        }, Promise.resolve(new AsyncArray(this.length)));
    }
}