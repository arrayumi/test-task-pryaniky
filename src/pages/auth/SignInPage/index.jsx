import Form from "../../../widgets/Form";
import styles from "./index.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../app/store/selectors";
import { login } from "../../../app/store/slices/userSlice";

import * as ui from "../../../shared/ui";
import Alert from "@mui/material/Alert";

// work with form
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemas } from "../../../app/validation";

export const SignInPage = () => {
  const dispatch = useDispatch();
  const { errMessage } = useSelector(getUserData);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schemas.login),
    mode: "onChange",
  });

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  return (
    <main className={styles.page}>
      <Form title="Sign in" onSubmit={handleSubmit(handleLogin)}>
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
        <ui.Button type="submit" variant="contained" disabled={!isValid || isSubmitting}>
          Sign in
        </ui.Button>
        {errMessage && (
          <Alert variant="filled" severity="error">
            {errMessage}
          </Alert>
        )}
      </Form>
    </main>
  );
};
