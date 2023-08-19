import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Todo from "./components/Todo";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/task" element={<TodoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
