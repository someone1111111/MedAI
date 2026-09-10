import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import StudentHome from './pages/student/StudentHome'
import PatientHome from './pages/patient/PatientHome'
import Library from './pages/student/Library'
import Chatbot from './pages/student/Chatbot'
import SurgeryGame from './pages/student/SurgeryGame'
import SymptomIntake from './pages/patient/SymptomIntake'
import Consultation from './pages/patient/Consultation'
import ProtectedRoute from './components/ProtectedRoute'
import HealthSpace from './pages/patient/HealthSpace'
import ConditionSetup from './pages/patient/ConditionSetup'
import MoodLogger from './pages/patient/MoodLogger'
import Lifestyle from './pages/patient/Lifestyle'
import MentalWellness from './pages/patient/MentalWellness'
import Articles from './pages/patient/Articles'
import VerifyEmail from './pages/VerifyEmail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify/:token" element={<VerifyEmail />} />

          {/* Student only routes */}
          <Route path="student" element={
            <ProtectedRoute requiredRole="student">
              <StudentHome />
            </ProtectedRoute>
          } />
          <Route path="student/library" element={
            <ProtectedRoute requiredRole="student">
              <Library />
            </ProtectedRoute>
          } />
          <Route path="student/chatbot" element={
            <ProtectedRoute requiredRole="student">
              <Chatbot />
            </ProtectedRoute>
          } />
          <Route path="student/surgery" element={
            <ProtectedRoute requiredRole="student">
              <SurgeryGame />
            </ProtectedRoute>
          } />

          {/* Patient routes — open to everyone */}
          <Route path="patient" element={
            <ProtectedRoute allowVisitor={true}>
              <PatientHome />
            </ProtectedRoute>
          } />
          <Route path="patient/health" element={
            <ProtectedRoute allowVisitor={true}>
              <HealthSpace />
            </ProtectedRoute>
          } />
          <Route path="patient/lifestyle" element={
            <ProtectedRoute allowVisitor={true}>
              <Lifestyle />
            </ProtectedRoute>
          } />
          <Route path="patient/mental" element={
            <ProtectedRoute allowVisitor={true}>
              <MentalWellness />
            </ProtectedRoute>
          } />
          <Route path="patient/articles" element={
            <ProtectedRoute allowVisitor={true}>
              <Articles />
            </ProtectedRoute>
          } />
          <Route path="patient/setup" element={
            <ProtectedRoute allowVisitor={true}>
              <ConditionSetup />
            </ProtectedRoute>
          } />
          <Route path="patient/log" element={
            <ProtectedRoute allowVisitor={true}>
              <MoodLogger />
            </ProtectedRoute>
          } />
          <Route path="patient/symptoms" element={
            <ProtectedRoute allowVisitor={true}>
              <SymptomIntake />
            </ProtectedRoute>
          } />
          <Route path="patient/consultation" element={
            <ProtectedRoute allowVisitor={true}>
              <Consultation />
            </ProtectedRoute>
          } />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App