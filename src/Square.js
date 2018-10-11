import React from "react";

function Square(props) {
  const modifier = props.isWin ? "--win" : "";
  return (
    <button className={`square${modifier}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
