import React from "react";
import Prototypes from "prop-types";

const ListGroupItem = props => {
  const { isSelected, textValue, onListClick, id } = props;
  return (
    <li
      className={renderClassName(isSelected)}
      onClick={() => onListClick(id)}
      style={{ cursor: "pointer" }}
    >
      {textValue}
    </li>
  );

  function renderClassName(isSelected) {
    const defaultClass = "list-group-item myListGroupItem";
    return isSelected
      ? defaultClass + " active"
      : defaultClass + " myBackColor";
  }
};

ListGroupItem.prototype = {
  isSelected: Prototypes.bool.isRequired,
  textValue: Prototypes.string.isRequired,
  onListClick: Prototypes.func.isRequired
};

export default ListGroupItem;
