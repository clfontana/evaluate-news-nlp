describe('isValidName', function(){

    it('check if name is valid', function(){
        
        const nameToCheck = 'Kirk';

        let names = [
            "Picard",
            "Janeway",
            "Kirk",
            "Archer",
            "Georgiou"
        ]
        
        const isValid = names.includes(nameToCheck);

        expect(isValid).toBe(true);

    });

    it('check if name is not valid', function(){

        const nameToCheck = 'Kirk11';

        let names = [
            "Picard",
            "Janeway",
            "Kirk",
            "Archer",
            "Georgiou"
        ]
        
        const isValid = names.includes(nameToCheck);

        expect(isValid).toBe(false);
        
    });

})