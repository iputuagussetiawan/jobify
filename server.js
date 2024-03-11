import express from 'express';
import { nanoid } from 'nanoid';
const app = express();
app.use(express.json());

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
];

//get alljob 
app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json({ jobs });
});

//create job
app.post('/api/v1/jobs', (req, res) => {
    const {company,position}=req.body
    if(!company || !position){
        return res.status(404).json({msg:'Please provide company and position'});
    }
    const id=nanoid(10)
    const job={id,company,position};
    jobs.push(job)
    res.status(200).json({ jobs });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/',(req,res)=>{
    console.log(req);
    res.json({ message: 'Data received', data: req.body });
})

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

