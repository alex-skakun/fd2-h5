import {AsyncArray} from "./AsyncArray.mjs";

describe('AsyncArray', () => {
    it('should return promise', () => {
        const result = new AsyncArray().serialMap();

        expect(result instanceof Promise).toBe(true);
    });

    it('should pass three arguments into transform function', async () => {
        const transformFn = jest.fn(() => Promise.resolve());
        const aa = new AsyncArray('a', 'b');

        await aa.serialMap(transformFn);

        expect(transformFn).toHaveBeenCalledTimes(2);
        expect(transformFn.mock.calls[0]).toEqual(['a', 0, aa]);
        expect(transformFn.mock.calls[1]).toEqual(['b', 1, aa]);
    });

    it('should collect transformations into new AsyncArray', async () => {
        const transform = (el, index) => new Promise(resolve => {
            setTimeout(() => resolve(el.repeat(index + 1)), 0);
        });
        const aa = new AsyncArray('a', 'b');

        const results = await aa.serialMap(transform);

        expect(results instanceof AsyncArray).toBe(true);
        expect(results).toEqual(new AsyncArray('a', 'bb'));
    });

    it('should run second transformation only after finishing first transformation', async () => {
        const transform = jest.fn((el, index) => new Promise(resolve => {
            setTimeout(() => {
                expect(transform).toHaveBeenCalledTimes(index + 1);
                resolve(el);
            }, 0);
        }));
        const aa = new AsyncArray('a', 'b');

        await aa.serialMap(transform);
    });
});
