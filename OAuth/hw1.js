const { response } = require('express');
const express = require('express');
const mysql = require('mysql2');
const app = express();
const jtoken = require('jsonwebtoken');
const key = "ewfoewopfjwpeofjwpeofj";
app.use(express.json());



const sql = mysql.createPool({
    namedPlaceholders: true,
    charset: 'utf8',
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "gosoft",
})

app.use((req, res, next) => {
    if (req.path == "/login") {
        return next()
    }
    const auth = req.headers.authorization
    if (!auth) {
        return res.status(400).json("Unaothorization")
    }
    jtoken.verify(auth.split(' ')[1], key, (err, result) => {
        if (err) {
            return res.json(" data : Unauthozitaion")
        }
        next()
    })

})

app.post('/login', (req, res) => {
    if (req.body.username == "apirat" && req.body.password == "1234") {
        const token = jtoken.sign({ username: "admin" }, key)
        return res.json({ token })
    }
    return res.status(400).json("data : Login Failed")

})


app.get('/getEmployee', (req, res) => {
    sql.query('select * from employee', (err, result) => {
        if (err) {
            return res.status(400).json(err)
        }
        return res.json({ data: result })
    })

})

app.post('/newEmployee', (req, res) => {

    if (!req.body.firstname ||
        !req.body.lastname ||
        !req.body.id ||
        !req.body.position ||
        !req.body.tel ||
        !req.body.email) {
        return res.status(400).send("โปรดกรอกข้อมูลให้ครบถ้วน")
    }



    const newData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        id: req.body.id,
        position: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    };

    const insert = 'insert into employee value (:firstname, :lastname, :id, :position, :tel, :email)'
    sql.query(insert, {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        id: req.body.id,
        position: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {

        if (err) {
            return res.status(400).json(err)
        }
        return res.json({ data: "เพิ่มข้อมูลสำเร็จ" })

    })
})

app.put('/editEmployee', (req, res) => {

    if (!req.body.id || (!req.body.position && !req.body.tel && !req.body.email)) {
        return res.status(400).send("Error")
    }

    const update = 'update employee set position = :position, tel = :tel, email = :email where id = :id'
    sql.query(update, {
        id: req.body.id,
        position: req.body.position,
        tel: req.body.tel,
        email: req.body.email
    }, (err, result) => {

        if (err) {
            return res.status(400).json(err)
        }
        if (result.affectedRows == 0) {
            return res.status(400).json({ data: "ไม่่พบ ID" })
        }
        return res.json({ data: "แก้ไขสำเร็จ" })

    })

})

app.delete('/deleteEmployee', (req, res) => {
    if (!req.body.id) {
        return res.status(400).send("Error")
    }
    const remove = 'delete from  employee where id =:id'
    sql.query(remove, {
        id: req.body.id

    }, (err, result) => {
        if (err) {
            return res.status(400).json(err)
        }
        if (result.affectedRows == 0) {
            return res.status(400).json({ data: "ไม่่พบ ID" })
        }
        return res.json({ data: "แก้ไขสำเร็จ" })

    })


})


app.listen(3000, () => {
    console.log('Listening on port: 3000');
});