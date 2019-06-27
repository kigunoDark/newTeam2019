const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const landingRouter = require('./routers/landingRout');
const sequelize = require('./data/database');
const PORT =  3000;
const path = require('path');

app.set('view engine', 'ejs');
app.set('vews', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));

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



