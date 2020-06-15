const Word = require('../../Word');

//unit tests
test('should be Word object',()=>{
    const word = new Word('text');
    expect(word).toBeInstanceOf(Word);
});

test('should return getWordID from Word object',()=>{
    const result = new Word('text').getWordID();
    expect(result).toBe('text');
});

test('getWordID should return from null',()=>{
    const result = new Word(null).getWordID();
    expect(result).toBe(null);
});

test('getWordID should return from undefined',()=>{
    const result = new Word().getWordID();
    expect(result).toBe(undefined);
});


test('getSyllables should return getSyllables from Word object',()=>{
    const result = new Word('text').getSyllables();
    expect(result).toBe(undefined);
});

test('getSoundURL should return undefined from Word object',()=>{
    const result = new Word('text').getSoundURL();
    expect(result).toBe(undefined);
});


//integration tests
test('getSyllables should return syllables from Word object',()=>{
    const word = new Word('test');
    word.initialization().then(()=>{
        const result = word.getSyllables();
        expect(result.count).toBe('1');
    });
});

test('getSyllables should  be instance of string from Word object',()=>{
    const word = new Word('test');
    word.initialization().then(()=>{
        const result = word.getSyllables().list;
        expect(result).toBeInstanceOf(String);
    })
});

test('getSoundURL should be instance of string from Word object',()=>{
    const word = new Word('test');
    word.initialization().then(()=>{
        const result = word.getSoundURL();
        expect(result).toBeInstanceOf(String);
    })
});

// initialization() {
//     var PromiseSyllables =   new Promise(resolve => {
//         getSyllablesFormWordsAPI(this.wordID).then((syllables)=> {
//             if (syllables === {}) {
//                 this.syllables = wordID;
//             } else {
//                 this.syllables = syllables;
//             }
//             //console.log('getSyllablesFormWordsAPI: '+ syllables);
//             resolve();
//         });
//     });
//     var PromiseURL = new Promise(resolve => {
//         getSoundURLformOxford(this.wordID).then((URL)=> {
//             this.soundURL = URL;
//             //console.log('getSoundURLformOxford: '+ URL);
//             resolve();
//         });
//     });
//     return Promise.all([PromiseSyllables,PromiseURL])
// }