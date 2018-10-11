import Square from "./Square";
import React from "react";

class Board extends React.Component {
  render() {
    const width = 3;
    const height = 3;
    const rows = [];
    let currentRowIndex = 0;
    while (rows.length < Number(height))
      rows.push(this.renderRow(currentRowIndex++, width))

    return <div className="board">{rows}</div>;
  }

  renderRow(i, width) {
    const squares = [];
    let currentSquareKey = i * width;
    while (squares.length < Number(width))
      squares.push(this.renderSquare(currentSquareKey++));

    return <div className="board-row" key={i}>{squares}</div>;
  }

  renderSquare(i) {
    const win = this.props.win;
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        isWin={win && win.includes(i)}
      />
    );
  }
}

export default Board;
