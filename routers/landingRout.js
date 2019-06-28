const express = require('express');
const router = express.Router();
const landingControl =  require('../controllers/landingCont');
const landingControlMoks = require('../controllers/landingContMoks');

router.get('/', landingControl.getLanding);
router.post('/land-post', landingControl.postLanding);

//My(MAKSIM) Test Code
router.get('/user',landingControlMoks.authentication);
router.get('/logout',landingControlMoks.logout);

router.get('/loginmoks',landingControlMoks.getLogin);
router.post('/loginmoks',landingControlMoks.postLogin);

router.get('/moks', landingControlMoks.getMoksLand);
router.post('/moks', landingControlMoks.postMoksland);

router.get('/moks/:name',landingControlMoks.getAvatar);

module.exports = router;