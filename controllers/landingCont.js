const User = require('../models/landingtest');

exports.getLanding = (req, res) => {
    res.render('landing');
}


exports.postLanding =  (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    User.create({
        name:name,
        password:password,
    })
    .then(user => {
        console.log("This is a new user: " +  user.name );
    })
    .catch(err => {
        if(err){
            console.log(err);
        } else {
            console.log('Everithing is ok');
        }
    })
}