import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginForm from "./Component/LoginForm.tsx";
import RegisterForm from "./Component/RegisterForm.tsx";
import Dashboard from "./Component/Dashboard.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};


export default App
