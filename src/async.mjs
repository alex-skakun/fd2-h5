export function _async(fn) {
    return function() {
        const gen = fn.apply(this, arguments);

        return new Promise((resolve, reject) => {
            const step = (key, arg) => {
                try {
                    const genFn = gen[key](arg);
                    const value = genFn.value;

                    if (genFn.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(
                            (value) => step('next', value),
                            (error) => step('throw', error)
                        );
                    }
                } catch (error) {
                    reject(error);
                    return;
                }
            };

            return step('next');
        });
    };
}