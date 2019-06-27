const UserM = require('../models/moksModel');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const uuid = require('uuidv4');


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
    fileFilter: checkFileType
}).single('avatar');

function checkFileType(req,file, cb) {
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
    res.render('moks', {
        msg: null
    });
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

                res.status(200).send('ok');
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
