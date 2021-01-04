const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const lines = input
        .toString()
        .trim()
        .split(/\r\n/);

    let mask = [];
    let memory = [];

    lines.forEach(line => {
        if (/^mask/.test(line)) {
            mask = [.../^mask = (.*)$/.exec(line)[1]];
        } else {
            let [, address, value] = /^mem\[(\d+)] = (\d+)/.exec(line);
            address = parseInt(address);
            value = parseInt(value);

            let string = [...value.toString(2).padStart(36, '0')].map((value, index) => {
                if(mask[index] == 'X') return value;
                return mask[index];
            }).join('');

            let val = parseInt(string, 2);

            memory.push({
                address, val
            });
        }
    });

    let result = 0;
    memory.forEach((v) => {
        result += v.val;
    })
});