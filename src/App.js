import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import List from "./pages/List";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/list/:generation" element={<List></List>}></Route>
      </Routes>
    </>
  );
}

export default App;
