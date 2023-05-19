import React, {
  Component,
  ComponentType,
  memo,
  Suspense,
  useEffect,
} from 'react';
import './styles/index.scss';
import { useSelector } from 'react-redux';
import { classnames } from '@/shared/lib/classnames/classnames';
import { ThemeProvider, useTheme } from '@/app/providers/ThemeProvider';
import { AppRouter } from '@/app/providers/router';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserMounted, initAuthData, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from '@/app/lib/useAppToolbar';

const App = memo(() => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const mounted = useSelector(getUserMounted);
  const toolbar = useAppToolbar();

  useEffect(() => {
    if (!mounted) {
      dispatch(initAuthData());
    }
  }, [dispatch, mounted]);

  if (!mounted) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div id="app" className={classnames('app_redesigned', {}, [theme])}>
            <AppLoaderLayout />
          </div>
        }
        off={<PageLoader />}
      />
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div id="app" className={classnames('app_redesigned', {}, [theme])}>
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              sidebar={<Sidebar />}
              content={<AppRouter />}
              toolbar={toolbar}
            />
          </Suspense>
        </div>
      }
      off={
        <div id="app" className={classnames('app', {}, [theme])}>
          <Suspense fallback="">
            <Navbar />
            <div className="content">
              <Sidebar />
              <AppRouter />
            </div>
          </Suspense>
        </div>
      }
    />
  );
});

const withTheme = (Component: ComponentType) => () => {
  const { theme: defaultTheme } = useJsonSettings();

  return (
    <ThemeProvider initialTheme={defaultTheme}>
      <Component />
    </ThemeProvider>
  );
};

export default withTheme(App);
