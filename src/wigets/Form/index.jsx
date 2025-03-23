import styles from "./index.module.scss";
import { Typography, Container } from "@mui/material";

const Form = ({ title, children }) => {
  return (
    <Container maxWidth="xs">
      <form className={styles.form}>
        {title && <Typography typography="h4">{title}</Typography>}
        {children}
      </form>
    </Container>
  );
};

export default Form;
