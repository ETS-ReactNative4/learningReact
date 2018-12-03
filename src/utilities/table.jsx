import React from "react";
import _ from "lodash";

const Table = props => {
  const {
    tableClasses,
    headerList,
    bodyContent,
    bodyPropsName,
    sortingProps
  } = props;
  const sortedBodyContent = sortTable();
  return (
    <table className={tableClasses}>
      <thead>
        <tr>
          {headerList.map((header, index) => (
            <th key={"header-" + (index + 1)}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedBodyContent.map((content, index) => (
          <tr key={"row-" + (index + 1)}>
            {bodyPropsName.map((propName, indexProp) => (
              <td key={"row-" + (index + 1) + "-col-" + indexProp}>
                {content[propName]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );

  function sortTable() {
    if (sortingProps) {
      let sortingColumns = [];
      let sortingOrder = [];
      sortingProps.forEach(sortingProp => {
        sortingColumns.push(sortingProp.SortColumn);
        sortingOrder.push(sortingProp.SortOrder);
      });
      return _(bodyContent)
        .orderBy(sortingColumns, sortingOrder)
        .value();
    }
    return bodyContent;
  }
};

export default Table;
