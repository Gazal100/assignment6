// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Navigation bar', () => {

  it('displays correct elements when user is not logged in', () => {
    cy.visit('/')

    // Check if Register and Log in links are visible
    cy.get('nav').contains('Register').should('be.visible')
      .get('nav').contains('Log in').should('be.visible')

  })

})

// describe('Login functionality', () =>{
//   it('Login', () => {
//     cy.visit('/')
//     cy.get('#login').click()
//     cy.get('input[name="userName"]').type("Gazal")
//     cy.get('input[name="password"]').type("321")
//     cy.get('#form').click()
//     cy.url().should('include', 'favourites')
//   })
// })

// describe('RouteGuard component', () => {
//   it('renders children when authenticated and on public path', () => {
//     cy.visit('/public')
//     cy.window().then((window) => {
//       window.isAuthenticated = () => true
//     })
//     cy.mount(<RouteGuard><div>children</div></RouteGuard>)
//     cy.contains('children').should('exist')
//   })

//   it('redirects to login page when not authenticated and on private path', () => {
//     cy.visit('/private')
//     cy.window().then((window) => {
//       window.isAuthenticated = () => false
//     })
//     cy.mount(<RouteGuard><div>children</div></RouteGuard>)
//     cy.location('pathname').should('eq', '/login')
//   })
// })
