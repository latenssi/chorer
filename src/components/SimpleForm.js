import React from "react";

import TextField from "@material-ui/core/TextField";

import FormDialog from "./FormDialog";

export default function SimpleForm(props) {
  return (
    <FormDialog {...props}>
      {(formState, handleInputChange) =>
        formState && (
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
        )
      }
    </FormDialog>
  );
}
