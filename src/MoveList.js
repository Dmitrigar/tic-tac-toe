import React from "react";

class MoveList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reverse: false
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.reverse()}>{this.state.reverse ? "/\\" : "\\/" }</button>
        <ul className="move-list">{this.getMoves()}</ul>
      </div>
    );
  }

  reverse() {
    this.setState({ reverse: !this.state.reverse });
  }

  getMoves() {
    const items = this.props.history.map((step, move) =>
      this.mapToMoveItem(step, move)
    );
    return this.state.reverse ? items.reverse() : items;
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
