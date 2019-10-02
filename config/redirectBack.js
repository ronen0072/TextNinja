const hashSet = require('hashset');
var forUserOnly = new hashSet('practice');
var page = {
    index: 0,
    about: 1,
    contact: 2,
    practice: 3
};

function getPageID(pageName) {
    switch(pageName) {
        case 'index':
            return page.index;
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
            return page.index;
    }
}

module.exports = {
    updateCurrentPageName: function(req, res, next) {
        req.session.pageName = req.params.pageName;
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