const express = require('express');
const app = express();
const port = 3000;
const jtoken = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const key = "ewfoewopfjwpeofjwpeofj";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/login.html")
})
app.get('/home', (req, res) => {
    if (!req.cookies.token) {
        return res.redirect('/error')
    }
    jtoken.verify(req.cookies.token, key ,(err, result)=>{
        if(err){
            return res.redirect('/error')
        }
    })
    res.sendFile(__dirname + "/data.html")
})
app.get('/error', (req, res) => {
    res.sendFile(__dirname + "/error.html")
})
app.post('/login', (req, res) => {
    if (req.body.username == "admin" && req.body.password == "1234") {
        const token = jtoken.sign({ username: "admin" }, key)
        res.cookie('token', token)
        res.redirect('/home')
    }
    else {
        res.cookie('token', "")
        res.redirect('/')
    }
})

app.listen(port, () => {
    console.log(`Listening at http://localhost:$(port)`);
});