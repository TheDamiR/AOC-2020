const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const data = input
        .toString()
        .trim()
        .split(/\n/)
        .filter(x => x);

    const EMPTY_SEAT = 'L';
    const OCCUPIED_SEAT = '#';

    class Simulate {
        constructor(seats, seatOccupied, useDirections) {
            this.width = seats[0].length;
            this.height = seats.length;
            this.data = seats;
            this.seatOccupied = seatOccupied; 
            this.useDirections = useDirections; 
            this.directions = [
                { x: 1, y: 0, }, 
                { x: -1, y: 0, },
                { x: 1, y: 1, }, 
                { x: -1, y: -1, },
                { x: 1, y: -1, }, 
                { x: -1, y: 1, },
                { x: 0, y: 1, }, 
                { x: 0, y: -1, },
            ];
        }

        check() {
            let hasChanged = false;
            let updatedSeats = [];
    
            this.data.forEach((line, y) => {
                let updated = '';
                
                [...line].forEach((seat, x) => {
                    let occupied = 0;

                    if (this.useDirections) {
                        this.directions.forEach(({ x: dirX, y: dirY }) => {
                            let posX = x + dirX;
                            let posY = y + dirY;
        
                            while (posX >= 0 && posY >= 0 && posX < this.width && posY < this.height) {
                                if (this.data[posY][posX] == OCCUPIED_SEAT) {
                                    occupied += 1; break;
                                }
        
                                if (this.data[posY][posX] == EMPTY_SEAT) {
                                    break;
                                }
        
                                posX += dirX;
                                posY += dirY;
                            }
                        });
                    } else {
                        for (let i = -1; i <= 1; i++) {
                            for (let j = -1; j <= 1; j++) {
                                if (
                                    (i != 0 || j != 0) &&
                                    x + j < this.width &&
                                    x + j >= 0 &&
                                    y + i < this.height &&
                                    y + i >= 0 &&
                                    this.data[y + i][x + j] == OCCUPIED_SEAT
                                ) {
                                    occupied += 1;
                                }
                            }
                        }
                    }
    
                    if (seat == EMPTY_SEAT && !occupied) {
                        updated += OCCUPIED_SEAT;
                        hasChanged = true;
                    } else if (seat == OCCUPIED_SEAT && occupied >= this.seatOccupied) {
                        updated += EMPTY_SEAT;
                        hasChanged = true;
                    } else {
                        updated += seat;
                    }
                });
    
                updatedSeats.push(updated);
            });
    
            this.data = updatedSeats;
    
            return hasChanged;
        }

        getOccupiedSeats() {
            let occupied = 0;

            this.data.forEach(line => {
                [...line].forEach(seat => {
                    if (seat == OCCUPIED_SEAT) 
                        occupied += 1; 
                });
            });
    
            return occupied;
        }
    }

    let part1 = new Simulate(data, 4, false);
    let part2 = new Simulate(data, 5, true);

    while (part1.check()) { }
    while (part2.check()) { }

    console.log(`answer ${part1.getOccupiedSeats()}`);
    console.log(`answer ${part2.getOccupiedSeats()}`);
});