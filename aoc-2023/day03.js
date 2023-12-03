// https://adventofcode.com/2023/day/3

let input =
`467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

let partNumbers = [];
let arraySet = [];
let arrayIncluded = [];
let arraySymbols = [];
let arrayNumbers = [];

input.split("\n").forEach(
    (e) => {
        arrayIncluded.push(e.split(""))
    }
);

const numberOfRows = arrayIncluded.length; // e.g. 10
const lengthOfRows = arrayIncluded[0].length; // e.g. 10

// Find The Symbols
arrayIncluded.forEach((e, index) => {
    symbolGetter(e, index)
})

// Find the Numbers and check them
arrayIncluded.forEach((e, index) => {
    numberGetter(e, index)
})

// Get Final Result
console.log("Part 01: Sum: " +addAllArrayNumbers());

function isSymbol(character)
{
    let isNumber = character >= '0' && character <= '9';
    let isFullStop = (character == '.');
    return (!isFullStop && !isNumber);
}

function symbolGetter(e, index)
{
    let symbols = [];

    for (let i = 0; i < e.length; i++) {
        if (isSymbol(e[i])) {
            symbols.push(i);
        }
    }
    
    arraySymbols.push(symbols);
}

function numberGetter(e, index)
{
    let numbers = [];
    let tempNumber = null;
    let tempFirstPos;
    
    for (let i = 0; i < e.length; i++) {
        if (e[i] >=0 && e[i]<=9) {
            if (tempNumber == null) {
                tempFirstPos = i;
                tempNumber = e[i]
            } else {
                tempNumber += e[i]
            }
            
        } else {
            if (tempNumber != null) {
                numbers.push(parseInt(tempNumber));
                calculate(tempNumber, tempFirstPos, index)
                // reset
                tempNumber = null;
                tempFirstPos = null;
            }
        }
    }
    
    if (tempNumber != null) {
        numbers.push(parseInt(tempNumber));
        calculate(tempNumber, tempFirstPos, index)
        // reset
        tempNumber = null;
        tempFirstPos = null;
    }
    
    arrayNumbers.push(numbers);
}

function calculate(number, pos, index)
{
    index = parseInt(index);
    pos = parseInt(pos);
    
    let counter = 0;

    let isPartNumber = false;

    let firstPositionsToCheck = pos -1;

    if (firstPositionsToCheck < 0) {
        firstPositionsToCheck = 0;
    }

    let lastPositionToCheck = pos + number.toString().length;
    if (lastPositionToCheck > (lengthOfRows - 1)) {
        lastPositionToCheck = (lengthOfRows - 1);
    }

    // Check previous line
    if (index != 0) {
        arraySymbols[index-1].forEach(
            (e) => {
                if(e >= firstPositionsToCheck && e <= lastPositionToCheck) {
                    isPartNumber = true;
                    counter++;
                }
            }
        )
    }
    
    // Check next line
    if (index != numberOfRows-1) {
        arraySymbols[index+1].forEach(
            (e) => {
                if (e >= firstPositionsToCheck && e <= lastPositionToCheck) {
                    isPartNumber = true;
                    counter++;
                }
            }
        )
    }
    
    // Check Left
    if (pos > 0) {
        if (arraySymbols[index].includes(firstPositionsToCheck)) {
            isPartNumber = true;
            counter++;
        }
    }
    
    // Check Right
    if (pos <= lengthOfRows-1) {
        if (
        arraySymbols[index].includes(lastPositionToCheck)
        ) {
            isPartNumber = true;
            counter++;
        }
    }
    
    if (isPartNumber) {
        partNumbers.push(number)
        if (counter > 1) {
            console.log(number+"counter="+counter)
        }
    }
}

function addNumbers(accumulator, currentValue)
{
    return parseInt(accumulator) + parseInt(currentValue);
}


function addAllArrayNumbers()
{
    let total = 0;
    
    partNumbers.forEach((element) => total += parseInt(element));
    //console.table(partNumbers);
    return total;
}
