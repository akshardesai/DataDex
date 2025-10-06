import {  Routes, Route } from "react-router-dom";
import AdminApp from "./admin/AdminApp"
import ClientApp from "./client/ClientApp";



function App() {
  return (
    <Routes>

      <Route path="/admin/*" element={<AdminApp />} />
      
      <Route path="/*" element={<ClientApp/>}  />
  
    </Routes>
  );
}

export default App;
