const express = require('express');
const router = express.Router();
const pages = require('./pages');
const updateCurrentPageName = require('../config/redirectBack').updateCurrentPageName;
const isLogin = require('../config/redirectBack').isLogin;
const {getPageNameByID, getPageID} = require('./pages');

// Welcome Page
router.get('/',isLogin, (req, res) => {
/*    console.log('needToLogin: '+ req.session.needToLogin);
    console.log('user: '+ req.user);*/
    const needToLogin = req.session.needToLogin;
    req.session.needToLogin = false;
    res.render('layout',{user: req.user, pageID: getPageID(req.session.pageName), login: needToLogin});
});
router.get('/:pageName',updateCurrentPageName, isLogin, (req, res) => {
  /*  console.log('needToLogin: '+ req.session.needToLogin);
    console.log('user: '+ req.user);*/
    const pageName = req.session.pageName;
    const needToLogin = req.session.needToLogin;
    req.session.needToLogin = false;
    res.render('pages/'+pageName,{user: req.user, login: needToLogin});
});

router.get('/login/:pageName',updateCurrentPageName, (req, res) => {
    const pageName = req.session.pageName;
    res.render('pages/'+pageName,{user: req.user, login: true});
});
router.get('/favico.ico' , function(req , res){
    const needToLogin = req.session.needToLogin;
    req.session.needToLogin = false;
    res.render('layout',{user: req.user, pageID: getPageID(req.session.pageName), login: needToLogin});
});
module.exports = router;