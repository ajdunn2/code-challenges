// https://adventofcode.com/2023/day/1

const text =
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const textPart2 =
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

let myNumber = 0;

const linesPartOne = text.split('\n');
const linesPartTwo = textPart2.split('\n');

for (let line of linesPartTwo) {
        // part 2 - first take care of edge cases for overlapping
        line = line.replace('twone', 21)
        line = line.replace('eightwo', 82);
        line = line.replace('eighthree', 83);
        line = line.replace('oneight', 18);
        line = line.replace('nineight', 98);
        line = line.replace('fiveight', 58);
        line = line.replace('threeight', 38);  

        // part 2 - replace text numbers to 
        line = line.replace(/one|two|three|four|five|six|seven|eight|nine/gi, function (x) {
        return x
                .replace('one', 1)
                .replace('two', 2)
                .replace('three', 3)
                .replace('four', 4)
                .replace('five', 5)
                .replace('six', 6)
                .replace('seven', 7)
                .replace('eight', 8)
                .replace('nine', 9);
    }); 
 
  // part 1
  let numbersOnly = line.replace(/\D/g, '');

  if (numbersOnly.length === 1) {
   numbersOnly = numbersOnly + numbersOnly;
  } else if (numbersOnly.length > 2) {
     numbersOnly = numbersOnly[0] + numbersOnly[numbersOnly.length - 1]
  }
  
  myNumber += parseInt(numbersOnly)
}

console.log(myNumber)
