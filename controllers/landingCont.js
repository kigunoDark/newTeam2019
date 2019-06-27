const User = require('../models/landingtest');
const UserM = require('../models/moksModel');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const uuid = require('uuidv4');

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

// this is my(MOKS) JOB

//seting for multer 

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb,){
        req.body.avatar = uuid() + "" + file.originalname;
        cb(null, req.body.avatar);
    }
});

const upload = multer({
    storage:storage,
    fileFilter: function(req,file,cb){
        checkFileType(file, cb);
    }
}).single('avatar');

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    
    const mimetype = fileTypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error:Только Картинки');
    };
};

exports.getMoksLand = async (req, res) => {
    res.render('moks');
};

exports.getAvatar = async (req , res) => {
    const tag = req.params.tag;

    res.render('img',{
        name:name 
    });
};

exports.postMoksland = async (req, res) => {
    upload(req, res, (err) => {
        if(err){
          res.render('moks', {
            msg: err
          });
        } else {
            const hash = crypto.createHmac('sha256', 'SEALS')
                   .update(req.body.password)
                   .digest('hex');

            console.log('MOKS this is a new user: ' + req.body.name + ' ' + req.body.avatar + " " + hash);
            
            UserM.create({
                name:req.body.name,
                password:hash,
                avatar:req.body.avatar
            })
            .then(user => {
                console.log(`MOKS this is a new user: 
                NAME: ${user.name} 
                AVATAR: ${user.avatar}
                PASSWORD: ${hash}`);
            })
            .catch(err =>{
                res.render('moks', {
                    msg: err
                  });
                console.log(err);
            });
        }
    
    });
};
