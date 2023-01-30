function find(array,id){
    let users = array.find(aa=>aa.id==id);
    return users;
}
function deleted (array,id){
    let users = array.find(aa=>aa.id==id);
    ff = array.indexOf(users);
    array.splice(ff,1) 
}
const query = require('express');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

const users=[];

function find(array,id){
    let users = array.find(aa=>aa.id==id);
    return users;
}
function deleted (array,id){
    let users = array.find(aa=>aa.id==id);
    ff = array.indexOf(users);
    array.splice(ff,1) 
}

app.post('/users/',(request, response)=>{
    const username = request.body.username;
    const id = request.body.id;
    users.push({username,id})
    response.json("пользователь добавлен");
})

app.get('/users/',(request, response)=>{
    response.json({users});
})

app.get('/users/:id',(request, response)=>{
    const id = request.body.id;
    let ss = find(users,id);
    response.json({
        
        users: ss
    });
})

app.patch('users/:id' ,(request, response)=>{
    
})

app.delete('/users/:id',(request, response)=>{
    const id = request.body.id;
    deleted(users,id);

    response.json({
        
        users,
        response: "пользователь удалён"
    });
})




app.listen(8080,()=> console.log("started"))




{
    "username": "jak",
    "password": "12345",
    "confirmPassword": "12345",
    "idu": 1,



    "news": "hsahgsdflkhf sdhfksdhf hsdkhfsku",
    "idn": 1,


    "groups": "dkshkdsyhk",
    "idg":1

}


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


{
    "username": "jak",
    "password": 12345,
    "confirmPassword": 12345
}


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const users=[];
const news=[];
const groups=[];

function find(array,idu){
    let users = array.find(aa=>aa.idu==idu);
    
    return users;
}
function findn(array,idn){
    let news = array.find(aa=>aa.idn==idn);
    
    return news;
}
function findg(array,idg){
    let groups = array.find(aa=>aa.idg==idg);
    
    return groups;
}
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

app.post('/users/',(request, response)=>{
    const username = request.body.username;
    const idu = request.body.idu;
    const password = request.body.password;
    const confirmPassword = request.body.confirmPassword;
    if (password == confirmPassword){
        users.push({username,password,idu})
        response.json("пользователь добавлен");
    }
    else{
        response.json("Парорль не совпадает");
    }
    
})

app.get('/users/',secure,(request, response)=>{
    response.json({users});
})

app.get('/users/:idu',secure,(request, response)=>{
    const idu = request.body.idu;
    let ss = find(users,idu);
    response.json({
        
        users: ss
    });
})

app.put('/users/:idu',secure,(request, response)=>{
    
    const username = request.body.username;
    const idu = request.body.idu;
    const password = request.body.password;
    let user = users.find(gg=>gg.idu==idu)
    let ind = users.indexOf(user)
    users[ind].username = username
    users[ind].password = password
    response.json({
        message: "Информация о пользователе изменена с id"+idu,
        users
    });
})

app.delete('/users/:idu',(request, response)=>{
    const idu = request.body.idu;
    let users1 = users.find(aa=>aa.idu==idu); 
    ff = users.indexOf(users1);


    users.splice(ff,1);

    response.json({
        
        users,
        response: "пользователь удалён"
    });
})



//........................................................Задание с новостями
app.post('/news/',(request, response)=>{
    const newss = request.body.news;
    const idn = request.body.idn;
    news.push({newss,idn})
    response.json("новость добавлена");
})

app.get('/news/',(request,response)=>{
    response.json(news);
})

app.get('/news/:id',(request, response)=>{
    const idn = request.body.idn;
    
    let hh = findn(news,idn);
    response.json({
        
        news: hh
    });
})

app.put('/news/:id',(request, response)=>{
    const newss = request.body.news;
    const idg = request.body.idu;
    
    let news = news.find(gg=>gg.idn==idn)
    let ind = news.indexOf(news)
    news[ind].news = news
    
    response.json({
        message: "Информация о новости изменена с id"+idn,
        news
    })
})


app.delete('/news/:id',(request, response)=>{
    const idn = request.body.idn;
    let news1 = news.find(aa=>aa.idn==idn); 
    ff = news.indexOf(news1);


    news.splice(ff,1);

    response.json({
        
        news,
        response: "пользователь удалён"
    });
})

//                                   Задание с group

app.post('/group/',(request, response)=>{
    const group = request.body.groups;
    const idg = request.body.idg;
    groups.push({group,idg});
    response.json("Группа создана");
})

app.get('/group/',(request,response)=>{
    response.json(groups);
})

app.get('/group/:id',(request, response)=>{
    const idg = request.body.idg;
    let hh = findg(groups,idg);
    response.json({
        
        groups: hh
    });
})


app.delete('/group/:id',(request, response)=>{
    const idg = request.body.idg;
    let group1 = groups.find(aa=>aa.idg==idg); 
    ff = groups.indexOf(group1);


    news.splice(ff,1);

    response.json({
        
        news,
        response: "пользователь удалён"
    });
})


app.listen(9090,()=> console.log("started"))