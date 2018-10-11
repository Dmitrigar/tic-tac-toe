import React from "react";

class MoveList extends React.Component {
  render() {
    return (
      <div>
        <button onClick={() => this.reverse()}>Reverse</button>
        <ul className="move-list">{this.getMoves()}</ul>
      </div>
    );
  }

  reverse() {
    alert("bam");
    this.forceUpdate();
  }

  getMoves() {
    return this.props.history.map((step, move) =>
      this.mapToMoveItem(step, move)
    );
  }

  mapToMoveItem(step, move) {
    const desc = this.props.getMoveDescription(step, move);
    const className = move === this.props.selected ? "move--bold" : "move";
    return (
      <li key={move} className={className}>
        <button onClick={() => this.props.clickMove(move)}>{desc}</button>
      </li>
    );
  }
}

export default MoveList;
