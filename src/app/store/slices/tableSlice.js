import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../../shared/api/api";

const initialState = {
  tableData: [],
  isPending: false,
};

export const loadTableData = createAsyncThunk(
  "table/loadData",
  async function (data, { rejectWithValue, dispatch }) {
    try {
      let res = await api.getTableData();
      res = res.data.data;
      res = res.map((i) => {
        return {
          id: i.id,
          companySigDate: i.companySigDate,
          companySignatureName: i.companySignatureName,
          documentName: i.documentName,
          documentStatus: i.documentStatus,
          documentType: i.documentType,
          employeeNumber: i.employeeNumber,
          employeeSigDate: i.employeeSigDate,
          employeeSignatureName: i.employeeSignatureName,
        };
      });
      console.log(res);
      dispatch(setTableData(res));
    } catch (err) {
      const errorData = {
        message: err.response.data.detail,
        code: err.code,
      };
      return rejectWithValue(errorData);
    }
  }
);

export const addTableRow = createAsyncThunk(
  "table/addRow",
  async function (data, { rejectWithValue }) {
    let { companySigDate, employeeSigDate } = data;
    companySigDate = new Date(companySigDate);
    employeeSigDate = new Date(employeeSigDate);
    const row = {
      companySigDate: companySigDate.toISOString(),
      companySignatureName: data.companySignatureName,
      documentName: data.documentName,
      documentStatus: data.documentStatus,
      documentType: data.documentType,
      employeeNumber: data.employeeNumber,
      employeeSigDate: employeeSigDate.toISOString(),
      employeeSignatureName: data.employeeSignatureName,
    };
    try {
      const res = await api.addTableRow(row);
      console.log(res);
      return res.data.data;
    } catch (err) {
      const errorData = {
        message: err.response.data.detail,
        code: err.code,
      };
      return rejectWithValue(errorData);
    }
  }
);

export const deleteTableRow = createAsyncThunk(
  "table/deleteRow",
  async function (id, { rejectWithValue }) {
    try {
      const res = await api.deleteTableRow(id);
      console.log(res);
      return id;
    } catch (err) {
      const errorData = {
        message: err.response.data.detail,
        code: err.code,
      };
      return rejectWithValue(errorData);
    }
  }
);

export const editTableRow = createAsyncThunk(
  "table/editRow",
  async function (data, { rejectWithValue }) {
    try {
      const res = await api.editTableRow(data.row);
      console.log(res);
      return data;
    } catch (err) {
      const errorData = {
        message: err.response.data.detail,
        code: err.code,
      };
      return rejectWithValue(errorData);
    }
  }
);

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    setTableData(state, action) {
      state.tableData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTableData.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(loadTableData.fulfilled, (state) => {
      state.isPending = false;
    });
    builder.addCase(loadTableData.rejected, (state, action) => {
      state.isPending = false;
      state.errMessage = action.payload?.message || "Login failed";
    });

    builder.addCase(addTableRow.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(addTableRow.fulfilled, (state, action) => {
      state.isPending = false;

      let newArr = state.tableData;
      newArr.push({
        id: action.payload.id,
        companySigDate: action.payload.companySigDate,
        companySignatureName: action.payload.companySignatureName,
        documentName: action.payload.documentName,
        documentStatus: action.payload.documentStatus,
        documentType: action.payload.documentType,
        employeeNumber: action.payload.employeeNumber,
        employeeSigDate: action.payload.employeeSigDate,
        employeeSignatureName: action.payload.employeeSignatureName,
      });
      state.tableData = newArr;
    });
    builder.addCase(addTableRow.rejected, (state, action) => {
      state.isPending = false;
      state.errMessage = action.payload?.message || "Login failed";
    });

    builder.addCase(deleteTableRow.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(deleteTableRow.fulfilled, (state, action) => {
      state.isPending = false;
      const dataToUpdate = state.tableData;
      const updatedData = dataToUpdate.filter((i) => i.id !== action.payload);
      state.tableData = updatedData;
    });
    builder.addCase(deleteTableRow.rejected, (state, action) => {
      state.isPending = false;
      state.errMessage = action.payload?.message || "Login failed";
    });

    builder.addCase(editTableRow.pending, (state) => {
      state.isPending = true;
    });
    builder.addCase(editTableRow.fulfilled, (state, action) => {
      state.isPending = false;
      const updatedData = state.tableData;
      updatedData[action.payload?.index] = action.payload?.row;
      state.tableData = updatedData;
    });
    builder.addCase(editTableRow.rejected, (state, action) => {
      state.isPending = false;
      state.errMessage = action.payload?.message || "Login failed";
    });
  },
});

export const { setTableData } = tableSlice.actions;

export default tableSlice.reducer;
