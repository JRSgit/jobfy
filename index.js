const express = require('express');
const app = express();
const port = process.env.PORT ||3000;
const bodyParser = require('body-parser');
const path = require('path');

app.use('/admin',(req,res) =>{
    if(req.hostname == 'localhost'){
        next();
    }else{
        res.send('<h1>Anbiente de administração você não tem permição. :(</h1>');
    }
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('./routes'));

app.listen(port, (err)=>{
    if(err){
        console.log('Não foi possivel rodar o server Jobfy');        
    }else{
        console.log(`Serve Jobfy rodando na porta ${port}`);
    }

});