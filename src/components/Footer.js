import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles({
  root: {
    flex: "none",
  },
});

export default function Footer({
  onAddChoreClick,
  onAddAreaClick,
  onAddTaskClick,
}) {
  const classes = useStyles();

  return (
    <BottomNavigation showLabels className={classes.root}>
      <BottomNavigationAction
        label="Add Chore"
        icon={<AddIcon />}
        onClick={onAddChoreClick}
      />
      <BottomNavigationAction
        label="Add Area"
        icon={<AddIcon />}
        onClick={onAddAreaClick}
      />
      <BottomNavigationAction
        label="Add Task"
        icon={<AddIcon />}
        onClick={onAddTaskClick}
      />
    </BottomNavigation>
  );
}
