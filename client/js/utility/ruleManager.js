namespacer('uoplanner');

uoplanner.ruleManager = (() => {
    const 
        renaissanceRules = {
            ruleSet: 'Renaissance',
            skillMax: 100,
            skillTotal: 700
        },

        outlandsRules = {
            ruleSet: 'Outlands',
            skillMax: 120,
            skillTotal: 720
        },

        getRules = () => {
            if (localStorage) {
                const settings = localStorage.uoplannerRules || '{}';
                try {
                    return JSON.parse(settings);
                } catch (err) {
                    console.error(err);
                    return {};
                }
            } 
            console.log('No localStorage.');
        },

        setRules = (ruleSet) => {
            if (localStorage) {
                try {
                    if (ruleSet === 'Outlands') {
                        localStorage.uoplannerRules = JSON.stringify(outlandsRules);
                    } else {
                        localStorage.uoplannerRules = JSON.stringify(renaissanceRules);
                    }

                    return true;
                } catch (err) {
                    console.error('Error parsing settings form localStorage.');
                    return false;
                }
            } 
            console.error('No localStorage.');
        };

    
    const initialState = getRules() || renaissanceRules;

    setRules(initialState);

    return {
        getRules,
        setRules
    };
})();