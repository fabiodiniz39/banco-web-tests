describe('login', () => {
  it('login com dados válidos deve permitir entrada no sistema', () => {
    // Arrange
    cy.visit('http://localhost:4000')

    // Act
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').click().type('123456')
    cy.contains('button', 'Entrar').click()

    // Assert
    cy.contains('Realizar Transferência').should('be.visible')
  })

  it('login com dados inválidos deve apresentar mensagem de erro', () => {
    // Arrange
    cy.visit('http://localhost:4000')

    // Act
    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').click().type('654321')
    cy.contains('button', 'Entrar').click()

    // Assert
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
  })
})  