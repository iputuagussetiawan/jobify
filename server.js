import express from 'express';
//routers
import jobRouter from './routers/jobRouter.js';

const app = express();
app.use(express.json());


app.use('/api/v1/jobs', jobRouter);


app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/',(req,res)=>{
    console.log(req);
    res.json({ message: 'Data received', data: req.body });
})

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ msg: 'something went wrong' });
});

try {
    const response = await fetch(
        'https://www.course-api.com/react-useReducer-cart-project'
    );
    const cartData = await response.json();
    console.log(cartData);
} catch (error) {
    console.log(error);
}

const port=process.env.PORT||5100

app.listen(port, () => {
    console.log(`server running ON port ${port}....`);
});

