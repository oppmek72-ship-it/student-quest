import { useState } from "react";
import useStudents from "./hooks/useStudents";
import useTeacher from "./hooks/useTeacher";
import useToast from "./hooks/useToast";
import Toast from "./components/ui/Toast";

// Student pages
import LoginPage from "./pages/student/LoginPage";
import DashboardPage from "./pages/student/DashboardPage";
import QuizPage from "./pages/student/QuizPage";
import GachaPage from "./pages/student/GachaPage";
import ShopPage from "./pages/student/ShopPage";
import AvatarPage from "./pages/student/AvatarPage";
import SlotPage from "./pages/student/SlotPage";
import LeaderboardPage from "./pages/student/LeaderboardPage";
import ArenaPage from "./pages/student/ArenaPage";

// Teacher pages
import TeacherLoginPage from "./pages/teacher/TeacherLoginPage";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import QuestionManager from "./pages/teacher/QuestionManager";
import CategoryManager from "./pages/teacher/CategoryManager";
import StudentManager from "./pages/teacher/StudentManager";

// Layouts
import StudentLayout from "./layouts/StudentLayout";
import TeacherLayout from "./layouts/TeacherLayout";

export default function App() {
  const [view, setView] = useState("student"); // "student" | "teacher"
  const [tab, setTab] = useState("home");
  const [teacherTab, setTeacherTab] = useState("dashboard");
  const { toast, showToast } = useToast();

  const studentHook = useStudents();
  const teacherHook = useTeacher();

  const {
    students,
    currentStudent,
    currentId,
    loaded: studentsLoaded,
    login,
    logout,
    createStudent,
    handleQuizAnswer,
    getQuizRemaining,
    handleGacha,
    handleShopBuy,
    handleEquip,
    handleEquipSet,
    handleSlotWin,
    handlePetMerge,
    adjustStudentCoins,
    resetStudent,
    handleBuySkill,
    handleEquipSkill,
    handleBattleResult,
  } = studentHook;

  const {
    teachers,
    currentTeacher,
    loaded: teacherLoaded,
    registerTeacher,
    loginTeacher,
    logoutTeacher,
    questions,
    categories,
    addCategory,
    deleteCategory,
    addQuestion,
    editQuestion,
    deleteQuestion,
  } = teacherHook;

  // Loading
  if (!studentsLoaded || !teacherLoaded) {
    return (
      <div
        style={{
          background: "var(--bg-dark)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", animation: "fadeIn 0.5s ease" }}>
          <div style={{ fontSize: 48, animation: "bounce 1.5s infinite" }}>
            🎮
          </div>
          <p style={{ color: "var(--text-dim)", marginTop: 12 }}>
            ກຳລັງໂຫຼດ...
          </p>
        </div>
      </div>
    );
  }

  // ===== TEACHER VIEW =====
  if (view === "teacher") {
    if (!currentTeacher) {
      return (
        <>
          <TeacherLoginPage
            teachers={teachers}
            onLogin={(name, pin) => {
              const success = loginTeacher(name, pin);
              if (success) {
                showToast("✅ ເຂົ້າລະບົບສຳເລັດ!");
                setTeacherTab("dashboard");
              }
              return success;
            }}
            onRegister={(name, pin) => {
              registerTeacher(name, pin);
              showToast(`✨ ສ້າງບັນຊີຄູ "${name}" ສຳເລັດ!`);
            }}
            onSwitchToStudent={() => setView("student")}
          />
          <Toast message={toast} />
        </>
      );
    }

    return (
      <>
        <TeacherLayout
          teacher={currentTeacher}
          tab={teacherTab}
          onTabChange={setTeacherTab}
          onLogout={() => {
            logoutTeacher();
            showToast("👋 ອອກຈາກລະບົບແລ້ວ");
          }}
        >
          {teacherTab === "dashboard" && (
            <TeacherDashboard
              students={students}
              questions={questions}
              categories={categories}
            />
          )}
          {teacherTab === "questions" && (
            <QuestionManager
              questions={questions}
              categories={categories}
              onAdd={addQuestion}
              onEdit={editQuestion}
              onDelete={deleteQuestion}
              showToast={showToast}
            />
          )}
          {teacherTab === "categories" && (
            <CategoryManager
              categories={categories}
              questions={questions}
              onAdd={addCategory}
              onDelete={deleteCategory}
              showToast={showToast}
            />
          )}
          {teacherTab === "students" && (
            <StudentManager
              students={students}
              onAdjustCoins={adjustStudentCoins}
              onReset={resetStudent}
              onCreateStudent={createStudent}
              showToast={showToast}
            />
          )}
        </TeacherLayout>
        <Toast message={toast} />
      </>
    );
  }

  // ===== STUDENT VIEW =====
  if (!currentId) {
    return (
      <>
        <LoginPage
          students={students}
          onLogin={(id) => {
            login(id);
            setTab("home");
            const s = students.find((st) => st.id === id);
            showToast(`🎮 ຍິນດີຕ້ອນຮັບ ${s?.name}!`);
          }}
          onSwitchToTeacher={() => setView("teacher")}
        />
        <Toast message={toast} />
      </>
    );
  }

  return (
    <>
      <StudentLayout
        student={currentStudent}
        tab={tab}
        onTabChange={setTab}
        onLogout={() => {
          logout();
          setTab("home");
          showToast("👋 ອອກຈາກລະບົບແລ້ວ");
        }}
      >
        {tab === "home" && (
          <DashboardPage student={currentStudent} allStudents={students} />
        )}
        {tab === "quiz" && (
          <QuizPage
            student={currentStudent}
            questions={questions}
            categories={categories}
            quizRemaining={getQuizRemaining()}
            onAnswer={(coins) => {
              handleQuizAnswer(coins);
              showToast(`🪙 +${coins} ຫຼຽນ!`);
            }}
          />
        )}
        {tab === "slot" && (
          <SlotPage
            student={currentStudent}
            onSlotWin={(amount) => {
              handleSlotWin(amount);
              if (amount > 0) showToast(`🎰 +${amount} ຫຼຽນ!`);
            }}
          />
        )}
        {tab === "gacha" && (
          <GachaPage
            student={currentStudent}
            onGacha={(pet, setActive) => {
              handleGacha(pet, setActive);
              if (setActive) {
                showToast(`🐾 ${pet.name} ເປັນສັດລ້ຽງປະຈຳແລ້ວ!`);
              } else {
                showToast(`🎉 ໄດ້ ${pet.emoji} ${pet.name}!`);
              }
            }}
            onPetMerge={(newPets) => handlePetMerge(newPets)}
            showToast={showToast}
          />
        )}
        {tab === "shop" && (
          <ShopPage
            student={currentStudent}
            onBuy={(item) => {
              handleShopBuy(item);
              showToast(
                `🛒 ແລກ ${item.emoji} ${item.name} ສຳເລັດ! ໄປຮັບຈາກຄູ`
              );
            }}
          />
        )}
        {tab === "avatar" && (
          <AvatarPage
            student={currentStudent}
            onEquip={(cat, id, cost) => handleEquip(cat, id, cost)}
            onEquipSet={(pieces, cost, missingIds) =>
              handleEquipSet(pieces, cost, missingIds)
            }
            showToast={showToast}
          />
        )}
        {tab === "arena" && (
          <ArenaPage
            student={currentStudent}
            students={students}
            onBattleResult={handleBattleResult}
            onBuySkill={handleBuySkill}
            onEquipSkill={handleEquipSkill}
            showToast={showToast}
          />
        )}
        {tab === "rank" && (
          <LeaderboardPage students={students} currentId={currentId} />
        )}
      </StudentLayout>
      <Toast message={toast} />
    </>
  );
}
