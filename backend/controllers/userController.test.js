const User = require('../models/userModel.js');
const { connectDB, closeDB, clearDB } = require('../config/db.js');

const { authUser, registerUser } = require('./userController.js');
beforeAll(async () => await connectDB())
afterEach(async () => await clearDB())
// afterAll(async () => await closeDB())
describe('auth User Controller', () => {

    it('should register a user with valid credentials', async () => {
        const req = {
            body: {
                firstName: "Robinghjh",
                secondName: "Ngecujhkkjk",
                email: "oppjkjop@gmail.com",
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
 
  });