var express = require('express');
var router = express.Router();
var landingControl =  require('../controllers/landingCont');


router.get('/', landingControl.getLanding);
router.post('/land-post', landingControl.postLanding);


module.exports = router;