const User = require('../models/userModel.js');
const { connectDB, closeDB, clearDB } = require('../config/db.js');

const { authUser, registerUser } = require('./userController.js');


beforeAll(async () => await connectDB())

afterEach(async () => await clearDB())

// afterAll(async () => await closeDB())

describe('authUser Controller', () => {




    it('should register a user with valid credentials', async () => {
        const req = {
            body: {
                firstName: "Robinson1",
                secondName: "Ngecu2",
                email: "dan@gmail.com",
                password: "3W!W.:srzc4r^!P",
                userType: "admin",
                isAdmin: true
            },
        };
    
        const res = {
            json: jest.fn().mockReturnThis(),
            status: jest.fn(),
        };
    
        await registerUser(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "User registered successfully",
          });
          expect(res.status).toHaveBeenCalledWith(200)
          
    });
    
    
  
    it('should return 401 with invalid credentials', async () => {
      // Make a request with invalid credentials
      const response = await request(app)
        .post('/api/auth')
        .send({ email: 'nonexistent@example.com', password: 'invalidpassword' });
  
      // Assert the response
      expect(response.status).toBe(401);
      // Add more assertions as needed
    });
  });