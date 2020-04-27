import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function Sidebar({ open = true, toggle }) {
  const classes = useStyles();

  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggle(false)}
      onKeyDown={toggle(false)}
    >
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"Chores"} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"Areas"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <SwipeableDrawer
      disableDiscovery={iOS}
      open={open}
      onClose={toggle(false)}
      onOpen={toggle(true)}
    >
      {list()}
    </SwipeableDrawer>
  );
}
