import React from "react";
function MoveList(props) {
  return <ul className="move-list">{getMoves(props)}</ul>;
}


function getMoves(props) {
  return props.history.map((step, move) => mapToMoveItem(props, step, move));
}

function mapToMoveItem(props, step, move) {
  const desc = props.getMoveDescription(step, move);
  const className = move === props.selected ? "move--bold" : "move";
  return (
    <li key={move} className={className}>
      <button onClick={() => props.clickMove(move)}>{desc}</button>
    </li>
  );
}

export default MoveList;
