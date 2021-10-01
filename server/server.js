const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'sqlpw',
    database:'todolist'
})
connection.connect();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use((req, res, next) =>  {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/task', (req,res)=>{
    task = req.body.task;
    const sqlQuery = 'INSERT INTO new_table (task) VALUES (?)';
    connection.query(sqlQuery,[task],(error,result)=>{
    console.log(result);
    res.send(result);
    })
})

app.post('/delete', (req,res)=>{    
    remove = req.body.taskid;
    const deleteQuery = 'DELETE FROM new_table WHERE id=?';
    connection.query(deleteQuery,[remove],(error,result)=>{
    console.log(result);
    res.send(result);
    })
})

app.post('/edit', (req,res)=>{    
    id = req.body.taskid;    
    newtask = req.body.newtask;
    console.log(newtask)
    const editQuery = "UPDATE new_table SET task = ? WHERE id=?";
    connection.query(editQuery,[newtask,id],(error,result)=>{
    console.log(result);
    res.send(result);
    })
})


app.get('/taskinfo',(req,res)=>{
    const getQuery = 'SELECT * FROM new_table';
    connection.query(getQuery,(error,result)=>{
        if(error){
            res.send('error');
        }
        res.send(result);
    })
})






app.listen(3001);