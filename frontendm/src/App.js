import Circleloader from "components/loaders/circleloader";
import Usercontext from "context/Usercontext";
import React from "react";
import { useContext } from "react";
import { Suspense } from "react";
import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("pages/Home"));
const ProfilePage = lazy(() => import("pages/Profile"));
const LoginPage = lazy(() => import("pages/Login"));
const Chatpage = lazy(() => import("pages/Chat"));

const App = () => {
  const { token } = useContext(Usercontext);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Circleloader />}>
              <LoginPage />
            </Suspense>
          }
        />

        <Route
          path="/home"
          element={
            token === null ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<Circleloader />}>
                <HomePage />
              </Suspense>
            )
          }
        />

        <Route
          path="/chat"
          element={
            token === null ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<Circleloader/>}>
                <Chatpage />
              </Suspense>
            )
          }
        />

        <Route
          path="/profile/:username/:id"
          element={
            token === null ? (
              <Navigate to="/" />
            ) : (
              <Suspense fallback={<Circleloader/>}>
                <ProfilePage />
              </Suspense>
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
