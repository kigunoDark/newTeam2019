var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var landingRouter = require('./routers/landingRout');
var sequelize = require('./data/database');
var PORT =  3000;

app.set('view engine', 'ejs');
app.set('vews', 'views');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.use(landingRouter);

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



