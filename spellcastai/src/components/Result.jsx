import React from 'react';

function Result({ ans }) {
  const sortedAns = ans.sort((a, b) => b.points - a.points);
  
  return (
    <div>
      <h2>Results:</h2>
      {sortedAns.slice(0, 3).map((result, index) => (
        <p key={index}>
          {result.word} - {result.points} points
        </p>
      ))}
    </div>
  );
}

export default Result;