import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../consts/routes';

export const AppRouter = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      {true &&
        authRoutes.map(route => (
          <Route
            exact
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      {publicRoutes.map(route => (
        <Route
          exact
          key={route.path}
          path={route.path}
          element={route.element}
        />
      ))}
    </Routes>
  );
};
