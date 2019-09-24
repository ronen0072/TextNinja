const passport = require('passport');
const express = require('express');
const router = express.Router();

router.get('/simple_practice', (req, res) => {
    res.send(req.user.words);
});


module.exports = router;