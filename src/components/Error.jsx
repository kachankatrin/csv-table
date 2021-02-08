import React from "react";
import { Alert } from "react-bootstrap";
export default function Error(props) {
  return (
    <Alert variant='danger' className="my-5 mx-auto" style={{width: "60%", textAlign: "left"}}>
      {props.message}
    </Alert>
  );
}
