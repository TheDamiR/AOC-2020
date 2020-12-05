const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

readFile('input.txt').then((input) => {
    const passports1 = input
        .toString()
        .trim()
        .replace(/\n(?!\n)/g, '')
        .split('\n');

    const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

    let validPassports1 = 0;

    for (let passport of passports1) {
        let isValid = true;

        for (let key of required) {
            let match = passport.indexOf(key);
            if (match == -1) {
                isValid = false; break;
            }
        }

        if (isValid)
            validPassports1 += 1;
    }

    console.log(`answer passports ${validPassports1}`);

    function beetwenNumber(num, min, max) {
        return min <= num && max >= num;
    }

    function year(field) {
	    return parseInt(field.substring(1));
    }

    let validationRules = {
        byr: field => beetwenNumber(year(field), 1920, 2002),
        iyr: field => beetwenNumber(year(field), 2010, 2020),
        eyr: field => beetwenNumber(year(field), 2020, 2030),
        hgt: field => { 
            let match = /:(\d+)(cm|in)$/.exec(field) ?? [];
            let height = parseInt(match[1] ?? 'NaN');
            let unit = match[2];
            
            return unit == 'cm' ? beetwenNumber(height, 150, 193) : beetwenNumber(height, 59, 76);
        },
        hcl: field => /:#[0-9a-f]{6}$/.test(field),
        ecl: field => /:(amb|blu|brn|gry|grn|hzl|oth)$/.test(field),
        pid: field => /:[0-9]{9}$/.test(field),
    }

    const passports2 = input
        .toString()
        .trim()
        .replace(/\n(?!\n)/g, ' ')
        .split('\n')
        .map(s => s.trim());

    let validPassports2 = 0;

    for (let passport of passports2) {
        let isValid = true;

        for (let key of required) {
            let match = new RegExp(`${key}(:\\S+)`).exec(passport);

            if (!match) {
                isValid = false; break;
            }

            let field = match[1];
            let check = validationRules[key](field);

            if (!check) {
                isValid = false; break;
            }
        }

        if (isValid) 
            validPassports2 += 1;
    }

    console.log(`answer valid passports ${validPassports2}`);
});
