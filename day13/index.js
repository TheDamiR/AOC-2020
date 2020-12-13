const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const data = input
        .toString()
        .trim()
        .split(/\n/);

    const buses1 = data[1]
        .split(',')
        .filter(x => x != 'x')
        .map(x => parseInt(x));

    const timestamp = parseInt(data[0]);

    let firstBus = {
        id: 0,
        time: 0,
    };

    buses1.map(bus => {
        let found = false;
        let time = timestamp;

        while (!found) {
            let result = time % bus;
            if (!result) {
                if (firstBus.time > time || !firstBus.time) {
                    firstBus.id = bus;
                    firstBus.time = time;
                }
                found = true; 
            }
            time++;
        }
    });

    let result1 = (firstBus.time - timestamp) * firstBus.id;

    console.log(`answer ${result1}`);

    const buses2 = data[1]
        .split(',')
        .map(x => x != 'x' ? parseInt(x) : x);

    let pairBusMinutes = buses1.map(bus => [bus, buses2.indexOf(bus)]);
    let tempTime = 0;
    let multiplicator = 1;

    for (let i = 0 ; i < pairBusMinutes.length; i++) {
        let found = false;

        while (!found) {
            let result = (tempTime + pairBusMinutes[i][1]) % pairBusMinutes[i][0];
            if (!result) {
                found = true;
                multiplicator *= pairBusMinutes[i][0];
            } else {
                tempTime += multiplicator; 
            }
        }
    }

    let result2 = tempTime;

    console.log(`answer ${result2}`);
});