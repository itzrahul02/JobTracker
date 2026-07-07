import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
// import { Sidebar } from './components/Sidebar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { CandidateDashboard } from './pages/candidate/CandidateDashboard';
import { CandidateProfile } from './pages/candidate/CandidateProfile';
import { JobsPage } from './pages/candidate/JobsPage';
import { ApplicationsPage } from './pages/candidate/ApplicationsPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { ManageJobs } from './pages/admin/ManageJobs';
import { ManageCandidates } from './pages/admin/ManageCandidates';
import { ManageApplications } from './pages/admin/ManageApplications';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="app-shell">
          {/* <Sidebar /> */}
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Navigate to="/candidate/dashboard" replace />} />
              </Route>

              <Route element={<ProtectedRoute role="CANDIDATE" />}>
                <Route path="/candidate/dashboard" element={<CandidateDashboard />} />
                <Route path="/candidate/profile" element={<CandidateProfile />} />
                <Route path="/candidate/jobs" element={<JobsPage />} />
                <Route path="/candidate/applications" element={<ApplicationsPage />} />
              </Route>

              <Route element={<ProtectedRoute role="ADMIN" />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/jobs" element={<ManageJobs />} />
                <Route path="/admin/candidates" element={<ManageCandidates />} />
                <Route path="/admin/applications" element={<ManageApplications />} />
              </Route>

              <Route path="/404" element={<div className="page"><h2>Page not found</h2></div>} />
              <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
