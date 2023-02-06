import React from 'react';
import './styles/index.scss'
import {classnames} from "shared/lib/classnames/classnames";
import {useTheme} from "app/providers/ThemeProvider";
import {AppRouter} from "app/providers/router";
import {Navbar} from "widgets/Navbar";
import {Sidebar} from "widgets/Sidebar";

export const App = () => {

  const {theme} = useTheme()

  return (
    <div className={classnames('app', {}, [theme])}>
      <Navbar />
      <div className='content'>
        <Sidebar />
        <AppRouter/>
      </div>
    </div>
  )
}