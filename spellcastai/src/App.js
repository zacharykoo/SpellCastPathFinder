import React, { useState } from 'react';
import { findMatchingWords } from './components/logicHelper';
import Result from './components/Result';

const dictionary = require('an-array-of-english-words');
// const dictionary = ['zoo', 'que', 'boo']

function App() {
  const [grid, setGrid] = useState([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ]);

  const [twoTimes, setTwoTimes] = useState([-1, -1]);

  const handleChange = (event, row, col) => {
    const { value } = event.target;
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];
      newGrid[row][col] = value.toUpperCase();
      return newGrid;
    });
  };

  const lowercaseGrid = grid.map(row => row.map(char => char.toLowerCase()));

  const ans = findMatchingWords(lowercaseGrid, dictionary, twoTimes);

  return (
    <div>
      <h1>Spell Cast Solver</h1>
      <div>
        <h2>Enter the row and column of the 2x letter multiplier:</h2>
        <input
        type="number"
        value={twoTimes[0]}
        onChange={event => setTwoTimes([parseInt(event.target.value), twoTimes[1]])}
        />
        <input
          type="number"
          value={twoTimes[1]}
          onChange={event => setTwoTimes([twoTimes[0], parseInt(event.target.value)])}
        />
      </div>
      <div>
        <h2>Enter the row and column of the double letter:</h2>
        <input
        type="number"
        value={twoTimes[0]}
        onChange={event => setTwoTimes([parseInt(event.target.value), twoTimes[1]])}
        />
        <input
          type="number"
          value={twoTimes[1]}
          onChange={event => setTwoTimes([twoTimes[0], parseInt(event.target.value)])}
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
      <Result ans={ans} />
    </div>
  );
}

export default App;
