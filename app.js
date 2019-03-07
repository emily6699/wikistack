const morgan = require('morgan')
const express = require('express')
const layout = require('./views/layout')
const models = require('./models');
const wiki = require('./routes/wiki')
const user = require('./routes/user')

const app = express();
app.use(morgan('dev'));

app.use('/wiki', wiki)
app.use('/user', user)

app.get('/', (req, res)=>{
    res.redirect('/wiki');
  })

const path = require('path')
app.use(express.static(path.join(__dirname + 'stylesheets')));


models.db.authenticate().then(() => {
  console.log('connected to the database');
})

app.use(express.urlencoded({extended: false}));

app.get('/', async(req, res, next)=>{
    try{
       res.send(layout())
    } catch (error){ next(error)}


})

const init = async() =>{
    //console.log('HERE IT IS: ', db);
    await models.User.sync({force: true})
    await models.Page.sync({force: true})
    
    const port = 3000;
    app.listen(port, ()=>{
        console.log(`hello world`)
    })
}

init();

app.use(express.json());
