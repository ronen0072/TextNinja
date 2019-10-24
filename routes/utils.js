var page = {
    home: 0,
    about: 1,
    contact: 2,
    simplePractice: 3,
    dividePractice: 4
};
var pagesArray = ['home','about','contact','simple-practice','divide-practice'];
module.exports = {
    getPageNameByID: function (pageID) {
        return 'pages/'+pagesArray[pageID];
    },
    getPageID: function (pageName) {
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
            case 'simple-practice':
                return page.simplePractice;
                break;
            case 'divide-practice':
                return page.dividePractice;
                break;
            default:
                return page.home;
        }
    },
    calcDifficulty(wordObj){
         return wordObj.syllables.count * 5;
    },
    incDifficulty(wordObj){
        return Math.min(wordObj.difficulty + 5, 100);
    },
    decDifficulty(wordObj){
        console.log('decDifficulty');
        return Math.max(wordObj.difficulty - 5, 0);
    }
};

