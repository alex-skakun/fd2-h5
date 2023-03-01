export function _async(myCallback){
    return function() 
    { 
        let gen = myCallback(...arguments);
        
        try {
            return myResolve(gen.next());
        } catch (ex) {
            return Promise.reject(ex);
        };

        function myResolve(nextStep){
            if(!nextStep.done){
                return Promise.resolve(nextStep.value).then(
                    r => myResolve(gen.next(r))
                );
            }else{
                return Promise.resolve(nextStep.value);    
            }    
        }       

    }
}