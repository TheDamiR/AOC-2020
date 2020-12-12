const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const numbers = input
        .toString()
        .trim()
        .split(/\n/)
        .map(x => parseInt(x, 10));

    let invalidNumber = 0;
    let win = 25;

    for (let i = win; i < numbers.length; i++) {
        let target = numbers[i]
        let options = numbers.slice(i - (win + 1), i);
        let found = [];

        for (option of options) { 
            if (options.indexOf(target - option) > -1) { 
                found.push(option);
            }

            if (!found.length && option == options[win]) {
                invalidNumber = target; break;
            }
        }

        if (invalidNumber) 
            break;
    }

    console.log(`answer ${invalidNumber}`);

    let maxRange = numbers.slice(0, numbers.indexOf(invalidNumber) + 1);

    let run = 0;
    let weakness = 0;
    let range = [];
  
    for (let i = 0; i < maxRange.length; i++) {
        let start = maxRange[i];

        run += start;
        range.push(start);
        
        for (let j = i + 1; j < maxRange.length; j++) {
            let next = maxRange[j];

            run += next;
            range.push(next);

            if (run > invalidNumber) {
                run = 0;
                range = [];
                break;
            }

            if (run == invalidNumber) {
                let sort1 = range.sort((a, b) => a - b);
                let sort2 = sort1.slice(-1);

                weakness = sort1[0] + sort2[0];

                break;
            };
        }
    }

    console.log(`answer ${weakness}`);
});