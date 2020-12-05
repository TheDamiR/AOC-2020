const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

function size(x, y) {
   return Math.abs(x + 1 - y) / 2;
}

readFile('input.txt').then((input) => {
    const data = input
        .toString()
        .trim()
        .split('\n');

    let seatIds = [];

    for (let line of data) {
        let front = 0;
        let back = 127;

        let left = 0;
        let right = 7;

        let row = 0;
        let column = 0;

        for (let char of line) {
            if (char == 'F') {
                back -= size(back, front);
                row = Math.min(...[back, front]);
            } 
            
            if (char == 'B') {
                front += size(back, front);
                row = Math.max(...[back, front]);
            }

            if (char == 'L') {
                right -= size(right, left);
                column = Math.min(...[right, left]);
            }

            if (char == 'R') {
                left += size(right, left);
                column = Math.max(...[right, left]);
            }
        }
        
        seatIds.push(row * 8 + column);
    }

    //answer 1
    console.log(`answer ${Math.max(...seatIds)}`);

    let seatId = 0;

    for (let id of seatIds) {
        if (seatIds.includes(id + 2) && !seatIds.includes(id + 1))
            seatId = id + 1;
    }

    //answer 2
    console.log(`answer ${seatId}`);
});
