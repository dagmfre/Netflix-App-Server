import { Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import SignUp from "./signUp";
import Home from "./Home";
import Login from "./Login";
import NetflixMainPage from "./NetflixAccount";
import AuthUsersAcoount from "./AuthUsersAcoount";

function App() {
  return (
    <div>
      <StyledEngineProvider injectFirst>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/netflix-account" element={<NetflixMainPage />}></Route>
          <Route path="/auth/google/netflix-account" element={<AuthUsersAcoount />}></Route>
          <Route path="/auth/facebook/netflix-account" element={<AuthUsersAcoount />}></Route>
        </Routes>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
