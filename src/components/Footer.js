import React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import Paper from "@material-ui/core/Paper";

import AddIcon from "@material-ui/icons/Add";

const Component = (props) => <Paper variant="outlined" square {...props} />;

export default function Footer({
  onAddChoreClick,
  onAddAreaClick,
  onAddScheduleClick,
}) {
  return (
    <BottomNavigation showLabels component={Component}>
      <BottomNavigationAction
        label="Chore"
        icon={<AddIcon />}
        onClick={onAddChoreClick}
      />
      <BottomNavigationAction
        label="Area"
        icon={<AddIcon />}
        onClick={onAddAreaClick}
      />
      <BottomNavigationAction
        label="Schedule"
        icon={<AddIcon />}
        onClick={onAddScheduleClick}
      />
    </BottomNavigation>
  );
}
