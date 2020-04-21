import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Paper from "@material-ui/core/Paper";

import { enrichScheduleItem } from "../utils/schedule";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ScheduleTable({
  schedules = [],
  chores = [],
  areas = [],
  onDelete,
}) {
  const classes = useStyles();

  const _enrichScheduleItem = enrichScheduleItem.bind(null, chores, areas);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell align="right">Next</TableCell>
            <TableCell align="right">Last</TableCell>
            <TableCell align="right">Period</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {schedules.map(_enrichScheduleItem).map((item) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {item.label}
              </TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{}</TableCell>
              <TableCell align="right">{item.period}</TableCell>
              <TableCell align="right">
                <button onClick={(e) => onDelete(item)}>del</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
