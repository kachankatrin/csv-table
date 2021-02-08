import React from "react";
import { Table } from "react-bootstrap";

export default function TheTable(props) {
  return (
      <Table striped bordered hover id="candidates-table">
        <thead>
          <tr className="thead-dark">{props.renderTableHeader}</tr>
        </thead>
        <tbody>{props.renderTableData}</tbody>
      </Table>
  );
}