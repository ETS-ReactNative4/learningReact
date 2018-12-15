import React from "react";
import PropTypes from "prop-types";
import ListGroupItem from "./listGroupItem";

const ListGroup = ({
  onListClick,
  listItems,
  idProp,
  nameProp,
  activeProp
}) => {
  return <ul className="list-group">{renderListGroupItem()}</ul>;

  function renderListGroupItem() {
    return listItems.map(item => {
      return (
        <ListGroupItem
          onListClick={onListClick}
          key={item[idProp]}
          id={item[idProp]}
          textValue={item[nameProp]}
          isSelected={item[activeProp]}
        />
      );
    });
  }
};

ListGroup.propTypes = {
  onListClick: PropTypes.func.isRequired,
  listItems: PropTypes.array.isRequired,
  idProp: PropTypes.string.isRequired,
  nameProp: PropTypes.string.isRequired,
  activeProp: PropTypes.string.isRequired
};

export default ListGroup;
