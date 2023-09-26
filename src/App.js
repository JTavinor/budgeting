import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddCost from "./AddCost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddCost />} />
    </Routes>
  );
}

export default App;
