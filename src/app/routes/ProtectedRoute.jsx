import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData } from "../store/selectors";

import { Loader } from "../../shared/ui/Loader";

export const ProtectedRoute = ({ element: Component, ...props }) => {
  const { isAuthorized, isPageLoading } = useSelector(getUserData);

  return !isPageLoading ? (
    isAuthorized ? (
      <Component {...props} />
    ) : (
      <Navigate to="/auth/sign-in" replace />
    )
  ) : (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Loader />
    </div>
  );
};
