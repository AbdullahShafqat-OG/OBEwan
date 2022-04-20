const db = require('./db')
const adminModel = require('../models/admin.model.js')
const UserModel =  require("../models/instructor.model");
const TestLogin = require('../../client/src/TestLogin')

beforeAll(async () => await db.connect())

afterEach(async () => await db.clearDatabase())

afterAll(async () => await db.closeDatabase())


describe('Login accepted when', () => {
    
    it('User is Admin', async done => {
        const admin = await adminModel.findById("625c60c11b74fcae0f482ebd")
        
        expect(admin.email).toEqual("admin@mail.com")
        expect(admin.password).toEqual("admin")
        done()
    })

    //jest.setTimeout(30000);
    it('User is Instructor', async done => {

        const { userID } = await TestLogin("Obi-Wan", "obi@mail.com", "highground")
        console.log(userID);
        const instructor = await UserModel.findById(userID)

        expect(instructor.name).toEqual("Obi-Wan")
        expect(instructor.email).toEqual("obi@mail.com")
        expect(instructor.password).toEqual("highground")

        done();
    })
})