describe('Login Test Suite', () => {
    beforeEach(() => {
   
      cy.visit('http://localhost:5173');
    });
  
    it('should perform the login action successfully', () => {
      
    
      cy.get('[data-cy="email"]').type('devngecu@gmail.com');
      cy.get('[data-cy="password"]').type('I@mrich254');  
      
      cy.get('[data-cy="login-btn"]').click();
      cy.wait(2000);
      cy.location('pathname').should('eq', '/')
  
    });

    it('Returns an error if email or password is empty', () => {
      
    
        cy.get('[data-cy="email"]').type('caleb');
        // cy.get('[data-cy="password"]').type('');  
        
        cy.get('[data-cy="login-btn"]').click();
        cy.wait(500);
        cy.contains('Form is invalid')
    
      });

      it('Returns an error if email or password is missing', () => {
      
    
        // cy.get('[data-cy="email"]').type('caleb');
        // cy.get('[data-cy="password"]').type('');  
        
        cy.get('[data-cy="login-btn"]').click();
        cy.wait(500);
        cy.contains('Form is invalid')
    
      });

            it('Returns an error if email is not in database', () => {
      
    
        cy.get('[data-cy="email"]').type('kinuthia');
        cy.get('[data-cy="password"]').type('12345678');  
        
        cy.get('[data-cy="login-btn"]').click();
        cy.wait(500);
        cy.contains('User not found')
    
      });

                  it('Handles incorrect password scenario', () => {
      
    
        cy.get('[data-cy="email"]').type('caleb@gmail.com');
        cy.get('[data-cy="password"]').type('wrongPassword');  
        
        cy.get('[data-cy="login-btn"]').click();
        cy.wait(500);
        cy.contains('Incorrect password')
    
      });

      it('Check deactivated account', () => {
      
    
        cy.get('[data-cy="email"]').type('caleb');
        cy.get('[data-cy="password"]').type('12345678');  
        
        cy.get('[data-cy="login-btn"]').click();
        cy.wait(2000);
  
        
        cy.contains('Account deactivated, please contact admin')
     
    
      });
  });