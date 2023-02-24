import {_async} from "./async.mjs";

describe('_async()', () => {
    it('should return function', () => {
        const test = _async(function* () {
        });

        expect(typeof test).toBe('function');
    });

    it('should pass arguments into generator function', () => {
        const testArgs = [1, 'a', [], {}];
        const test = _async(function* (...args) {
            expect(args).toEqual(testArgs);
        });

        test(...testArgs);
    });

    it('custom async function should return promise', () => {
        const test = _async(function* () {
        });

        expect(test() instanceof Promise).toBe(true);
    });

    it('should make custom await for promises and return result', async () => {
        const p1 = Promise.resolve(1);
        const p2 = Promise.resolve(2);
        const test = _async(function* () {
            return (yield p1) + (yield p2);
        });

        const result = await test();

        expect(result).toBe(3);
    });

    it('should make custom await for non promises and return result', async () => {
        const p1 = 1;
        const p2 = 2;
        const test = _async(function* () {
            return (yield p1) + (yield p2);
        });

        const result = await test();

        expect(result).toBe(3);
    });

    it('should throw error if there is unhandled exception in promise', async () => {
        const p1 = Promise.resolve(1);
        const p2 = Promise.reject(new Error('test error'));
        const test = _async(function* () {
            return (yield p1) + (yield p2);
        });

        await test().catch(error => {
            expect(error.message).toBe('test error');
        });
    });

    it('should throw error if there is unhandled exception in code', async () => {
        const test = _async(function* () {
            return (null).toString();
        });

        await test().catch(error => {
            expect(error.message).toBe('Cannot read properties of null (reading \'toString\')');
        });
    });
});
