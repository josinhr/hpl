/*
👉 : moves the memory pointer to the next cell
👈 : moves the memory pointer to the previous cell
👆 : increment the memory cell at the current position
👇 : decreases the memory cell at the current position.
🤜 : if the memory cell at the current position is 0, jump just after the corresponding 🤛
🤛 : if the memory cell at the current position is not 0, jump just after the corresponding 🤜
👊 : Display the current character represented by the ASCII code defined by the current position.
*/
const MIN_CELL = 0
const MAX_CELL = 255

function moveToCloser (index, string) {
  let temp = 1
  for (let i = index + 1; i < string.length; i++) {
    if (string[i] === '🤜') temp++
    if (string[i] === '🤛') temp--
    if (temp === 0) return i
  }
}

function moveToOpener (index, string) {
  let temp = 1
  for (let i = index - 1; i >= 0; i--) {
    if (string[i] === '🤛') temp++
    if (string[i] === '🤜') temp--
    if (temp === 0) return i
  }
}

function clamp (number) {
  if (number > MAX_CELL) return MIN_CELL
  if (number < MIN_CELL) return MAX_CELL
  return number
}

function translate (string) {
  let index = 0
  const memory = [0]
  let pointer = 0
  let result = ''

  const arrayOfActions = Array.from(string)

  const actions = {
    '👉': () => {
      pointer++
      memory[pointer] ??= 0
    },
    '👈': () => {
      pointer--
      memory[pointer] ??= 0
    },
    '👆': () => {
      memory[pointer] = clamp(memory[pointer] + 1)
    },
    '👇': () => {
      memory[pointer] = clamp(memory[pointer] - 1)
    },
    '🤜': () => {
      if (memory[pointer] === 0) {
        index = moveToCloser(index, arrayOfActions)
      }
    },
    '🤛': () => {
      if (memory[pointer] !== 0) {
        index = moveToOpener(index, arrayOfActions)
      }
    },
    '👊': () => {
      result += String.fromCharCode(memory[pointer])
    }
  }

  while (index < arrayOfActions.length) {
    actions[arrayOfActions[index]]()
    index++
  }

  return result
}

module.exports = translate
