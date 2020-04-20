import React from "react";

import clsx from "clsx";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControlLabel from "@material-ui/core/FormControlLabel";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";

import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  wide: {
    width: "24rem",
  },
}));

const defaultState = { areaSpecific: false, areaId: "", name: "" };

export default function AddChore({ open, closeDialog, onSubmit }) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formState, setFormState] = React.useState(defaultState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) onSubmit(formState, handleClear);
  };

  const handleClear = () => {
    closeDialog();
    setFormState(defaultState);
  };

  const handleInputChange = (event) => {
    const { name, value, type } = event.target;
    setFormState({
      ...formState,
      [name]: type !== "checkbox" ? value : !formState[name],
    });
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="add-chore-form"
      onClose={closeDialog}
    >
      <DialogTitle id="add-chore-form">{"New Chore"}</DialogTitle>
      <DialogContent>
        <form
          className={clsx(classes.form, { [classes.wide]: !fullScreen })}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <FormControlLabel
            label="Area specific"
            control={
              <Switch
                checked={formState.areaSpecific}
                onChange={handleInputChange}
                name="areaSpecific"
              />
            }
          />
          <TextField
            label="Area"
            name="areaId"
            value={formState.areaId}
            select
            onChange={handleInputChange}
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
