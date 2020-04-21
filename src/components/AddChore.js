import React from "react";

import TextField from "@material-ui/core/TextField";

import FormDialog from "./FormDialog";

const defaultState = { name: "" };

export default function AddChore(props) {
  return (
    <FormDialog defaultState={defaultState} title="New Chore" {...props}>
      {(formState, handleInputChange) => (
        <React.Fragment>
          <TextField
            label="Name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            autoFocus
            required
          />
        </React.Fragment>
      )}
    </FormDialog>
  );
}
