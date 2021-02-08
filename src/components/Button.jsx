import React from "react";
import { Button } from "react-bootstrap";

export default function ImportButton(props) {
  return (
    <div className="inputs-container px-3">
      <div className="btn-container">
        <input
          type="file"
          name="file"
          id="custom-file-input"
          className="form-control-lg my-5"
          onChange={props.onChange}
        />
        <Button
          variant="dark"
          onClick={props.handleClick}
          disabled={props.disabled}
          size="lg"
          className="btn-import my-5"
        >
          Import users
        </Button>
      </div>
    </div>
  );
}
