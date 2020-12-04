const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const line = input
        .toString()
        .trim()
        .split('\n');

    function countTrees(slope, descent) {
        let treeCount = 0;
        let x = 0;

        for (y = 0; y < line.length; y = y + descent, x += slope) {
            if (line[y][x % line[0].length] == '#')
                treeCount += 1;
        }

        return treeCount;
    }

    // answer 1
    console.log(`answer tree count ${countTrees(3, 1)}`);

    // answer 2
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2]
    ];

    let multi = 1;

    for (let [slope, descent] of slopes) {
        let count = countTrees(slope, descent);
        multi *= count;
    }
    
    console.log(`answer multiplication is ${multi}`);
});
