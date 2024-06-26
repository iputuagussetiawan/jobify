import 'express-async-errors';
import express from 'express'
import cookieParser from 'cookie-parser';

//routers
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/v1/test', (req, res) => {
    res.json({ msg: 'test route' });
});



app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

// app.use((err, req, res, next) => {
//     console.log(err);
//     res.status(500).json({ msg: 'something went wrong' });
// });

app.use(errorHandlerMiddleware);


const port=process.env.PORT||5100

// app.listen(port, () => {
//     console.log(`server running ON port ${port}....`);
// });

try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }

