export class AsyncArray extends Array {

    serialMap(func) {
        return this.reduce((acc, element, index) => {
            return acc.then(results => {
                return func(el, index, this).then(transformResult => {
                    results[index] = transformResult;
                    return results;
                });
            });
        }, Promise.resolve(new AsyncArray(this.length)));
    }
}