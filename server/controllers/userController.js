const {getAllUsers, postUser, validateUser, updateUserLab} = require("../service/userService");

exports.postUser = async (req, res) => {
    try {
        const userData = await postUser(req);
        res.status(200).json({
            message: 'Success',
            data: {user_data: userData}
        });
    } catch (error) {
        if (error.message === 'User with this email already exists') {
            res.status(400).json({
                message: 'User with this email already exists'
            });
        } else {
            console.log('Error in postUser:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }
}

exports.validateUser = async (req, res) => {
    try {
        const userData = await validateUser(req);
        res.status(200).json({
            message: 'Success',
            data: {user_data: userData}
        });
    } catch (error) {
        console.log('Error in validateUser:', error);
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message
        });
    }
}