import { StatusCodes } from 'http-status-codes';
import User from '../models/UserModel.js';

export const register = async (req, res) => {
    //set for first data as a admin
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';
    //insert data into database user
    const user = await User.create(req.body);
    //generate status data
    res.status(StatusCodes.CREATED).json({ user });
};

export const login = async (req, res) => {
    res.send('login');
};