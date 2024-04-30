const mongoose = require('mongoose');

// Define our user schema
const UserSchema = new mongoose.Schema({
        firstName: String,
        lastName:String,
        email: String,
        password: String
    },
    {
        timestamps: {
            createdAt: 'createdAt',
            updatedAt: 'updatedAt'
        }
    }, {
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    });

// Export the Mongoose model
module.exports = mongoose.model('users', UserSchema);
