export class AsyncArray extends Array {
	serialMap(fn) {
		return this.reduce((acc, element, index) => {
			return acc.then((iterator) => 
			fn(element, index, this)
			.then(result => [...iterator, result]));
		}, Promise.resolve([])).then((finalResult) => new AsyncArray(...finalResult)); 
	};
};