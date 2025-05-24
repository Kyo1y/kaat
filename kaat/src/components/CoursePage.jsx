import React, { useState } from "react";
import AssignmentPage from "./AssignmentPage";
import EditAssignments from "./EditAssignments";

export default function CoursePage({
  currentCourse,               // { id, name, assignments: [ { id, title, … }, … ] }
  role,                        // "student" | "teacher"
  user,                        // the logged‑in user
  setCurrentlyEditingCourse,   // (course) => void, only used by teachers
}) {
  // the assignment the user clicked on
  const [currentAssignment, setCurrentAssignment] = useState(null);

  // student‑only state
  const [assignSubmission, setAssignSubmission] = useState(null);

  // teacher‑only state
  const [assignUpdate, setAssignUpdate] = useState(null);
  const [currentlyEditingAssignment, setCurrentlyEditingAssignment] = useState(false);

  const handleSelectAssignment = (assignment) => {
    setCurrentAssignment(assignment);
    // reset any in‑flight submit/update
    setAssignSubmission(null);
    setAssignUpdate(null);
    setCurrentlyEditingAssignment(false);
  };

  return (
    <div className="course-page">
      <header>
        <h1>{currentCourse.name}</h1>
        {role === "teacher" && (
          <button onClick={() => setCurrentlyEditingCourse(currentCourse)}>
            Edit Course
          </button>
        )}
      </header>

      <section>
        <h2>Assignments</h2>
        <ul>
          {currentCourse.assignments.map((a) => (
            <li key={a.id}>
              <button onClick={() => handleSelectAssignment(a)}>
                {a.title}
              </button>

              {role === "teacher" && (
                <>
                  <button onClick={() => setCurrentlyEditingAssignment(true)}>
                    Edit
                  </button>
                  <button onClick={() => setAssignUpdate(a)}>
                    Update
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      {currentAssignment && role === "student" && (
        <AssignmentPage
          assignment={currentAssignment}
          onSubmit={setAssignSubmission}
        />
      )}

      {currentAssignment && role === "teacher" && currentlyEditingAssignment && (
        <EditAssignments
          currentAssignment={currentAssignment}
          setCurrentlyEditingAssignment={setCurrentlyEditingAssignment}
        />
      )}
    </div>
  );
}