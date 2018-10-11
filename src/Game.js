import Board from "./Board";
import React from "react";

class Game extends React.Component {
  constructor(props) {
    super(props);
    const step = {
      squares: Array(9).fill(null),
      checkedSquare: null,
      win: null
    };
    const move = 0;
    this.state = {
      history: [step],
      step,
      move
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.step.squares}
            win={this.state.step.win}
            onClick={i => this.clickSquare(i)}
          />
        </div>
        <div className="game-info">
          <div className="status">{this.status()}</div>
          <ul className="move-list">{this.moves()}</ul>
        </div>
      </div>
    );
  }

  clickSquare(i) {
    const history = this.state.history.slice(0, this.state.move + 1);
    const squares = history[history.length - 1].squares.slice();
    if (this.state.win || squares[i]) {
      return;
    }

    squares[i] = this.getPlayer(this.state.move);
    const step = { squares, checkedSquare: i, win: calculateWin(squares) };
    this.setState({
      history: history.concat([step]),
      step,
      move: history.length
    });
  }

  status() {
    const step = this.state.step;
    return !step.win
      ? `Turn: ${this.getPlayer(this.state.move)}`
      : `The Winner is ${getWinner(step.squares, step.win)}`;
  }

  moves() {
    return this.state.history.map((step, i) => this.mapToMoveItem(step, i));
  }

  mapToMoveItem(step, move) {
    const desc = move
      ? this.getMoveDescription(step, move)
      : `Game start, turn: ${this.getPlayer(0)}`;
    const className = move === this.state.move ? "move--bold" : "move";
    return (
      <li key={move} className={className}>
        <button onClick={() => this.clickMove(move)}>{desc}</button>
      </li>
    );
  }

  getMoveDescription(step, move) {
    const c = this.getSquareCoordinates(step.checkedSquare);
    return `Move #${move}: (${c.x}, ${c.y}), turn: ${this.getPlayer(move)}`;
  }

  getSquareCoordinates(i) {
    const sizeX = 3;
    const sizeY = 3;
    return { x: 1 + (i % sizeX), y: 1 + Math.floor(i / sizeY) };
  }

  clickMove(move) {
    this.setState({
      step: this.state.history[move],
      move
    });
  }

  getPlayer(move) {
    return move % 2 === 0 ? "X" : "O";
  }
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
