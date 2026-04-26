import StudentDashboardHeader from "./StudentDashboardHeader";

export default function StudentQuizQuestions() {
  return (
    <div>
      <StudentDashboardHeader activePage="quizzes" />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px" }}>
        <section>
          <h1>Quiz questions</h1>
          <p>Questions for the selected published quiz will appear here.</p>
        </section>
      </div>
    </div>
  );
}
