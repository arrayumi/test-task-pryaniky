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
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

import { TABLE_ROW_DATA, DEFAULT_FIELDS } from "../../app/constants";

const formatDate = (date) => {
  date = date.split("T");
  console.log(date[0]);
  return date[0];
};

const isButtonDisabled = (row) => {
  return Object.values(row).filter((i) => i.length === 0).length > 0;
};

export default function Table() {
  const [data, setData] = useState([
    {
      companySigDate: "2022-12-23T11:19:27.017Z",
      companySignatureName: "test",
      documentName: "test",
      documentStatus: "test",
      documentType: "test",
      employeeNumber: "test",
      employeeSigDate: "2022-12-23T11:19:27.017Z",
      employeeSignatureName: "test",
    },
  ]);

  const [editIndex, setEditIndex] = useState(-1);
  const [editedRow, setEditedRow] = useState({});
  const [newRow, setNewRow] = useState(DEFAULT_FIELDS);

  const displayCellData = (cell) => {
    return cell[0].endsWith("Date") ? formatDate(cell[1]) : cell[1];
  };

  const handleEditClick = (index) => {
    setEditIndex(index);
    setEditedRow(data[index]);
  };

  const handleSaveClick = (index) => {
    const updatedData = [...data];
    updatedData[index] = editedRow;
    setData(updatedData);
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
    let { companySigDate, employeeSigDate } = newRow;
    companySigDate = new Date(companySigDate);
    employeeSigDate = new Date(employeeSigDate);

    setData([
      ...data,
      {
        companySigDate: companySigDate.toISOString(),
        companySignatureName: newRow.companySignatureName,
        documentName: newRow.documentName,
        documentStatus: newRow.documentStatus,
        documentType: newRow.documentType,
        employeeNumber: newRow.employeeNumber,
        employeeSigDate: employeeSigDate.toISOString(),
        employeeSignatureName: newRow.employeeSignatureName,
      },
    ]);
    setNewRow(DEFAULT_FIELDS);
  };

  const handleDeleteClick = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <Paper>
      <Typography variant="h4" gutterBottom style={{ padding: "16px" }}>
        Editable Table
      </Typography>
      <TableContainer>
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
            {data.map((row, rowIndex) => {
              const cells = Object.entries(row);
              return (
                <TableRow key={rowIndex}>
                  {cells.map((cell, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      sx={{ fontSize: "14px", maxWidth: "50px" }}
                    >
                      {console.log(cell[0], editedRow[cell[0]])}
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
                      onClick={() => handleDeleteClick(rowIndex)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
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
