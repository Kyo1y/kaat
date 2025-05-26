import React, { useState } from "react";
import AssignmentPage from "./AssignmentPage";
import EditAssignments from "./EditAssignments";
import { useNavigate } from "react-router-dom";

export default function CoursePage({
  currentCourse,  // { id, name, assignments: [ { id, title, … }, … ] }
  role,           // "student" vs "teacher"
  user,           // the logged‑in user
  updateCourse,   // teacher-only
}) {

  const navigate = useNavigate();

  // the assignment the user clicked on
  const [currentAssignment, setCurrentAssignment] = useState(null);

  // student‑only state
  const [assignSubmission, setAssignSubmission] = useState(null);

  // teacher‑only state
  const [assignUpdate, setAssignUpdate] = useState(null);
  const [currentlyEditingAssignment, setCurrentlyEditingAssignment] = useState(false);
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [draftCourseName, setDraftCourseName] = useState(currentCourse.name);
  const [draftAssignment, setDraftAssignment] = useState();
  const handleSelectAssignment = (assignment) => {
    setCurrentAssignment(assignment);
    navigate(`/_test/course/${assignment.id}`)
    setAssignSubmission(null);
    setAssignUpdate(null);
    setCurrentlyEditingAssignment(false);
  };

  const handleSaveCourse = () => {
    updateCourse({ ...currentCourse, name: draftCourseName });
    setIsEditingCourse(false);
  };
  const handleAssignmentChange = (id) => {
    const updatedAssignments = currentCourse.assignments.map((a) =>
      a.id === id ? { ...draftAssignment } : a                         
    );
    updateCourse({...currentCourse, assignments: updatedAssignments})
    setCurrentlyEditingAssignment(false);
  }
  return (
    <div className="course-page">
      <header className="course-page-header">
        <div className="course-info-container">
        {isEditingCourse ? (
          <>
            <input type="text" value={draftCourseName} onChange={(e) => setDraftCourseName(e.target.value)}/>
            <button onClick={handleSaveCourse}>Save</button>
            <button onClick={() => {setIsEditingCourse(false); setDraftCourseName(currentCourse.name);}}>Cancel</button>
          </>
        ) : (
          <>
            <h1>{currentCourse.name}</h1>
            {role === "teacher" && (
              <button onClick={() => setIsEditingCourse(true)}>
                Edit Course
              </button>
            )}
          </>
        )}
        </div>
        <div className="user-info-container">
          <h1> {user.name}</h1>
        </div>
      </header>

      <section>
        <h2>Assignments</h2>
        <ul>
          {currentCourse.assignments.map((a) => {
            const isEditingThis = currentlyEditingAssignment && draftAssignment.id === a.id;

            return (
              <li className="assignmentItem" key={a.id}>
                {isEditingThis ? (
                  <div className="assignmentEditingContainer">
                    <input type="text" value={draftAssignment.title} onChange={(e) => setDraftAssignment({...draftAssignment, title: e.target.value,})}/>
                    <input type="date" value={draftAssignment.dueDate} onChange={(e) => setDraftAssignment({...draftAssignment, dueDate: e.target.value,})}/>
                    <input type="time" value={draftAssignment.dueTime} onChange={(e) => setDraftAssignment({...draftAssignment, dueTime: e.target.value,})}/>
                    <button onClick={() => handleAssignmentChange(draftAssignment.id)}>Save</button>
                    <button onClick={() => {
                        setCurrentlyEditingAssignment(false);
                        setDraftAssignment(currentAssignment);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button onClick={() => handleSelectAssignment(a)}>{a.title}</button>
                    <div className="due-info-cont">
                      <h3>
                        Due {a.dueDate}, {a.dueTime}
                      </h3>
                    </div>
                    {role === "teacher" && (
                      <button
                        onClick={() => {
                          setDraftAssignment(a);
                          setCurrentlyEditingAssignment(true);
                        }}
                      >
                        Edit
                      </button>
                    )}
                  </>
                )}
              </li>
            );
        })}
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