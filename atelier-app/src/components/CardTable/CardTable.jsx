import React from 'react';

const CardTable = ({ data }) => {
  return (
    <table className="min-w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Family</th>
          <th>Affinity</th>
          <th>Energy</th>
          <th>HP</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CardTable;