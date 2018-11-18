import React from "react";
import ListGroupItem from "./listGroupItem";
import Prototypes from "prop-types";

const ListGroup = props => {
  const { onListClick, listItems, listItemSelected } = props;
  return (
    <ul className="list-group">
      {renderListGroupItem(onListClick, listItems, listItemSelected)}
    </ul>
  );

  function renderListGroupItem(onListClick, listItems, listItemSelected) {
    return listItems.map((item, index) => {
      let isSelected = false;
      if (index + 1 === listItemSelected) {
        isSelected = true;
      }
      return (
        <ListGroupItem
          onListClick={onListClick}
          key={item._id}
          id={item._id}
          textValue={item.name}
          isSelected={isSelected}
        />
      );
    });
  }
};

ListGroup.prototype = {
  onListClick: Prototypes.func.isRequired,
  listItems: Prototypes.array.isRequired,
  listItemSelected: Prototypes.number.isRequired
};

export default ListGroup;
