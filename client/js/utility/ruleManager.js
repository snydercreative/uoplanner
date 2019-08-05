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
                const settings = localStorage.uoplannerRules;
                try {
                    return settings && JSON.parse(settings);
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
                    if (ruleSet === 'Renaissance') {
                        localStorage.uoplannerRules = JSON.stringify(renaissanceRules);
                    } else {
                        localStorage.uoplannerRules = JSON.stringify(outlandsRules);
                    }

                    return true;
                } catch (err) {
                    console.error('Error parsing settings form localStorage.');
                    return false;
                }
            } 
            console.error('No localStorage.');
        };

    return {
        getRules,
        setRules
    };
})();