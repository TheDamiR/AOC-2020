const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const groups = input
        .toString()
        .trim()
        .split(/\n\n(?!\n)/g);
    
    let count1 = 0;

    for (let group of groups) {
        let uniques = [];

        group
            .replace(/\n/g, '')
            .split('')
            .map(x => {
                if (!uniques.includes(x))
                    uniques.push(x)
            });

        for (let answer of uniques) {
            count1 += answer.length;
        }
    }

    console.log(`answer ${count1}`);
    
    let count2 = 0;

    for (let group of groups) {
        let uniques = [];

        group
            .replace(/\n/g, '')
            .split('')
            .map(x => {
                if (!uniques.includes(x))
                    uniques.push(x)
            });

        uniques.map(answer => {
            let match = group
                .split('\n')
                .every(x => x.includes(answer));
                
            if (match)
                count2 += 1;
        });
    }

    console.log(`answer ${count2}`);
});
