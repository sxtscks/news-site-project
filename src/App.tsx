import React, {Suspense} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './styles/index.scss'
import {AboutPageLazy} from "./pages/AboutPage/AboutPage.lazy";
import {MainPageLazy} from "./pages/MainPage/MainPage.lazy";
import {useTheme} from "./theme/useTheme";
import {classnames} from "./helpers/classnames/classnames";

export const App = () => {

const {theme, toggleTheme} = useTheme()

  return (
    <div className={classnames('app', {}, [theme])}>
      <button onClick={toggleTheme}>TOGGLE THEME</button>
      <Link to='/'>Main</Link>
      <Link to='/about'>About</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path={'/about'} element={<AboutPageLazy/>}/>
          <Route path={'/'} element={<MainPageLazy/>}/>
        </Routes>
      </Suspense>
    </div>
  )
}