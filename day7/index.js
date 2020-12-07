const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const lines = input
        .toString()
        .trim()
        .split(/\n/);
    
    function containsGold(bags, bag) {
        let subBags = bags[bag];

        if (!subBags) 
            return 0;

        if (subBags.includes('shiny gold'))
            return 1;

        for (const innerBag of subBags) {
            if (containsGold(bags, innerBag))
                return 1;
        }

        return 0;
    }

    let bags1 = {};
    let count = 0;
    
    for (const line of lines) {
        let innerBagTypes = line.replace(/.*?bags/, '').split(',');

        innerBagTypes = innerBagTypes.map(x => {
            let color = x
                .replace(/.*\d /,  '')
                .replace(/[^a-zA-Z ]/g, '')
                .replace(/(bags|bag)/, '')
                .trim();

            return color;
        });

        let bag = line.replace(/bags.*/, '').trim();

        bags1[bag] = innerBagTypes;
    }
    
    for (const bag in bags1) {
        count += containsGold(bags1, bag);
    }
    
    console.log(`answer ${count}`);

    function countInnerBags(bags, bag) {
        let subBags = bags[bag];

        if (!subBags) 
            return 0;

        let innerBags = 0;

        for (const innerBag of subBags) {
            innerBags += innerBag[0] + innerBag[0] * countInnerBags(bags, innerBag[1]);
        }

        return innerBags;
    }

    let bags2 = {};

    for (const line of lines) {
        let innerBagTypes = line.replace(/.*?bags/, '').split(',');

        innerBagTypes = innerBagTypes.map(x => {
            let number = Number(x.replace(/[^\d]+/g, ''));
            let color = x
                .replace(/.*\d /,  '')
                .replace(/[^a-zA-Z ]/g, '')
                .replace(/(bags|bag)/, '')
                .trim();

            return [number, color];
        });

        let bag = line.replace(/bags.*/, '').trim();

        bags2[bag] = innerBagTypes;
    }

    console.log(`answer ${countInnerBags(bags2, 'shiny gold')}`);
});