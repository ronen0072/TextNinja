const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

// callback route for google to redirect to
router.get('/google/redirect',passport.authenticate('google'),(req, res)=>{
    res.send('you reached the redirect URI');
});


module.exports = router;