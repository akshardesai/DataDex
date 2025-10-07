import {  Routes, Route } from "react-router-dom";
import AdminApp from "./admin/AdminApp"
import ClientApp from "./client/ClientApp";
import Home from "./client/pages/Home";



function App() {
  return (
    <Routes>

      <Route path="/admin-dashboard/*" element={<AdminApp />} />
      
      <Route path="/*" element={<ClientApp/>}  />
  
    </Routes>
  );
}

export default App;
