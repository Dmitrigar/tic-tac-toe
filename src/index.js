import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button
      className={`square${props.win ? " --win" : ""}`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  renderSquare(i, win) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
        win={this.winContainsSquare(i, win)}
      />
    );
  }

  winContainsSquare(i, win) {
    return win && win.includes(i);
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = this.getNextPlayerMark();
    this.setState({
      squares,
      xIsNext: !this.state.xIsNext
    });
  }

  render() {
    const win = calculateWin(this.state.squares);
    const winner = getWinner(this.state.squares, win);
    const status = !winner
      ? `Next player: ${this.getNextPlayerMark()}`
      : `The Winner is ${winner}`;
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0, win)}
          {this.renderSquare(1, win)}
          {this.renderSquare(2, win)}
        </div>
        <div className="board-row">
          {this.renderSquare(3, win)}
          {this.renderSquare(4, win)}
          {this.renderSquare(5, win)}
        </div>
        <div className="board-row">
          {this.renderSquare(6, win)}
          {this.renderSquare(7, win)}
          {this.renderSquare(8, win)}
        </div>
      </div>
    );
  }

  getNextPlayerMark() {
    return this.state.xIsNext ? "X" : "O";
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const win = calculateWin(squares);
  return getWinner(squares, win);
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

//======================================

ReactDOM.render(<Game />, document.getElementById("root"));
