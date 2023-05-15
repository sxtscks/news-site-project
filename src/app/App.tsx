import React, { Suspense, useEffect } from 'react';
import './styles/index.scss';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserMounted, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';

export const App = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const mounted = useSelector(getUserMounted);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

  if (!mounted) {
    return <PageLoader />;
  }

  return (
    <div className={classnames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content">
          <Sidebar />
          {mounted && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
};
