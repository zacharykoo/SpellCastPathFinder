import React from 'react';

function Result({ ans }) {
  if (ans.length === 0) {
    return <div>-1</div>;
  } else {
    return (
      <div>
        <ul>
          {ans.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Result;