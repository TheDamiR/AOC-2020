const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const numbers = input
        .toString()
        .trim()
        .split('\n');

    // answer 1
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            let number1 = parseInt(numbers[i]);
            let number2 = parseInt(numbers[j]);
            let match = number1 + number2 == 2020;

            if (match)
                console.log(`answer ${number1 * number2} => ${number1} + ${number2} = ${number1 + number2}`);
        }
    }

    // answer 2
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                let number1 = parseInt(numbers[i]);
                let number2 = parseInt(numbers[j]);
                let number3 = parseInt(numbers[k]);
                let match = number1 + number2 + number3 == 2020;

                if (match)
                    console.log(`answer ${number1 * number2 * number3} => ${number1} + ${number2} + ${number3} = ${number1 + number2 + number3}`);
            }
        }
    }
});
