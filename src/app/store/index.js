import { configureStore } from "@reduxjs/toolkit";
import userDataReducer from "./slices/userSlice";
import tableDataReducer from "./slices/tableSlice";

export default configureStore({
  reducer: { userData: userDataReducer, tableData: tableDataReducer },
});

export { getUserData, getTableData } from "./selectors";
export * as selectors from "./selectors";
