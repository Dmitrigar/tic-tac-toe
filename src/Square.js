import React from "react";

function Square(props) {
  const modifier = props.win ? "--win" : "";
  return (
    <button className={`square${modifier}`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
