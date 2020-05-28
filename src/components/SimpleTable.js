import React from "react";

import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";

import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

export default function ChoresTable({ items = [], onDelete, onEdit }) {
  const theme = useTheme();
  const notSmall = useMediaQuery(theme.breakpoints.up("sm"));

  const handleEdit = (item) => {
    onEdit(item);
  };

  const handleDel = (item) => {
    onDelete(item);
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item._id}>
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">
                <ButtonGroup
                  variant="text"
                  orientation={notSmall ? "horizontal" : "vertical"}
                >
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
