import { useState } from "react";
import {
  Table as T,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Paper,
  Typography,
  IconButton,
  Box,
  CircularProgress,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import { TABLE_ROW_DATA, DEFAULT_FIELDS } from "../../app/constants";

import { useSelector, useDispatch } from "react-redux";
import { getTableData } from "../../app/store";
import {
  addTableRow,
  deleteTableRow,
  editTableRow,
} from "../../app/store/slices/tableSlice";

const formatDate = (date) => {
  date = date.split("T");
  return date[0];
};

const isButtonDisabled = (row) => {
  return Object.values(row).filter((i) => i.length === 0).length > 0;
};

export default function Table() {
  const { tableData, isPending } = useSelector(getTableData);
  const dispatch = useDispatch();

  const [editIndex, setEditIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [newRow, setNewRow] = useState(DEFAULT_FIELDS);

  const displayCellData = (cell) => {
    return cell[0].endsWith("Date") ? formatDate(cell[1]) : cell[1];
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedRow(tableData[index]);
  };

  const handleSaveClick = (index) => {
    dispatch(editTableRow({index: index, row: editedRow}));
    setEditIndex(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow({ ...editedRow, [name]: value });
  };

  const handleNewRowChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleAddRow = () => {
    dispatch(addTableRow(newRow));
    setNewRow(DEFAULT_FIELDS);
  };

  const handleDeleteRow = (id) => {
    dispatch(deleteTableRow(id));
  };

  return (
    <Paper sx={{ padding: "30px" }}>
      <Typography variant="h4" gutterBottom style={{ padding: "16px" }}>
        Table for pryaniky.com
      </Typography>
      <TableContainer sx={{ position: "relative" }}>
        {isPending && (
          <Box
            sx={{
              position: "absolute",
              top: "0",
              left: "0",
              bottom: "0",
              width: "100%",
              zIndex: "5",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <T stickyHeader>
          <TableHead>
            <TableRow>
              {TABLE_ROW_DATA.map((cell, index) => (
                <TableCell key={index}>{cell.title}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.length > 0 ? (
              tableData.map((row, rowIndex) => {
                const cells = Object.entries(row).slice(1);
                return (
                  <TableRow key={rowIndex}>
                    {cells.map((cell, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        sx={{ fontSize: "14px", maxWidth: "50px" }}
                      >
                        {editIndex === rowIndex ? (
                          <TextField
                            type={cell[0].endsWith("Date") ? "date" : "text"}
                            variant="standard"
                            sx={{
                              "& .MuiInputBase-input": {
                                fontSize: "14px",
                              },
                            }}
                            name={cell[0]}
                            value={
                              cell[0].endsWith("Date")
                                ? formatDate(editedRow[cell[0]])
                                : editedRow[cell[0]]
                            }
                            onChange={handleChange}
                          />
                        ) : (
                          displayCellData(cell)
                        )}
                      </TableCell>
                    ))}

                    <TableCell style={{ display: "flex", gap: "5px" }}>
                      {editIndex === rowIndex ? (
                        <IconButton
                          aria-label="save"
                          onClick={() => handleSaveClick(rowIndex)}
                          disabled={isButtonDisabled(editedRow)}
                        >
                          <CheckIcon />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEditClick(rowIndex)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow sx={{ width: "100%", textAlign: "center" }}>
                <TableCell
                  colSpan={9}
                  style={{ textAlign: "center", backgroundColor: "#f0f0f0" }}
                >
                  <div> No data yet.</div>
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              {TABLE_ROW_DATA.map((cell, index) => {
                return (
                  <TableCell
                    key={index}
                    sx={{ fontSize: "14px", maxWidth: "50px" }}
                  >
                    <TextField
                      type={cell.type}
                      variant="standard"
                      name={cell.name}
                      value={newRow[cell.name] ?? ""}
                      onChange={handleNewRowChange}
                      sx={{
                        "& .MuiInputBase-input": {
                          fontSize: "14px",
                        },
                      }}
                    />
                  </TableCell>
                );
              })}
              <TableCell sx={{ fontSize: "14px", maxWidth: "50px" }}>
                <Button
                  variant="contained"
                  onClick={handleAddRow}
                  disabled={isButtonDisabled(newRow)}
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </T>
      </TableContainer>
    </Paper>
  );
}
