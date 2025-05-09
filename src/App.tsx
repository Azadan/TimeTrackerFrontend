import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginForm from "./Component/LoginForm.tsx";
import RegisterForm from "./Component/RegisterForm.tsx";
import Dashboard from "./Component/Dashboard.tsx";
import AdminDashboard from "./Component/AdminDashboard.tsx";
import ProtectedAdminRoute from "./Component/ProtectedAdminRoute.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Protected Admin Route */}
                <Route element={<ProtectedAdminRoute />}>
                    <Route path="/admin" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
};



export default App
