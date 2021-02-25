const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const conection = require('./database/database.js');
const askModel = require('./database/perguntas');
const answerModel = require('./database/answers');


//database
conection
.authenticate()
.then(() => {
    console.log('Conection enable!')
})
.catch((msgErro)=>{
    console.log(msgErro)
})

//setup pro express configurar EJS como view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
//setupbody parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

//rota da página inicial: ordena as perguntas em ordem decrescente de ID, para q a ultima pergunta fique no top
app.get("/", (req, res)=>{ 
    askModel.findAll({
        raw: true,
        order:[
            ['id', 'DESC']
        ]
    }).then(ask =>{
        res.render("index", {
            ask: ask
        }); 
    })
    
})
//Cria a rota para a página 'Realizar pergunta'
app.get("/asks", (req, res)=>{
    res.render("asks.ejs", {

    })  
})
//Essa rota salva as perguntas no BD então redireciona para a página principal
app.post('/processAsk', (req, res)=>{
    let title = req.body.ask;
    let description = req.body.description;
    askModel.create({
        titulo: title,
        description: description
    }).then(() =>{
        res.redirect('/')
    })
});
//Essa rota cria um link dinamico para cada pergunta a partir do ID de cada um no BD
app.get('/ask/:id', (req, res)=>{
    let id = req.params.id;
    askModel.findOne({
        where: {id: id}
    }).then(ask =>{
        if(ask == undefined){
            res.redirect('/')
        } else{
            answerModel.findAll({
               where: {askId: ask.id},
               order: [[
                   'id','DESC'
               ]]
            }).then((Answers) =>{
                res.render('ask.ejs', {
                    ask: ask,
                    Answers: Answers
                })
            })
        }

    })
   
})

// Essa rota salva as respostas no BD então redireciona para a página da pergunta
app.post('/answers', (req, res) =>{
    let bodyAnswer = req.body.bodyAnswer;
    let answerId = req.body.answerId;
    answerModel.create({
        body: bodyAnswer,
        askId: answerId
    }).then(() =>{
        res.redirect('/ask/' + answerId)
    })
})

/*
//Rota para a página de login
app.get('/login', (req, res) =>{
    res.render('login.ejs')
})

//rota para a página de signUp
app.get('/signUp', (req, res) =>{
    res.render('signUp.ejs')
})
*/

//levanta o servidor na porta escolhida
app.listen(4000,()=>{
    console.log("App is running ")
});