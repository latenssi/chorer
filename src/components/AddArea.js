import React from "react";

import TextField from "@material-ui/core/TextField";

import FormDialog from "./FormDialog";

const defaultState = { name: "" };

export default function AddArea(props) {
  return (
    <FormDialog defaultState={defaultState} title="New Area" {...props}>
      {(formState, handleInputChange) => (
        <React.Fragment>
          <TextField
            label="Name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            autoFocus
          />
        </React.Fragment>
      )}
    </FormDialog>
  );
}
