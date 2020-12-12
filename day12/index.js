const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const data = input
        .toString()
        .trim()
        .split(/\n/);

    function getPosition(x, y) {
        return Math.abs(x) + Math.abs(y);
    }

    function rotateVector(n, x, y) {
        // REF: https://en.wikipedia.org/wiki/Rotation_matrix
        // woahh >.<
        
        let angle = n * Math.PI / 180;
        let dirX = Math.round(x * Math.cos(angle) - y * Math.sin(angle));
        let dirY = Math.round(x * Math.sin(angle) + y * Math.cos(angle));

        return { dirX, dirY };
    }

    function part1(data) {
        // Action N means to move north by the given value.
        // Action S means to move south by the given value.
        // Action E means to move east by the given value.
        // Action W means to move west by the given value.
        // Action L means to turn left the given number of degrees.
        // Action R means to turn right the given number of degrees.
        // Action F means to move forward by the given value in the direction the ship is currently facing.
    
        let x = 0;
        let y = 0;
        let direction = 0;
        
        function move(action, units) {
            switch (action) {
                case 'N':
                    y += units;
                    break;
    
                case 'S':
                    y -= units;
                    break;
    
                case 'E':
                    x += units;
                    break;
    
                case 'W':
                    x -= units;
                    break;
    
                case 'L':
                    direction = ((direction + (units / 90)) + 4) % 4;
                    break;
    
                case 'R':
                    direction = ((direction - (units / 90)) + 4) % 4;
                    break;
    
                case 'F': 
                    let coordinates = {
                        0: 'E',
                        1: 'N',
                        2: 'W',
                        3: 'S'
                    };

                    move(coordinates[direction], units);
                    break;
            }
        }
    
        for (line of data) {
            let match = /([A-Z])(\d+)/.exec(line);
            let action = match[1];
            let units = parseInt(match[2]);
    
            move(action, units);
        }

        return getPosition(x, y);
    }

    function part2(data) {
        // Action N means to move the waypoint north by the given value.
        // Action S means to move the waypoint south by the given value.
        // Action E means to move the waypoint east by the given value.
        // Action W means to move the waypoint west by the given value.
        // Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
        // Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
        // Action F means to move forward to the waypoint a number of times equal to the given value.
    
        let x = 0;
        let y = 0;
        let dirX = 10;
        let dirY = 1;
        
        function move(action, units) {
            switch (action) {
                case 'N':
                    dirY += units;
                    break;
    
                case 'S':
                    dirY -= units;
                    break;
    
                case 'E':
                    dirX += units;
                    break;
    
                case 'W':
                    dirX -= units;
                    break;
    
                case 'L':
                    var result = rotateVector(units, dirX, dirY);
                    dirX = result.dirX;
                    dirY = result.dirY;
                    break;
    
                case 'R':
                    var result = rotateVector(units * -1, dirX, dirY);
                    dirX = result.dirX;
                    dirY = result.dirY;
                    break;
    
                case 'F': 
                    x += units * dirX;
                    y += units * dirY;
                    break;
            }
        }
    
        for (line of data) {
            let match = /([A-Z])(\d+)/.exec(line);
            let action = match[1];
            let units = parseInt(match[2]);
    
            move(action, units);
        }

        return getPosition(x, y);
    }

    console.log(`answer ${part1(data)}`);
    console.log(`answer ${part2(data)}`);
});