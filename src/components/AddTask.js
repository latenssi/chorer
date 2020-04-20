import React from "react";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

import FormDialog from "./FormDialog";

const defaultState = { areaSpecific: false, areaId: "", name: "" };

export default function AddTask(props) {
  return (
    <FormDialog defaultState={defaultState} title="New Task" {...props}>
      {(formState, handleInputChange) => (
        <React.Fragment>
          <FormControlLabel
            label="Area specific"
            control={
              <Switch
                name="areaSpecific"
                checked={formState.areaSpecific}
                onChange={handleInputChange}
              />
            }
          />
          <TextField
            label="Area"
            name="areaId"
            value={formState.areaId}
            onChange={handleInputChange}
            select
            disabled={!formState.areaSpecific}
          >
            <MenuItem value={1}>Room 1</MenuItem>
            <MenuItem value={2}>Room 2</MenuItem>
            <MenuItem value={3}>Room 3</MenuItem>
          </TextField>

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
