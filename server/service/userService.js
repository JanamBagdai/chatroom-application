const User = require('../models/userSchema');
exports.postUser = async (request) => {
    const requestBody = request.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({email: requestBody.email});
    if (existingUser) {
        // If a user with the same email exists, throw an error
        throw new Error('User with this email already exists');
    }


    let newUser = undefined

    newUser = new User({
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        email: requestBody.email,
        password: requestBody.password,
    });

    return await newUser.save()
}

exports.validateUser = async (request) => {
    const user = await User.find({email: request.body.email, password: request.body.password}).exec();
    if (user.length > 0) {
        let temp = user[0]
        // let jwtToken = await jwt.sign({
        //     userId: temp._id,
        //     role: temp.role,
        //     exp: Math.floor(Date.now() / 1000) + (60 * 10)
        // }, process.env.JWT_SECRET)

        return {
            user: temp
        }
    } else
        return "Failure"
}

