import React from "react";
import { Alert } from "react-bootstrap";

export default function ImportAlert(props) {
  return (
    <Alert
      variant="danger"
      onClose={props.onClose}
      dismissible
      className="my-5 mx-auto"
      style={{ width: "60%", textAlign: "left" }}
    >
      <Alert.Heading>You got an error!</Alert.Heading>
      <p>You didn`t select any file.</p>
      <p>Please, select a file before import users.</p>
    </Alert>
  );
}
