export class AsyncArray extends Array {

    serialMap(myCallback) {

        let pr = Promise.resolve([]);

        return this.reduce((myPromise, el, index) => {   

            return myPromise.then(newArray => {

                return myCallback(el, index, this).then(newElem => {
                    return [...newArray, newElem];
                })
                
            }); 

        }, pr).then((newArray) => new AsyncArray(...newArray)); 

    }
}
