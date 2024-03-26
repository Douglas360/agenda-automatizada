import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { CombinedProvider } from '../context/index';
import SignIn from '../pages/Authentication/SignIn';
import PageTitle from '../components/PageTitle';
import ECommerce from '../pages/Dashboard/ECommerce';
import Calendar from '../pages/Calendar';
import Profile from '../pages/Profile';
import FormElements from '../pages/Form/FormElements';
import FormLayout from '../pages/Form/FormLayout';
import Tables from '../pages/Tables';
import Settings from '../pages/Settings';
import Chart from '../pages/Chart';
import Alerts from '../pages/UiElements/Alerts';
import Buttons from '../pages/UiElements/Buttons';
import SignUp from '../pages/Authentication/SignUp';
import { useAuth } from '../context/AuthContext/useAuth';
import Ministry from '../pages/Ministry';

export const AppRouter: React.FC = () => {
  const Private = ({ children }: { children: React.ReactNode }) => {
    const { isAuth } = useAuth();

    return isAuth ? <>{children}</> : <Navigate to="/" />;
  };

  const Logged = ({ children }: { children: React.ReactNode }) => {
    const { isAuth } = useAuth();

    return !isAuth ? <>{children}</> : <Navigate to="/dashboard" />;
  };

  return (
    <CombinedProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Logged>
              <SignIn />
            </Logged>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Private>
              <PageTitle title="Notifica.Ai | Notificações de eventos" />
              <ECommerce />
            </Private>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Private>
                <Calendar />
              </Private>
            </>
          }
        />
        <Route
          path="/ministry"
          element={
            <>
              <PageTitle title="Ministério | Notifica.ai - Notificações de eventos" />
              <Private>
                <Ministry />
              </Private>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Private>
                <Profile />
              </Private>
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Private>
                <FormElements />
              </Private>
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </CombinedProvider>
  );
};
