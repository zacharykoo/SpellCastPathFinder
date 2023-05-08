let path = [];

const letterValues = {
  'A': 1, 'B': 4, 'C': 5, 'D': 3, 'E': 1,
  'F': 5, 'G': 3, 'H': 4, 'I': 1, 'J': 7,
  'K': 3, 'L': 3, 'M': 4, 'N': 2, 'O': 1,
  'P': 4, 'Q': 8, 'R': 2, 'S': 2, 'T': 2,
  'U': 4, 'V': 5, 'W': 5, 'X': 7, 'Y': 4,
  'Z': 8
};

function wordExistsInBoard(board, word, rows, cols, twoTimes, multiplierLetter) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === word[0] && searchWord(board, word, 0, i, j, rows, cols, twoTimes, multiplierLetter)) {
        return true;
      }
      path = [];
    }
  }
  return false;
}
  
  function searchWord(board, word, index, row, col, rows, cols, twoTimes, multiplierLetter) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) {
      return false;
    }
  
    if (board[row][col] !== word[index]) {
      return false;
    }
  
    if (index === word.length - 1) {
      path.push(row*5 + col);
      return true;
    }
  
    const char = board[row][col];
    board[row][col] = '@';
    path.push(row*5 + col);
  
    const wordFound = searchWord(board, word, index + 1, row - 1, col, rows, cols, twoTimes, multiplierLetter, path) ||
          searchWord(board, word, index + 1, row + 1, col, rows, cols, twoTimes, multiplierLetter, path) ||
          searchWord(board, word, index + 1, row, col - 1, rows, cols, twoTimes, multiplierLetter, path) ||
          searchWord(board, word, index + 1, row, col + 1, rows, cols, twoTimes, multiplierLetter, path) ||
          searchWord(board, word, index + 1, row - 1, col + 1, rows, cols, twoTimes, multiplierLetter, path) ||
          searchWord(board, word, index + 1, row - 1, col - 1, rows, cols, twoTimes, multiplierLetter, path) ||
          searchWord(board, word, index + 1, row + 1, col - 1, rows, cols, twoTimes, multiplierLetter, path) ||
          searchWord(board, word, index + 1, row + 1, col + 1, rows, cols, twoTimes, multiplierLetter, path);
  
    board[row][col] = char;

    if (!wordFound) {
      path.pop();
    }

    return wordFound;
  }

function calculatePoints(word) {
  let points = 0;
  for (let i = 0; i < word.length; i++) {
    points += letterValues[word[i].toUpperCase()] || 0;
  }
  return points;
}

function findMatchingWords(board, dictionary, twoTimes, multiplierLetter) {
  const rows = board.length;
  const cols = board[0].length;
  let highestPoints = 0;
  let matchingWords = [];

  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    let points = calculatePoints(word);
    path = [];

    const isWordInBoard = wordExistsInBoard(board, word, rows, cols);
    if (isWordInBoard) {
      if (path.includes(twoTimes)) {
        points *= 2;
      }
      if (path.includes(multiplierLetter[0])) {
        const row = Math.floor(multiplierLetter[0] / 5);
        const col = multiplierLetter[0] % 5;
        const getLetter = board[row][col].toUpperCase();
        points += letterValues[getLetter]*multiplierLetter[1];
      }
      if (word.length >= 6) {
        points += 10;
      }
      if(points > highestPoints) {
        highestPoints = points;
        matchingWords = [{ word, points }];
      } else if (points === highestPoints) {
        matchingWords.push({ word, points });
      }
    }
  }

  return matchingWords;
}

module.exports = { findMatchingWords };