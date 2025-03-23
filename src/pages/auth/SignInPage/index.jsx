import Form from "../../../wigets/Form";
import styles from "./index.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../app/store/selectors";

import * as ui from "../../../shared/ui";
import Alert from "@mui/material/Alert";

// work with form
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "../../../app/validation";

export const SignInPage = () => {
  const { errMessage } = useSelector(getUserData);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schemas.login),
    mode: "onChange",
  });

  return (
    <div className={styles.page}>
      <Form title="Sign in">
        <ui.Input
          label="username"
          {...register("username")}
          error={errors.username}
          helperText={errors.username?.message}
        />
        <ui.Input
          label="password"
          {...register("password")}
          error={errors.password}
          helperText={errors.password?.message}
        />
        <ui.Button variant="contained" disabled={!isValid || isSubmitting}>
          Sign in
        </ui.Button>
        {errMessage && (
          <Alert variant="filled" severity="error">
            {errMessage}
          </Alert>
        )}
      </Form>
    </div>
  );
};
