import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { LevelPage } from './pages/LevelPage';
import { SectionPage } from './pages/SectionPage';
import { LessonPage } from './pages/LessonPage';
import { QuizPage } from './pages/QuizPage';
import { InfoPage } from './pages/InfoPage';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useAuth } from './context/AuthContext';

const PageShell = styled(motion.main)`
  min-height: calc(100vh - 88px);
`;

function TransitionLayout({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageShell
        key={location.pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
      >
        {children}
      </PageShell>
    </AnimatePresence>
  );
}

function ProtectedRoute({ children }) {
  const { user, hydrated } = useAuth();

  if (!hydrated) {
    return null;
  }

  return user ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { user, hydrated } = useAuth();

  if (!hydrated) {
    return null;
  }

  return user ? <Navigate to="/home" replace /> : children;
}

function RootRedirect() {
  const { user, hydrated } = useAuth();

  if (!hydrated) {
    return null;
  }

  return <Navigate to={user ? '/home' : '/login'} replace />;
}

function RoutesContainer() {
  const location = useLocation();

  return (
    <TransitionLayout>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<RootRedirect />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" element={<InfoPage title="Forgot Password" description="هذه صفحة مكانية مؤقتة لإعادة تعيين كلمة المرور لاحقًا." />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/level/:levelId" element={<LevelPage />} />
        <Route path="/level/:levelId/section/:sectionId" element={<SectionPage />} />
        <Route path="/level/:levelId/section/:sectionId/lesson/:lessonId" element={<LessonPage />} />
        <Route path="/level/:levelId/section/:sectionId/lesson/:lessonId/quiz" element={<QuizPage />} />
        <Route path="/about" element={<InfoPage title="About" description="منصة تعليمية قبطية تجمع بين الطقس واللغة واللحن في تجربة واحدة منظّمة وهادئة." />} />
        <Route path="/contact" element={<InfoPage title="Contact" description="تواصل معنا للاستفسار عن المسارات التعليمية، التسجيل، أو المواد المقترحة للدراسة." />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TransitionLayout>
  );
}

export default function App() {
  const location = useLocation();
  const authRoutes = ['/login', '/register', '/forgot-password'];
  const showChrome = !authRoutes.includes(location.pathname);

  return (
    <div dir="rtl" style={{ position: 'relative', zIndex: 1 }}>
      {showChrome ? <Navbar /> : null}
      <RoutesContainer />
      {showChrome && location.pathname !== '/dashboard' ? <Footer /> : null}
    </div>
  );
}
