namespacer('uoplanner');

uoplanner.skillSorter = (() => {

    /**
     * 
     * @param {Array} userSkills 
     */
	const sort = (userSkills) => {
		userSkills.sort((left, right) => {
			if (left.name > right.name) return 1;			
			if (left.name < right.name) return -1;
			return 0;
		});

		userSkills.sort((left, right) => {
			if (left.value > right.value) return -1;			
			if (left.value < right.value) return 1;
			return 0;
        });
       
        return userSkills;
    }
    
    return {
        sort
    }
})();