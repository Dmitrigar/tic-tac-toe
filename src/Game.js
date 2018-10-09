import Board from "./Board";
import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{ squares: Array(9).fill(null), checked: null }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  render() {
    const moves = this.history().map((step, i) => this.mapStep(step, i));
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.current().squares}
            win={this.win()}
            onClick={i => this.makeMove(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{this.status()}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  status() {
    return !this.winner()
      ? getNextPlayerStatus(this.xIsNext())
      : getWinnerStatus(this.winner());
  }

  xIsNext() {
    return this.state.xIsNext;
  }

  winner() {
    return getWinner(this.current().squares, this.win());
  }

  win() {
    return calculateWin(this.current().squares);
  }

  current() {
    return this.history()[this.state.stepNumber];
  }

  history() {
    return this.state.history;
  }

  mapStep(step, i) {
    const desc = this.getMoveDescription(i);
    return (
      <li key={i}>
        <button onClick={() => this.jumpTo(i)}>{desc}</button>
      </li>
    );
  }

  getMoveDescription(i) {
    return i
      ? `Go to move #${i} (${this.history()[i].checked})`
      : "Go to game start";
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  makeMove(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWin(squares) || squares[i]) {
      return;
    }
    const xIsNext = this.state.xIsNext;
    squares[i] = xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([{ squares, checked: i }]),
      stepNumber: history.length,
      xIsNext: !xIsNext
    });
  }
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
