export function _async(genFn) {
    return (...args)  => {
        return new Promise((resolve, reject) => {
            const iterator = genFn(...args);
            const proceed = (replacementValue) => {
                const {done, value} = iterator.next(replacementValue);
                const valuePromise = value instanceof Promise ? value : Promise.resolve(value);

                valuePromise.then(
                    result => done ? resolve(result) : proceed(result),
                    error => reject(error),
                );
            };
            proceed();
        });
    };
}