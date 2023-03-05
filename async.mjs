export function _async(functionGenerator) {
    return (...arguments) => {
        return new Promise ((resolve, reject) => {
            const iterator = functionGenerator(...arguments);
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