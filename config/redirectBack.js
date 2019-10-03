const hashSet = require('hashset');
var forUserOnly = new hashSet('practice');
var page = {
    home: 0,
    about: 1,
    contact: 2,
    practice: 3
};

function getPageID(pageName) {
    switch(pageName) {
        case 'home':
            return page.home;
            break;
        case 'about':
            return page.about;
            break;
        case 'contact':
            return page.contact;
            break;
        case 'practice':
            return page.practice;
            break;
        default:
            return page.home;
    }
}

module.exports = {
    updateCurrentPageName: function(req, res, next) {
        console.log(req.session.pageName);
        if(req.params.pageName !== undefined){
             req.session.pageName = req.params.pageName;
        }else{
            if(req.session.pageName === undefined){
                req.session.pageName = 'home';
            }
        }
        console.log(req.session.pageName);
        next();
    },
    isLogin: function (req, res, next) {
        let pageName = req.session.pageName;
        if((req.user === undefined) && (forUserOnly.contains(pageName))){
            console.log('User is not connected');
            req.session.needToLogin= true;
        }
        next();
    }
};