var page = {
    index: 0,
    about: 1,
    contact: 2,
    practice: 3
};
var pagesArray = ['home','about','contact','practice'];
module.exports = {
    getPageNameByID: function (pageID) {
        return 'pages/'+pagesArray[pageID];
    },
    getPageID: function (pageName) {
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
};