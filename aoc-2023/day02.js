// https://adventofcode.com/2023/day/2

let input = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;
let sumOfIds = 0;
let powerOfMins = 0;

for (var i = 0; i < lines.length; i++) {
    let possible = true;
    let split = lines[i].split(':');
    let gameNum = parseInt(split[0].replace("Game ", ""));
    let setToCheck = split[1]
        .split(';')
        .map(
            el => {
                let me = el.split(',');
                return me.map(i => i.trim())
            }
        );

    // Part 1
    if (checkIfPossible(setToCheck)) {
        sumOfIds += gameNum;
    }

    // Part 2    
    powerOfMins += checkMinPossible(setToCheck)
}

console.log("Total Sum of IDs: " + sumOfIds);

console.log("Total Sum of Power of Sets " + powerOfMins);

// What is the sum of the IDs of those games?
function checkIfPossible(arrayVal) {
    let thisPossible = true;
    arrayVal.forEach((x) => {
        x.forEach((y) => {
            let redFound = y.endsWith(" red");
            if (redFound) {
                let redCount = parseInt(y.split(" ")[0]);
                if (redCount > MAX_RED) {
                    thisPossible = false;
                }
            }
            
            let greenFound = y.endsWith(" green");
            if (greenFound) {
                let greenCount = parseInt(y.split(" ")[0]);
                if (greenCount > MAX_GREEN) {
                    thisPossible = false;
                }
            }
            
            let blueFound = y.endsWith(" blue");
            if (blueFound) {
                let redCount = parseInt(y.split(" ")[0]);
                if (redCount > MAX_BLUE) {
                    thisPossible = false;
                }
            }
            
        })
    })
    return thisPossible;
}

// What is the sum of the power of these sets?
function checkMinPossible(arrayVal) {
    let minRedPossible = 1;
    let minGreenPossible = 1;
    let minBluePossible = 1;

    arrayVal.forEach((x) => {
        x.forEach((y) => {
            let redFound = y.endsWith(" red");
            if (redFound) {
                let redCount = parseInt(y.split(" ")[0]);
                if (redCount > minRedPossible) {
                    minRedPossible = redCount;
                }
            }
            
            let greenFound = y.endsWith(" green");
            if (greenFound) {
                let greenCount = parseInt(y.split(" ")[0]);
                if (greenCount > minGreenPossible) {
                    minGreenPossible = greenCount;
                }
            }
            
            let blueFound = y.endsWith(" blue");
            if (blueFound) {
                let redCount = parseInt(y.split(" ")[0]);
                if (redCount > minBluePossible) {
                    minBluePossible = redCount;
                }
            }
            
        })
    })
    return minRedPossible * minBluePossible * minGreenPossible;
}
