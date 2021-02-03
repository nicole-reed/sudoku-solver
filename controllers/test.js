// solve(puzzleString, previousEmptyIndex = 0) {
//   try {
//     // console.log("puzzleString: ", puzzleString)
//     // console.log("previousEmptyIndex: ", previousEmptyIndex)

//     this.validate(puzzleString)

//     if (!puzzleString.includes('.')) {
//       return puzzleString
//     }

//     const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
//     let retry = false
//     let solutionStartValue = 1

//     // console.log("starting parent loop")
//     parentLoop:
//     for (let i = previousEmptyIndex; i < puzzleString.length; i++) {
//       // console.log("i: ", i)

//       if (puzzleString[i] === '.' || (retry && i == previousEmptyIndex)) {
//         // console.log("i === '.'")
//         const rowLetterIndex = Math.floor(i / 9)
//         const rowLetter = rowLetters[rowLetterIndex]
//         const columnNumber = (i % 9) + 1

//         // console.log("starting nested loop")
//         // console.log("solutionStartValue: ", solutionStartValue)
//         nestedLoop:
//         for (let j = solutionStartValue; j < 10; j++) {
//           // console.log("j: ", j)

//           if (this.checkPlacement(puzzleString, rowLetter, columnNumber, j).valid) {
//             // console.log("j is valid ")

//             let puzzleStringCopy = puzzleString.split('')
//             puzzleStringCopy[i] = j
//             puzzleStringCopy = puzzleStringCopy.join('')


//             // console.log("recursively calling this.solve")
//             const solution = this.solve(puzzleStringCopy, i)

//             if (solution && !solution.includes('.')) {
//               return solution
//             } else {
//               // console.log("solution is undefined or contains empties. breaking nested loop.")
//               break nestedLoop
//             }
//           }
//         }

//         if (!retry) {
//           // console.log(`couldnt find a valid number for index ${i}.restarting loop at ${previousEmptyIndex}.`)
//           retry = true
//           i = previousEmptyIndex - 1
//           solutionStartValue = parseInt(puzzleString[previousEmptyIndex]) + 1
//         } else {
//           // console.log(`couldnt find a valid number for index ${i}.Breaking parent loop & returning undefined.`)
//           break parentLoop
//         }
//       }
//     }
//   } catch (error) {
//     console.log('error in solve', error)

//     throw error
//   }
// }


const str = '.7.89.....5....3.4.2..4..1.5689..472...6.....1.7.5.63873.1.2.8.6..47.1..2.9.387.6'

console.log(str.length)