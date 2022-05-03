const express = require('express');

const app = express();
app.use(express.json());

let employee = []

app.get('/getEmployee' , (req,res)=>{
    res.status(200).json({
        Employee : employee
    })
})

app.post('/newEmployee' , (req,res)=>{

    if(!req.body.firstname){
        return res.status(400).send("Please Input Firstname")
    }
    if(! req.body.lastname){
        return res.status(400).send("Please Input Lastname")
    }
    if(! req.body.id){
        return res.status(400).send("Please Input Id")
    }
    if(! req.body.position){
        return res.status(400).send("Please Input Position")
    }
    if(! req.body.tel){
        return res.status(400).send("Please Input Tel")
    }
    if(! req.body.email){
        return res.status(400).send("Please Input Email")
    }

    for(let i = 0; i < employee.length; i++){
        if( employee[i].id == req.body.id ||
            employee[i].tel == req.body.tel||
            employee[i].email == req.body.email)
            
        {
            return res.status(400).send("ข้อมูลซ้ำ")
        }
    }

    const newData = {
        firstname : req.body.firstname,
        lastname  : req.body.lastname,
        id : req.body.id,
        position : req.body.position,
        tel : req.body.tel,
        email : req.body.email
    };
    employee.push(newData)

    res.status(200).send("เพิ่มข้อมูลสำเร็จ")
})

app.put('/editEmployee' , (req,res)=>{

    if(!req.body.id || (!req.body.position && !req.body.tel && !req.body.email)){
        return res.status(400).send("Error")
    }

    for(let i =0; i <employee.length;i++){
        if(employee[i].id == req.body.id){

           if(req.body.tel)         employee[i].tel         = req.body.tel
           if(req.body.position)    employee[i].position    = req.body.position
           if(req.body.email)       employee[i].email       = req.body.email

            return res.status(200).send("แก้ไขข้อมูลสำเร็จ")
        }
    }
    return res.status(400).send("Error")
})

app.delete('/deleteEmployee' , (req,res)=>{
    if(!req.body.id){
        return res.status(400).send("Error")
    }

    for(let i =0; i <employee.length;i++){
        if(employee[i].id == req.body.id){

            employee.splice(i,1)

            return res.status(200).send("ลบข้อมูลสำเร็จ")
        }
    }
})


app.listen(3000 , () => {
    console.log('Listening on port: 3000');
});