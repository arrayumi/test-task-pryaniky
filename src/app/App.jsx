import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as page from "../pages";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AnonymousRoute } from "./routes/AnonymousRoute";

import { getUserData } from "./store/selectors";

function App() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthorized } = useSelector(getUserData);

  useEffect(() => {

  }, []);

  return (
    <Routes>
      <Route path="/auth">
        <Route
          path="/auth/sign-in"
          element={<AnonymousRoute element={page.SignInPage} />}
        />
      </Route>
      <Route path="/" element={<ProtectedRoute element={page.Main} />}></Route>
    </Routes>
  );
}

export default App;
