import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AccountSuccess from './pages/AccountSuccess';
import HomePage from './pages/HomePage';
import Pages from './pages/Pages';
import RoomsAndSuites from './pages/RoomsAndSuites';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route path="/account-success" element={<AccountSuccess />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pages"
            element={
              <ProtectedRoute>
                <Pages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rooms"
            element={
              <ProtectedRoute>
                <RoomsAndSuites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services"
            element={
              <ProtectedRoute>
                <Services />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog"
            element={
              <ProtectedRoute>
                <Blog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
