'use strict'
export function _async(generatorFunction) {
    return function () {
        const generator = generatorFunction(...arguments);
        function resolve(next) {
            if (next.done) {
                return Promise.resolve(next.value);
            };
            return Promise.resolve(next.value).then((result) => {
                return resolve(generator.next(result));
            });
        };
        try {
            return resolve(generator.next());
        } catch (error) {
            return Promise.reject(error);
        };
    };
};
