const express = require('express');


const app = express();
app.use(express.json());

app.get('/', (req,res) => {

    
    console.log(req.query)//เช็คผู้ใช้ป้อนค่าครบทั้ง 4 ค่า หรือไม่
    if(!req.query.num1 || !req.query.num2 || !req.query.num3 || !req.query.num4  ) return res.status(403).send('Please Input num');
    
    const check  = /^[1-9]{1,1}$/   //เช็คค่าที่รับมาเป็นตัวเลข 1-9 และ 1 ตัวหรือไม่
    if(!check.exec(req.query.num1) ||(!check.exec(req.query.num2) ||(!check.exec(req.query.num3) ||(!check.exec(req.query.num4))))) return res.status(403).send('Error');

    //แปลงค่าที่รับมาจาก "1" > 1
    const num1 = parseInt(req.query.num1); 
    const num2 = parseInt(req.query.num2);
    const num3 = parseInt(req.query.num3); 
    const num4 = parseInt(req.query.num4); 

    const game24 = require('24game-solver/dist/24game-solver');
    const ans = game24([num1,num2,num3,num4] , 24);

    let stat = "Success";
    if (ans.length ==0) stat = "Fail"

    res.send({
        stat : "Success",
        ans : ans

    })
        

})

app.listen(3000 , () => {
    console.log('Listening on port: 3000');
});