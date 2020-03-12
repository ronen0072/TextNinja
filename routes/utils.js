var page = {
    home: 0,
    about: 1,
    contact: 2,
    simplePractice: 3,
    dividePractice: 4
};
var pagesArray = ['home','about','contact','simple-practice','divide-practice'];
module.exports = {
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

