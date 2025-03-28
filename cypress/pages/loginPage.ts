export class LoginPage {
    visit() {
      cy.visit('/login.aspx');
    }
  
    fillUsername(username: string) {
      cy.get('#LoginUser_UserName').type(username);
    }
  
    fillPassword(password: string) {
      cy.get('#LoginUser_Password').type(password);
    }
  
    submit() {
      cy.get('#LoginUser_LoginButton').click();
    }
  }
  