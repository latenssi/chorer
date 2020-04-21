import React from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import AddIcon from "@material-ui/icons/Add";

export default function Footer({
  onAddChoreClick,
  onAddAreaClick,
  onAddScheduleClick,
}) {
  return (
    <BottomNavigation showLabels>
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
