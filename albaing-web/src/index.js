import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './assets/styles/index.css';
import Login2 from "./pages/login/Login2";
import CompanyMain from "./pages/company/CompanyMain";
import JobPostList from "./pages/jobpost/JobpostList";
import JobPostDetail from "./pages/jobpost/JobpostDetail";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path="/login" element={<Login2 />} />
                <Route path="/company" element={<CompanyMain />} />
                <Route path="/company/jobposts" element={<JobPostList />} />
                <Route path="/company/jobpost/:jobPostId" element={<JobPostDetail />} />
            </Routes>
        </Router>
    </React.StrictMode>
);