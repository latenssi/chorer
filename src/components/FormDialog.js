import React from "react";

import clsx from "clsx";

import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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

export default function FormDialog({
  open,
  onClose,
  onSubmit,
  defaultState,
  title,
  children,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formState, setFormState] = React.useState(defaultState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit)
      onSubmit(formState, (err) => {
        if (err) return;
        handleClear();
      });
  };

  const handleClear = () => {
    onClose();
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
    <Dialog fullScreen={fullScreen} open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <form
          className={clsx(classes.form, { [classes.wide]: !fullScreen })}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {children(formState, handleInputChange)}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
