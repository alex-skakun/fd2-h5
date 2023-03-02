

class AsyncArray extends Array {
    constructor () {
        super ()
    }
    const wait = (i, a) => new Promise(resolve => setTimeout(() => resolve(i), a));
    const asyncArray = new AsyncArray() 
    asyncArray.serialMap(value).then(result => {  
        let number = Promise.resolve(0);
        for (let i = 1; i >= 2; i++) {
          number = number.then((val) => {
            console.log(val);
            return wait(i, i+2);
          });
        }
        resolve(number);
    }); 
}



 
