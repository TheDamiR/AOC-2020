const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const passwords = input
        .toString()
        .trim()
        .split('\n');

    const regex = /(\d+)-(\d+) ([a-z]): ([a-z]+)/;

    let totalValid1 = 0;
    // answer 1
    for (let i in passwords) {
        let match = regex.exec(passwords[i]);
        match.shift();

        let min = parseInt(match[0]);
        let max = parseInt(match[1]);
        let letter = match[2];
        let pwd = match[3];

        var count = pwd
            .split('')
            .filter(p => p == letter)
            ?.length;

        var isValid = count >= min && count <= max;

        if (isValid)
            totalValid1 += 1
    }

    console.log(`answer ${totalValid1} valids`);

    let totalValid2 = 0;
    // answer 2
    for (let i in passwords) {
        let match = regex.exec(passwords[i]);
        match.shift();

        let min = parseInt(match[0]);
        let max = parseInt(match[1]);
        let letter = match[2];
        let pwd = match[3];

        let positionCheck1 = pwd.charAt(min - 1) == letter;
        let positionCheck2 = pwd.charAt(max - 1) == letter;

        var isValid = positionCheck1 != positionCheck2;

        if (isValid)
            totalValid2 += 1
    }

    console.log(`answer ${totalValid2} valids`);
});
