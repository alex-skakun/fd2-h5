export class AsyncArray extends Array {

    serialMap(fn) {
        return this.reduce((promis, el, id) => {
            return promis.then(newArr => {
                return fn(el, id, this).then(newEl => {
                    return [...newArr, newEl];
                })
            })
        }, Promise.resolve([])).then((newArr) => new AsyncArray(...newArr));
    }
}