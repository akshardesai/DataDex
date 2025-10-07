import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile";



export default function ClientApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
  );
}
