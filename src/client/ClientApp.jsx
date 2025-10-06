import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";



export default function ClientApp() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

    </Routes>
  );
}
