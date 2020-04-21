import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";

import FormDialog from "./FormDialog";

const defaultState = { choreId: "", areaId: "", name: "", period: "" };

export default function AddSchedule({ chores = [], areas = [], ...rest }) {
  return (
    <FormDialog defaultState={defaultState} title="New Schedule" {...rest}>
      {(formState, handleInputChange) => (
        <React.Fragment>
          <TextField
            label="Chore"
            name="choreId"
            value={formState.choreId}
            onChange={handleInputChange}
            select
            disabled={!chores.length}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {chores.map((c) => (
              <MenuItem key={c._id} value={c._id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Area"
            name="areaId"
            value={formState.areaId}
            onChange={handleInputChange}
            select
            disabled={!areas.length}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {areas.map((a) => (
              <MenuItem key={a._id} value={a._id}>
                {a.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Name"
            name="name"
            value={formState.name}
            onChange={handleInputChange}
            autoFocus
            required={!formState.choreId || !formState.areaId}
            disabled={!!formState.choreId && !!formState.areaId}
          />

          <TextField
            label="Period (days)"
            name="period"
            value={formState.period}
            onChange={handleInputChange}
            type="number"
            required
          />
        </React.Fragment>
      )}
    </FormDialog>
  );
}
