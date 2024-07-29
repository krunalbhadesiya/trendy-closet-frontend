// src/MainApp.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { Helmet } from 'react-helmet';
import Header from './components/Header';
import Footer from './components/Footer';
import PreLoader from './components/PreLoader';
import { ThemeProvider } from './components/theme-provider';
import Home from './pages/Home';
// import Store from './pages/Store';
import ContactUs from './pages/ContactUs';

import AboutUs from './pages/AboutUs';
import { Toaster } from "@/components/ui/toaster";
import Login from './pages/dashboard/Login';
// import Register from './pages/auth/register/page';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/dashboard/Dashboard';
import ProjectEdit from './pages/dashboard/ProjectEdit';
import ContactEdit from './pages/dashboard/ContactEdit';
import { useAuth } from './hooks/useAuth';
import AuthHeader from './components/AuthHeader';

function MainApp() {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PreLoader />;
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        {/* <Helmet>
          <meta charSet="utf-8" />
          <title>Lotus Group - Your One-Stop Solution</title>
          <meta name="description" content="Welcome to Lotus Group. We provide web development, software development, UI/UX design, and IT consulting services." />
          <meta name="keywords" content="Lotus Group, web development, software development, UI/UX design, IT consulting" />
          <meta name="author" content="Lotus Group" />
          <meta name="robots" content="index, follow" />
          <meta property="og:title" content="Home | Lotus Group" />
          <meta property="og:description" content="Welcome to Lotus Group - Your One-Stop Solution for web development, software development, UI/UX design, and IT consulting services." />
          <meta property="og:url" content="https://lotusgroup.vercel.app//home" />
          <meta property="og:image" content="https://lotusgroup.vercel.app/logo.png" />
          <meta property="og:type" content="website" />
        </Helmet> */}

        {isAuthenticated ? <AuthHeader /> : <Header />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/store" element={<Store />} /> */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/projects"
            element={
              <PrivateRoute>
                <ProjectEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/ContactData"
            element={
              <PrivateRoute>
                <ContactEdit />
              </PrivateRoute>
            }
          />
        </Routes>
        {isAuthenticated ? <div></div> : <Footer />}

        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default MainApp;
