import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader';
import { routeConfig } from '../lib/routeConfig';

export const AppRouter = () => (
  <Routes>
    {Object.values(routeConfig)
      .map(({
        element,
        path,
      }) => (
        <Route
          key={path}
          path={path}
          element={(
            <Suspense fallback={<PageLoader />}>
              <div className="pageWrapper">
                {element}
              </div>
            </Suspense>
          )}
        />
      ))}
  </Routes>
);
