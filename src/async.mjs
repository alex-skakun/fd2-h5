export function _async(generatorFunction) {
    return function (...args) {
        const generatorObject = generatorFunction(...args);

        return new Promise((resolve, reject) => {
            function step(nextFunction) {
                let nextResult;
                try {
                    nextResult = nextFunction();
                } catch (error) {
                    return reject(error);
                }

                if (nextResult.done) {
                    return resolve(nextResult.value);
                }

                const promise = Promise.resolve(nextResult.value);
                promise.then(
                    (result) => {
                        step(() => generatorObject.next(result));
                    },
                    (error) => {
                        step(() => generatorObject.throw(error));
                    }
                );
            }

            step(() => generatorObject.next(undefined));
        });
    };
}