import { screen } from '@testing-library/react';
import { generatePath } from 'react-router-dom';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import { AppRouter } from './AppRouter';
import { RoutePath } from '@/app/providers/router/lib/routeConfig';

describe('app/router/AppRouter', () => {
  test('Страница должна отрендериться', async () => {
    componentRender(<AppRouter />, {
      route: RoutePath.about,
    });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('Страница не найдена', async () => {
    componentRender(<AppRouter />, {
      route: '/trewgsdfgw',
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('Редирект неавторизованного юзера', async () => {
    componentRender(<AppRouter />, {
      route: generatePath(RoutePath.profile, { id: '1' }),
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('Доступ к закрытой странице', async () => {
    componentRender(<AppRouter />, {
      route: generatePath(RoutePath.profile, { id: '1' }),
      initialState: {
        user: { mounted: true, authData: {} },
      },
    });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });
});
