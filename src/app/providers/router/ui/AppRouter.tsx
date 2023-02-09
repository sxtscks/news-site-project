import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../lib/routeConfig';

export const AppRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {Object.values(routeConfig).map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={(
            <div className="pageWrapper">
              {element}
            </div>
          )}
        />
      ))}
    </Routes>
  </Suspense>
);
