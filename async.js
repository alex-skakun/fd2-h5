export class AsyncArray extends Array {

    serialMap(fnTransform) {

        return this.reduce((promise, el, index) => {

            return promise.then((getNewArray) => {

                return fnTransform(el, index, this).then((getFnTransformValue) => {
                    getNewArray.push(getFnTransformValue);
                    return getNewArray;
                })
            })

        }, Promise.resolve([])).then((getNewArray) => new AsyncArray(...getNewArray)); // Promise.resolve([]) = acc - start

    }
}

