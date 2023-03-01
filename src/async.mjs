export function _async(generatorFunction) {
    return function () {
        let generatorFn = generatorFunction(...arguments);
        function* resolve(next) {
            if (next.done) {
                return Promise.resolve(next.value);
            };
            return Promise.resolve(next.value).then((result) => {
                return resolve(generatorFn.next(result));
            });
        };
        try {
            return resolve(generatorFn.next());
        } catch (error) {
            return Promise.reject(error);
        };
    };
};


