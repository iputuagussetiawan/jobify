import 'express-async-errors';
import express from 'express'


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

