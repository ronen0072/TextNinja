const hashSet = require('hashset');
var forUserOnly = new hashSet('practice');

module.exports = {
    updateCurrentPageName: function(req, res, next) {
        if(req.params.pageName !== 'favicon.ico') {
            console.log('from: '+req.session.pageName);
            if (req.params.pageName !== undefined) {
                req.session.pageName = req.params.pageName;
            } else {
                if (req.session.pageName === undefined) {
                    req.session.pageName = 'home';
                }
            }
            console.log('to: '+req.session.pageName);
        }
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