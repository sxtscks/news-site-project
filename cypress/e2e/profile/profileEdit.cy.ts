let profileId: string;
describe('Пользователь заходит на страницу профиля', () => {
  beforeEach(() => {
    cy.login('admin', '123').then((data) => {
      profileId = data.id;
      cy.visit(`profile/${data.id}`);
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('И профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.FirstnameInput').should('have.value', 'admin');
    cy.getByTestId('ProfileCard.LastnameInput').should('have.value', 'admin');
  });
  it('И редактирует его', () => {
    cy.updateProfile('new name', 'new lastname');
    cy.getByTestId('ProfileCard.FirstnameInput').should(
      'have.value',
      'new name'
    );
    cy.getByTestId('ProfileCard.LastnameInput').should(
      'have.value',
      'new lastname'
    );
  });
});
