import React from "react";

import enGB from "date-fns/locale/en-GB";
import { formatRelative } from "date-fns";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { green, yellow, red } from "@material-ui/core/colors";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/CheckCircleOutline";

import { enrichScheduleItem } from "../utils/schedule";

const formatRelativeLocale = {
  lastWeek: "'Last' eeee",
  yesterday: "'Yesterday'",
  today: "'Today'",
  tomorrow: "'Tomorrow'",
  nextWeek: "'Next' eeee",
  other: "dd.MM.yyyy",
};

const locale = {
  ...enGB,
  formatRelative: (token) => formatRelativeLocale[token],
};

const useStyles = makeStyles({
  overdue: { color: red[400] },
  dueToday: { color: yellow[800] },
  dueTomorrow: { color: green[400] },
});

const orderByKey = (key) => (a, b) => {
  return a[key] - b[key];
};

export default function ScheduleTable({
  schedules = [],
  chores = [],
  areas = [],
  onDelete,
  onEdit,
  onEvent,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const notSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const _enrichScheduleItem = enrichScheduleItem.bind(null, chores, areas);

  const handleRec = (item) => {
    onEvent(item, { name: "done", time: Date.now() });
  };

  const handleEdit = (item) => {
    onEdit(item);
  };

  const handleDel = (item) => {
    onDelete(item);
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">{notSmall && "Next"}</TableCell>
            {notSmall && <TableCell align="right">Last</TableCell>}
            {notSmall && <TableCell align="right">Period (days)</TableCell>}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules
            .map(_enrichScheduleItem)
            .sort(orderByKey("next"))
            .map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  {item.label}
                </TableCell>
                <TableCell align="right" className={classes[item.status]}>
                  {item.next
                    ? formatRelative(item.next, Date.now(), { locale })
                    : null}
                </TableCell>
                {notSmall && (
                  <TableCell align="right">
                    {item.last
                      ? formatRelative(item.last, Date.now(), { locale })
                      : null}
                  </TableCell>
                )}
                {notSmall && <TableCell align="right">{item.period}</TableCell>}
                <TableCell align="right">
                  <ButtonGroup
                    variant="text"
                    orientation={notSmall ? "horizontal" : "vertical"}
                  >
                    <Button onClick={() => handleRec(item)} color="primary">
                      <CheckIcon />
                    </Button>
                    <Button onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </Button>
                    <Button onClick={() => handleDel(item)} color="secondary">
                      <DeleteIcon />
                    </Button>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
