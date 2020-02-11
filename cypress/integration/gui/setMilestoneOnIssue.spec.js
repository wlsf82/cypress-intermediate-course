const faker = require('faker')

describe('Set milestone on issue', () => {
  const issue = {
    title: `issue-${faker.random.uuid()}`,
    description: faker.random.words(3),
    project: {
      name: `project-${faker.random.uuid()}`,
      description: faker.random.words(5),
      milestone: {
        title: `milestone-${faker.random.word()}`
      }
    }
  }

  beforeEach(() => {
    cy.login()
    cy.api_createIssue(issue)
      .then(response => {
        cy.api_createMilestone(response.body.project_id, issue.project.milestone)
        cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
      })
  })

  it('successfully', () => {
    cy.gui_setMilestoneOnIssue(issue.project.milestone)

    cy.get('.block.milestone').should('contain', issue.project.milestone.title)
  })
})
