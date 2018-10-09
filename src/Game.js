import Board from "./Board";
import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null) }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;
    const win = calculateWin(squares);
    const winner = getWinner(squares, win);
    const xIsNext = this.state.xIsNext;
    const status = getGameStatus(winner, xIsNext);
    const moves = history.map((step, i) => {
      const desc = i ? `Go to move #${i}` : "Go to game start";
      return (
        <li key={i}>
          <button onClick={() => this.jumpTo(i)}>{desc}</button>
        </li>
      );
    });
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            win={win}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWin(squares) || squares[i]) {
      return;
    }
    const xIsNext = this.state.xIsNext;
    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares }]),
      stepNumber: history.length,
      xIsNext: !xIsNext
    });
  }
}

function getGameStatus(winner, xIsNext) {
  return !winner ? getNextPlayerStatus(xIsNext) : getWinnerStatus(winner);
}

function getNextPlayerStatus(xIsNext) {
  return `Next player: ${xIsNext ? "X" : "O"}`;
}

function getWinnerStatus(winner) {
  return `The Winner is ${winner}`;
}

function getWinner(squares, win) {
  return !win ? null : squares[win[0]];
}

function calculateWin(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  return winningLines.find(line => {
    const [a, b, c] = line;
    const [tic, tac, toe] = [squares[a], squares[b], squares[c]];
    return tic && tac && toe && tic === tac && tac === toe;
  });
}

export default Game;
