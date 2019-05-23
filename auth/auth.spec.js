const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe('auth tests', () => {
    beforeEach(async () => {
        await db("users").truncate();
    });
    afterEach(async () => {
        await db("users").truncate();
    });

    const mockUser = {
        username: "JohnSmith123", 
        password: "password", 
        email: "JohnSmith123@gmail.com", 
        firstname: "John", 
        lastname: "Smith", 
        phone: "1234567", 
        address: "123 street"
    }

    describe('POST /register endpoint', () => {
        it('returns 201 if user is registered with required params', async () => {
            const response = await request(server)
                .post('/api/register')
                .send({ username: 'username', password: 'password' });
            expect(response.status).toEqual(201);
        })
        it('returns the newly created users with all entered params if succesful', async () => {
            const response = await request(server)
                .post('/api/register')
                .send(mockUser);
            expect(response.body.username).toEqual(mockUser.username);
            expect(response.body.email).toEqual(mockUser.email);
            expect(response.body.firstname).toEqual(mockUser.firstname);
        })
    })
})


