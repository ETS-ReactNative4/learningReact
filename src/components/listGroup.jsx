import React from "react";
import ListGroupItem from "./listGroupItem";
import Prototypes from "prop-types";

const ListGroup = props => {
  const { onListClick, listItems, listItemSelected, idProp, nameProp } = props;
  return <ul className="list-group">{renderListGroupItem()}</ul>;

  function renderListGroupItem() {
    return listItems.map((item, index) => {
      let isSelected = false;
      if (index + 1 === listItemSelected) {
        isSelected = true;
      }
      return (
        <ListGroupItem
          onListClick={onListClick}
          key={item[idProp]}
          id={item[idProp]}
          textValue={item[nameProp]}
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
