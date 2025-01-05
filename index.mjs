import express from 'express'

const app = express();
const port = 3000;

app.get('/user', (req, res) => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com'
    };
    res.json(user);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
