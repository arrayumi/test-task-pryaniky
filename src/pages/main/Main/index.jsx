import styles from "./index.module.scss";
import Table from "../../../wigets/Table";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadTableData } from "../../../app/store/slices/tableSlice";

export const Main = () => {
  const today = new Date();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTableData());
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Table />
      </main>
      <footer className={styles.footer}>
        {`© Anna Andreeva, ${today.getUTCFullYear()}`}
      </footer>
    </div>
  );
};
