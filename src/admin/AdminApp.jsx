import { Routes, Route } from "react-router-dom";

import AllMembers from "./pages/AllMembers";
import Layout from "./components/Layout";
import MemberDetails from "./pages/MemberDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Requests from "./pages/Requests";
import DailyCheckins from "./pages/DailyCheckins";
import AuthProvider from "./contexts/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* All protected routes go under Layout */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/members" element={<AllMembers />} />
          <Route path="/members/:id" element={<MemberDetails />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/dailycheckins" element={<DailyCheckins />} />
        </Route>

        {/* Public route */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
