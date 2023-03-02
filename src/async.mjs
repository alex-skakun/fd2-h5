export function _async(fn) {
	return function() {
		let generator = fn.apply(this, arg);
		return new Promise((resolve, reject) => {
			let step = (key, argum) => {
				try {
					let generatorFunction = generator[key](argum);
					let value = generatorFunction.value;

					if (generatorFunction.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then((value) => step('next', value),
						(error) => ste('throw', error));
					};
				} catch (error) {
					reject(error);
					return;
				};
			};

			return step('next');
		});
	};
};