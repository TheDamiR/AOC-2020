const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const lines = input
        .toString()
        .trim()
        .split(/\n/);

    function bootCode(ins) {
        let executed = [];
        let index = 0;
        let accumulator = 0;
        
        while (!executed.includes(index)) {
            executed.push(index);

            if (ins && !ins[index]) {
                return { index, accumulator };
            }

            let [, instruction, argument] = /([a-z]+) ([+-]\d+)/.exec(ins[index]);
            let number = parseInt(argument);

            if (instruction == 'acc') {
                accumulator += number;
                index += 1;
            }

            if (instruction == 'jmp') {
                index += number;
            }

            if (instruction != 'jmp' && instruction != 'acc') {
                index += 1;
            }
        }

        return { index, accumulator };
    }

    let accumulator1 = bootCode(lines).accumulator;

    console.log(`answer ${accumulator1}`);

    let accumulator2 = 0;

    for (let i = 0; i < lines.length; i++) {
        let [, instruction, direction, argument] = /(acc|jmp|nop)\s(\+|-)(\d*)/.exec(lines[i]);

        if (instruction == 'acc') 
            continue;

        let newInstructions = [...lines];

        newInstructions.splice(i, 1, `${instruction == 'nop' ? 'jmp' : 'nop'} ${direction + argument}`);

        let results = bootCode(newInstructions);

        if (results.index == newInstructions.length) {
            accumulator2 = results.accumulator; 
            break;
        }
    }

    console.log(`answer ${accumulator2}`);
});