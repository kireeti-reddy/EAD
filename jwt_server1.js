const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json())
require('dotenv').config();


const posts = [{
    name: "CBIT",
    title: "Welcome to CBIT"
}];
const authenticateToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    const a = auth && auth.split(' ')[1];
    if (!a){
        return res.sendStatus(401);

    }

    jwt.verify(a, process.env.ACCESS_TOKEN, (err, user) =>{
        if (err){
            return res.sendStatus(403);
        }

        req.user = user;
        next()
    })
}
app.post('/login', (req, res) => {
    const user = req.body.username;
    const u = { name : user};

    const accessToken = jwt.sign(u, process.env.ACCESS_TOKEN);
    res.send(accessToken)
})

app.use(authenticateToken);

app.get('/posts', (req, res) => {
    res.json(posts.filter(post => post.name.toLowerCase === req.user.name.toLowerCase));
})
app.listen(3000);