import express from 'express';
const app = express();
app.use(express.json());

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

