import { MyProvider } from "../context/MyContext";
import { Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import SignUp from "./signUp";
import Home from "./Home";

function App() {
  return (
    <div>
      
      <StyledEngineProvider injectFirst>
      <MyProvider>
        <Routes>
        <Route path="/signup" element={<Home />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </MyProvider>
    </StyledEngineProvider>
    </div>
  );
}

export default App;