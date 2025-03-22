import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../store/selectors";

export const AnonymousRoute = ({ element: Component, ...props }) => {
  const { isAuthorized } = useSelector(getUserData);
  return !isAuthorized ? (
    <Component {...props} />
  ) : (
    <Navigate to="/" replace />
  );
};
