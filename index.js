const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

let ch1 = 0;
let ch2 = 0;
const users=[]

const secure = (request, response, next) => {
    const authorization = request.headers.authorization.split(" ")
    const authorization2 = authorization[1].split(":")
    const username = authorization2[0];
    const password = authorization2[1];
    let usename = users.find(da => da.username == username)
    
    if (authorization[0].toLowerCase() !== "bearer") {
        return response.json({
            message:"Неправельный токен"
        })
    }
    
    if (usename == undefined) {
        response.json({
            message:"Пользовател не найден"
        })
        
    }
   
    let index = users.indexOf(usename)
    let pass = users[index].password


    if (pass !== password) {
        response.json({
            message:"Неправельный пароль"
        })
    }
    
    
    next();
}


app.post('/auth/',(request, response)=>{
    const username = request.body.username;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    response.json("Парорль не совпадает");

    ch1 = Math.floor(Math.random() * 10) + 1;
    ch2 = Math.floor(Math.random() * 10) + 1;
    if (password == confirmPassword){
        users.push({username,password})
        response.json("пользователь добавлен");
    }
    else{
        response.json("Парорль не совпадает");
    }
    return ch1,ch2;
})

app.post('/auth/confirm',(request, response)=>{
    const username = request.body.username;
    let ch = ch1+ch2;
    response.json({ch});

})

app.get('/news/',secure,(request, response)=>{
    response.json("Парорль  совпадает");

})


app.listen(8080,()=> console.log("started"))