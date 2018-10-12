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
      <div className="move-list">
        <button
          className="move-list__toggle"
          onClick={() => this.setState({ reverse: !this.state.reverse })}
        >
          {this.state.reverse ? "/\\" : "\\/"}
        </button>
        <ul>
          {this.state.reverse ? this.getMoves().reverse() : this.getMoves()}
        </ul>
      </div>
    );
  }

  getMoves() {
    return this.props.history.map((step, move) => {
      const desc = this.props.getMoveDescription(step, move);
      const className = move === this.props.selected ? "move--bold" : "move";
      return (
        <li key={move} className={className}>
          <button onClick={() => this.props.clickMove(move)}>{desc}</button>
        </li>
      );
    });
  }
}

export default MoveList;
