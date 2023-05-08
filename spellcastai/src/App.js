import React, { useState } from 'react';
import { findMatchingWords } from './components/logicHelper';
import Result from './components/Result';

const dictionary = require('an-array-of-english-words');

function App() {
  const [grid, setGrid] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [twoTimes, setTwoTimes] = useState([-1]);
  const [multiplierLetter, setMultiplierLetter] = useState([-1, 1]);
  const [submitClicked, setSubmitClicked] = useState(false);

  const handleChange = (event, row, col) => {
    const { value } = event.target;
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = value.toUpperCase();
      return newGrid;
    });
  };

  const lowercaseGrid = grid.map(row => row.map(char => char.toLowerCase()));

  const handleClick = () => {
    setSubmitClicked(true);
  };

  let ans = [];
  if (submitClicked) {
    ans = findMatchingWords(lowercaseGrid, dictionary, twoTimes, multiplierLetter);
  }

  return (
    <div>
      <h1>Spell Cast Solver</h1>
      <div>
        <h2>Enter the row and column of the 2x letter multiplier:</h2>
        <input
          type="number"
          value={twoTimes}
          onChange={event => setTwoTimes(parseInt(event.target.value))}
        />
      </div>
      <div>
        <h2>Enter the row and column of the letter multiplier with 2x or 3x:</h2>
        <input
          type="number"
          value={multiplierLetter[0]}
          onChange={event => setMultiplierLetter([parseInt(event.target.value), multiplierLetter[1]])}
        />
        <input
          type="number"
          value={multiplierLetter[1]}
          onChange={event => setMultiplierLetter([multiplierLetter[0], parseInt(event.target.value)])}
        />
      </div>
      <div>
        <h2>Enter the letters for the 5x5 grid:</h2>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                maxLength={1}
                value={cell}
                onChange={event => handleChange(event, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleClick}>Submit</button>
      {submitClicked && <Result ans={ans} />}
    </div>
  );
}

export default App;
