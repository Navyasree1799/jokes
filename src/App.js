/*Navyasree Putluri */
import './App.css';
import React, { useState } from 'react';

import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value === 'X' && <img src="path/to/x-image.png" alt="X" />}
      {props.value === 'O' && <img src="path/to/o-image.png" alt="O" />}
    </button>
  );
}

function Board(props) {
  function renderSquare(i) {
    return (
      <Square
        value={props.squares[i]}
        onClick={() => props.onClick(i)}
      />
    );
  }

  let boardSize = props.boardSize;
  let rows = [];
  for (let i = 0; i < boardSize; i++) {
    let row = [];
    for (let j = 0; j < boardSize; j++) {
      row.push(renderSquare(i * boardSize + j));
    }
    rows.push(<div className="board-row">{row}</div>);
  }

  return <div>{rows}</div>;
}



function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [boardSize, setBoardSize] = useState(3);

  function handleClick(i) {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    setHistory(newHistory.concat([{ squares }]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function calculateWinner(squares) {
    const lines = [    // Rows    [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
      [16, 17, 18, 19],
      // Columns
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15],
      [16, 20, 24, 28],
      [17, 21, 25, 29],
      [18, 22, 26, 30],
      [19, 23, 27, 31],
      // Diagonals
      [0, 5, 10, 15],
      [3, 6, 9, 12],
      [16, 21, 26, 31],
      [19, 22, 25, 28],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  function handleBoardSizeChange(e) {
    const newBoardSize = parseInt(e.target.value);
    setBoardSize(newBoardSize);
    setHistory([{ squares: Array(newBoardSize ** 2).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  }

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <div className="steps" key={move} >
        {move + 1}. <button onClick={() => jumpTo(move)}>{desc}</button>
      </div>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} boardSize={boardSize} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <select value={boardSize} onChange={handleBoardSizeChange}>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;