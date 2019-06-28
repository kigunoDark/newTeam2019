const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const landingRouter = require('./routers/landingRout');
const sequelize = require('./data/database');
const PORT =  3000;

app.set('view engine', 'ejs');
app.set('vews', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}));

app.use(landingRouter);

app.use(function(req, res, next){
    res.status(404);
  
    if (req.accepts('html')) {
      res.render('404');
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    } 
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });

sequelize
.sync()
.then(() =>{
    console.log("Sequselize is running");
    app.listen(PORT, (err, next) => {
        if(err)
        {
            console.log(err);
        } else {
            console.log(`Your server is running on a port ${PORT}`);
        }
    })
}
)



