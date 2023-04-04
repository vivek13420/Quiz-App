import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Quiz from "./Quiz";
import Results from "./Results";
import Setup from "./Setup";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Setup />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
