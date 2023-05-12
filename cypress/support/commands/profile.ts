export const updateProfile = (firstName: string, lastName: string) => {
  cy.getByTestId('EditableProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.FirstnameInput').clear().type(firstName);
  cy.getByTestId('ProfileCard.LastnameInput').clear().type(lastName);
  cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) =>
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'asasf' },
    body: {
      id: '1',
      firstname: 'admin',
      lastname: 'admin',
      age: 465,
      currency: 'RUB',
      country: 'Russia',
      city: 'Moscow',
      username: 'admin',
      avatar: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    },
  });

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(firstName: string, lastName: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
