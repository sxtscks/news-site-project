import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { App } from '@/app/App';

import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Контейнер root не найден!');
}

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <StoreProvider>
      <ForceUpdateProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ForceUpdateProvider>
    </StoreProvider>
  </BrowserRouter>
);
