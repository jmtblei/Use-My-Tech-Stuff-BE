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
        it('returns 401 if username or password  are not provided', async () => {
            const response = await request(server)
                .post('/api/register')
                .send({ username: '', password: 'password' });
            expect(response.status).toEqual(401);
        })
        it('returns correct error message if username or password  are not provided', async () => {
            const response = await request(server)
                .post('/api/register')
                .send({ username: '', password: 'password' });
            expect(response.body).toEqual({ message: "Must enter a username and password" });
        })
        it('returns correct error message if invalid email', async () => {
            const response = await request(server)
                .post('/api/register')
                .send({ username: 'username', password: 'password', email: 'asdasd' });
            expect(response.body).toEqual({ message: "Please provide valid email" });
        })
        it('returns correct error message if password <8 characters', async () => {
            const response = await request(server)
                .post('/api/register')
                .send({ username: 'username', password: 'pass'});
            expect(response.body).toEqual({ message: "Password must be at least 8 characters" });
        })
    })
    describe('POST /login endpoint', () => {
        it('returns 200 if user logs in with required params', async () => {
            await request(server)
                .post('/api/register')
                .send(mockUser);
            const response = await request(server)
                .post('/api/login')
                .send({ username: mockUser.username, password: mockUser.password });
            expect(response.status).toEqual(200);
        })
        it('returns 401 if user logs in wwith username or password that is wrong or blank', async () => {
            await request(server)
                .post('/api/register')
                .send(mockUser);
            const response = await request(server)
                .post('/api/login')
                .send({ username: mockUser.username, password: 'asdasd' });
            expect(response.status).toEqual(401);
        })
    })
})


