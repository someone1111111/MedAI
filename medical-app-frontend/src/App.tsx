import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import StudentHome from './pages/student/StudentHome'
import PatientHome from './pages/patient/PatientHome'
import Library from './pages/student/Library'
import Chatbot from './pages/student/Chatbot'
import SurgeryGame from './pages/student/SurgeryGame'
import SymptomIntake from './pages/patient/SymptomIntake'
import Consultation from './pages/patient/Consultation'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Landing />} />
          <Route path="student" element={<StudentHome />} />
          <Route path="student/library" element={<Library />} />
          <Route path="student/chatbot" element={<Chatbot />} />
          <Route path="student/surgery" element={<SurgeryGame />} />
          <Route path="patient" element={<PatientHome />} />
          <Route path="patient/symptoms" element={<SymptomIntake />} />
          <Route path="patient/consultation" element={<Consultation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App