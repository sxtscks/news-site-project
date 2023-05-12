import { EditableProfileCard } from '@/features/EditableProfileCard';
import {
  TestProvider,
} from '@/shared/lib/tests/componentRender/componentRender';

describe('EditableProfileCard.cy.tsx', () => {
  it('playground', () => {
    const options = {
      initialState: {
        user: {
          authData: {
            id: '1',
          },
        },
      },
    };
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });
    cy.mount(
      <TestProvider
        options={options}
      >
        <EditableProfileCard id="1" />
      </TestProvider>,
    );
  });
});
