describe('login', () => {
  beforeEach(() => {
    // Arrange
    cy.visit('http://localhost:4000')
    cy.screenshot('apos-visitar-pagina')
  })

  it('login com dados válidos deve permitir entrada no sistema', () => {
    // Act
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click().type(credenciais.valida.usuario)
      cy.get('#senha').click().type(credenciais.valida.senha)
    })
    
    cy.screenshot('apos-preencher-dados-validos')
    cy.contains('button', 'Entrar').click()
    cy.screenshot('apos-clicar-no-botao-entrar')

    // Assert
    cy.contains('h4', 'Realizar Transferência').should('be.visible')
  })

  it('login com dados inválidos deve apresentar mensagem de erro', () => {
    // Act
    cy.fixture('credenciais').then(credenciais => {
      cy.get('#username').click().type(credenciais.invalida.usuario)
      cy.get('#senha').click().type(credenciais.invalida.senha)
    })

    cy.get('#username').click().type('julio.lima')
    cy.get('#senha').click().type('654321')
    cy.contains('button', 'Entrar').click()

    // Assert
    cy.get('.toast').should('have.text', 'Erro no login. Tente novamente.')
  })
})  