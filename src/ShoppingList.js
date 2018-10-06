import React from "react";

class ShoppingList extends React.Component {
  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Milk</li>
          <li>Eggs</li>
          <li>Bread</li>
          <li>Watermelon</li>
          <li>Oranges</li>
          <li>Cabage</li>
        </ul>
      </div>
    );
  }
}

export default ShoppingList;
