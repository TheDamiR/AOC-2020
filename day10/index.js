const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const numbers = 
        [0].concat(input
            .toString()
            .trim()
            .split(/\n/)
            .map(x => parseInt(x))
        )    
        .sort((a, b) => a - b);

    let last = 0;
    let countOneJolts = 0;
    let countThreeJolts = 0;

    for (let i = 0; i < numbers.length; i++) {
        let current = numbers[i];
        
        if (current - last == 1) {
            countOneJolts++;
        }

        if (current - last == 3 || i == numbers.length - 1) {
            countThreeJolts++;
        }

        last = numbers[i];
    }

    console.log(`answer ${countOneJolts * countThreeJolts}`);

    function combination(data = [], cache = {}) {
        let key = data.join('');

        if (key in cache) {
            return cache[key];
        }

        let result = 1;

        for (let i = 1; i < data.length - 1; i++) {
            if (data[i + 1] - data[i - 1] <= 3) {
                let numbers = [data[i - 1]].concat(data.slice(i + 1));
                result += combination(numbers, cache);
            }
        }

        cache[key] = result;

        return result;
    }

    console.log(`answer ${combination(numbers)}`);
});