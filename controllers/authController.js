import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

export const register = async (req, res) => {
    // a random value that is added to the password before hashing
    const hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword;
    //set for first data as a admin
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    //insert data into database user
    const user = await User.create(req.body);
    //generate status data
    res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
    // check if user exists
    // check if password is correct
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new UnauthenticatedError('invalid credentials');
    const isPasswordCorrect = await comparePassword(
        req.body.password,
        user.password
    );
    if (!isPasswordCorrect) throw new UnauthenticatedError('invalid credentials');
    res.send('login route');
};