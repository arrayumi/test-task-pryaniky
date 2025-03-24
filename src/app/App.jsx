import { Routes, Route } from "react-router-dom";
import * as page from "../pages";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { AnonymousRoute } from "./routes/AnonymousRoute";

function App() {
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
