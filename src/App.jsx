import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Verify from "./components/OTP";
import FormForget from "./components/FormForget";
import FormReset from "./components/FormReset";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/forget-password" element={<FormForget />} />
          <Route path="/reset-password" element={<FormReset />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
