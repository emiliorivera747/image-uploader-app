import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Images from "./pages/Images";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Images />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
