import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    avatar: String,
    avatarPublicId: String,
    lastName: {
        type: String,
        default: 'lastName',
    },
    location: {
        type: String,
        default: 'my city',
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

//function to remove password when fetch single user
UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
};

export default mongoose.model('User', UserSchema);