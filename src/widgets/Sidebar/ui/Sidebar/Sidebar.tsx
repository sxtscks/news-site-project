import React, { FC, useState } from 'react';
import { classnames } from 'shared/lib/classnames/classnames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'app/providers/router/lib/routeConfig';
import AboutIcon from 'shared/assets/icons/about.svg';
import HomeIcon from 'shared/assets/icons/home.svg';
import classes from './Sidebar.module.scss';

export interface SidebarProps {
  className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div
      data-testid="sidebar"
      className={
        classnames(
          classes.sidebar,
          { [classes.collapsed]: collapsed },
          [className],
        )
      }
    >
      <Button
        data-testid="sidebar-toggle"
        onClick={onToggle}
        className={classes.button}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        size={ButtonSize.L}
        square
      >
        {collapsed ? '>' : '<'}
      </Button>
      <div className={classes.linksWrapper}>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.main}
        >
          <div className={classes.linkItem}>
            <HomeIcon className={classes.icon} />
            {!collapsed
            && (
              <span>
                {t('Главная страница')}
              </span>
            )}
          </div>
        </AppLink>
        <AppLink
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.about}
        >
          <div className={classes.linkItem}>
            <AboutIcon className={classes.icon} />
            {!collapsed
              && (
                <span>
                  {t('О сайте')}

                </span>
              )}
          </div>
        </AppLink>
      </div>
      <div className={classes.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} />
      </div>
    </div>
  );
};
