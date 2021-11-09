import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Table as TableBase } from "react-bootstrap";
import PropTypes from "prop-types";
const Table = ({
  data,
  headerCols,
  renderRow,
  renderEmpty,
  keyExtractor,
  dataModifier,
  selectable = true,
  ...props
}) => {
  const [selectedCount, setSelectedCount] = useState(0);

  function selectAllItems(selected) {
    const newItems = data.map((item) => ({ ...item, selected: selected }));
    dataModifier(newItems);
    setSelectedCount(selected ? data.length : 0);
  }

  function selectItem(id, selected) {
    const newItems = data.map((lead) =>
      lead.id === id ? { ...lead, selected } : lead
    );

    setSelectedCount(selected ? selectedCount + 1 : selectedCount - 1);
    dataModifier(newItems);
  }
  return (
    <TableBase responsive hover>
      <thead className="bg-primary">
        <tr>
          {selectable && (
            <th>
              <Form.Check
                type="checkbox"
                disabled={data.length === 0}
                checked={data.length !== 0 && selectedCount === data.length}
                onChange={(event) => {
                  selectAllItems(event.target.checked);
                }}
              />
            </th>
          )}
          {headerCols.map((item, idx) => (
            <th key={idx}>{item}</th>
          ))}
        </tr>
      </thead>
      {data.length > 0 ? (
        <tbody>
          {data.map((item) => (
            <tr
              key={keyExtractor(item)}
              className={item.selected ? "bg-lightgray" : ""}
              onClick={() => {
                props.onRowClick && props.onRowClick(item);
              }}
            >
              {selectable && (
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={item.selected || false}
                    onChange={(event) => {
                      selectItem(keyExtractor(item), event.target.checked);
                    }}
                  />
                </td>
              )}
              {renderRow(item).map((cell, idx) => (
                <td key={idx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          <tr>
            <td colspan="100%">{renderEmpty()}</td>
          </tr>
        </tbody>
      )}
    </TableBase>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  headerCols: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
  renderEmpty: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  dataModifier: PropTypes.func,
  selectable: PropTypes.bool,
  onRowClick: PropTypes.func,
};

export default Table;
