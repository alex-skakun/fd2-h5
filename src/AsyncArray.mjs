class AsyncArray extends Array {
    async serialMap(fn) {
        const result = new AsyncArray();
        for (let i = 0; i < this.length; i++) {
            const item = this[i];
            const mappedItem = await fn(item, i, this);
            result.push(mappedItem);
        }
        return result;
    }
}