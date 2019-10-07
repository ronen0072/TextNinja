var page = {
    index: 0,
    about: 1,
    contact: 2,
    simplePractice: 3,
    dividePractice: 4
};
var pagesArray = ['home','about','contact','simple-practice'];
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
            case 'divide-practice':
                return page.dividePractice;
                break;
            default:
                return page.index;
        }
    }
};