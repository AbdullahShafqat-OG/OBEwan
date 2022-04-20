const UserModel =  require("../../server/models/instructor.model");

module.exports = async function TestLogin(name, email, password) 
{
    try 
    {
        // Checking if instructor already exists
        const existingInstructor = await UserModel.findOne({email: email})
        if (existingInstructor) throw new Error(`Identity theft is a crime; Instructor ${email} already exists, Impostor.`)
        
        // If Instructor does not already exist
        const newInstructor = new UserModel ({
            name, 
            email, 
            password
        })
        await newInstructor.save()

        return {
            instructorId: newInstructor._id
        }
    } catch(err) {
        throw err
    }
}