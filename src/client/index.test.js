describe('isValidValue', function(){

    it('check if true', function(){
        
        const myConst = true;

        const isValid = myConst ? true : false;

        expect(isValid).toBe(true);

    });

    it('check if false', function(){
        
        const myConst = false;

        const isValid = myConst ? true : false;

        expect(isValid).toBe(false);

    });

})