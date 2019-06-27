const express = require('express');
const router = express.Router();
const landingControl =  require('../controllers/landingCont');

router.get('/', landingControl.getLanding);
router.post('/land-post', landingControl.postLanding);

router.get('/moks', landingControl.getMoksLand);
router.post('/moks', landingControl.postMoksland);

router.get('/moks/:name',landingControl.getAvatar);

module.exports = router;