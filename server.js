import 'express-async-errors';
import express from 'express'
import { body, validationResult } from 'express-validator';

//routers
import jobRouter from './routers/jobRouter.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';;
import mongoose from 'mongoose';
import 'dotenv/config'

const app = express();
app.use(express.json());



app.use('/api/v1/jobs', jobRouter);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/api/v1/test',[body('name').notEmpty().withMessage('name is required')],
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            return res.status(400).json({ errors: errorMessages });
        }
        next();
    },
        (req, res) => {
        const { name } = req.body;
        res.json({ msg: `hello ${name}` });
        }
);

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

