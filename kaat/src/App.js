import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoursePage from "./components/CoursePage";
import AssignmentPage from "./components/AssignmentPage";
import { useState } from 'react';

export default function App() {
    const [fakeCourse, setFakeCourse] = useState(
        {
            id: "42",
            name: "Intro to Testing",
            assignments: [
              { id: "a1", title: "Test Assignment 1", dueDate: "2025-05-28", dueTime: "23:59" },
              { id: "a2", title: "Test Assignment 2", dueDate: "2025-05-28", dueTime: "23:59" },
            ],
        });
        
        
    return (
        <BrowserRouter>
        <Routes>
            {/* REAL ROUTES… */}

            {/* === TEST === */}
            <Route
            path="/_test/course"
            element={
                <CoursePage
                currentCourse={fakeCourse}
                role="teacher"
                user={{ id: "u1", name: "Alice" }}
                updateCourse={setFakeCourse}
                />
            }
            />

            <Route
            path="/_test/course/:assignmentId"
            element={<AssignmentPage />}
            />
        </Routes>
        </BrowserRouter>
    );
}