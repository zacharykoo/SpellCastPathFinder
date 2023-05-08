let isTwoTimes = true;

function wordExistsInBoard(board, word, rows, cols, twoTimes) {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j] === word[0] && searchWord(board, word, 0, i, j, rows, cols, twoTimes)) {
        return true;
      }
    }
  }
  return false;
}
  
function searchWord(board, word, index, row, col, rows, cols, twoTimes) {
  if (row < 0 || row >= rows || col < 0 || col >= cols) {
    return false;
  }

  if (board[row][col] !== word[index]) {
    return false;
  }

  if (row === twoTimes[0] && col === twoTimes[1]) {
    isTwoTimes = true;
  }

  if (index === word.length - 1) {
    return true;
  }

  const char = board[row][col];
  board[row][col] = '@';

  const wordFound = searchWord(board, word, index + 1, row - 1, col, rows, cols, twoTimes) ||
        searchWord(board, word, index + 1, row + 1, col, rows, cols, twoTimes) ||
        searchWord(board, word, index + 1, row, col - 1, rows, cols, twoTimes) ||
        searchWord(board, word, index + 1, row, col + 1, rows, cols, twoTimes) ||
        searchWord(board, word, index + 1, row - 1, col + 1, rows, cols, twoTimes) ||
        searchWord(board, word, index + 1, row - 1, col - 1, rows, cols, twoTimes) ||
        searchWord(board, word, index + 1, row + 1, col - 1, rows, cols, twoTimes) ||
        searchWord(board, word, index + 1, row + 1, col + 1, rows, cols, twoTimes);

  board[row][col] = char;
  return wordFound;
}

const letterValues = {
  'A': 1, 'B': 4, 'C': 5, 'D': 3, 'E': 1,
  'F': 5, 'G': 3, 'H': 4, 'I': 1, 'J': 7,
  'K': 3, 'L': 3, 'M': 4, 'N': 2, 'O': 1,
  'P': 4, 'Q': 8, 'R': 2, 'S': 2, 'T': 2,
  'U': 4, 'V': 5, 'W': 5, 'X': 7, 'Y': 4,
  'Z': 8
};

function calculatePoints(word) {
  let points = 0;
  for (let i = 0; i < word.length; i++) {
    points += letterValues[word[i].toUpperCase()] || 0;
  }
  return points;
}

function findMatchingWords(board, dictionary, twoTimes) {
  const rows = board.length;
  const cols = board[0].length;
  let highestPoints = 0;
  let matchingWords = [];

  for (let i = 0; i < dictionary.length; i++) {
    const word = dictionary[i];
    let points = calculatePoints(word);
    isTwoTimes = false;

    const isWordInBoard = wordExistsInBoard(board, word, rows, cols, twoTimes);
    if (isWordInBoard) {
      if(isTwoTimes) {
        points *= 2;
        isTwoTimes = false;
      }
      if(points > highestPoints) {
        highestPoints = points;
        matchingWords = [word];
      }
      if (word.length >= 6) {
        points += 10;
      }
    } else if (points === highestPoints && isWordInBoard) {
      matchingWords.push(word);
    }
  }

  return matchingWords;
}

module.exports = { findMatchingWords };